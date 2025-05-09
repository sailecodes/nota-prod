import PricingCard from "./pricing-card";

export default function Pricing() {
  return (
    <section className="mx-6 mb-48 flex flex-col items-center space-y-10 py-6">
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-center text-3xl font-semibold tracking-tight md:text-5xl">Start free. Scale with your ambitions</h2>
        <h3 className="text-muted-foreground max-w-[700px] text-center text-base md:text-lg">
          Get started with the necessities. Upgrade when your workflow grows.
        </h3>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <PricingCard
          title="Individuals"
          description="No commitments, just smarter workflows"
          pricing="Free"
          btnText="Sign up"
          features={[
            "5 uploads/mo (128MB per)",
            "AI-powered transcription & summaries",
            "Automatic action item extraction",
            "Access to dashboard",
          ]}
        />
        <PricingCard
          title="Teams"
          description="Faster processing and collaboration features"
          pricing="$15"
          btnText="Coming soon"
          features={[
            "Unlimited uploads (250MB per)",
            "Guaranteed usage of best-in-class AI",
            "3 workspaces with admin configurations",
            "Collaboration tools — assign, track, and manage actions",
            "Role-based access control for teams",
          ]}
        />
        <PricingCard
          title="Organizations"
          description="Custom workflows and AI models"
          pricing="Personalized"
          btnText="Coming soon"
          features={[
            "Unlimited workspaces with advanced admin control",
            "Analytics dashboard for team activity, summary accuracy, and usage tracking",
            "Workflow integrations with tools like Slack, Asana, Notion, and Google Calendar",
            "Custom AI model selection & fine-tuning",
          ]}
        />
      </div>
    </section>
  );
}
