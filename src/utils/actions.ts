"use server";

import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { Message } from "../components/game-context";
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
}: ChatRequestParams): Promise<{
  response: string;
  isCorrect: boolean;
  characterName?: string;
}> {
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
<instructions>
You will roleplay as a famous person from the category <category>${category}</category>.
Choose a character that has history / records from the 1990s to 2020s. 
The user is trying to guess your identity through conversation. 
Your goal is to make this challenging but fair.

Follow these guidelines:
- Respond in first person, as if you are the celebrity
- Drop subtle hints about your identity, but avoid obvious clues
- Never explicitly reveal who you are until the user correctly guesses
- Stay true to the speaking style, knowledge, personality, and time period of your chosen character
- If the user guesses incorrectly, neither confirm nor deny - continue roleplaying
- Only confirm when the user correctly identifies you by full name
- Make it easier as the conversation progresses, but keep it engaging
- For the first hint, provide a timeline clue about your career
Choose someone recognizable but not too obvious from the specified category.
</instructions>

<conversation_history>
${historyText}
</conversation_history>

<user_message>
${message}
</user_message>

Respond as your character, maintaining the mystery while providing thoughtful, nuanced clues about your identity.
If the user guesses correctly by identifying you by full name, respond in this format:

<response>
[Your normal response confirming their correct guess]
</response>

<correct>true</correct>

<character_name>
[Full name of the character]
</character_name>

If the guess is incorrect, do **not** include the <correct> tag or <character_name>. Just continue roleplaying.
`;
    // Generate the AI response using Google's model
    const { text } = await generateText({
      model: google("gemini-1.5-pro-latest"),
      prompt,
      maxTokens: 500,
      temperature: 0.7,
    });

    // Extract the response text and check for the <correct> tag
    const isCorrect = /<correct>\s*true\s*<\/correct>/i.test(text);
    const responseMatch = text.match(/<response>([\s\S]*?)<\/response>/i);
    const response = responseMatch ? responseMatch[1].trim() : text;

    let characterName: string | undefined;
    if (isCorrect) {
      const nameMatch = text.match(
        /<character_name>([\s\S]*?)<\/character_name>/i,
      );
      characterName = nameMatch ? nameMatch[1].trim() : undefined;
    }

    return { response, isCorrect, characterName };
  } catch (error) {
    console.error("Error generating AI response:", error);
    return {
      response: "I'm having trouble responding right now. Please try again.",
      isCorrect: false,
    };
  }
}
