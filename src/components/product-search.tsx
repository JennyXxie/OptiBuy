"use client"

import { useState } from "react"
import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PriceChart } from "@/components/price-chart"

interface Product {
  id: string
  name: string
  image: string
  prices: {
    amazon: number
    temu: number
    shein: number
  }
  bestPrice: {
    platform: string
    price: number
    savings: number
  }
  coupon?: {
    code: string
    discount: number
    type: string
  }
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    prices: {
      amazon: 89.99,
      temu: 45.99,
      shein: 52.99
    },
    bestPrice: {
      platform: "temu",
      price: 45.99,
      savings: 44.00
    },
    coupon: {
      code: "TEMU20",
      discount: 20,
      type: "percentage"
    }
  },
  {
    id: "2",
    name: "Smart Fitness Tracker",
    image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=300&h=300&fit=crop",
    prices: {
      amazon: 129.99,
      temu: 67.99,
      shein: 79.99
    },
    bestPrice: {
      platform: "temu",
      price: 67.99,
      savings: 62.00
    }
  },
  {
    id: "3",
    name: "Portable Phone Charger",
    image: "https://images.unsplash.com/photo-1609592807901-5f8a6a0a8f1a?w=300&h=300&fit=crop",
    prices: {
      amazon: 29.99,
      temu: 18.99,
      shein: 22.99
    },
    bestPrice: {
      platform: "temu",
      price: 18.99,
      savings: 11.00
    }
  }
]

export function ProductSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const formatPrice = (price: number) => `$${price.toFixed(2)}`
  const formatSavings = (savings: number) => `Save $${savings.toFixed(2)}`

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Find the Best Deals</h2>
            <p className="text-muted-foreground mb-8">
              Compare prices across multiple platforms instantly
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button>
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <Tabs defaultValue="results" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="results">Search Results</TabsTrigger>
              <TabsTrigger value="comparison">Price Comparison</TabsTrigger>
              <TabsTrigger value="history">Price History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="results" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockProducts.map((product) => (
                  <Card 
                    key={product.id} 
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <CardHeader className="p-4">
                      <div className="aspect-square bg-muted rounded-lg mb-4 overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-primary">
                            {formatPrice(product.bestPrice.price)}
                          </span>
                          <Badge variant="secondary">
                            {formatSavings(product.bestPrice.savings)}
                          </Badge>
                        </div>
                        
                        <div className="text-sm text-muted-foreground">
                          Best price on {product.bestPrice.platform}
                        </div>
                        
                        {product.coupon && (
                          <Badge variant="outline" className="text-xs">
                            {product.coupon.code}: {product.coupon.discount}% off
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="comparison">
              {selectedProduct ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Price Comparison: {selectedProduct.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {Object.entries(selectedProduct.prices).map(([platform, price]) => (
                        <div key={platform} className="text-center p-4 border rounded-lg">
                          <div className="font-semibold capitalize mb-2">{platform}</div>
                          <div className="text-2xl font-bold mb-2">
                            {formatPrice(price)}
                          </div>
                          {platform === selectedProduct.bestPrice.platform && (
                            <Badge className="bg-green-500">Best Price</Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  Select a product to see price comparison
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="history">
              {selectedProduct ? (
                <PriceChart 
                  data={[]} 
                  productName={selectedProduct.name}
                />
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  Select a product to see price history
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
