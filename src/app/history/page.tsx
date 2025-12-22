"use client";

import { useEffect, useState } from "react";

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

export default function HistoryPage() {
  const [rounds, setRounds] = useState<Round[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("roundHistory");
    if (stored) {
      setRounds(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">
        Round History
      </h1>

      {rounds.length === 0 ? (
        <p className="text-gray-500">
          No rounds played yet.
        </p>
      ) : (
        <ul className="space-y-4">
          {rounds.map((round) => (
            <li
              key={round.id}
              className="p-4 bg-white border rounded"
            >
              <p className="font-semibold">
                {round.date}
              </p>

              <ul className="text-sm space-y-1">
                {round.players.map((player) => (
                  <li key={player.id}>
                    {player.name}:{" "}
                    {player.scores.reduce((a, b) => a + b, 0)}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}



