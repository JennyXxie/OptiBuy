"use client";

import { useState } from "react";
import { Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { safeParseAIResponse } from "@/lib/parseAIResponse";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Message {
  sender: "user" | "bot";
  text: string;
}

interface Product {
  title: string;
  price?: number | string;
  reason?: string;
  source?: string;
  url?: string;
}

// 🧱 ProductCard subcomponent
function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-xl p-3 bg-white shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">{product.title}</h3>
        {product.price && (
          <span className="text-green-600 font-semibold">
            ${product.price}
          </span>
        )}
      </div>

      {product.reason && (
        <p className="text-gray-600 mt-1 text-sm">{product.reason}</p>
      )}

      {product.source && (
        <p className="text-gray-400 text-xs mt-1">{product.source}</p>
      )}

      {product.url && (
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-sm mt-2 inline-block"
        >
          View Product →
        </a>
      )}
    </div>
  );
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

    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();

      if (data.success && data.data) {
        const parsed = safeParseAIResponse(JSON.stringify(data.data), data.data);

        const summary = parsed.ai_summary || "Here are some options I found:";
        const products: Product[] = parsed.recommendations || [];

        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: summary },
          { sender: "bot", text: JSON.stringify(products) },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "❌ Sorry, something went wrong." },
        ]);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Failed to connect to the server." },
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
            {messages.map((msg, i) => {
              // Detect product list messages
              if (msg.sender === "bot" && msg.text.startsWith("[")) {
                try {
                  const products: Product[] = JSON.parse(msg.text);
                  return (
                    <div key={i} className="flex justify-start">
                      <div className="space-y-3 w-full">
                        {products.map((p, idx) => (
                          <ProductCard key={idx} product={p} />
                        ))}
                      </div>
                    </div>
                  );
                } catch {
                  return null;
                }
              }

              // Normal chat bubbles
              return (
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
              );
            })}

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
