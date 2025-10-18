import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!email || !password) return alert("Email and Password are required!");
    
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/Home");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

return (
  <div className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-indigo-200">

    {/* Animated VIP background blobs */}
    <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-tr from-indigo-400 via-purple-400 to-pink-400 rounded-full opacity-30 animate-blob mix-blend-multiply"></div>
    <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tr from-pink-300 via-purple-300 to-indigo-300 rounded-full opacity-30 animate-blob animation-delay-2000 mix-blend-multiply"></div>

    <div className="relative w-full max-w-md bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-[0_25px_50px_-10px_rgba(0,0,0,0.3)] border border-indigo-100 transition-all duration-500">
      
      <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-8">
        Create an Account ✨
      </h1>

      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-indigo-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700 transition-all duration-300"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            className="w-full px-4 py-3 border border-indigo-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700 transition-all duration-300"
          />
        </div>

        <button
          onClick={handleSignup}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
        >
          Sign Up
        </button>

        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-indigo-700 font-semibold hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  </div>
)
};

export default Signup;
