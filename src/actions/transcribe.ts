"use server";

import { AssemblyAI } from "assemblyai";
import { createClient } from "@deepgram/sdk";

const deepgram = createClient(process.env.DEEPGRAM_API_KEY!);
const assemblyAI = new AssemblyAI({ apiKey: process.env.ASSEMBLYAI_API_KEY! });

export async function transcribe(fileUrl: string) {
  try {
    const { result, error } = await deepgram.listen.prerecorded.transcribeUrl({ url: fileUrl }, { model: "nova-3", smart_format: true });

    if (error) {
      if (error.message.includes("ASR_PAYMENT_REQUIRED")) {
        return await fallbackTranscribe(fileUrl);
      } else {
        console.error(`[Deepgram] ${error}`);
        throw new Error("Something went wrong. Please try again.");
      }
    }

    return { transcript: result!.results.channels[0].alternatives[0].transcript, model: "Deepgram" };
  } catch (err) {
    throw err;
  }
}

async function fallbackTranscribe(fileUrl: string) {
  const transcript = await assemblyAI.transcripts.transcribe({
    audio: fileUrl,
    speech_model: "nano",
    language_detection: true,
  });

  if (transcript.status === "error") {
    console.error(`[AssemblyAI] ${transcript.error}`);
    throw new Error("Something went wrong. Please try again");
  }

  return { transcript: transcript.text, model: "AssemblyAI" };
}
