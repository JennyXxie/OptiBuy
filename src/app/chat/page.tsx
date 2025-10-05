"use client";

import { useState } from "react";
import { Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Message {
  sender: "user" | "bot"; // restricts sender type
  text: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "👋 Hi! I'm DealBot — your AI shopping assistant. What product are you looking for today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    // ✅ Explicitly type each message
    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev: Message[]) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      if (data.success && data.data.response) {
        const botMessage: Message = {
          sender: "bot",
          text: data.data.response,
        };
        setMessages((prev: Message[]) => [...prev, botMessage]);
      } else {
        setMessages((prev: Message[]) => [
          ...prev,
          { sender: "bot", text: "❌ Sorry, something went wrong." },
        ]);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev: Message[]) => [
        ...prev,
        { sender: "bot", text: "⚠️ Failed to connect to server." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <Card className="w-full max-w-3xl shadow-xl">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2 text-2xl font-bold">
            <Bot className="text-primary" />
            DealBot Chat
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 flex flex-col space-y-4">
          <div className="flex-1 overflow-y-auto max-h-[60vh] space-y-3 pr-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-2xl px-4 py-2 max-w-[75%] text-sm ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {msg.sender === "user" ? (
                    <div className="flex items-center gap-2">
                      <span>{msg.text}</span>
                      <User className="h-4 w-4 opacity-75" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Bot className="h-4 w-4 opacity-75" />
                      <span>{msg.text}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="text-muted-foreground text-sm italic">
                DealBot is thinking...
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-2 border-t">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <Button onClick={handleSend} disabled={isLoading}>
              <Send className="h-4 w-4 mr-1" />
              Send
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
