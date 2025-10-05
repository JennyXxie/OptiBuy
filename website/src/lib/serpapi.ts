import axios from 'axios'

const SERPAPI_KEY = process.env.SERPAPI_KEY

if (!SERPAPI_KEY) {
  console.warn('⚠️ Missing SERPAPI_KEY in environment variables')
}

export interface SerpApiProduct {
  title: string
  price: string
  extracted_price: number
  link: string
  source: string
  rating?: number
  reviews?: number
  thumbnail?: string
  position: number
}

export async function fetchSerpApiProducts(query: string, engine: string = 'google_shopping'): Promise<SerpApiProduct[]> {
  if (!SERPAPI_KEY) {
    console.warn('SERPAPI_KEY not available, returning empty results')
    return []
  }

  try {
    const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&engine=${engine}&api_key=${SERPAPI_KEY}`
    
    const response = await axios.get(url, {
      timeout: 10000,
    })

    const results = response.data.shopping_results || response.data.organic_results || []
    
    return results.map((item: any) => ({
      title: item.title || '',
      price: item.price || '',
      extracted_price: item.extracted_price || 0,
      link: item.link || item.product_link || '',
      source: item.source || 'Unknown',
      rating: item.rating || undefined,
      reviews: item.reviews || undefined,
      thumbnail: item.thumbnail || '',
      position: item.position || 0
    }))
  } catch (error) {
    console.error('SerpAPI error:', error)
    return []
  }
}

export async function fetchAmazonProducts(query: string): Promise<SerpApiProduct[]> {
  return fetchSerpApiProducts(query, 'amazon')
}

export async function fetchGoogleShoppingProducts(query: string): Promise<SerpApiProduct[]> {
  return fetchSerpApiProducts(query, 'google_shopping')
}
