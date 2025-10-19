import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { db } from "../firebase.config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { generatePitchGemini, testGeminiAPI } from "../utils/aiGemini";

export default function CreatePitch() {
  const [idea, setIdea] = useState("");
  const [tone, setTone] = useState("professional");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerateAI = async () => {
    if (!idea.trim()) return alert("Please enter your idea first!");
    setLoading(true);

    try {
      const testResult = await testGeminiAPI();
      if (!testResult.success) throw new Error("AI API connection failed");

      const result = await generatePitchGemini(idea, tone);
      if (!result?.candidates?.length) throw new Error("AI returned empty result");

      // Firestore save
      const user = getAuth().currentUser;
      if (!user) throw new Error("Login required to save pitch");

      const docRef = await addDoc(collection(db, "pitches"), {
        userId: user.uid,
        idea,
        tone,
        pitchData: result, // Save full response
        createdAt: serverTimestamp(),
      });

      // Navigate to GeneratedPitch page
      navigate("/GeneratedPitch", { state: { pitch: result, pitchId: docRef.id } });

    } catch (err) {
      console.error("AI Error:", err);
      alert("AI Generation failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-indigo-50">
        <div className="w-full max-w-3xl bg-white p-10 rounded-3xl shadow-lg border border-indigo-100">
          <h2 className="text-4xl font-bold text-indigo-800 mb-6">Create a New Pitch</h2>

          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Describe your idea..."
            className="w-full h-44 p-4 border-2 border-indigo-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700 mb-4"
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400"
            >
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="investor">Investor-ready</option>
              <option value="funny">Playful</option>
            </select>

            <button
              onClick={handleGenerateAI}
              disabled={loading}
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Generating..." : "Generate AI Pitch"}
            </button>
          </div>

          {loading && <p className="mt-6 text-indigo-600 animate-pulse">Generating your pitch... ✨</p>}
        </div>
      </div>
    </>
  );
}
