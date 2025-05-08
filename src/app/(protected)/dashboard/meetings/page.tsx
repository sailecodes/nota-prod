import { Metadata } from "next";
import { ProcessStatus } from "@/app/generated/prisma";
import MeetingCard from "./_components/meeting-card";

export const metadata: Metadata = {
  title: "Meetings",
  description: "See all your uploaded meetings, including the status, a short summary, and the number of action items for each one.",
};

export default async function Meetings() {
  // TODO: Get meetings
  /*
  
  const supabase = await createClient();
  const { data: { user: sbUser }, error: getUserError } = await supabase.auth.getUser();

  if (getUserError || !sbUser) throw new Error('Something went wrong. Please refresh the page.');
  
  const meetings = await prisma.meeting.findAll({ where: { sbId: sbUser.id } });
  */

  return (
    <div className="grid [grid-template-columns:repeat(auto-fit,minmax(0,375px))] justify-center gap-3">
      {/* 
          {
            meetings.length === 0 && <p>No meetings found :(</p>
          }
        */}
      <MeetingCard
        title="upload-thing.mp3"
        processStatus={ProcessStatus.FAILED}
        createdAt={new Date("February 27, 1998")}
        meetingId="belkjalsf"
        uploader={null}
      />
      <MeetingCard
        title="upload-thing.mp3"
        processStatus={ProcessStatus.COMPLETED}
        createdAt={new Date("February 27, 1998")}
        meetingId="belkjalsf"
        uploader={null}
      />
      <MeetingCard
        title="upload-thing.mp3"
        processStatus={ProcessStatus.TRANSCRIBING}
        createdAt={new Date("February 27, 1998")}
        meetingId="belkjalsf"
        uploader={null}
      />
    </div>
  );
}
