"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
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
  const [, setCountOfPunishments] = useState(0);

  // useEffect(() => {
  //   if (typeof window === "undefined") return;
  //
  //   const handleMouseLeave = () => {
  //     if (category === null) return;
  //     setCountOfPunishments((prev) => {
  //       const newCount = prev + 1;
  //       toast.warning("You will be punished if you leave the game");
  //
  //       if (newCount > 3) {
  //         toast.error(
  //           "You have been punished for leaving the game and hence the game has been reset",
  //         );
  //         setCategory(null);
  //         return 0;
  //       }
  //
  //       return newCount;
  //     });
  //   };
  //
  //   document.documentElement.addEventListener("mouseleave", handleMouseLeave);
  //
  //   return () => {
  //     document.documentElement.removeEventListener(
  //       "mouseleave",
  //       handleMouseLeave,
  //     );
  //   };
  // }, [category]);

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
