// src/components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { db } from "../firebase.config";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [pitches, setPitches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPitches = async () => {
      const user = getAuth().currentUser;
      if (!user) return;

      try {
        const q = query(
          collection(db, "pitches"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );
        const snap = await getDocs(q);
        const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPitches(data);
      } catch (e) {
        console.error("Error fetching pitches:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchPitches();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading your pitches...
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-indigo-50 p-8 flex flex-col items-center">
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow p-6">
          <h1 className="text-3xl font-bold text-indigo-700 mb-4 text-center">
            📊 Your Saved Pitches
          </h1>

          {pitches.length === 0 ? (
            <p className="text-gray-500 text-center">
              You don’t have any saved pitches yet.{" "}
              <Link
                to="/CreatePitch"
                className="text-indigo-600 hover:underline"
              >
                Create one now!
              </Link>
            </p>
          ) : (
            <table className="min-w-full border border-gray-200 mt-4">
              <thead className="bg-indigo-100">
                <tr>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Tone</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {pitches.map((pitch) => (
                  <tr key={pitch.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{pitch.name || "N/A"}</td>
                    <td className="px-4 py-2 border capitalize">
                      {pitch.status}
                    </td>
                    <td className="px-4 py-2 border">{pitch.tone}</td>
                    <td className="px-4 py-2 border">
                      <Link
                        to="/GeneratedPitch"
                        state={{ pitchId: pitch.id }}
                        className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
