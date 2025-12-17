import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

/**
 * Generates SEO-friendly FAQ answers or content elaboration based on the context.
 * Since we cannot download the video content client-side to summarize it,
 * we use Gemini to generate "Key Questions" answers dynamically based on the general topic of video downloading.
 */
export const generateFaqAnswers = async (topic: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "AI insights unavailable (Missing API Key).";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Provide a concise, helpful answer (max 50 words) to a user asking about: "${topic}" in the context of downloading YouTube videos legally for offline personal use.`,
    });
    return response.text || "Information currently unavailable.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Could not retrieve AI insights at this time.";
  }
};

/**
 * Generates a creative title or file name suggestion based on a video ID/Context
 * (Simulation of intelligence since we can't scrape title directly)
 */
export const generateCreativeFilename = async (): Promise<string> => {
   if (!process.env.API_KEY) return "My_Awesome_Video.mp4";

   try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: "Generate a generic but catchy filename for a downloaded viral video file. Ends in .mp4. Only return the filename.",
    });
    return response.text.trim().replace(/['"]/g, '') || "Saved_Video.mp4";
   } catch (error) {
       return "video_download.mp4";
   }
}