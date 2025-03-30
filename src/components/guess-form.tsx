"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGame } from "./game-context";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function GuessForm() {
  const [guess, setGuess] = useState("");
  const [guessResult, setGuessResult] = useState<
    "correct" | "incorrect" | null
  >(null);
  const { character, setCharacterRevealed } = useGame();

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();

    if (!guess.trim()) return;

    // Simple string comparison - in a real app, you might want to use a more
    // sophisticated matching algorithm that handles case, punctuation, etc.
    const isCorrect = guess.toLowerCase() === character?.toLowerCase();

    setGuessResult(isCorrect ? "correct" : "incorrect");

    if (isCorrect) {
      setCharacterRevealed(true);
      // toast({
      //   title: "Correct!",
      //   description: `You guessed it! It was ${character}.`,
      //   variant: "default",
      // });
    } else {
      // toast({
      //   title: "Not quite!",
      //   description: "That's not right. Keep chatting for more clues!",
      //   variant: "destructive",
      // });

      // Clear the incorrect guess after a short delay
      setTimeout(() => {
        setGuessResult(null);
        setGuess("");
      }, 2000);
    }
  };

  return (
    <div className="w-full space-y-4">
      {guessResult && (
        <Alert variant={guessResult === "correct" ? "default" : "destructive"}>
          {guessResult === "correct" ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertTitle>
            {guessResult === "correct" ? "Correct!" : "Incorrect!"}
          </AlertTitle>
          <AlertDescription>
            {guessResult === "correct"
              ? `You guessed it! It was ${character}.`
              : "That's not right. Keep chatting for more clues!"}
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleGuess} className="flex gap-2">
        <Input
          placeholder="Who am I? Make your guess..."
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" variant="secondary">
          Guess
        </Button>
      </form>
    </div>
  );
}
