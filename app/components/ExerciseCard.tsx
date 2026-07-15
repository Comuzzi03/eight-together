"use client";

import { useState, useEffect } from "react";
type ExerciseCardProps = {
  name: string;
  lastWeight: number;
  currentSet: number;
  totalSets: number;
  reps: number;

  onComplete: (weight: number) => void;
  onSaveWeight: (weight: number) => void;
};

export default function ExerciseCard({
  name,
  lastWeight,
  currentSet,
  totalSets,
  reps,
  onComplete,
  onSaveWeight,
}: ExerciseCardProps) {
  const [weight, setWeight] = useState(() => {
  if (typeof window === "undefined") return lastWeight;

  const savedWeight = localStorage.getItem(name);
  
console.log(name, savedWeight);

  return savedWeight ? Number(savedWeight) : lastWeight;
});
useEffect(() => {
  localStorage.setItem(name, String(weight));
}, [weight, name]);
  return (
    <div className="mt-6 bg-zinc-900 rounded-2xl p-5">

      <h2 className="text-2xl font-bold text-green-400">
        {name}
      </h2>

      <p className="mt-2 text-zinc-400">
         Serie {currentSet}/{totalSets} • {reps} ripetizioni
      </p>

      <div className="mt-4">
        <p>Ultima seduta:</p>

        <p className="font-bold">
          {lastWeight} kg
        </p>
      </div>

      <div className="mt-4">
        <p>Peso di oggi:</p>

        <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
          className="mt-2 w-full rounded-lg bg-zinc-800 p-3"
        />
      </div>

      <button
           onClick={() => {
           onSaveWeight(weight);
           onComplete(weight);
        }}
         className="mt-6 w-full bg-green-500 text-black font-bold py-3 rounded-xl"
   >
     Completa Serie
   </button>

    </div>
  );
}
