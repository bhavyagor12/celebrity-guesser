"use client";

import type React from "react";

import { useState, useRef, useEffect, useCallback } from "react";
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
import { lukso_provider } from "./celebrity-guesser-with-providers";
type Message = {
  role: "user" | "assistant";
  content: string;
  type: string;
};

export default function AIChat() {
  const [accounts, setAccounts] = useState<Array<`0x${string}`>>([]);
  const [contextAccounts, setContextAccounts] = useState<Array<`0x${string}`>>(
    [],
  );
  const [, setProfileConnected] = useState(false);

  // Helper to check connection status
  const updateConnected = useCallback(
    (
      _accounts: Array<`0x${string}`>,
      _contextAccounts: Array<`0x${string}`>,
    ) => {
      setProfileConnected(_accounts.length > 0 && _contextAccounts.length > 0);
    },
    [],
  );

  useEffect(() => {
    async function init() {
      try {
        const _accounts = lukso_provider.accounts as Array<`0x${string}`>;
        setAccounts(_accounts);

        const _contextAccounts = lukso_provider.contextAccounts;
        updateConnected(_accounts, _contextAccounts);
      } catch (error) {
        console.error("Failed to initialize provider:", error);
      }
    }

    // Handle account changes
    const accountsChanged = (_accounts: Array<`0x${string}`>) => {
      setAccounts(_accounts);
      updateConnected(_accounts, contextAccounts);
    };

    const contextAccountsChanged = (_accounts: Array<`0x${string}`>) => {
      setContextAccounts(_accounts);
      updateConnected(accounts, _accounts);
    };

    init();

    // Set up event listeners
    lukso_provider.on("accountsChanged", accountsChanged);
    lukso_provider.on("contextAccountsChanged", contextAccountsChanged);

    // Cleanup listeners
    return () => {
      lukso_provider.removeListener("accountsChanged", accountsChanged);
      lukso_provider.removeListener(
        "contextAccountsChanged",
        contextAccountsChanged,
      );
    };
  }, [accounts[0], contextAccounts[0], updateConnected]);

  const [messages, setMessages] = useState<Message[]>([]);
  const { category, characterRevealed, character } = useGame();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      type: "info",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const aiResponse = await generateChatResponse({
        category: category || "",
        message: input,
        messageHistory: messages,
      });

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
        // {
        //   role: "assistant",
        //   content:
        //     "Hey to begin playing you need to submit 0.001 eth and remember to not leave the screen as doing it thrice will end the game.",
        //   type: "starter",
        // },
        {
          role: "assistant",
          content:
            "Welcome to the game! I'm a mystery character. Ask me questions to guess who I am.",
          type: "info",
        },
      ]);
    }
  }, [category, messages.length]);

  const handleSubmitEth = () => {
    console.log("Submitting ETH to start the game");
    // Add your ETH submission logic here

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content:
          "Payment received! Let's start the game. Ask me questions to guess who I am.",
        type: "info",
      },
    ]);
  };

  const messageRenderer = (message: Message) => {
    switch (message.type) {
      case "starter":
        return (
          <div className="flex items-start gap-3 max-w-full">
            <Avatar>🤖</Avatar>
            <div className="rounded-lg px-4 py-3 border border-black-300">
              <p className="mb-3">{message.content}</p>
              <Button
                onClick={handleSubmitEth}
                disabled={messages.length > 1}
                className="bg-green-600 hover:bg-green-700"
              >
                Submit 0.001 ETH to Play
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
            {/* Button variant="outline" size="icon" onClick={() => { }}>
              <RefreshCw className="h-4 w-4" />
            </Button> */}
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
                <Button onClick={() => { }}>Play Again</Button>
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
