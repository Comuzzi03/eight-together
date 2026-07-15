"use client";

type TimerProps = {
  timer: number;
};

export default function Timer({ timer }: TimerProps) {
  if (timer <= 0) return null;

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  const formattedTime =
    `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div className="mt-6 bg-zinc-800 rounded-xl p-4 text-center">
      <p className="text-zinc-400">Recupero</p>

      <p className="text-5xl font-bold text-green-400">
        {formattedTime}
      </p>
    </div>
  );
}