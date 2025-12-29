"use client";

import Link from "next/link";
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
              <Link href={`/history/${round.id}`} className="block">
                <p className="font-semibold mb-2">
                  {round.date}
                </p>

                <ul className="space-y-1 text-sm">
                  {round.players.map((player) => (
                    <li key={player.id}>
                      {player.name}:{" "}
                      <strong>
                        {player.scores.reduce((a, b) => a + b, 0)}
                      </strong>
                    </li>
                  ))}
                </ul>
              </Link>
            </li>
          ))}
        </ul>
      )
      }
    </div >
  );
}



