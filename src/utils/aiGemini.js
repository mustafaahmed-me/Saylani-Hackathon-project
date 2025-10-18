import axios from "axios";

const GEMINI_API_KEY = "AIzaSyC00xsOxgG5_up-vWq3eC7zbOsFQ1WFKew"; // ✅ tumhari key

// ✅ Gemini API se pitch generate karne ka function
export async function generatePitchGemini(idea, tone) {
  try {
    const prompt = `
You are an expert startup pitch writer.
Create a detailed ${tone} style pitch for the following startup idea: "${idea}".
Include these sections clearly labeled:
Startup Name:
Tagline:
Elevator Pitch:
Problem:
Solution:
Target Audience:
Hero Message:
`;

    // ✅ New correct Gemini API endpoint
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const text =
      response?.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "No response received from Gemini.";

    return parsePitchText(text);
  } catch (err) {
    console.error("❌ Gemini API Error:", err.response?.data || err.message);
    return { error: err.message || "Failed to generate pitch" };
  }
}

// ✅ Helper function: parse AI text into structured format
function parsePitchText(text) {
  const lines = text.split("\n").filter((l) => l.trim() !== "");
  const pitch = {};

  for (const line of lines) {
    const lower = line.toLowerCase();

    if (lower.startsWith("startup name")) pitch.name = line.split(":")[1]?.trim();
    else if (lower.startsWith("tagline")) pitch.tagline = line.split(":")[1]?.trim();
    else if (lower.startsWith("elevator")) pitch.elevator = line.split(":")[1]?.trim();
    else if (lower.startsWith("problem")) pitch.problem = line.split(":")[1]?.trim();
    else if (lower.startsWith("solution")) pitch.solution = line.split(":")[1]?.trim();
    else if (lower.startsWith("target")) pitch.audience = line.split(":")[1]?.trim();
    else if (lower.startsWith("hero")) pitch.hero = line.split(":")[1]?.trim();
  }

  return pitch;
}
