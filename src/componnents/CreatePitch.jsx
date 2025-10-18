// src/components/CreatePitch.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { db } from "../firebase.config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { generatePitchGemini } from "../utils/aiGemini";

export default function CreatePitch() {
  const [idea, setIdea] = useState("");
  const [tone, setTone] = useState("professional");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔹 Save Draft to Firestore
  const handleSaveDraft = async () => {
    const user = getAuth().currentUser;
    if (!user) return alert("Login required to save draft.");
    if (!idea.trim()) return alert("Write your idea first.");

    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, "pitches"), {
        userId: user.uid,
        idea,
        tone,
        status: "draft",
        createdAt: serverTimestamp(),
      });
      alert("Draft saved!");
      navigate("/GeneratedPitch", { state: { pitchId: docRef.id, idea, tone } });
    } catch (err) {
      console.error(err);
      alert("Save failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Generate Pitch with Gemini AI
  const handleGenerateAI = async () => {
    if (!idea.trim()) return alert("Please enter your idea first!");
    setLoading(true);
    try {
      const result = await generatePitchGemini(idea, tone);
      if (result.error) throw new Error(result.error);
      navigate("/GeneratedPitch", { state: { apiResult: result, idea, tone } });
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-50 p-6">
        <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-lg border border-indigo-100">
          <h2 className="text-3xl font-bold text-indigo-700 mb-6">
            Create a New Pitch
          </h2>

          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Describe your idea..."
            className="w-full h-40 p-4 border-2 border-indigo-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
          />

          <div className="flex items-center gap-4 mt-6">
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400"
            >
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="investor">Investor-ready</option>
              <option value="funny">Playful</option>
            </select>

            <button
              onClick={handleGenerateAI}
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow transition-all"
            >
              {loading ? "Generating..." : "Generate with AI 🤖"}
            </button>

            <button
              onClick={handleSaveDraft}
              disabled={loading}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-2 rounded-lg shadow"
            >
              {loading ? "Saving..." : "Save Draft 💾"}
            </button>
          </div>

          {loading && (
            <div className="mt-6 text-center text-indigo-600 animate-pulse font-medium">
              Please wait... your pitch is being generated ✨
            </div>
          )}
        </div>
      </div>
    </>
  );
}
