import { Metadata } from "next";
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
    <main className="mx-auto min-h-[200vh] max-w-7xl space-y-40 py-4">
      <Navbar />
      <Hero />
      {/* <Features /> */}
      {/* <Pricing /> */}
      {/* <Footer /> */}
    </main>
  );
}
