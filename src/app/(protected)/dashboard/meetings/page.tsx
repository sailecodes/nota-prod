import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import MeetingCard from "./_components/meeting-card";

export const metadata: Metadata = {
  title: "Meetings",
  description: "See all your uploaded meetings, including the status, a short summary, and the number of action items for each one.",
};

export default async function Meetings() {
  const supabase = await createClient();
  const {
    data: { user: sbUser },
    error: getUserError,
  } = await supabase.auth.getUser();

  if (getUserError || !sbUser) throw new Error("Something went wrong. Please refresh the page.");

  const userMeetings = await prisma.upload.findMany({
    include: {
      uploader: true,
      result: {
        include: {
          actionItems: true,
        },
      },
    },
    where: { uploader: { sbId: sbUser.id } },
  });

  return (
    <div className="grid [grid-template-columns:repeat(auto-fit,minmax(0,375px))] justify-center gap-3">
      {userMeetings.length === 0 ? (
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-center text-sm font-medium">
          No meetings yet.
        </div>
      ) : (
        userMeetings.map((userMeeting) => (
          <MeetingCard
            key={userMeeting.id}
            title={userMeeting.title}
            processStatus={userMeeting.processStatus}
            createdAt={userMeeting.createdAt}
            meetingId={userMeeting.id}
            uploader={userMeeting.uploader}
            summary={userMeeting.result?.summary}
            numActionItems={userMeeting.result?.actionItems.length}
          />
        ))
      )}
    </div>
  );
}
