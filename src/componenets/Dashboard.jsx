import { useEffect, useState } from "react";
import { db } from "../firebase.config";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Navbar from "./Navbar";

export default function Dashboard() {
  const [pitches, setPitches] = useState([]);
  const user = getAuth().currentUser;

  useEffect(() => {
    if (!user) return;

    const fetchPitches = async () => {
      const q = query(
        collection(db, "pitches"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => {
        const d = doc.data();
        return {
          id: doc.id,
          idea: d.idea,
          tone: d.tone,
          pitchContent: d.pitchData?.candidates?.[0]?.content || "No content",
          createdAt: d.createdAt,
        };
      });
      setPitches(data);
    };

    fetchPitches();
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-6 py-12">
        <h2 className="text-3xl font-bold mb-6">Your Pitch History</h2>
        <div className="flex flex-col gap-6">
          {pitches.map((p) => (
            <div key={p.id} className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="font-bold mb-2">{p.idea}</h3>
              <p className="mb-2 whitespace-pre-line">{p.pitchContent}</p>
              <p className="text-gray-500 text-sm">
                {new Date(p.createdAt?.seconds * 1000).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
