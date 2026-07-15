"use client";

import { useEffect, useState } from "react";

type HistoryItem = {
  date: string;
  user: string;
  workout: string;
  exercises: number;

  completedExercises?: {
    name: string;
    weights: number[];
  }[];
};

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("workoutHistory") || "[]"
    );

    setHistory(saved);
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6">

      <h1 className="text-4xl font-bold text-green-400">
        📊 Storico Allenamenti
      </h1>

      {history.length === 0 ? (
        <div className="mt-6 bg-zinc-900 rounded-2xl p-5">
          Nessun allenamento registrato.
        </div>
      ) : (
        history.map((item, index) => (
          <div
            key={index}
            className="mt-4 bg-zinc-900 rounded-2xl p-5"
          >
            <h2 className="font-bold text-lg">
              {item.workout}
            </h2>

            <p className="text-zinc-400">
              {item.date}
            </p>

            <p className="mt-2">
              👤 {item.user}
            </p>

            <p>
              🏋️ {item.exercises} esercizi
            </p>
            {item.completedExercises?.map(
  (exercise: any, idx: number) => (
    <div
      key={idx}
      className="mt-3 border-t border-zinc-700 pt-3"
    >
      <p className="font-bold text-green-400">
        {exercise.name}
      </p>

      <p className="text-zinc-300">
        {exercise.weights.join(" • ")} kg
      </p>
    </div>
  )
)}
          </div>
        ))
      )}

    </main>
  );
}