"use client";

import { useEffect, useState } from "react";
import BottomNav from "./components/BottomNav";

export default function Home() {
  const [history, setHistory] = useState<any[]>([]);
  const [christianWeight, setChristianWeight] = useState(75);
  const [martinaWeight, setMartinaWeight] = useState(58);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("workoutHistory") || "[]"
    );

    setHistory(saved);
    const savedChristianWeight =
  localStorage.getItem("christianWeight");

    const savedMartinaWeight =
  localStorage.getItem("martinaWeight");

if (savedChristianWeight) {
  setChristianWeight(Number(savedChristianWeight));
}

if (savedMartinaWeight) {
  setMartinaWeight(Number(savedMartinaWeight));
}
  }, []);

  const lastWorkout =
    history.length > 0 ? history[0].workout : "Nessuno";

  const totalWorkouts = history.length;

  const christianHistory = history.filter(
    (item) => item.user === "Christian"
  );

  const martinaHistory = history.filter(
    (item) => item.user === "Martina"
  );

  const christianLastWorkout =
    christianHistory.length > 0
      ? christianHistory[0].workout
      : "Nessuno";

  const martinaLastWorkout =
    martinaHistory.length > 0
      ? martinaHistory[0].workout
      : "Nessuno";

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">

      <div className="max-w-md w-full bg-zinc-900 rounded-3xl p-8 shadow-xl">

        <h1 className="text-4xl font-bold text-center">
          Eight Together
        </h1>

        <p className="text-center text-zinc-400 mt-3">
          Allenati. Cresci. Migliora. Insieme.
        </p>

        <div className="mt-8 bg-zinc-800 rounded-2xl p-5">

          <h2 className="text-xl font-semibold">
            Bentornato Christian 👋
          </h2>

          <p className="text-zinc-400 mt-2">
            Ultimo allenamento
          </p>

          <div className="mt-4 text-green-400 text-lg font-bold">
            {lastWorkout}
          </div>

          <div className="mt-4 text-sm text-zinc-400">
            {totalWorkouts} allenamenti completati
          </div>

        </div>

        <a
          href="/select-user"
          className="block mt-6 w-full bg-green-500 text-black font-bold py-3 rounded-xl text-center"
        >
          Inizia allenamento
        </a>

        <div className="mt-6 grid grid-cols-2 gap-4">

          <div className="bg-zinc-800 rounded-xl p-4">
            <p className="text-zinc-400 text-sm">
              Peso
            </p>

            <p className="text-2xl font-bold">
              75 kg
            </p>
          </div>

          <div className="bg-zinc-800 rounded-xl p-4">
            <p className="text-zinc-400 text-sm">
              Obiettivo
            </p>

            <p className="text-2xl font-bold text-green-400">
              74-77 kg
            </p>
          </div>

        </div>

        <div className="mt-4 bg-zinc-800 rounded-xl p-4">

  <p className="font-bold text-green-400">
    ⚖️ Peso Corporeo
  </p>

  <div className="mt-4">

    <p className="text-sm text-zinc-300">
      👨 Christian
    </p>

    <input
      type="number"
      value={christianWeight}
      onChange={(e) =>
        setChristianWeight(Number(e.target.value))
      }
      className="mt-2 w-full rounded-lg bg-zinc-900 p-3"
    />

  </div>

  <div className="mt-4">

    <p className="text-sm text-zinc-300">
      👩 Martina
    </p>

    <input
      type="number"
      value={martinaWeight}
      onChange={(e) =>
        setMartinaWeight(Number(e.target.value))
      }
      className="mt-2 w-full rounded-lg bg-zinc-900 p-3"
    />

  </div>

  <button
  onClick={() => {
    localStorage.setItem(
      "christianWeight",
      String(christianWeight)
    );

    localStorage.setItem(
      "martinaWeight",
      String(martinaWeight)
    );

    const weightHistory = JSON.parse(
      localStorage.getItem("weightHistory") || "[]"
    );

    weightHistory.unshift({
      date: new Date().toLocaleDateString(),
      christian: christianWeight,
      martina: martinaWeight,
    });

    localStorage.setItem(
      "weightHistory",
      JSON.stringify(weightHistory)
    );
  }}
  className="mt-4 w-full bg-green-500 text-black font-bold py-3 rounded-xl"
>
  Salva Peso
</button>

        </div>

      </div>

      <BottomNav />

    </main>
  );
}
