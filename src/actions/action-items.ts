"use server";

import { revalidatePath } from "next/cache";
import { DueStatus } from "@/app/generated/prisma";
import { E_SERVER_ACTION_ERROR_TYPE } from "@/lib/enums";
import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { TServerActionResult } from "@/lib/types";
import { createServerAction } from "@/lib/utils";
import { ServerActionError } from "../lib/classes";

export const updateDueStatus = createServerAction(async function (id: string): Promise<TServerActionResult<undefined, undefined>> {
  try {
    const supabase = await createClient();
    const { error: getUserError } = await supabase.auth.getUser();

    if (getUserError) throw new ServerActionError(getUserError.message, { type: E_SERVER_ACTION_ERROR_TYPE.KNOWN });

    const actionItem = await prisma.actionItem.findUnique({
      where: { id },
    });

    if (!actionItem) throw new ServerActionError();

    // FIXME: Temporary fix. Should update to previous status, not TBD.
    //        Or give user the option to choose.
    if (actionItem.dueStatus === DueStatus.COMPLETED) await prisma.actionItem.update({ where: { id }, data: { dueStatus: DueStatus.TBD } });
    else await prisma.actionItem.update({ where: { id }, data: { dueStatus: DueStatus.COMPLETED } });

    revalidatePath("/dashboard/meetings");
    revalidatePath(`/dashboard/meetings/meeting/${id}`);

    return { success: true };
  } catch (err) {
    throw err;
  }
});
