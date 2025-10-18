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
  
  <div className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-indigo-200">

    {/* Background blobs for VIP feel */}
    <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-tr from-indigo-400 via-purple-400 to-pink-400 rounded-full opacity-30 animate-blob mix-blend-multiply"></div>
    <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tr from-pink-300 via-purple-300 to-indigo-300 rounded-full opacity-30 animate-blob animation-delay-2000 mix-blend-multiply"></div>

    <div className="relative w-full max-w-3xl bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-[0_25px_50px_-10px_rgba(0,0,0,0.3)] border border-indigo-100 transition-all duration-500">
      
      <h2 className="text-4xl font-extrabold text-indigo-800 mb-6">
        Create a New Pitch
      </h2>

      <textarea
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="Describe your idea..."
        className="w-full h-44 p-4 border-2 border-indigo-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700 transition-all duration-300"
      />

      <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
        >
          <option value="professional">Professional</option>
          <option value="casual">Casual</option>
          <option value="investor">Investor-ready</option>
          <option value="funny">Playful</option>
        </select>

        <button
          onClick={handleGenerateAI}
          disabled={loading}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Generating..." : "Generate with AI 🤖"}
        </button>

        <button
          onClick={handleSaveDraft}
          disabled={loading}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-xl shadow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
