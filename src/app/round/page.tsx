"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ScoreCard from "../components/round/Scorecard";

type Player = {
  id: string;
  name: string;
  scores: number[];
};

export default function StartRoundPage() {
  const router = useRouter();
  const [players, setPlayers] = useState<Player[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("currentRoundPlayers");
    if (stored) {
      try {
        const parsedPlayers = JSON.parse(stored);
        setPlayers(parsedPlayers);
      } catch {
        router.push("/round/setup");
      }
    } else {
      router.push("/round/setup");
    }
    setLoading(false);
  }, [router]);

  if (loading || !players) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-6">Round Scoring</h1>
      <ScoreCard initialPlayers={players} />
    </div>
  );
}

