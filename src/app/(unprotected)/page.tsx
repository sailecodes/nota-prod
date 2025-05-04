import { Metadata } from "next";
import Companies from "./_components/companies";
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
    <main className="mx-auto min-h-[200vh] max-w-[1200px] py-4">
      <Navbar />
      <Hero />
      <Companies />
      <Features />
      <Pricing />
      {/*
      <footer></footer>
      */}
    </main>
  );
}
