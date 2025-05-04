import FeatureCard from "./feature-card";

export default function Features() {
  return (
    <section className="mb-48 flex flex-col items-center space-y-10 p-6">
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-center text-3xl font-semibold tracking-tight md:text-5xl">How we deliver</h2>
        <h3 className="text-muted-foreground max-w-[700px] text-center text-base md:text-lg">
          Powerful AI tools that transcribe, summarize, and structure your meetings into clear notes.
        </h3>
      </div>
      <div className="grid gap-4 sm:grid-cols-[20rem_20rem] lg:grid-cols-[20rem_20rem_20rem]">
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
