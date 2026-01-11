
import { GoogleGenAI, Type } from "@google/genai";
import { ErrorExplanation, ExplainRequest } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const explainError = async (req: ExplainRequest): Promise<ErrorExplanation> => {
  const { errorText, context } = req;
  const { language, framework } = context;

  const contextStr = [
    language !== 'Auto-detect' ? `Language: ${language}` : "Language: Unknown (Analyze error)",
    framework !== 'Auto-detect' ? `Framework: ${framework}` : "Framework: Unknown (Analyze error)",
  ].join(", ");

  const prompt = `
    You are a world-class senior software engineer. 
    Analyze the provided error message and identify the programming language and framework/library.
    
    Context: ${contextStr}
    Error: ${errorText}
    
    Your response MUST be a JSON object. 
    In 'detectedLanguage', try to use one of these if applicable: JavaScript, TypeScript, Python, Java, C++, C#, Go, Rust, Ruby, PHP, Swift, Kotlin, Dart, Shell, SQL.
    In 'detectedFramework', try to use one of these if applicable: React, Next.js, Vue, Angular, Svelte, Express, NestJS, Django, Flask, FastAPI, Spring Boot, Laravel, Ruby on Rails, Flutter, React Native, or 'None'.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            meaning: { type: Type.STRING },
            detectedLanguage: { type: Type.STRING },
            detectedFramework: { type: Type.STRING },
            likelyCauses: { type: Type.ARRAY, items: { type: Type.STRING } },
            checkFirst: { type: Type.ARRAY, items: { type: Type.STRING } },
            commonFixes: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["meaning", "detectedLanguage", "detectedFramework", "likelyCauses", "checkFirst", "commonFixes"],
        },
      },
    });

    if (!response.text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
