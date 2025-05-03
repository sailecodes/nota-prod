import { Metadata } from "next";
import Companies from "./_components/companies";
import Hero from "./_components/hero";
import Navbar from "./_components/navbar";

export const metadata: Metadata = {
  title: {
    absolute: "Nota",
  },
  description: "See what Nota can do for you — features and pricing.",
};

export default function Home() {
  return (
    <main className="mx-auto min-h-[200vh] max-w-[1200px] space-y-40 py-4">
      <Navbar />
      <Hero />
      <Companies />
      {/* <Features /> */}
      {/* <Pricing /> */}
      {/* <Footer /> */}
    </main>
  );
}
