import axios from "axios";

const GEMINI_API_KEY = "AIzaSyC00xsOxgG5_up-vWq3eC7zbOsFQ1WFKew"; // ✅ tumhari key

// ✅ Gemini API se pitch generate karne ka function
export async function generatePitchGemini(idea, tone) {
  try {
    console.log("🚀 Starting Gemini API call...");
    
    const prompt = `You are an expert startup pitch writer.
Create a detailed ${tone} style pitch for the following startup idea: "${idea}".
Include these sections clearly labeled:
Startup Name:
Tagline:
Elevator Pitch:
Problem:
Solution:
Target Audience:
Hero Message:`;

    const requestBody = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    };

    console.log("📤 Request body:", requestBody);

    // ✅ Updated Gemini API endpoint (latest working version)
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    console.log("🔗 API URL:", apiUrl);

    const response = await axios.post(apiUrl, requestBody, {
      headers: { 
        "Content-Type": "application/json",
      },
    });

    console.log("✅ API Response:", response.data);

    const text = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "No response received from Gemini.";
    
    console.log("📝 Generated text:", text);

    return parsePitchText(text);
  } catch (err) {
    console.error("❌ Gemini API Error:", err.response?.data || err.message);
    console.error("❌ Full error:", err);
    console.error("❌ Error status:", err.response?.status);
    console.error("❌ Error config:", err.config);
    
    // More specific error messages
    if (err.response?.status === 404) {
      return { error: "API endpoint not found. Please check the API configuration." };
    } else if (err.response?.status === 401) {
      return { error: "Invalid API key. Please check your Gemini API key." };
    } else if (err.response?.status === 403) {
      return { error: "API access forbidden. Please check your API key permissions." };
    } else if (err.response?.status === 400) {
      return { error: "Bad request. Please check the request format." };
    } else {
      return { error: err.message || "Failed to generate pitch" };
    }
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

// ✅ Test function to check if API key is working
export async function testGeminiAPI() {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: "Hello, just testing the API connection."
          }]
        }]
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    );
    
    console.log("✅ API Test Success:", response.data);
    return { success: true, data: response.data };
  } catch (err) {
    console.error("❌ API Test Failed:", err.response?.data || err.message);
    return { success: false, error: err.response?.data || err.message };
  }
}