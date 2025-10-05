"use client"

import { useState } from "react"
import { Search, ExternalLink, TrendingUp, Star, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PriceChart } from "@/components/price-chart"

interface Product {
  id: string
  name: string
  description: string
  imageUrl: string
  category: string
  brand: string
  prices: Record<string, {
    price: number
    platform: string
    url: string
    inStock: boolean
    createdAt: Date
  }>
  bestPrice: {
    platform: string
    price: number
    savings: number
  }
  coupons: Array<{
    code: string
    discount: string
    platform: string
  }>
}

export function ProductSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    
    setIsLoading(true)
    try {
      const response = await fetch(`/api/products/search?query=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()
      
      if (data.success) {
        setProducts(data.data)
        // Auto-select first product for details view
        if (data.data.length > 0) {
          setSelectedProduct(data.data[0])
        }
      }
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleViewDeal = (product: Product) => {
    // Get the best price URL or first available URL
    const bestPriceData = Object.values(product.prices).find(p => p.platform === product.bestPrice.platform)
    const dealUrl = bestPriceData?.url || Object.values(product.prices)[0]?.url
    
    if (dealUrl) {
      // Open the deal URL in a new tab
      window.open(dealUrl, '_blank', 'noopener,noreferrer')
    } else {
      // Fallback: search for the product on Google Shopping
      const searchUrl = `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(product.name)}`
      window.open(searchUrl, '_blank', 'noopener,noreferrer')
    }
  }

  const formatPrice = (price: number) => `$${price.toFixed(2)}`

  // Generate mock price history data for demonstration
  const generatePriceHistory = (product: Product) => {
    const basePrice = product.bestPrice.price
    const days = 30
    const history = []
    
    for (let i = days; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      
      // Simulate price fluctuations
      const variation = (Math.random() - 0.5) * 0.2 // ±10% variation
      const price = basePrice * (1 + variation)
      
      history.push({
        date: date.toISOString().split('T')[0],
        price: Math.max(price, basePrice * 0.7), // Don't go below 70% of base price
        platform: product.bestPrice.platform
      })
    }
    
    return history
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Find the Best Deals</h2>
          
          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search for products, deals, or brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-12 pr-32 h-12"
            />
            <Button 
              onClick={handleSearch} 
              disabled={isLoading}
              className="absolute right-2 top-2"
            >
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </div>

          {/* Results */}
          {products.length > 0 && (
            <Tabs defaultValue="results" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="results">Search Results</TabsTrigger>
                <TabsTrigger value="details">Price Fluctuations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="results" className="mt-6">
                <div className="grid gap-4">
                  {products.map((product) => (
                    <Card 
                      key={product.id} 
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                            <p className="text-muted-foreground mb-3">{product.description}</p>
                            
                            <div className="flex items-center space-x-4 mb-3">
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <span className="text-sm">4.5</span>
                              </div>
                              <Badge variant="secondary">{product.category}</Badge>
                              <Badge variant="outline">{product.brand}</Badge>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-2xl font-bold text-primary">
                                  {formatPrice(product.bestPrice.price)}
                                </span>
                                <span className="text-sm text-muted-foreground ml-2">
                                  on {product.bestPrice.platform}
                                </span>
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation() // Prevent card click
                                  handleViewDeal(product)
                                }}
                              >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                View Deal
                              </Button>
                            </div>
                            
                            {product.bestPrice.savings > 0 && (
                              <div className="flex items-center mt-2 text-green-600">
                                <TrendingUp className="h-4 w-4 mr-1" />
                                <span className="text-sm font-medium">
                                  Save {formatPrice(product.bestPrice.savings)}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="mt-6">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold mb-4">Price Fluctuations for "{searchQuery}"</h3>
                  
                  {products.map((product) => {
                    const priceHistory = generatePriceHistory(product)
                    const currentPrice = product.bestPrice.price
                    const avgPrice = priceHistory.reduce((sum, day) => sum + day.price, 0) / priceHistory.length
                    const priceChange = ((currentPrice - avgPrice) / avgPrice) * 100
                    const isPriceUp = priceChange > 0
                    
                    return (
                      <Card key={product.id} className="mb-6">
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                              <div>
                                <h4 className="font-semibold">{product.name}</h4>
                                <p className="text-sm text-muted-foreground">{product.brand}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-primary">
                                {formatPrice(currentPrice)}
                              </div>
                              <div className={`flex items-center text-sm ${isPriceUp ? 'text-red-600' : 'text-green-600'}`}>
                                {isPriceUp ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                                {Math.abs(priceChange).toFixed(1)}% vs avg
                              </div>
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {/* Price Statistics */}
                            <div className="grid grid-cols-3 gap-4 text-center">
                              <div className="p-3 bg-blue-50 rounded-lg">
                                <div className="text-sm text-muted-foreground">Current Price</div>
                                <div className="text-lg font-bold text-blue-600">
                                  {formatPrice(currentPrice)}
                                </div>
                              </div>
                              <div className="p-3 bg-gray-50 rounded-lg">
                                <div className="text-sm text-muted-foreground">30-Day Average</div>
                                <div className="text-lg font-bold text-gray-600">
                                  {formatPrice(avgPrice)}
                                </div>
                              </div>
                              <div className="p-3 bg-green-50 rounded-lg">
                                <div className="text-sm text-muted-foreground">Lowest (30 days)</div>
                                <div className="text-lg font-bold text-green-600">
                                  {formatPrice(Math.min(...priceHistory.map(d => d.price)))}
                                </div>
                              </div>
                            </div>
                            
                            {/* Price Chart */}
                            <div className="h-64">
                              <PriceChart 
                                productId={product.id} 
                                priceHistory={priceHistory}
                                productName={product.name}
                              />
                            </div>
                            
                            {/* Price Trend Analysis */}
                            <div className="p-4 bg-gray-50 rounded-lg">
                              <h5 className="font-semibold mb-2">Price Trend Analysis</h5>
                              <p className="text-sm text-muted-foreground">
                                {isPriceUp 
                                  ? `The price has increased by ${priceChange.toFixed(1)}% compared to the 30-day average. Consider waiting for a better deal.`
                                  : `Great deal! The price is ${Math.abs(priceChange).toFixed(1)}% below the 30-day average. This might be a good time to buy.`
                                }
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>
            </Tabs>
          )}
          
          {products.length === 0 && !isLoading && searchQuery && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found. Try a different search term.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
