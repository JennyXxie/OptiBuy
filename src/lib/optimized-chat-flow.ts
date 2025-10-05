import { generateGeminiResponse, generateProductAnalysis } from './gemini'
import { fetchSerpApiProducts } from './serpapi'

interface ChatFlowResult {
  response: string
  products?: Array<{
    name: string
    price: number
    platform: string
    url: string
    image?: string
    rating?: number
    reviews?: number
    savings?: number
  }>
  sessionId: string
  timestamp: string
}

export async function processOptimizedChatFlow(
  userMessage: string, 
  sessionId: string
): Promise<ChatFlowResult> {
  console.log(`🚀 Starting optimized chat flow: User → Gemini → SerpAPI`)
  console.log(`📝 User message: "${userMessage}"`)

  try {
    // Step 1: User → Gemini (Initial response)
    console.log(`🤖 Step 1: Getting Gemini response...`)
    const geminiResponse = await generateGeminiResponse(userMessage)
    console.log(`✅ Gemini response received`)

    // Step 2: Check if this is a product search query
    const searchKeywords = ['find', 'search', 'look for', 'show me', 'recommend', 'best', 'cheap', 'deal', 'buy']
    const isProductSearch = searchKeywords.some(keyword => 
      userMessage.toLowerCase().includes(keyword)
    )

    if (isProductSearch) {
      console.log(`🔍 Detected product search query`)
      
      // Extract clean product query
      const productQuery = extractProductQuery(userMessage)
      console.log(`🔍 Product query: "${productQuery}"`)
      
      // Step 2: Fetch from SerpAPI only (skip CSV database)
      console.log(`🌐 Step 2: Fetching products from SerpAPI...`)
      const serpApiProducts = await fetchMultiSourceProducts(productQuery)
      console.log(`📦 Fetched ${serpApiProducts.length} products from SerpAPI`)
      
      if (serpApiProducts.length > 0) {
        // Step 3: Generate enhanced response with SerpAPI product data
        console.log(`🤖 Step 3: Getting enhanced Gemini response with SerpAPI product data...`)
        
        // Generate AI response with product context
        const enhancedResponse = await generateProductAnalysis(serpApiProducts, userMessage)
        console.log(`✅ Enhanced Gemini response with SerpAPI product data received`)
        
        return {
          response: enhancedResponse,
          products: serpApiProducts.slice(0, 5).map(product => ({
            name: product.name,
            price: product.price,
            platform: product.platform,
            url: product.url,
            image: product.image,
            rating: product.rating || 0,
            reviews: product.reviews || 0,
            savings: Math.random() * 50 + 10, // Mock savings
          })),
          sessionId,
          timestamp: new Date().toISOString()
        }
      } else {
        console.log(`⚠️ No products found from SerpAPI, using fallback response`)
        return {
          response: geminiResponse,
          sessionId,
          timestamp: new Date().toISOString()
        }
      }
    } else {
      // General conversation - just return Gemini response
      console.log(`💬 General conversation, returning Gemini response`)
      return {
        response: geminiResponse,
        sessionId,
        timestamp: new Date().toISOString()
      }
    }
  } catch (error) {
    console.error('❌ Chat flow error:', error)
    return {
      response: "I'm sorry, I'm having trouble processing your request right now. Please try again later.",
      sessionId,
      timestamp: new Date().toISOString()
    }
  }
}

// Helper function to extract product query from user message
function extractProductQuery(message: string): string {
  const lowerMessage = message.toLowerCase()
  
  // Remove common question words and search terms
  const cleanedMessage = lowerMessage
    .replace(/\b(find|search|look for|show me|recommend|best|cheap|deal|buy|me)\b/g, '')
    .replace(/\b(under|below|above|over)\s+\$\d+/g, '') // Remove price constraints
    .trim()
  
  return cleanedMessage || message
}

// Fetch products from multiple sources
async function fetchMultiSourceProducts(query: string) {
  console.log(`🔍 Fetching SerpAPI products for: ${query}`)
  
  try {
    // Fetch from Google Shopping (includes multiple platforms)
    console.log(`🌐 Fetching from Google Shopping...`)
    const googleProducts = await fetchSerpApiProducts(query)
    console.log(`✅ Got ${googleProducts.length} items from Google Shopping`)
    
    // Transform and combine results
    const allProducts = googleProducts.map(product => {
      // Handle price data properly
      let productPrice = 0
      if (product.extracted_price) {
        productPrice = product.extracted_price
      } else if (product.price) {
        if (typeof product.price === 'string') {
          productPrice = parseFloat(product.price.replace(/[^0-9.]/g, '') || '0')
        } else {
          productPrice = product.price
        }
      }

      return {
        name: product.title,
        price: productPrice,
        platform: product.source || 'Google Shopping',
        url: product.link || (product as any).product_link,
        image: product.thumbnail,
        rating: product.rating,
        reviews: product.reviews
      }
    })

    // Remove duplicates based on URL
    const uniqueProducts = allProducts.filter((product, index, self) =>
      index === self.findIndex(p => p.url === product.url)
    )

    console.log(`🧩 Unique products: ${uniqueProducts.length}`)
    return uniqueProducts
  } catch (error) {
    console.error('❌ Error fetching products:', error)
    return []
  }
}
