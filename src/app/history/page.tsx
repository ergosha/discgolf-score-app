"use client";

import { getRounds } from "@/app/lib/roundStore";

export default function HistoryPage() {
  const rounds = getRounds();

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
        <ul className="space-y-3">
          {rounds.map((round) => (
            <li
              key={round.id}
              className="p-3 bg-white border rounded"
            >
              <p className="font-medium">
                Total score: {round.totalScore}
              </p>
              <p className="text-sm text-gray-500">
                {round.date}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

