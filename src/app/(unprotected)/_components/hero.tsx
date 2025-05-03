import { ProcessStatus } from "@/app/generated/prisma";
import { Button } from "@/components/ui/button";
import MeetingCardSkeleton from "./meeting-card-skeleton";

export default function Hero() {
  return (
    <section className="bg-background flex h-[35rem] gap-12 overflow-hidden rounded-xl border px-18 py-6 shadow-sm">
      <div className="flex h-full flex-1/2 flex-col justify-center space-y-4">
        <h1 className="text-6xl leading-[4.5rem] font-bold tracking-tight">AI-Powered Meeting Notes</h1>
        <p className="text-muted-foreground text-lg font-medium">
          Turn conversations into actionable insights — summaries, transcripts, and more, all in one place.
        </p>
        {/* TODO: */}
        <Button variant="outline" className="w-fit">
          Test the app
        </Button>
      </div>
      <div className="relative flex-1/2">
        <MeetingCardSkeleton
          title="Monthly Agenda Meeting"
          processStatus={ProcessStatus.TRANSCRIBING}
          uploader="Jane D."
          createdAt={new Date("February 27, 2025")}
          className="absolute top-[60%] z-3 -translate-y-1/2"
        />
        <MeetingCardSkeleton
          title="Ideas for family roadtrip"
          processStatus={ProcessStatus.SUMMARIZING}
          uploader="Mike W."
          createdAt={new Date("April 2, 2025")}
          className="absolute top-[50%] left-[10%] z-2 -translate-y-1/2"
        />
        <MeetingCardSkeleton
          title="nota-standup.mp3"
          processStatus={ProcessStatus.SUMMARIZING}
          uploader="Peter P."
          createdAt={new Date("March 13, 2025")}
          className="absolute top-[40%] left-[20%] z-1 -translate-y-1/2"
        />
      </div>
    </section>
  );
}
