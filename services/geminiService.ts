
import { GoogleGenAI, Modality } from "@google/genai";

/**
 * Generates a headshot or edits an image based on the provided image and prompt.
 * Uses Gemini 2.5 Flash Image model.
 */
export const generateEdit = async (
  base64Image: string,
  userPrompt: string,
  mimeType: string = 'image/jpeg'
): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please set process.env.API_KEY.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Stronger system-like instruction prefix for the edit
  const fullPrompt = `Edit this image. ${userPrompt} 
  
  Important guidelines:
  1. Maintain the identity of the main subject (face, body structure) unless explicitly asked to change it.
  2. High photorealism (unless a specific artistic style is requested).
  3. If removing background, ensure edges are clean.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: fullPrompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    const parts = response.candidates?.[0]?.content?.parts;
    
    if (!parts || parts.length === 0) {
      throw new Error("No content generated from the model.");
    }

    const imagePart = parts.find(p => p.inlineData);

    if (imagePart && imagePart.inlineData && imagePart.inlineData.data) {
       return `data:image/png;base64,${imagePart.inlineData.data}`;
    }

    throw new Error("Generated content did not contain valid image data.");

  } catch (error) {
    console.error("Gemini generation error:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to generate image: ${error.message}`);
    }
    throw new Error("An unexpected error occurred during image generation.");
  }
};
