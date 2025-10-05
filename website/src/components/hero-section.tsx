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
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search for products, deals, or brands..."
                className="pl-12 pr-32 h-14 text-lg"
              />
              <Button size="lg" className="absolute right-2 top-2 h-10">
                Search
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 text-center">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingDown className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Price Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor price history and get alerts when prices drop to your target
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6 text-center">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">AI Recommendations</h3>
                <p className="text-sm text-muted-foreground">
                  Get personalized deal suggestions powered by advanced machine learning
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6 text-center">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Secure & Trusted</h3>
                <p className="text-sm text-muted-foreground">
                  Your data is protected with enterprise-grade security and privacy
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}