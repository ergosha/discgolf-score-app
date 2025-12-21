export type Round = {
  id: string;
  date: string;
  totalScore: number;
};

const STORAGE_KEY = "roundHistory";

export function addRound(round: Round) {
  const existing = getRounds();
  const updated = [round, ...existing];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function getRounds(): Round[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}
