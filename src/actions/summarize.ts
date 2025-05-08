"use server";

import { generateText } from "ai";
import { gemini } from "@/lib/gemini";
import { geminiResponseSchema } from "@/lib/schemas";

export async function summarize(transcript: string) {
  const { text } = await generateText({
    model: gemini,
    system: `
You are an AI meeting assistant specializing in generating structured summaries and extracting action items from meeting transcripts.
    
Your goal is to:
- Provide a clear, concise summary of key points and decisions
- Extract concrete action items for follow-up

What is an action item?
- It is a **task** or **follow-up action** discussed during the meeting
- It must be **specific**, **actionable**, and **time-bound** if a due date is mentioned
- Each item must include:
  - The task to be done (action)
  - The person responsible for it (assignee) — if not explicitly mentioned, use undefined
  - A due date only if clearly stated or implied (e.g. "by Friday")

Do NOT:
- Invent tasks or due dates not explicitly mentioned
- Include vague or general statements like "We should think about this" unless there's a task attached

Example action items:
- "Prepare Q2 financial report by next Monday" → ✅
- "Schedule team check-in" → ✅
- "We discussed product ideas" → ❌ Not actionable
- "Someone should look into this" → ❌ Unclear assignee or task
`,
    prompt: `
Below is a raw transcript from a team meeting.

Your job is to:
1. Write a professional summary of what was discussed
2. Extract all action items mentioned in the conversation

TRANSCRIPT:
"""
${transcript}
"""

Return the result in the following JSON format:

{
  "summary": "A brief but clear summary of the meeting...",
  "actionItems": [
    {
      "action": "What needs to be done",
      "assignee": "Name" or undefined,
      "dueDate": "YYYY-MM-DD" or undefined
    },
    ...
  ]
}
`,
  });

  const jsonData = JSON.parse(
    text
      .trim()
      .replace(/^```(?:json)?\n?/, "")
      .replace(/```$/, ""),
  );
  const { data: parsedData, error } = geminiResponseSchema.safeParse(jsonData);

  if (error) return { error: "Data couldn't be parsed" };

  return parsedData;
}
