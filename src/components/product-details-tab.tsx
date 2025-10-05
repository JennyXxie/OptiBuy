"use client"

import { useState, useEffect } from "react"
import { ExternalLink, Star, TrendingDown, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Product {
  name: string
  price: number
  platform: string
  url: string
  image?: string
  rating?: number
  reviews?: number
  savings?: number
}

interface ProductDetailsTabProps {
  products: Product[]
  query: string
}

export function ProductDetailsTab({ products, query }: ProductDetailsTabProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    if (products.length > 0 && !selectedProduct) {
      setSelectedProduct(products[0])
    }
  }, [products, selectedProduct])

  if (products.length === 0) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-muted-foreground" />
            No Products Found
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Search for products to see detailed information here.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Product List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Products for "{query}"
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {products.slice(0, 5).map((product, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedProduct?.name === product.name
                    ? "bg-primary/10 border-primary"
                    : "bg-muted/50 hover:bg-muted"
                }`}
                onClick={() => setSelectedProduct(product)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">
                      {product.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-bold text-primary">
                        ${product.price}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {product.platform}
                      </Badge>
                    </div>
                  </div>
                  <div className="ml-2">
                    {index === 0 && <Badge className="bg-yellow-500">🥇 Best</Badge>}
                    {index === 1 && <Badge variant="secondary">🥈</Badge>}
                    {index === 2 && <Badge variant="secondary">🥉</Badge>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Product Details */}
      {selectedProduct && (
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="h-5 w-5" />
              Product Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Product Image Placeholder */}
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
              {selectedProduct.image ? (
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-center text-muted-foreground">
                  <div className="w-16 h-16 bg-muted-foreground/20 rounded-lg mx-auto mb-2"></div>
                  <p className="text-sm">No image available</p>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-lg leading-tight">
                  {selectedProduct.name}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-2xl font-bold text-primary">
                    ${selectedProduct.price}
                  </span>
                  <Badge variant="outline">
                    {selectedProduct.platform}
                  </Badge>
                </div>
              </div>

              {/* Rating & Reviews */}
              {selectedProduct.rating && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{selectedProduct.rating}</span>
                  </div>
                  {selectedProduct.reviews && (
                    <span className="text-muted-foreground text-sm">
                      ({selectedProduct.reviews} reviews)
                    </span>
                  )}
                </div>
              )}

              {/* Savings */}
              {selectedProduct.savings && selectedProduct.savings > 0 && (
                <div className="flex items-center gap-2 text-green-600">
                  <TrendingDown className="h-4 w-4" />
                  <span className="font-medium">
                    Save ${selectedProduct.savings.toFixed(2)}
                  </span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button
                  asChild
                  className="w-full"
                  size="lg"
                >
                  <a
                    href={selectedProduct.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View on {selectedProduct.platform}
                  </a>
                </Button>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">
                    Set Price Alert
                  </Button>
                  <Button variant="outline" size="sm">
                    Add to Watchlist
                  </Button>
                </div>
              </div>

              {/* Price Comparison */}
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Price Comparison</h4>
                <div className="space-y-2">
                  {products
                    .filter(p => p.name.toLowerCase().includes(selectedProduct.name.toLowerCase().split(' ')[0]))
                    .slice(0, 3)
                    .map((product, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-muted/50 rounded"
                      >
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {product.platform}
                          </Badge>
                          <span className="text-sm truncate max-w-32">
                            {product.name.split(' ').slice(0, 3).join(' ')}...
                          </span>
                        </div>
                        <span className="font-medium">
                          ${product.price}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
