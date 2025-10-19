import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function GeneratedPitch() {
  const location = useLocation();
  const navigate = useNavigate();
  const pitch = location.state?.pitch;

  if (!pitch) {
    return (
      <div>
        <Navbar />
        <p className="text-center mt-10">No pitch data found.</p>
      </div>
    );
  }

  const content = pitch?.candidates?.[0]?.content || "No content available";

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-4xl bg-white p-10 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Your Generated Pitch</h2>
          <div className="mb-4 whitespace-pre-line">{content}</div>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </>
  );
}
