"use client"

import Image from "next/image"
import { BookOpen, Search, MessageCircle, Bell, BarChart3, Zap, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Image 
            src="/logo.png" 
            alt="OptiBuy Logo" 
            width={40} 
            height={40}
            className="h-10 w-10 object-contain"
          />
          <BookOpen className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">OptiBuy Documentation</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Everything you need to know about using OptiBuy to save money
        </p>
      </div>

      <div className="space-y-8">
        {/* Getting Started */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Getting Started
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              OptiBuy is your AI-powered shopping assistant that helps you find the best deals across multiple platforms. 
              Here&apos;s how to get started:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Search className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-2">1. Search Products</h3>
                <p className="text-sm text-muted-foreground">
                  Use the search bar to find products you&apos;re interested in
                </p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <BarChart3 className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-2">2. Compare Prices</h3>
                <p className="text-sm text-muted-foreground">
                  View prices across Amazon, Temu, and Shein
                </p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <MessageCircle className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-2">3. Get AI Help</h3>
                <p className="text-sm text-muted-foreground">
                  Chat with DealBot for personalized recommendations
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Key Features
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Cross-Platform Price Comparison
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Compare prices across Amazon, Temu, and Shein in real-time. See which platform offers the best deal for any product.
                </p>
                <Badge variant="outline">Amazon</Badge>
                <Badge variant="outline" className="ml-2">Temu</Badge>
                <Badge variant="outline" className="ml-2">Shein</Badge>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Price History & Analytics
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  View 6-month price history with trend analysis and drop predictions. Make informed decisions about when to buy.
                </p>
                <Badge variant="outline">6-month tracking</Badge>
                <Badge variant="outline" className="ml-2">Trend analysis</Badge>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  AI DealBot Assistant
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Get personalized shopping recommendations through our AI assistant. Ask questions, get deal alerts, and find the best products.
                </p>
                <Badge variant="outline">AI-powered</Badge>
                <Badge variant="outline" className="ml-2">24/7 available</Badge>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Smart Price Alerts
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Set target prices and get notified when products drop to your desired amount. Never miss a great deal again.
                </p>
                <Badge variant="outline">Instant notifications</Badge>
                <Badge variant="outline" className="ml-2">Custom targets</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How to Use */}
        <Card>
          <CardHeader>
            <CardTitle>How to Use OptiBuy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">1</div>
                <div>
                  <h3 className="font-semibold">Search for Products</h3>
                  <p className="text-sm text-muted-foreground">
                    Use the search bar on the Compare page to find products. You can search by name, brand, or category.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">2</div>
                <div>
                  <h3 className="font-semibold">Compare Prices</h3>
                  <p className="text-sm text-muted-foreground">
                    View the price comparison tab to see current prices across all platforms. The best deal is highlighted.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">3</div>
                <div>
                  <h3 className="font-semibold">Check Price History</h3>
                  <p className="text-sm text-muted-foreground">
                    Use the price history tab to see trends and determine if you should buy now or wait for a better price.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">4</div>
                <div>
                  <h3 className="font-semibold">Set Price Alerts</h3>
                  <p className="text-sm text-muted-foreground">
                    Create alerts for products you want to buy at a specific price. We&apos;ll notify you when the price drops.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">5</div>
                <div>
                  <h3 className="font-semibold">Chat with DealBot</h3>
                  <p className="text-sm text-muted-foreground">
                    Visit the Chat page to get personalized recommendations and ask questions about products and deals.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">How accurate are the prices?</h3>
              <p className="text-sm text-muted-foreground">
                Our prices are updated in real-time from official sources. However, prices can change frequently, so we recommend verifying the current price before making a purchase.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Can I use OptiBuy on mobile?</h3>
              <p className="text-sm text-muted-foreground">
                Yes! OptiBuy is fully responsive and works great on mobile devices. You can access all features through your mobile browser.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">How does the AI DealBot work?</h3>
              <p className="text-sm text-muted-foreground">
                DealBot uses advanced AI to understand your shopping needs and provide personalized recommendations. It can help you find products, compare deals, and answer questions about shopping.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Are there any fees?</h3>
              <p className="text-sm text-muted-foreground">
                OptiBuy is completely free to use. We don&apos;t charge any fees for price comparisons, alerts, or AI assistance.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
