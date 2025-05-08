"use server";

import { AssemblyAI } from "assemblyai";
import { createClient } from "@deepgram/sdk";

const deepgram = createClient(process.env.DEEPGRAM_API_KEY!);
const assemblyAI = new AssemblyAI({ apiKey: process.env.ASSEMBLYAI_API_KEY! });

// TODO: Handle potential errors

export async function transcribe(fileUrl: string) {
  const { result, error } = await deepgram.listen.prerecorded.transcribeUrl({ url: fileUrl }, { model: "nova-3", smart_format: true });

  if (error && error.message.includes("ASR_PAYMENT_REQUIRED")) return await fallbackTranscribe(fileUrl);

  return { transcript: result!.results.channels[0].alternatives[0].transcript };
}

async function fallbackTranscribe(fileUrl: string) {
  const transcript = await assemblyAI.transcripts.transcribe({
    audio: fileUrl,
    speech_model: "nano",
    language_detection: true,
  });

  return { transcript: transcript.text };
}
