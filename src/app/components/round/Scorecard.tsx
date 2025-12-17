"use client";

import { useState } from "react";

const TOTAL_HOLES = 18;

export default function ScoreCard() {
  const [currentHole, setCurrentHole] = useState(1);
  const [scores, setScores] = useState<number[]>(
    Array(TOTAL_HOLES).fill(3)
  );

  const currentIndex = currentHole - 1;
  const totalScore = scores.reduce((a, b) => a + b, 0);

  const increment = () => {
    setScores((prev) => {
      const copy = [...prev];
      copy[currentIndex] += 1;
      return copy;
    });
  };

  const decrement = () => {
    setScores((prev) => {
      const copy = [...prev];
      if (copy[currentIndex] > 1) {
        copy[currentIndex] -= 1;
      }
      return copy;
    });
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center">
        <p className="text-sm text-gray-500">
          Hole {currentHole} / {TOTAL_HOLES}
        </p>
        <p className="text-4xl font-bold">
          {scores[currentIndex]}
        </p>
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

      <p className="text-sm text-gray-600">
        Total score: <strong>{totalScore}</strong>
      </p>
    </div>
  );
}
