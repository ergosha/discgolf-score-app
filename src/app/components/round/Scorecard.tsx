"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TOTAL_HOLES = 18;
const PARS = Array(TOTAL_HOLES).fill(3);

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

interface ScoreCardProps {
  initialPlayers: Player[];
}

export default function ScoreCard({ initialPlayers }: ScoreCardProps) {
  const router = useRouter();
  const [currentHole, setCurrentHole] = useState(1);
  const [view, setView] = useState<"hole" | "overview">("hole");
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [activePlayerIndex, setActivePlayerIndex] = useState(0);

  const currentIndex = currentHole - 1;
  const activePlayer = players[activePlayerIndex];
  const scores = activePlayer.scores;

  const holePar = PARS[currentIndex];
  const holeScore = scores[currentIndex];
  const relativeToPar = holeScore - holePar;
  const totalScore = scores.reduce((a, b) => a + b, 0);

  const increment = () => {
    setPlayers((prev) => {
      const copy = [...prev];
      const player = { ...copy[activePlayerIndex] };
      const scoresCopy = [...player.scores];

      scoresCopy[currentIndex] += 1;
      player.scores = scoresCopy;
      copy[activePlayerIndex] = player;

      return copy;
    });
  };

  const decrement = () => {
    setPlayers((prev) => {
      const copy = [...prev];
      const player = { ...copy[activePlayerIndex] };
      const scoresCopy = [...player.scores];

      if (scoresCopy[currentIndex] > 0) {
        scoresCopy[currentIndex] -= 1;
      }

      player.scores = scoresCopy;
      copy[activePlayerIndex] = player;

      return copy;
    });
  };

  return (
    <div className="flex flex-col items-center gap-6">

      {/* Player selector */}
      <div className="flex gap-2 overflow-x-auto">
        {players.map((player, index) => (
          <button
            key={player.id}
            onClick={() => setActivePlayerIndex(index)}
            className={`px-3 py-1 rounded border ${
              index === activePlayerIndex
                ? "bg-gray-800 text-white"
                : "bg-white"
            }`}
          >
            {player.name}
          </button>
        ))}
      </div>

      {/* View toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setView("hole")}
          className={`px-4 py-2 rounded ${
            view === "hole" ? "bg-gray-800 text-white" : "bg-gray-200"
          }`}
        >
          Hole
        </button>
        <button
          onClick={() => setView("overview")}
          className={`px-4 py-2 rounded ${
            view === "overview" ? "bg-gray-800 text-white" : "bg-gray-200"
          }`}
        >
          Overview
        </button>
      </div>

      {/* Single hole view */}
      {view === "hole" && (
        <>
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Hole {currentHole} / {TOTAL_HOLES}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Par {holePar}
            </p>

            <p className="text-4xl font-bold mt-2">
              {holeScore}
            </p>

            {holeScore > 0 && (
              <p
                className={`text-sm mt-1 ${
                  relativeToPar > 0
                    ? "text-red-600"
                    : relativeToPar < 0
                    ? "text-green-600"
                    : "text-gray-600"
                }`}
              >
                {relativeToPar === 0
                  ? "Even par"
                  : relativeToPar > 0
                  ? `+${relativeToPar}`
                  : relativeToPar}
              </p>
            )}
          </div>

          <div className="flex gap-6">
            <button
              onClick={decrement}
              className="w-16 h-16 rounded-full bg-gray-200 text-2xl"
            >
              −
            </button>
            <button
              onClick={increment}
              className="w-16 h-16 rounded-full bg-gray-800 text-white text-2xl"
            >
              +
            </button>
          </div>

          <div className="flex gap-4">
            <button
              disabled={currentHole === 1}
              onClick={() => setCurrentHole((h) => h - 1)}
              className="px-4 py-2 bg-white border rounded disabled:opacity-40"
            >
              Previous
            </button>
            <button
              disabled={currentHole === TOTAL_HOLES}
              onClick={() => setCurrentHole((h) => h + 1)}
              className="px-4 py-2 bg-white border rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Overview */}
      {view === "overview" && (
        <div className="grid grid-cols-6 gap-3">
          {scores.map((score, index) => {
            const relative = score - PARS[index];

            return (
              <button
                key={index}
                onClick={() => {
                  setCurrentHole(index + 1);
                  setView("hole");
                }}
                className={`p-3 rounded border text-center ${
                  score === 0
                    ? "bg-gray-100"
                    : relative > 0
                    ? "bg-red-100"
                    : relative < 0
                    ? "bg-green-100"
                    : "bg-gray-200"
                }`}
              >
                <div className="text-xs text-gray-500">
                  {index + 1}
                </div>
                <div className="font-bold">
                  {score || "-"}
                </div>
              </button>
            );
          })}
        </div>
      )}

      <p className="text-sm text-gray-600">
        Total score ({activePlayer.name}):{" "}
        <strong>{totalScore}</strong>
      </p>

      <button
  onClick={() => {
    const stored = localStorage.getItem("roundHistory");
    const existing: Round[] = stored ? JSON.parse(stored) : [];

    const newRound: Round = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      players,
    };

    localStorage.setItem(
      "roundHistory",
      JSON.stringify([newRound, ...existing])
    );

    // Reset and clear current round players
    localStorage.removeItem("currentRoundPlayers");
    
    // Navigate back to setup for next round
    router.push("/round/setup");
  }}
  className="px-4 py-2 bg-green-600 text-white rounded"
>
  Finish Round
</button>
    </div>
  );
}



