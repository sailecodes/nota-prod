import FeatureCard from "./feature-card";

export default function Features() {
  return (
    <section className="mx-6 mb-48 flex flex-col items-center space-y-10 py-6">
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-center text-3xl font-semibold tracking-tight md:text-5xl">How we deliver</h2>
        <h3 className="text-muted-foreground max-w-[700px] text-center text-base md:text-lg">
          Transcribe, summarize, and structure your meetings into clear notes.
        </h3>
      </div>
      <div className="grid max-w-[62rem] gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          number="01"
          title="Real-Time AI Engines"
          description="Detect multiple speakers, preserve natural sentence flow, and clean up filler words — all automatically."
        />
        <FeatureCard
          number="02"
          title="Smart Action Items"
          description="Pinpoint actionable takeaways from your conversations, detecting task assignments and deadlines."
        />
        <FeatureCard
          number="03"
          title="Clean Dashboard"
          description="Stay in control with a simple, intuitive dashboard that stores every meeting in one organized space.
"
        />
      </div>
    </section>
  );
}
