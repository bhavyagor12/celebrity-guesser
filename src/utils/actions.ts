"use server";

import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type ChatRequestParams = {
  category: string;
  message: string;
  messageHistory: Message[];
};

const google = createGoogleGenerativeAI({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
});

export async function generateChatResponse({
  category,
  message,
  messageHistory,
}: ChatRequestParams): Promise<string> {
  try {
    // Convert message history to a format the AI can understand
    const historyText = messageHistory
      .map(
        (msg) =>
          `${msg.role === "user" ? "User" : "Character"}: ${msg.content}`,
      )
      .join("\n");

    // Create the prompt for the AI
    const prompt = `
You have to roleplay as a famous character from the category ${category}.
The user is trying to guess who you are. Respond in the first person, as if you were the character.
Drop subtle hints about your identity, but don't explicitly reveal who you are.
Use the speaking style, knowledge, and personality traits of character you choose.

Here's the conversation history:
${historyText}

User's latest message: ${message}
`;
    // Generate the AI response using Google's model
    const { text } = await generateText({
      model: google("gemini-1.5-pro-latest"),
      prompt,
      maxTokens: 500,
      temperature: 0.7,
    });

    return text;
  } catch (error) {
    console.error("Error generating AI response:", error);
    return "I'm having trouble responding right now. Please try again.";
  }
}
