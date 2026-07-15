"use client";

import { Suspense, useEffect, useState } from "react";

import ExerciseCard from "../components/ExerciseCard";
import Timer from "../components/Timer";

import { christianWorkouts, martinaWorkouts } from "../data/workouts";
import { useSearchParams } from "next/navigation";

function WorkoutContent() {
  const searchParams = useSearchParams();
  const user = searchParams.get("user");

  const [timer, setTimer] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedDay, setSelectedDay] = useState("A");
  const [workoutCompleted, setWorkoutCompleted] = useState(false);
  const [setWeights, setSetWeights] = useState<number[]>([]);
  const [completedExercises, setCompletedExercises] = useState<
  { name: string; weights: number[] }[]
>([]);

// console.log("Pesi salvati:", setWeights);

let workout;

if (user === "martina") {
  switch (selectedDay) {
    case "B":
      workout = martinaWorkouts.day2;
      break;

    case "C":
      workout = martinaWorkouts.day3;
      break;

    case "D":
      workout = martinaWorkouts.day4;
      break;

    default:
      workout = martinaWorkouts.day1;
  }
} else {
  switch (selectedDay) {
    case "B":
      workout = christianWorkouts.dayB;
      break;

    case "C":
      workout = christianWorkouts.dayC;
      break;

    case "D":
      workout = christianWorkouts.dayD;
      break;

    default:
      workout = christianWorkouts.dayA;
  }
}

useEffect(() => {
  if (timer <= 0) return;

  const interval = setInterval(() => {
    setTimer((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(interval);
}, [timer]);

if (!workout.exercises.length) {
  workout = {
    ...workout,
    exercises: [
      {
        name: "Allenamento in preparazione 🚧",
        sets: 1,
        reps: 0,
        lastWeight: 0,
        restTime: 0,
      },
    ],
  };
}

const exercise = workout.exercises[currentExercise];

const progress =
  ((currentExercise + 1) / workout.exercises.length) * 100;

const totalSets = exercise.sets;
const warmup = (workout as any).warmup;
const finisher = (workout as any).finisher;



const saveSetWeight = (weight: number) => {
  setSetWeights((prev) => {
    const updated = [...prev, weight];
    return updated;
  });
};

const saveWorkoutToHistory = () => {
  const history = JSON.parse(
    localStorage.getItem("workoutHistory") || "[]"
  );

  history.unshift({
    date: new Date().toLocaleDateString("it-IT"),
    user: user === "martina" ? "Martina" : "Christian",
    workout: workout.title,
    exercises: workout.exercises.length,
    completedExercises,
  });

  localStorage.setItem(
    "workoutHistory",
    JSON.stringify(history)
  );
};

if (workoutCompleted) {
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="bg-zinc-900 rounded-3xl p-8">

        <h1 className="text-4xl font-bold text-green-400 text-center">
          Allenamento Completato ✅
        </h1>

        <p className="mt-4 text-center text-zinc-400">
          Ottimo lavoro {user === "martina" ? "Martina" : "Christian"}! 💪
        </p>

        <div className="mt-8 bg-zinc-800 rounded-xl p-4">
          <h2 className="font-bold text-lg">
            Scheda
          </h2>

          <p className="text-zinc-300">
            {workout.title}
          </p>
        </div>

        <div className="mt-4 bg-zinc-800 rounded-xl p-4">
          <h2 className="font-bold text-lg">
            Esercizi completati
          </h2>

          <p className="text-zinc-300">
            {workout.exercises.length}
          </p>
        </div>

        <div className="mt-4 bg-zinc-800 rounded-xl p-4">
          <h2 className="font-bold text-lg">
            Pesi registrati
          </h2>

          {completedExercises.length === 0 ? (
            <p className="text-zinc-400">
              Nessun peso registrato
            </p>
          ) : (
            completedExercises.map((exercise, index) => (
              <div key={index} className="mt-3">
                <p className="font-semibold">
                  {exercise.name}
                </p>

                <p className="text-zinc-400">
                  {exercise.weights.join(" • ")} kg
                </p>
              </div>
            ))
          )}
        </div>

      </div>
    </main>
  );
}

return (
  
    <main className="min-h-screen bg-zinc-950 text-white p-6">

      <div>
        <div className="flex gap-2 mb-4">
  <button
  onClick={() => setSelectedDay("A")}
  className={`px-4 py-2 rounded-lg ${
    selectedDay === "A"
      ? "bg-green-500 text-black"
      : "bg-zinc-800 text-white"
  }`}
>
  A
</button>

  <button
  onClick={() => setSelectedDay("B")}
  className={`px-4 py-2 rounded-lg ${
    selectedDay === "B"
      ? "bg-green-500 text-black"
      : "bg-zinc-800 text-white"
  }`}
>
  B
</button>

  <button
  onClick={() => setSelectedDay("C")}
  className={`px-4 py-2 rounded-lg ${
    selectedDay === "C"
      ? "bg-green-500 text-black"
      : "bg-zinc-800 text-white"
  }`}
>
  C
</button>

  <button
  onClick={() => setSelectedDay("D")}
  className={`px-4 py-2 rounded-lg ${
    selectedDay === "D"
      ? "bg-green-500 text-black"
      : "bg-zinc-800 text-white"
  }`}
>
  D
</button>

</div>
  <h1 className="text-3xl font-bold">
  {workout.title}
</h1>

  <p className="mt-2 text-zinc-400">
    Esercizio {currentExercise + 1}/{workout.exercises.length}
  </p>

  <div className="mt-4 h-3 bg-zinc-800 rounded-full overflow-hidden">
    <div
      className="h-full bg-green-500"
      style={{ width: `${progress}%` }}
    />
  </div>

  <p className="mt-2 text-sm text-green-400">
    {Math.round(progress)}%
  </p>
</div>

      <div>

  <ExerciseCard
    name={exercise.name}
    lastWeight={exercise.lastWeight}
    currentSet={currentSet}
    totalSets={totalSets}
    reps={exercise.reps}
    onSaveWeight={saveSetWeight}
    onComplete={(lastWeight) => {
      if (currentSet < totalSets) {
        setCurrentSet(currentSet + 1);
        setTimer(exercise.restTime);
      } else {
        if (currentExercise < workout.exercises.length - 1) {

  setCompletedExercises((prev) => [
  ...prev,
  {
    name: exercise.name,
    weights: [...setWeights, lastWeight],
  },
  ]);

  setSetWeights([]);

  setCurrentExercise(currentExercise + 1);
  setCurrentSet(1);
  setTimer(exercise.restTime);

} else {
  setCompletedExercises((prev) => [
  ...prev,
  {
    name: exercise.name,
    weights: [...setWeights, lastWeight],
  },
]);

  saveWorkoutToHistory();
setWorkoutCompleted(true);
}
      }
    }}
  />

  {currentSet === totalSets && (
    <div className="mt-4 text-center text-green-400 font-bold">
      Ultima serie 🔥
    </div>
  )}

  <Timer timer={timer} />
      <div className="mt-6 bg-zinc-900 rounded-xl p-4">
         <h3 className="font-bold text-green-400">
           Pesi registrati
            </h3>

              <p className="mt-2 text-zinc-300">
              {setWeights.join(" kg • ")}
              {setWeights.length > 0 ? " kg" : ""}
  </p>
      </div>
      <div className="mt-6 bg-zinc-900 rounded-xl p-4">
  <h3 className="font-bold text-green-400">
    Esercizi completati
  </h3>

  {completedExercises.length === 0 ? (
    <p className="mt-2 text-zinc-400">
      Nessun esercizio completato
    </p>
  ) : (
    completedExercises.map((item, index) => (
      <div key={index} className="mt-4">
        <p className="font-bold">
          ✅ {item.name}
        </p>

        <p className="text-zinc-300">
          {item.weights.join(" kg • ")} kg
        </p>
      </div>
    ))
  )}
</div>

</div>

    </main>
  );
}

export default function WorkoutPage() {
  return (
    <Suspense fallback={<div>Caricamento...</div>}>
      <WorkoutContent />
    </Suspense>
  );
}

