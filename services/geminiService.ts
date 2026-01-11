
import { GoogleGenAI, Type } from "@google/genai";
import { EthologyAnalysis } from "../types";

export const analyzeAnimalBehavior = async (
  base64Data: string,
  mimeType: string
): Promise<EthologyAnalysis> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Using gemini-3-pro-preview for complex reasoning tasks like ethology
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        {
          inlineData: {
            data: base64Data,
            mimeType: mimeType,
          },
        },
        {
          text: `You are an expert Ethologist (Animal Behavior Scientist). 
Analyze this media of an animal. Focus on ethograms (quantitative descriptions of behavior).

Provide the output in the following JSON structure:
- visualCues: Detailed description of ears, tail position, posture, and fur (piloerection).
- audioCues: Analysis of pitch, volume, and type of sound (growl, purr, whine, etc.) if present.
- emotionalState: Scientific assessment of what the animal is feeling (Fear, Aggression, Playfulness, Pain, Curiositiy, etc).
- translation: A "human translation" - what the animal would say if it could speak English fluently.`
        },
      ],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          visualCues: { type: Type.STRING },
          audioCues: { type: Type.STRING },
          emotionalState: { type: Type.STRING },
          translation: { type: Type.STRING },
        },
        required: ["visualCues", "audioCues", "emotionalState", "translation"],
      },
      thinkingConfig: { thinkingBudget: 4000 }
    },
  });

  const jsonStr = response.text.trim();
  return JSON.parse(jsonStr) as EthologyAnalysis;
};
