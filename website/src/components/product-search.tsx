"use client"

import { useState } from "react"
import { Search, ExternalLink, TrendingUp, Star } from "lucide-react"
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
      }
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatPrice = (price: number) => `$${price.toFixed(2)}`

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
                <TabsTrigger value="details" disabled={!selectedProduct}>
                  Product Details
                </TabsTrigger>
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
                              <Button variant="outline" size="sm">
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
                {selectedProduct && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>{selectedProduct.name}</span>
                          <Badge variant="secondary">{selectedProduct.category}</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <img
                              src={selectedProduct.imageUrl}
                              alt={selectedProduct.name}
                              className="w-full h-64 object-cover rounded-lg"
                            />
                          </div>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold mb-2">Price Comparison</h4>
                              <div className="space-y-2">
                                {Object.entries(selectedProduct.prices).map(([platform, data]) => (
                                  <div key={platform} className="flex items-center justify-between p-3 border rounded-lg">
                                    <span className="font-medium">{platform}</span>
                                    <div className="text-right">
                                      <div className="font-bold">{formatPrice(data.price)}</div>
                                      <div className="text-sm text-muted-foreground">
                                        {data.inStock ? "In Stock" : "Out of Stock"}
                                      </div>
                                    </div>
                                    <Button variant="outline" size="sm">
                                      <ExternalLink className="h-4 w-4 mr-2" />
                                      Visit
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            {selectedProduct.coupons.length > 0 && (
                              <div>
                                <h4 className="font-semibold mb-2">Available Coupons</h4>
                                <div className="space-y-2">
                                  {selectedProduct.coupons.map((coupon, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                                      <span className="font-mono text-sm">{coupon.code}</span>
                                      <span className="text-green-600 font-medium">{coupon.discount}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Price History</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <PriceChart productId={selectedProduct.id} />
                      </CardContent>
                    </Card>
                  </div>
                )}
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