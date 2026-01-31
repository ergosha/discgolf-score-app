"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Player = {
  id: string;
  name: string;
  scores: number[];
};

const TOTAL_HOLES = 18;
const MIN_PLAYERS = 1;
const MAX_PLAYERS = 4;
const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 50;
const NAME_REGEX = /^[a-zA-Z0-9\s\-]{3,50}$/;

export default function PlayerSetup() {
  const router = useRouter();
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [error, setError] = useState("");

  const validateName = (name: string): string => {
    if (!name.trim()) {
      return "Player name is required";
    }
    if (name.length < MIN_NAME_LENGTH) {
      return `Name must be at least ${MIN_NAME_LENGTH} characters`;
    }
    if (name.length > MAX_NAME_LENGTH) {
      return `Name cannot exceed ${MAX_NAME_LENGTH} characters`;
    }
    if (!NAME_REGEX.test(name)) {
      return "Name can only contain letters, numbers, spaces, and hyphens";
    }
    if (players.some((p) => p.name.toLowerCase() === name.trim().toLowerCase())) {
      return "This player name already exists";
    }
    return "";
  };

  const handleAddPlayer = () => {
    const validationError = validateName(playerName);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (players.length >= MAX_PLAYERS) {
      setError(`Maximum ${MAX_PLAYERS} players allowed`);
      return;
    }

    const newPlayer: Player = {
      id: Date.now().toString(),
      name: playerName.trim(),
      scores: Array(TOTAL_HOLES).fill(0),
    };

    setPlayers([...players, newPlayer]);
    setPlayerName("");
    setError("");
  };

  const handleRemovePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
    setError("");
  };

  const handleStartRound = () => {
    if (players.length < MIN_PLAYERS) {
      setError(`Minimum ${MIN_PLAYERS} player required`);
      return;
    }

    // Store players in localStorage and navigate to scoring
    localStorage.setItem("currentRoundPlayers", JSON.stringify(players));
    router.push("/round");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddPlayer();
    }
  };

  const isAddButtonDisabled =
    !playerName.trim() ||
    validateName(playerName) !== "" ||
    players.length >= MAX_PLAYERS;

  return (
    <div className="flex flex-col items-center gap-6 max-w-md mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Set Up Players</h2>
        <p className="text-sm text-gray-600">
          Add {MIN_PLAYERS}-{MAX_PLAYERS} players before starting the round
        </p>
      </div>

      <div className="w-full">
        <div className="flex gap-2">
          <input
            type="text"
            value={playerName}
            onChange={(e) => {
              setPlayerName(e.target.value);
              setError("");
            }}
            onKeyPress={handleKeyPress}
            placeholder="Enter player name"
            className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={MAX_NAME_LENGTH}
          />
          <button
            onClick={handleAddPlayer}
            disabled={isAddButtonDisabled}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>

        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}

        <div className="text-xs text-gray-500 mt-2">
          {playerName.length}/{MAX_NAME_LENGTH} characters
        </div>
      </div>

      {players.length > 0 && (
        <div className="w-full">
          <h3 className="font-semibold mb-3">Players ({players.length}/{MAX_PLAYERS})</h3>
          <div className="space-y-2">
            {players.map((player, index) => (
              <div
                key={player.id}
                className="flex justify-between items-center p-3 bg-gray-100 rounded"
              >
                <span className="font-medium">{player.name}</span>
                <button
                  onClick={() => handleRemovePlayer(index)}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleStartRound}
        disabled={players.length < MIN_PLAYERS}
        className="w-full px-4 py-3 bg-green-600 text-white rounded font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Start Round
      </button>
    </div>
  );
}
