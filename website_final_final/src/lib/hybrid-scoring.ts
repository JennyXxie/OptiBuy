import { CSVProduct } from './csv-reader'

export interface ScoredProduct {
  product: CSVProduct
  score: number
  priceScore: number
  ratingScore: number
  reviewScore: number
  dealRatio: number
}

export interface SerpApiProduct {
  name: string
  price: number
  platform: string
  url: string
  image?: string
  rating?: number
  reviews?: number
}

export function calculateHybridScore(
  product: CSVProduct | SerpApiProduct,
  allProducts: (CSVProduct | SerpApiProduct)[]
): ScoredProduct {
  const price = 'price' in product ? product.price : product.price
  const rating = 'rating' in product ? product.rating : (product.rating || 0)
  const reviews = 'reviews_count' in product ? product.reviews_count : (product.reviews || 0)
  
  // Normalize scores to 0-100 range
  const priceScore = calculatePriceScore(price, allProducts)
  const ratingScore = calculateRatingScore(rating)
  const reviewScore = calculateReviewScore(reviews)
  
  // Calculate deal ratio (price per rating/review weight)
  const dealRatio = calculateDealRatio(price, rating, reviews)
  
  // Weighted final score
  const finalScore = (
    priceScore * 0.4 +      // 40% weight on price (lower is better)
    ratingScore * 0.3 +     // 30% weight on rating
    reviewScore * 0.2 +     // 20% weight on review count
    dealRatio * 0.1         // 10% weight on deal ratio
  )

  return {
    product: product as CSVProduct,
    score: Math.round(finalScore * 100) / 100,
    priceScore,
    ratingScore,
    reviewScore,
    dealRatio
  }
}

function calculatePriceScore(price: number, allProducts: (CSVProduct | SerpApiProduct)[]): number {
  if (price <= 0) return 0
  
  const prices = allProducts
    .map(p => 'price' in p ? p.price : p.price)
    .filter(p => p > 0)
    .sort((a, b) => a - b)
  
  if (prices.length === 0) return 50
  
  const minPrice = prices[0]
  const maxPrice = prices[prices.length - 1]
  
  if (maxPrice === minPrice) return 50
  
  // Lower price gets higher score (inverted)
  const normalizedPrice = (price - minPrice) / (maxPrice - minPrice)
  return Math.round((1 - normalizedPrice) * 100)
}

function calculateRatingScore(rating: number): number {
  if (rating <= 0) return 0
  if (rating >= 5) return 100
  
  // Linear scale from 0-5 to 0-100
  return Math.round((rating / 5) * 100)
}

function calculateReviewScore(reviews: number): number {
  if (reviews <= 0) return 0
  
  // Logarithmic scale for review count
  // More reviews = higher score, but with diminishing returns
  const logReviews = Math.log10(reviews + 1)
  const maxLogReviews = Math.log10(10000) // 10k reviews = 100 points
  
  return Math.min(Math.round((logReviews / maxLogReviews) * 100), 100)
}

function calculateDealRatio(price: number, rating: number, reviews: number): number {
  if (price <= 0 || rating <= 0) return 0
  
  // Calculate price per quality point
  // Lower ratio = better deal
  const qualityWeight = rating * Math.log10(reviews + 1)
  const dealRatio = price / qualityWeight
  
  // Normalize to 0-100 (lower ratio = higher score)
  // Assume good deals are under $10 per quality point
  const normalizedRatio = Math.min(dealRatio / 10, 1)
  return Math.round((1 - normalizedRatio) * 100)
}

export function rankProducts(
  localProducts: CSVProduct[],
  serpApiProducts: SerpApiProduct[]
): ScoredProduct[] {
  const allProducts = [...localProducts, ...serpApiProducts]
  
  const scoredLocal = localProducts.map(product => 
    calculateHybridScore(product, allProducts)
  )
  
  const scoredSerpApi = serpApiProducts.map(product => 
    calculateHybridScore(product, allProducts)
  )
  
  // Combine and sort by score
  const allScored = [...scoredLocal, ...scoredSerpApi]
  
  return allScored.sort((a, b) => b.score - a.score)
}

export function formatProductComparison(scoredProducts: ScoredProduct[]): string {
  if (scoredProducts.length === 0) {
    return "No products found matching your criteria."
  }

  let comparison = "🔍 **Product Comparison Results:**\n\n"
  
  scoredProducts.slice(0, 5).forEach((scored, index) => {
    const { product, score, priceScore, ratingScore, reviewScore, dealRatio } = scored
    const price = 'price' in product ? product.price : product.price
    const rating = 'rating' in product ? product.rating : (product.rating || 0)
    const reviews = 'reviews_count' in product ? product.reviews_count : (product.reviews || 0)
    const source = 'source' in product ? product.source : product.platform
    
    comparison += `**${index + 1}. ${product.name}**\n`
    comparison += `💰 Price: $${price.toFixed(2)} | ⭐ Rating: ${rating.toFixed(1)} | 📝 Reviews: ${reviews.toLocaleString()}\n`
    comparison += `🏪 Source: ${source} | 📊 Score: ${score.toFixed(1)}/100\n`
    comparison += `📈 Breakdown: Price(${priceScore}) | Rating(${ratingScore}) | Reviews(${reviewScore}) | Deal(${dealRatio})\n\n`
  })
  
  return comparison
}


