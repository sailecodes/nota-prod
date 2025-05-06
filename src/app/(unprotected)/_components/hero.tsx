import { ProcessStatus } from "@/app/generated/prisma";
import { Button } from "@/components/ui/button";
import MeetingCardSkeleton from "../../../components/meeting-card-skeleton";

export default function Hero() {
  return (
    // <section className="bg-background mx-6 mb-48 flex h-[35rem] gap-12 overflow-hidden rounded-xl border px-18 py-6 shadow-sm">
    <section className="bg-background mx-6 mb-48 flex flex-col gap-24 overflow-hidden rounded-xl border px-8 pt-24 pb-0 shadow-sm lg:h-[35rem] lg:flex-row lg:gap-12 lg:px-18 lg:py-24">
      <div className="flex h-full flex-1/2 flex-col justify-center space-y-4">
        <h1 className="text-center text-5xl leading-tight font-bold tracking-tight md:text-6xl lg:text-left lg:leading-[4.5rem]">
          Make every meeting count
        </h1>
        <h3 className="text-muted-foreground mx-auto max-w-[700px] text-center text-lg font-medium lg:mx-0 lg:text-left">
          Turn conversations into actionable insights — with summaries, transcripts, and more, all in one place.
        </h3>
        {/* TODO: */}
        <Button variant="outline" size="lg" className="mx-auto w-fit lg:mx-0">
          Test the app
        </Button>
      </div>
      <div className="relative flex-1/2 max-lg:min-h-[26rem] lg:min-h-[26rem]">
        <MeetingCardSkeleton
          title="Monthly Agenda Meeting"
          processStatus={ProcessStatus.TRANSCRIBING}
          uploader="Jane D."
          createdAt={new Date("February 27, 2025")}
          // className="absolute top-[60%] z-3 max-w-[29.938rem] -translate-y-1/2"
          className="absolute top-[60%] z-3 max-w-[29.938rem] -translate-y-1/2 max-lg:left-[40%] max-lg:-translate-x-1/2"
        />
        <MeetingCardSkeleton
          title="Ideas for family roadtrip"
          processStatus={ProcessStatus.SUMMARIZING}
          uploader="Mike W."
          createdAt={new Date("April 2, 2025")}
          // className="absolute top-[50%] left-[10%] z-2 max-w-[29.938rem] -translate-y-1/2"
          className="absolute top-[50%] left-[10%] z-2 max-w-[29.938rem] -translate-y-1/2 max-lg:left-[50%] max-lg:-translate-x-1/2"
        />
        <MeetingCardSkeleton
          title="nota-standup.mp3"
          processStatus={ProcessStatus.SUMMARIZING}
          uploader="Peter P."
          createdAt={new Date("March 13, 2025")}
          // className="absolute top-[40%] left-[20%] z-1 max-w-[29.938rem] -translate-y-1/2"
          className="absolute top-[40%] left-[20%] z-1 max-w-[29.938rem] -translate-y-1/2 max-lg:left-[60%] max-lg:-translate-x-1/2"
        />
      </div>
    </section>
  );
}
