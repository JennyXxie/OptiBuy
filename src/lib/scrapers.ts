import axios from 'axios'
import * as cheerio from 'cheerio'

interface ScrapedProduct {
  name: string
  price: number
  image: string
  url: string
  rating?: number
  reviews?: number
  platform: string
}

export class WebScraper {
  private static readonly USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'

  private static async fetchPage(url: string): Promise<string> {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': this.USER_AGENT,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate',
          'Connection': 'keep-alive',
        },
        timeout: 10000,
      })
      return response.data
    } catch (error) {
      console.error(`Error fetching ${url}:`, error)
      throw error
    }
  }

  static async scrapeTemu(query: string): Promise<ScrapedProduct[]> {
    try {
      const searchUrl = `https://www.temu.com/search_result.html?search_key=${encodeURIComponent(query)}`
      const html = await this.fetchPage(searchUrl)
      const $ = cheerio.load(html)
      
      const products: ScrapedProduct[] = []
      
      $('[data-testid="product-item"], .product-item, .search-result-item').each((index, element) => {
        if (products.length >= 10) return false // Limit to 10 products
        
        const name = $(element).find('[data-testid="product-title"], .product-title, .title').first().text().trim()
        const priceText = $(element).find('[data-testid="price"], .price, .current-price').first().text().trim()
        const image = $(element).find('img').first().attr('src') || ''
        const url = $(element).find('a').first().attr('href') || ''
        const rating = parseFloat($(element).find('[data-testid="rating"], .rating').first().text()) || undefined
        const reviews = parseInt($(element).find('[data-testid="reviews"], .reviews').first().text().replace(/[^\d]/g, '')) || undefined

        if (name && priceText) {
          const price = parseFloat(priceText.replace(/[^\d.]/g, ''))
          if (!isNaN(price)) {
            products.push({
              name,
              price,
              image: image.startsWith('http') ? image : `https:${image}`,
              url: url.startsWith('http') ? url : `https://www.temu.com${url}`,
              rating,
              reviews,
              platform: 'temu'
            })
          }
        }
      })

      return products
    } catch (error) {
      console.error('Temu scraping error:', error)
      return []
    }
  }

  static async scrapeEbay(query: string): Promise<ScrapedProduct[]> {
    try {
      const searchUrl = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(query)}&_sop=15`
      const html = await this.fetchPage(searchUrl)
      const $ = cheerio.load(html)
      
      const products: ScrapedProduct[] = []
      
      $('.s-item').each((index, element) => {
        if (products.length >= 10) return false // Limit to 10 products
        
        const name = $(element).find('.s-item__title').text().trim()
        const priceText = $(element).find('.s-item__price').text().trim()
        const image = $(element).find('.s-item__image img').attr('src') || ''
        const url = $(element).find('.s-item__link').attr('href') || ''
        const rating = parseFloat($(element).find('.s-item__reviews .clipped').text()) || undefined
        const reviews = parseInt($(element).find('.s-item__reviews .s-item__review-count').text().replace(/[^\d]/g, '')) || undefined

        if (name && priceText && !name.includes('Shop on eBay')) {
          const price = parseFloat(priceText.replace(/[^\d.]/g, ''))
          if (!isNaN(price)) {
            products.push({
              name,
              price,
              image,
              url,
              rating,
              reviews,
              platform: 'ebay'
            })
          }
        }
      })

      return products
    } catch (error) {
      console.error('eBay scraping error:', error)
      return []
    }
  }

  static async scrapeWalmart(query: string): Promise<ScrapedProduct[]> {
    try {
      const searchUrl = `https://www.walmart.com/search?q=${encodeURIComponent(query)}`
      const html = await this.fetchPage(searchUrl)
      const $ = cheerio.load(html)
      
      const products: ScrapedProduct[] = []
      
      $('[data-testid="item-stack"], .search-result-gridview-item').each((index, element) => {
        if (products.length >= 10) return false // Limit to 10 products
        
        const name = $(element).find('[data-testid="item-stack-title"], .search-result-product-title').text().trim()
        const priceText = $(element).find('[data-testid="item-stack-price"], .price-main').text().trim()
        const image = $(element).find('img').first().attr('src') || ''
        const url = $(element).find('a').first().attr('href') || ''
        const rating = parseFloat($(element).find('[data-testid="item-stack-rating"], .stars').attr('aria-label')?.replace(/[^\d.]/g, '')) || undefined
        const reviews = parseInt($(element).find('[data-testid="item-stack-reviews"], .reviews-count').text().replace(/[^\d]/g, '')) || undefined

        if (name && priceText) {
          const price = parseFloat(priceText.replace(/[^\d.]/g, ''))
          if (!isNaN(price)) {
            products.push({
              name,
              price,
              image,
              url: url.startsWith('http') ? url : `https://www.walmart.com${url}`,
              rating,
              reviews,
              platform: 'walmart'
            })
          }
        }
      })

      return products
    } catch (error) {
      console.error('Walmart scraping error:', error)
      return []
    }
  }

  static async scrapeAll(query: string): Promise<ScrapedProduct[]> {
    try {
      const [temuResults, ebayResults, walmartResults] = await Promise.allSettled([
        this.scrapeTemu(query),
        this.scrapeEbay(query),
        this.scrapeWalmart(query)
      ])

      const allProducts: ScrapedProduct[] = []
      
      if (temuResults.status === 'fulfilled') {
        allProducts.push(...temuResults.value)
      }
      if (ebayResults.status === 'fulfilled') {
        allProducts.push(...ebayResults.value)
      }
      if (walmartResults.status === 'fulfilled') {
        allProducts.push(...walmartResults.value)
      }

      return allProducts
    } catch (error) {
      console.error('Error scraping all platforms:', error)
      return []
    }
  }
}
