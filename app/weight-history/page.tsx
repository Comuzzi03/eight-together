"use client";

import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type WeightEntry = {
  date: string;
  christian: number;
  martina: number;
};

export default function WeightHistoryPage() {
  const [history, setHistory] = useState<WeightEntry[]>([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("weightHistory") || "[]"
    );

    setHistory(saved.reverse());
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6">

      <h1 className="text-4xl font-bold text-green-400">
        📈 Storico Peso
      </h1>

      {history.length > 0 && (
        <div className="mt-6 bg-zinc-900 rounded-2xl p-5">

          <h2 className="text-xl font-bold mb-4">
            Andamento Peso
          </h2>

          <div className="h-80">

            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="date" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="christian"
                  name="Christian"
                  stroke="#22c55e"
                  strokeWidth={3}
                />

                <Line
                  type="monotone"
                  dataKey="martina"
                  name="Martina"
                  stroke="#3b82f6"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>

          </div>

        </div>
      )}

      {history.length === 0 ? (
        <div className="mt-6 bg-zinc-900 rounded-2xl p-5">
          Nessun peso registrato.
        </div>
      ) : (
        history
          .slice()
          .reverse()
          .map((item, index) => (
            <div
              key={index}
              className="mt-4 bg-zinc-900 rounded-2xl p-5"
            >
              <h2 className="font-bold text-lg">
                {item.date}
              </h2>

              <p className="mt-3">
                👨 Christian: {item.christian} kg
              </p>

              <p>
                👩 Martina: {item.martina} kg
              </p>

            </div>
          ))
      )}

    </main>
  );
}
