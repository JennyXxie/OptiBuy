import { WebScraper } from './scrapers'
import { fetchSerpApiProducts, SerpApiProduct } from './serpapi'
import { prisma } from './prisma'

export interface UnifiedProduct {
  id?: string
  name: string
  price: number
  image: string
  url: string
  platform: string
  rating?: number
  reviews?: number
  currency: string
  inStock: boolean
  source: 'scraper' | 'serpapi' | 'database'
}

export class ProductService {
  static async searchProducts(query: string, useCache: boolean = true): Promise<UnifiedProduct[]> {
    try {
      // Check cache first if enabled
      if (useCache) {
        const cachedProducts = await this.getCachedProducts(query)
        if (cachedProducts.length > 0) {
          console.log(`Cache hit for query: ${query}`)
          return cachedProducts
        }
      }

      // Fetch from multiple sources
      const [serpApiResults, scraperResults] = await Promise.allSettled([
        this.fetchFromSerpApi(query),
        this.fetchFromScrapers(query)
      ])

      const allProducts: UnifiedProduct[] = []

      // Process SerpAPI results
      if (serpApiResults.status === 'fulfilled') {
        allProducts.push(...serpApiResults.value)
      }

      // Process scraper results
      if (scraperResults.status === 'fulfilled') {
        allProducts.push(...scraperResults.value)
      }

      // Remove duplicates and sort by price
      const uniqueProducts = this.deduplicateProducts(allProducts)
      const sortedProducts = uniqueProducts.sort((a, b) => a.price - b.price)

      // Cache results if enabled
      if (useCache && sortedProducts.length > 0) {
        await this.cacheProducts(query, sortedProducts)
      }

      // Save to database
      await this.saveProductsToDatabase(sortedProducts)

      return sortedProducts.slice(0, 20) // Limit to 20 products
    } catch (error) {
      console.error('Product search error:', error)
      return []
    }
  }

  private static async fetchFromSerpApi(query: string): Promise<UnifiedProduct[]> {
    try {
      const serpResults = await fetchSerpApiProducts(query)
      return serpResults.map((product: SerpApiProduct) => ({
        name: product.title,
        price: product.extracted_price,
        image: product.thumbnail || '',
        url: product.link,
        platform: product.source.toLowerCase(),
        rating: product.rating,
        reviews: product.reviews,
        currency: 'USD',
        inStock: true,
        source: 'serpapi' as const
      }))
    } catch (error) {
      console.error('SerpAPI fetch error:', error)
      return []
    }
  }

  private static async fetchFromScrapers(query: string): Promise<UnifiedProduct[]> {
    try {
      const scraperResults = await WebScraper.scrapeAll(query)
      return scraperResults.map(product => ({
        name: product.name,
        price: product.price,
        image: product.image,
        url: product.url,
        platform: product.platform,
        rating: product.rating,
        reviews: product.reviews,
        currency: 'USD',
        inStock: true,
        source: 'scraper' as const
      }))
    } catch (error) {
      console.error('Scraper fetch error:', error)
      return []
    }
  }

  private static deduplicateProducts(products: UnifiedProduct[]): UnifiedProduct[] {
    const seen = new Set<string>()
    return products.filter(product => {
      const key = `${product.name.toLowerCase()}-${product.platform}`
      if (seen.has(key)) {
        return false
      }
      seen.add(key)
      return true
    })
  }

  private static async getCachedProducts(query: string): Promise<UnifiedProduct[]> {
    try {
      const cached = await prisma.product.findMany({
        where: {
          OR: [
            { name: { contains: query } },
            { description: { contains: query } }
          ]
        },
        include: {
          prices: {
            orderBy: { createdAt: 'desc' },
            take: 1
          }
        },
        take: 20
      })

      return cached.map(product => ({
        id: product.id,
        name: product.name,
        price: product.prices[0]?.price || 0,
        image: product.imageUrl || '',
        url: product.prices[0]?.url || '',
        platform: product.prices[0]?.platform || 'unknown',
        currency: 'USD',
        inStock: product.prices[0]?.inStock || true,
        source: 'database' as const
      }))
    } catch (error) {
      console.error('Cache retrieval error:', error)
      return []
    }
  }

  private static async cacheProducts(query: string, products: UnifiedProduct[]): Promise<void> {
    try {
      // This would typically use a Redis cache or similar
      // For now, we'll just save to database
      console.log(`Caching ${products.length} products for query: ${query}`)
    } catch (error) {
      console.error('Cache storage error:', error)
    }
  }

  private static async saveProductsToDatabase(products: UnifiedProduct[]): Promise<void> {
    try {
      for (const product of products) {
        // Find or create product
        const existingProduct = await prisma.product.findFirst({
          where: {
            name: product.name,
            brand: product.platform
          }
        })

        let productId: string
        if (existingProduct) {
          productId = existingProduct.id
        } else {
          const newProduct = await prisma.product.create({
            data: {
              name: product.name,
              description: `Product from ${product.platform}`,
              imageUrl: product.image,
              brand: product.platform,
              category: 'General'
            }
          })
          productId = newProduct.id
        }

        // Save price data
        await prisma.price.create({
          data: {
            productId,
            platform: product.platform,
            price: product.price,
            currency: product.currency,
            url: product.url,
            inStock: product.inStock
          }
        })
      }
    } catch (error) {
      console.error('Database save error:', error)
    }
  }

  static async getProductPriceHistory(productId: string): Promise<any[]> {
    try {
      const prices = await prisma.price.findMany({
        where: { productId },
        orderBy: { createdAt: 'asc' }
      })

      return prices.map(price => ({
        date: price.createdAt,
        price: price.price,
        platform: price.platform,
        inStock: price.inStock
      }))
    } catch (error) {
      console.error('Price history error:', error)
      return []
    }
  }
}
