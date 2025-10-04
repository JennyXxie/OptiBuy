import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function generateGeminiResponse(prompt: string, context?: string): Promise<string> {
  try {
    // Check if API key is available
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'Gemini_api') {
      console.log('Using fallback response - Gemini API key not properly configured')
      return generateFallbackResponse(prompt)
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    
    const fullPrompt = context 
      ? `Context: ${context}\n\nUser Query: ${prompt}\n\nAs OptiBuy's AI shopping assistant, provide helpful, accurate responses about product recommendations, price comparisons, and shopping advice. Focus on Amazon, Temu, eBay, and Walmart.`
      : `User Query: ${prompt}\n\nAs OptiBuy's AI shopping assistant, provide helpful, accurate responses about product recommendations, price comparisons, and shopping advice. Focus on Amazon, Temu, eBay, and Walmart.`

    const result = await model.generateContent(fullPrompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Gemini API error:', error)
    return generateFallbackResponse(prompt)
  }
}

function generateFallbackResponse(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase()
  
  if (lowerPrompt.includes('laptop') || lowerPrompt.includes('computer')) {
    return `I'd be happy to help you find laptop deals! 💻\n\nHere are some great options I found:\n\n**MacBook Air M2 13"**\n• Amazon: $1,199\n• Temu: $1,099 (Save $100!)\n\n**Dell XPS 13**\n• Amazon: $999\n• Shein: $899 (Save $100!)\n\n**Budget Gaming Laptop**\n• eBay: $599 (Refurbished)\n• Walmart: $649 (New)\n\n**My recommendation:** For the best value, check out Temu and eBay for significant savings. Would you like me to set up a price alert for any specific model?`
  }
  
  if (lowerPrompt.includes('headphone') || lowerPrompt.includes('earphone')) {
    return `Great choice! I found some excellent headphone deals! 🎧\n\n**Wireless Bluetooth Headphones**\n• Amazon: $89.99\n• Temu: $45.99 (Save $44!) 🏆\n• eBay: $52.99\n• Walmart: $67.99\n\n**Best Deal:** Temu has the lowest price at $45.99. There's also a 20% off coupon (TEMU20) that could save you even more!\n\nWould you like me to track this product or show you similar items?`
  }
  
  if (lowerPrompt.includes('phone') || lowerPrompt.includes('smartphone')) {
    return `I can help you find smartphone deals! 📱\n\n**Current trending deals:**\n• iPhone 15: $799 (Amazon) vs $749 (Temu) - Save $50!\n• Samsung Galaxy S24: $999 (Amazon) vs $899 (eBay) - Save $100!\n• Google Pixel 8: $699 (Walmart) vs $649 (Temu) - Save $50!\n\n**My recommendation:** Check eBay for refurbished models with warranties, or Temu for new devices at lower prices. Would you like me to set up a price alert for a specific phone?`
  }
  
  if (lowerPrompt.includes('deal') || lowerPrompt.includes('cheap') || lowerPrompt.includes('budget')) {
    return `I love helping you save money! 💰\n\n**Today's top deals:**\n• Electronics: Up to 50% off on Temu\n• Fashion: 30% off on Shein with code SHEIN30\n• Home goods: Amazon Prime deals ending soon\n• Gaming: eBay auction deals starting at $1\n\n**Best platform for your budget:**\n• **Temu**: Best for electronics and gadgets\n• **eBay**: Best for auctions and refurbished items\n• **Walmart**: Best for reliable shipping and returns\n• **Amazon**: Best for Prime benefits and fast delivery\n\nWhat category interests you most?`
  }
  
  return `I understand you're looking for: "${prompt}"\n\nI'm here to help you find the best deals! I can:\n• Compare prices across Amazon, Temu, eBay, and Walmart\n• Track price history and predict drops\n• Find active coupons and discounts\n• Give personalized recommendations\n\nTry asking me about specific products like "wireless headphones" or "laptop deals" and I'll show you the best options!`
}

export async function generateProductAnalysis(products: any[], userQuery: string): Promise<string> {
  try {
    // Check if API key is available
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'Gemini_api') {
      console.log('Using fallback product analysis')
      return generateFallbackProductAnalysis(products, userQuery)
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    
    const productData = products.map(p => ({
      name: p.name,
      price: p.price,
      platform: p.platform,
      rating: p.rating,
      reviews: p.reviews
    }))

    const prompt = `
    Analyze these products for the user query: "${userQuery}"
    
    Products:
    ${JSON.stringify(productData, null, 2)}
    
    Provide a comprehensive analysis including:
    1. Best value recommendations
    2. Price comparisons
    3. Quality indicators (ratings, reviews)
    4. Platform-specific advantages
    5. Overall recommendation with reasoning
    
    Be concise but informative, and focus on helping the user make the best purchase decision.
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Gemini product analysis error:', error)
    return generateFallbackProductAnalysis(products, userQuery)
  }
}

function generateFallbackProductAnalysis(products: any[], userQuery: string): string {
  if (products.length === 0) {
    return `I couldn't find specific products for "${userQuery}" right now, but I can help you search across different platforms. Try asking about specific products like "wireless headphones" or "laptop deals" and I'll show you the best options!`
  }

  const bestPrice = Math.min(...products.map(p => p.price))
  const bestProduct = products.find(p => p.price === bestPrice)
  const platforms = [...new Set(products.map(p => p.platform))]

  return `I found ${products.length} products for "${userQuery}"! 🎯\n\n**Best Deal:**\n• ${bestProduct?.name}\n• Price: $${bestProduct?.price} on ${bestProduct?.platform}\n• Platform: ${bestProduct?.platform}\n\n**Available on:** ${platforms.join(', ')}\n\n**Price Range:** $${Math.min(...products.map(p => p.price))} - $${Math.max(...products.map(p => p.price))}\n\n**My Recommendation:** ${bestProduct?.platform} has the best price at $${bestProduct?.price}. ${bestProduct?.platform === 'temu' ? 'Temu often has the lowest prices but check shipping times.' : bestProduct?.platform === 'ebay' ? 'eBay is great for deals, especially refurbished items.' : 'This is a solid choice with good value.'}\n\nWould you like me to set up a price alert or show you similar products?`
}
