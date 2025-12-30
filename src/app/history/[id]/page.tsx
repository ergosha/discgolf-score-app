"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

type Player = {
  id: string;
  name: string;
  scores: number[];
};

type Round = {
  id: string;
  date: string;
  players: Player[];
};

const PAR = 3;

export default function RoundDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [round, setRound] = useState<Round | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("roundHistory");
    if (!stored) return;

    const rounds: Round[] = JSON.parse(stored);
    const found = rounds.find((r) => r.id === id);
    setRound(found ?? null);
  }, [id]);

  if (!round) {
    return (
      <div className="p-4">
        <p className="text-gray-500 mb-4">Round not found.</p>
        <Link href="/history" className="text-blue-600 underline">
          Back to history
        </Link>
      </div>
    );
  }

  const playerTotal = (scores: number[]) =>
    scores.reduce((a, b) => a + b, 0);

  const totals = round.players.map((p) => playerTotal(p.scores));
  const bestScore = Math.min(...totals);

   return (
    <div className="p-4 space-y-6">
      <div>
        <h1 className="text-xl font-bold">Round Details</h1>
        <p className="text-gray-600">{round.date}</p>
      </div>

      {round.players.map((player) => {
        const total = playerTotal(player.scores);
        const isWinner = total === bestScore;

        return (
          <div
            key={player.id}
            className={`border rounded p-3 ${
              isWinner ? "border-green-500" : ""
            }`}
          >
            <p
              className={`font-semibold mb-2 ${
                isWinner ? "text-green-700" : ""
              }`}
            >
              {player.name} — Total:{" "}
              <strong>{total}</strong>
              {isWinner && (
                <span className="ml-2 text-xs bg-green-200 text-green-800 px-2 py-1 rounded">
                  Winner
                </span>
              )}
            </p>

            <div className="grid grid-cols-6 gap-2 text-sm">
              {player.scores.map((score, index) => (
                <div
                  key={index}
                  className={`border rounded p-2 text-center ${
                    score === 0
                      ? "bg-gray-100"
                      : score < PAR
                      ? "bg-green-100 text-green-800"
                      : score > PAR
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-200"
                  }`}
                >
                  <div className="text-xs text-gray-500">
                    {index + 1}
                  </div>
                  <div className="font-bold">
                    {score || "-"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <Link href="/history" className="text-blue-600 underline">
        ← Back to history
      </Link>
    </div>
  );
}
