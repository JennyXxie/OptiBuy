"use client"

import Image from "next/image"
import { Search, TrendingDown, Zap, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Image 
              src="/logo.png" 
              alt="OptiBuy Logo" 
              width={80} 
              height={80}
              className="h-20 w-20 object-contain"
            />
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
            Your wallet's{" "}
            <span className="text-primary">favorite algorithm</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Compare prices across Amazon, Temu, and Shein with AI-powered insights. 
            Never overpay again with smart analytics and personalized recommendations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for products..."
                className="pl-10 h-12"
              />
            </div>
            <Button size="lg" className="h-12 px-8">
              Compare Prices
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="p-6 text-center">
                <TrendingDown className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Price History</h3>
                <p className="text-sm text-muted-foreground">
                  6-month price tracking with drop predictions
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="p-6 text-center">
                <Zap className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">AI DealBot</h3>
                <p className="text-sm text-muted-foreground">
                  Personalized shopping assistant
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="p-6 text-center">
                <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Smart Alerts</h3>
                <p className="text-sm text-muted-foreground">
                  Notify when prices drop to your target
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
