import { GoogleGenAI } from "@google/genai";

export const generateSchoolContent = async (apiKey: string, prompt: string): Promise<string> => {
  if (!apiKey) throw new Error("API Key is missing");

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "No content generated.";
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
};

export const generateSchoolImage = async (apiKey: string, prompt: string): Promise<string | null> => {
   if (!apiKey) throw new Error("API Key is missing");

   const ai = new GoogleGenAI({ apiKey });
   
   // Using Imagen 3 via the updated SDK pattern
   try {
    const response = await ai.models.generateImages({
        model: 'imagen-3.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          aspectRatio: '1:1',
          outputMimeType: 'image/jpeg',
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
        const base64EncodeString = response.generatedImages[0].image.imageBytes;
        return `data:image/jpeg;base64,${base64EncodeString}`;
    }
    return null;

   } catch (error) {
       console.error("Image Gen Error:", error);
       // Fallback or re-throw
       return null;
   }
};