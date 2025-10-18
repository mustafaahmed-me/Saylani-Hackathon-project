// src/components/Navbar.jsx
import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="bg-white shadow px-6 py-3 flex justify-between items-center">
      {/* Logo / Title */}
      <div
        className="font-extrabold text-indigo-600 text-xl cursor-pointer select-none"
        onClick={() => navigate("/Home")}
      >
        PitchCraft
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center gap-3">
        {/* Dashboard Button */}
        <button
          onClick={() => navigate("/Dashboard")}
          className="px-3 py-1 rounded bg-indigo-50 hover:bg-indigo-100 transition-all"
        >
          Dashboard
        </button>

        {/* Create Button */}
        <button
          onClick={() => navigate("/CreatePitch")}
          className="px-3 py-1 rounded bg-indigo-50 hover:bg-indigo-100 transition-all"
        >
          Create
        </button>

        {/* Auth Buttons */}
        {user ? (
          <>
            <span className="text-sm text-gray-700">{user.email}</span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 transition-all"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/")}
            className="px-3 py-1 rounded bg-indigo-50 hover:bg-indigo-100 transition-all"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}
