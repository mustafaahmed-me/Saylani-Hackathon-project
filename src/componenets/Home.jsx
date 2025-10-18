// src/components/Home.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-indigo-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">

        {/* Animated background blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-tr from-indigo-400 via-purple-400 to-pink-400 rounded-full opacity-30 animate-blob mix-blend-multiply dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tr from-pink-300 via-purple-300 to-indigo-300 rounded-full opacity-30 animate-blob animation-delay-2000 mix-blend-multiply dark:from-pink-600 dark:via-purple-600 dark:to-indigo-700"></div>

        <div className="relative max-w-4xl w-full text-center bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl p-16 rounded-3xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border border-indigo-100 dark:border-gray-700 transition-colors duration-500">
          
          <h1 className="text-6xl font-extrabold text-indigo-900 dark:text-indigo-400 mb-6 tracking-tight">
            Welcome to <span className="text-indigo-700 dark:text-indigo-300">PitchCraft</span>
          </h1>

          <p className="text-gray-700 dark:text-gray-300 text-xl mb-12 max-w-2xl mx-auto">
            Transform your startup ideas into pitch-perfect presentations. Create, refine, and download your pitches with our sleek platform. The future of your startup starts here.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Link
              to="/CreatePitch"
              className="relative inline-block px-10 py-4 font-semibold text-white rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg hover:scale-105 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 after:absolute after:inset-0 after:rounded-xl after:bg-gradient-to-r after:from-indigo-500 after:to-purple-500 after:opacity-30 after:blur-xl"
            >
              ✨ Create New Pitch
            </Link>

            <Link
              to="/GeneratedPitch"
              className="relative inline-block px-10 py-4 font-semibold text-indigo-700 rounded-xl bg-white border border-indigo-600 shadow-md hover:bg-indigo-50 hover:scale-105 transition-all duration-300 after:absolute after:inset-0 after:rounded-xl after:bg-indigo-100 after:opacity-20 after:blur-xl dark:text-indigo-300 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              📄 View Last Pitch
            </Link>
          </div>

          {/* Dark mode toggle
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="mt-12 px-6 py-3 rounded-full bg-indigo-100 dark:bg-indigo-700 text-indigo-800 dark:text-indigo-100 font-medium hover:scale-105 transition-transform duration-300 shadow-md"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button> */}
        </div>

        <footer className="mt-20 text-gray-400 dark:text-gray-500 text-sm z-10">
          Made with ❤️ using React, Tailwind & Firebase
        </footer>
      </div>
    </>
  );
};

export default Home;
