"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGame } from "./game-context";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import { Loader2, Send } from "lucide-react";
import { generateChatResponse } from "@/utils/actions";
import { toast } from "sonner";
import { lukso_contract_dets } from "@/contracts/lukso";
import { parseEther } from "viem";
import { useUpProvider } from "./up-provider";
import { resolveGame } from "@/utils/owner";
type Message = {
  role: "user" | "assistant";
  content: string;
  type: string;
};

export default function AIChat() {
  const { client, accounts, walletConnected } = useUpProvider();
  const [messages, setMessages] = useState<Message[]>([]);
  const {
    category,
    setCategory,
    characterRevealed,
    character,
    setCharacter,
    startedGame,
    setStartedGame,
    setCharacterRevealed,
  } = useGame();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [guessCount, setGuessCount] = useState(0); // Track number of user guesses

  const startGame = async () => {
    if (!client || !walletConnected) {
      toast.warning("Please connect your wallet to start the game.");
      return; // Stop execution if no client or wallet
    }

    console.log("Starting game...", client, accounts);

    try {
      console.log({
        args: {
          address: lukso_contract_dets.contractAddress as `0x${string}`,
          abi: lukso_contract_dets.abi,
          functionName: "startGame",
          args: [1],
          account: accounts[0] as `0x${string}`,
          chain: client?.chain,
        },
      });
      const tx = await client.writeContract({
        abi: lukso_contract_dets.abi,
        address: lukso_contract_dets.contractAddress as `0x${string}`,
        account: accounts[0] as `0x${string}`,
        chain: client?.chain,
        functionName: "startGame",
        args: [],
        value: parseEther("0.001"),
      });
      console.log("Transaction sent:", tx);
      if (tx) {
        setStartedGame(true);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Lets get started! You can start guessing now. Ask for your first hint carefully. Remember, you have 5 hints to guess the character.",
            type: "info",
          },
        ]);
      }
      toast.success("Game started successfully!");
    } catch (error) {
      console.error("Transaction failed:", error);
      toast.error("Transaction failed! Check console for details.");
      throw error;
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;
    if (!startedGame) {
      toast.error("Please start the game first by pressing the play button.");
      return;
    }

    if (startedGame) {
      if (guessCount >= 5) {
        toast.error("You have used all your guesses!, start a new game.");
        return;
      }
    }

    const userMessage: Message = {
      role: "user",
      content: input,
      type: "info",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const {
        response: aiResponse,
        isCorrect,
        characterName,
      } = await generateChatResponse({
        category: category || "",
        message: input,
        messageHistory: messages,
      });

      if (isCorrect) {
        setCharacter(characterName as string);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: aiResponse,
            type: "info",
          },
        ]);
        const data = await resolveGame(
          accounts[0] as `0x${string}`,
          true,
          category as string,
          characterName as string,
        );
        console.log("Game resolved successfully:", data);
        setCharacterRevealed(true);
        setStartedGame(false);
      }
      setGuessCount((prev) => prev + 1);

      if (guessCount + 1 >= 5) {
        setStartedGame(false);
        setCharacterRevealed(false);
        toast.error("Game over! You couldn't guess the character.");

        await resolveGame(
          accounts[0] as `0x${string}`,
          false,
          category as string,
          "",
        );
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Game over! You couldn't guess the character.",
            type: "info",
          },
        ]);
        setCategory(null);
        return;
      }
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: aiResponse, type: "info" },
      ]);
    } catch (error) {
      console.error("Error generating AI response:", error);
      toast.error("I'm having trouble responding right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!category) {
      setMessages([]);
    }
    if (category && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content:
            "Hey to begin playing you need to submit 2 dollars worth LYX and remember to not leave the screen as doing it thrice will end the game.",
          type: "starter",
        },
      ]);
    }
  }, [category, messages.length]);

  const messageRenderer = (message: Message) => {
    switch (message.type) {
      case "starter":
        return (
          <div className="flex items-start gap-3 max-w-full">
            <Avatar>🤖</Avatar>
            <div className="rounded-lg px-4 py-3 border border-black-300">
              <p className="mb-3">{message.content}</p>
              <Button
                onClick={() => startGame()}
                disabled={messages.length > 1}
                className="bg-green-600 hover:bg-green-700"
              >
                Play
              </Button>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-start gap-3 max-w-[80%]">
            {message.role === "assistant" && <Avatar>🤖</Avatar>}
            <div
              className={`rounded-lg px-4 py-2 ${message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
                }`}
            >
              {message.content}
            </div>
            {message.role === "user" && (
              <Avatar>
                <div className="bg-muted w-full h-full flex items-center justify-center">
                  U
                </div>
              </Avatar>
            )}
          </div>
        );
    }
  };
  return (
    <div className="w-full space-y-8">
      {category ? (
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Guess Who I Am: {category}</CardTitle>
          </CardHeader>

          <CardContent>
            <ScrollArea className="h-[200px] pr-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`}
                >
                  {messageRenderer(message)}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </ScrollArea>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            {!characterRevealed ? (
              <>
                <form
                  onSubmit={handleSendMessage}
                  className="flex w-full gap-2"
                >
                  <Input
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center w-full">
                <p className="mb-2">Character revealed! It was {character}.</p>
                You will receive your reward as soon as the transaction is
                confirmed with a special NFT. Thank you for playing!
              </div>
            )}
          </CardFooter>
        </Card>
      ) : (
        <Card className="w-full">
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">
                Select a category to begin
              </h3>
              <p className="text-muted-foreground">
                Choose a category from the chips above to start guessing a
                character
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
