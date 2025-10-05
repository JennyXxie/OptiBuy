"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Send, Bot, User, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { ProductDetailsTab } from "@/components/product-details-tab"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  products?: Array<{
    name: string
    price: number
    platform: string
    url: string
    image?: string
    rating?: number
    reviews?: number
    savings?: number
  }>
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hi! I'm DealBot, your AI shopping assistant. I can help you find the best deals, compare prices across platforms, and give you personalized shopping recommendations. What are you looking for today?",
    timestamp: new Date()
  }
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentProducts, setCurrentProducts] = useState<Message['products']>([])
  const [currentQuery, setCurrentQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      // Call the API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputValue.trim(),
          sessionId: sessionStorage.getItem('chatSessionId') || undefined,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Extract products from the response if available
        let extractedProducts: Message['products'] = []
        if (data.data.products) {
          extractedProducts = data.data.products
          setCurrentProducts(extractedProducts)
          setCurrentQuery(inputValue.trim())
        }

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.data.response,
          timestamp: new Date(data.data.timestamp),
          products: extractedProducts
        }
        setMessages(prev => [...prev, assistantMessage])

        // Store session ID for future requests
        if (data.data.sessionId) {
          sessionStorage.setItem('chatSessionId', data.data.sessionId)
        }
      } else {
        throw new Error(data.error || 'Failed to get response')
      }
    } catch (error) {
      console.error('Chat API error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm sorry, I'm having trouble processing your request right now. Please try again later.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }


  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Image 
            src="/logo.png" 
            alt="OptiBuy Logo" 
            width={40} 
            height={40}
            className="h-10 w-10 object-contain"
          />
          <Sparkles className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">DealBot Assistant</h1>
        </div>
        <p className="text-muted-foreground">
          Your AI-powered shopping companion for finding the best deals
        </p>
      </div>

      {/* Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[700px]">
        {/* Chat Section */}
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col">
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"} items-start space-x-2`}>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted"
                  }`}>
                    {message.role === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div className={`rounded-lg px-4 py-2 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}>
                    <MarkdownRenderer 
                      content={message.content}
                      className="text-sm"
                    />
                    <div className={`text-xs mt-1 opacity-70 ${
                      message.role === "user" ? "text-right" : "text-left"
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-muted rounded-lg px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about deals, compare prices, or get recommendations..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => setInputValue("Show me the best laptop deals")}>
                💻 Laptop deals
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => setInputValue("Find wireless headphones under $50")}>
                🎧 Headphones
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => setInputValue("What are today's best deals?")}>
                🔥 Today's deals
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => setInputValue("Compare iPhone prices")}>
                📱 iPhone prices
              </Badge>
            </div>
          </div>
        </CardContent>
          </Card>
        </div>

        {/* Product Details Tab */}
        <div className="lg:col-span-1">
          <ProductDetailsTab 
            products={currentProducts || []} 
            query={currentQuery} 
          />
        </div>
      </div>
    </div>
  )
}
