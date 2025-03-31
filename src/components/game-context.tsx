"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { toast } from "sonner";
export type Category =
  | "Football"
  | "Hollywood Movies"
  | "Shows"
  | "Athletes"
  | "Musicians"
  | "Tech"
  | "Cricket";

type GameContextType = {
  category: Category | null;
  character: string | null;
  setCharacter: (character: string | null) => void;
  setCategory: (category: Category | null) => void;
  characterRevealed: boolean;
  setCharacterRevealed: (revealed: boolean) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [category, setCategory] = useState<Category | null>(null);
  const [character, setCharacter] = useState<string | null>(null);
  const [characterRevealed, setCharacterRevealed] = useState(false);
  const [countOfPunishments, setCountOfPunishments] = useState(0);
  
  if (typeof window !== "undefined") {
    document?.documentElement.addEventListener("mouseleave", () => {
      toast.error("You will be punished if you leave the game");
      setCountOfPunishments((prev) => prev + 1);
      if (countOfPunishments > 3) {
        toast.error(
          "You have been punished for leaving the game and hence the game has been reset",
        );
        setCategory(null);
        setCountOfPunishments(0);
      }
    });
  }

  return (
    <GameContext.Provider
      value={{
        category,
        setCategory,
        character,
        setCharacter,
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
