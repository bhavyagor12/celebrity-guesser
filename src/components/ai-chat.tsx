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
import { Loader2, Send, RefreshCw } from "lucide-react";
import GuessForm from "./guess-form";
import { generateChatResponse } from "@/utils/actions";
import { toast } from "sonner";
type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AIChat() {
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
        { role: "assistant", content: aiResponse },
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
    if (category && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content:
            "Hello there! I'm a mystery character. Chat with me and try to guess who I am. I'll drop some hints along the way!",
        },
      ]);
    }
  }, [category, messages.length]);

  return (
    <div className="w-full space-y-8">
      {category ? (
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>
              {characterRevealed
                ? `Chatting with ${character}`
                : `Mystery ${category?.slice(0, -1) || "Character"}`}
            </CardTitle>
            <Button variant="outline" size="icon" onClick={() => {}}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent>
            <ScrollArea className="h-[200px] pr-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`}
                >
                  <div className="flex items-start gap-3 max-w-[80%]">
                    {message.role === "assistant" && <Avatar>🤖</Avatar>}
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        message.role === "user"
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
                <Button onClick={() => {}}>Play Again</Button>
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
