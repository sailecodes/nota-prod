import { revalidatePath } from "next/cache";
import { createUploadthing, FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { summarize } from "@/actions/summarize";
import { transcribe } from "@/actions/transcribe";
import { DueStatus, ProcessStatus } from "@/app/generated/prisma";
import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

const f = createUploadthing();

export const ourFileRouter = {
  audioUploader: f({
    audio: {
      maxFileSize: "128MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const {
        data: { user: sbUser },
        error: getUserError,
      } = await (await createClient()).auth.getUser();

      if (getUserError) throw new UploadThingError(getUserError.message);
      else if (!sbUser) throw new UploadThingError("Unauthorized access");

      return { user: { id: sbUser.id } };
    })
    .onUploadComplete(async ({ metadata, file: { name, ufsUrl } }) => {
      let possibleUploadId;

      try {
        const user = await prisma.user.findUnique({ where: { sbId: metadata.user.id } });

        if (!user) throw new UploadThingError(`Cannot find user with id ${metadata.user.id}`);
        else if (user.totalMonthlyUploads === 5) throw new UploadThingError("Reached monthly upload limit");

        // 1. Create new Upload record

        const newUpload = await prisma.upload.create({
          include: {
            uploader: true,
          },
          data: {
            title: name,
            fileUrl: ufsUrl,
            uploaderId: user.id,
          },
        });
        possibleUploadId = newUpload.id;

        revalidatePath("/dashboard/meetings");

        // 2. Transcribe audio file

        const { transcript } = await transcribe(ufsUrl);

        // 3. Update Upload record to process status `SUMMARIZING`

        await prisma.upload.update({
          where: {
            id: newUpload.id,
          },
          data: {
            processStatus: ProcessStatus.SUMMARIZING,
          },
        });

        revalidatePath("/dashboard/meetings");

        // 4. Summarize (and extract) transcript

        const result = await summarize(transcript!);

        if ("error" in result) throw new UploadThingError("Uh oh. Something went wrong.");

        // 5. Update Upload record to process status `COMPLETED`

        await prisma.upload.update({
          where: {
            id: newUpload.id,
          },
          data: {
            processStatus: ProcessStatus.COMPLETED,
          },
        });

        revalidatePath("/dashboard/meetings");

        // 6. Create new Result record

        const newResult = await prisma.result.create({
          include: {
            upload: true,
          },
          data: {
            summary: result.summary,
            transcript: transcript!,
            uploadId: newUpload.id,
          },
        });

        // 7. Create related ActionItem records

        const actionItems = await formatActionItems(result.actionItems, newResult.id);

        await prisma.actionItem.createMany({
          data: actionItems,
        });

        revalidatePath("/dashboard/meetings");

        // 8.

        await prisma.user.update({
          where: { id: user.id },
          data: { totalMonthlyUploads: user.totalMonthlyUploads + 1 },
        });

        revalidatePath("/dashboard");
      } catch (err) {
        // TODO: Implement rollback
        console.error("[uploadthing Error -- verbatim] ", err);

        await prisma.upload.update({
          where: { id: possibleUploadId },
          data: { processStatus: ProcessStatus.FAILED },
        });

        throw new UploadThingError("Something went wrong. Please try again.");
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

const isValidDate = (date: string) => {
  const d = new Date(date);
  return !isNaN(d.getTime());
};

type RawActionItem = {
  action: string;
  assignee?: string | null;
  dueDate?: string | null;
};

export async function formatActionItems(items: RawActionItem[], resultId: string) {
  return await Promise.all(
    items.map(async (item) => {
      let assigneeId: string | undefined = undefined;

      if (item.assignee) {
        // FIXME: Temporary logic...
        //        Only finding first user that matches assignee
        const user = await prisma.user.findFirst({
          where: {
            OR: [{ firstName: item.assignee }, { lastName: item.assignee }],
          },
        });

        if (user) assigneeId = user.id;
      }

      const dueDate = item.dueDate && isValidDate(item.dueDate) ? new Date(item.dueDate) : undefined;

      return {
        action: item.action,
        dueDate,
        dueStatus: dueDate ? DueStatus.NEW : DueStatus.TBD,
        assigneeId,
        resultId,
      };
    }),
  );
}
