import Image from "next/image";

export default function Companies() {
  return (
    <section className="mb-20 flex flex-col items-center justify-center gap-2">
      <p className="text-lg font-semibold">Powered by</p>
      <div className="text-bold flex gap-4">
        <Image src="/imgs/vercel-logo.png" alt="Vercel" width={200} height={200} />
        <Image src="/imgs/nextjs-logo.png" alt="Next.js" width={200} height={200} />
        <Image src="/imgs/gemini-logo.png" alt="Gemini" width={200} height={200} />
        <Image src="/imgs/assemblyai-logo.png" alt="AssemblyAI" width={200} height={200} />
      </div>
    </section>
  );
}
