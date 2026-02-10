import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AIModel, ChatMessage } from "./types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateText = async (
  prompt: string,
  modelName: string = AIModel.GEMINI_3_FLASH_PREVIEW,
  systemInstruction?: string
): Promise<string> => {
  try {
    const ai = getAI();
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
      },
    });
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`;
  }
};

export const streamChat = async (
  history: ChatMessage[],
  newMessage: string,
  modelName: string
): Promise<AsyncGenerator<string, void, unknown>> => {
    const ai = getAI();
    const chat = ai.chats.create({
      model: modelName,
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessageStream({ message: newMessage });

    async function* generator() {
      for await (const chunk of result) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
          yield c.text;
        }
      }
    }
    return generator();
};

export const improveArticle = async (
  article: string,
  instruction: string,
  modelName: string
): Promise<string> => {
  const prompt = `You are a professional medical device regulatory editor.
  Current Article:
  ${article}

  User Instruction: ${instruction}

  Please rewrite the article or the specific section to address the instruction. Keep Markdown formatting.`;

  return generateText(prompt, modelName);
};

export const generateKeywords = async (article: string): Promise<Array<{word: string, color: string}>> => {
     const prompt = `Extract 10 key distinct regulatory or technological keywords from the text below.
     Assign a hex color code to each keyword based on its sentiment or category (e.g., Red for Critical/Deadline, Blue for Tech, Green for Sustainability).
     Return purely a JSON array of objects with 'word' and 'color' keys.
     
     Text: ${article.substring(0, 5000)}...`; // Truncate for speed if huge

     try {
         const ai = getAI();
         const response = await ai.models.generateContent({
             model: AIModel.GEMINI_3_FLASH_PREVIEW,
             contents: prompt,
             config: { responseMimeType: 'application/json' }
         });
         const text = response.text || "[]";
         return JSON.parse(text);
     } catch (e) {
         console.error(e);
         return [];
     }
}
