import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY!,
});

export const generateTLDR = async (content: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Write a concise TL;DR summary of around 100 words for the following text: ${content}. Focus on key ideas, main arguments, and essential insights while maintaining coherence.`,
  });

  return response.text;
};
