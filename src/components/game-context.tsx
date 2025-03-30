"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type Category =
  | "Football"
  | "Hollywood Movies"
  | "Shows"
  | "Athletes"
  | "Musicians";

type GameContextType = {
  category: Category | null;
  setCategory: (category: Category | null) => void;
  characterRevealed: boolean;
  setCharacterRevealed: (revealed: boolean) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [category, setCategory] = useState<Category | null>(null);
  const [characterRevealed, setCharacterRevealed] = useState(false);

  return (
    <GameContext.Provider
      value={{
        category,
        setCategory,
        characterRevealed,
        setCharacterRevealed,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
