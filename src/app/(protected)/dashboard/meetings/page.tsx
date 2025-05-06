import { ProcessStatus } from "@/app/generated/prisma";
import MeetingCard from "./_components/meeting-card";

export default async function Meetings() {
  // TODO: Get meetings
  /*
  
  const supabase = await createClient();
  const { data: { user: sbUser }, error: sbClientError } = await supabase.auth.getUser();

  if (sbClientError || !sbUser) throw new Error('Something went wrong. Please refresh the page.');
  
  const meetings = await prisma.meeting.findAll({ where: { sbId: sbUser.id } });
  */

  return (
    <section className="mx-auto max-w-7xl space-y-[25px] p-6">
      <div className="grid [grid-template-columns:repeat(auto-fit,minmax(0,375px))] justify-center gap-3">
        {/* 
          {
            meetings.length === 0 && <p>No meetings found :(</p>
          }
        */}
        {Array.from([1]).map((ind) => (
          <>
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
          </>
        ))}
      </div>
    </section>
  );
}
