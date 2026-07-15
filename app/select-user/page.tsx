"use client";

import { useRouter } from "next/navigation";
export default function SelectUserPage() {
    const router = useRouter();
  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">

      <div className="w-full max-w-md">

        <h1 className="text-4xl font-bold text-center">
          Eight Together ❤️
        </h1>

        <p className="text-center text-zinc-400 mt-3">
          Chi si allena oggi?
        </p>

        <button className="w-full mt-8 bg-green-500 text-black font-bold py-4 rounded-2xl">
          <button
              onClick={() => router.push("/workout?user=christian")}
              className="w-full mt-8 bg-green-500 text-black font-bold py-4 rounded-2xl"
        >
        Christian
</button>
        </button>

        <button className="w-full mt-4 bg-pink-500 text-black font-bold py-4 rounded-2xl">
          <button
            onClick={() => router.push("/workout?user=martina")}
            className="w-full mt-4 bg-pink-500 text-black font-bold py-4 rounded-2xl"
        >
        Martina
</button>
        </button>

      </div>

    </main>
  );
}
