import { Metadata } from "next";
import Features from "./_components/features";
import Hero from "./_components/hero";
import Navbar from "./_components/navbar";
import Pricing from "./_components/pricing";

export const metadata: Metadata = {
  title: {
    absolute: "Nota",
  },
  description: "See what Nota can do for you — features and pricing.",
};

export default function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-[1200px] pb-4 lg:py-4">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <footer className="mx-6 mb-12 flex justify-between">
        <div className="max-w-[350px] space-y-1">
          <p className="text-3xl font-extrabold tracking-tighter">Nota</p>
          <p className="text-muted-foreground text-sm">
            AI Platform with a mission to deliver structured, actionable meeting summaries to everyone.
          </p>
        </div>
      </footer>
      <aside className="text-muted-foreground mx-6 space-y-1 text-center text-xs">
        <p>© 2025 Elias IV Roman. All rights reserved.</p>
        <p>
          Design inspired by{" "}
          <a href="https://cal.com" className="hover:underline">
            Cal.com
          </a>
          .
        </p>
      </aside>
    </main>
  );
}
