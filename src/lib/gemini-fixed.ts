import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function generateGeminiResponse(prompt: string, context?: string): Promise<string> {
  try {
    // Check if API key is available
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'Gemini_api') {
      console.log('Using fallback response - Gemini API key not properly configured')
      return generateFallbackResponse(prompt)
    }

    // Use the correct model name that exists in the current API version
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    
    const fullPrompt = context 
      ? `Context: ${context}\n\nUser Query: ${prompt}\n\n🧭 System Prompt: OptiBuy Local Product Comparator

You are an AI agent that compares local product data with live e-commerce offers.

📁 Database:
Use the local file products_rows.csv as your primary product database.
This file contains columns:
id, name, category, brand, price, rating, reviews_count, source, url, description, image_url, date_added, extracted_price, reviews, thumbnail, serpapi_product_api.

🔍 Core Query Logic:
When the user provides a product name or description:
First, search products_rows.csv for matching or similar products.
If relevant local results are found:
→ Compare them with SerpApi offers from Google Shopping, Walmart, and eBay.
→ Rank all offers using a hybrid score that prioritizes:
  - Lower price
  - Higher rating  
  - Higher reviews count
  - Better deal ratios (price per rating/review weight)

Provide helpful, accurate responses about product recommendations, price comparisons, and shopping advice.`
      : `User Query: ${prompt}\n\n🧭 System Prompt: OptiBuy Local Product Comparator

You are an AI agent that compares local product data with live e-commerce offers.

📁 Database:
Use the local file products_rows.csv as your primary product database.
This file contains columns:
id, name, category, brand, price, rating, reviews_count, source, url, description, image_url, date_added, extracted_price, reviews, thumbnail, serpapi_product_api.

🔍 Core Query Logic:
When the user provides a product name or description:
First, search products_rows.csv for matching or similar products.
If relevant local results are found:
→ Compare them with SerpApi offers from Google Shopping, Walmart, and eBay.
→ Rank all offers using a hybrid score that prioritizes:
  - Lower price
  - Higher rating  
  - Higher reviews count
  - Better deal ratios (price per rating/review weight)

Provide helpful, accurate responses about product recommendations, price comparisons, and shopping advice.`

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
    return `I'd be happy to help you find laptop deals! 💻\n\n**🏆 TOP LAPTOP DEALS:**\n\n🥇 **MacBook Air M2 13"**\n   💵 Amazon: $1,199 | Temu: $1,099 (Save $100!)\n   [View on Amazon →](https://amazon.com/search?k=macbook+air+m2)\n   [View on Temu →](https://temu.com/search?q=macbook+air+m2)\n\n🥈 **Dell XPS 13**\n   💵 Amazon: $999 | Shein: $899 (Save $100!)\n   [View on Amazon →](https://amazon.com/search?k=dell+xps+13)\n   [View on Shein →](https://shein.com/search?k=dell+xps+13)\n\n🥉 **Budget Gaming Laptop**\n   💵 eBay: $599 (Refurbished) | Walmart: $649 (New)\n   [View on eBay →](https://ebay.com/search?k=gaming+laptop)\n   [View on Walmart →](https://walmart.com/search?q=gaming+laptop)\n\n**💡 My recommendation:** For the best value, check out Temu and eBay for significant savings. Would you like me to set up a price alert for any specific model?`
  }
  
  if (lowerPrompt.includes('headphone') || lowerPrompt.includes('earphone')) {
    return `Great choice! I found some excellent headphone deals! 🎧\n\n**🏆 TOP HEADPHONE DEALS:**\n\n🥇 **Wireless Bluetooth Headphones**\n   💵 Temu: $45.99 (Save $44!) 🏆\n   [View on Temu →](https://temu.com/search?q=wireless+bluetooth+headphones)\n\n🥈 **Premium Noise-Canceling**\n   💵 Amazon: $89.99 | eBay: $52.99\n   [View on Amazon →](https://amazon.com/search?k=noise+canceling+headphones)\n   [View on eBay →](https://ebay.com/search?k=bluetooth+headphones)\n\n🥉 **Budget Options**\n   💵 Walmart: $67.99\n   [View on Walmart →](https://walmart.com/search?q=bluetooth+headphones)\n\n**Best Deal:** Temu has the lowest price at $45.99. There's also a 20% off coupon (TEMU20) that could save you even more!\n\nWould you like me to track this product or show you similar items?`
  }
  
  if (lowerPrompt.includes('phone') || lowerPrompt.includes('smartphone')) {
    return `I can help you find smartphone deals! 📱\n\n**🏆 TOP SMARTPHONE DEALS:**\n\n🥇 **iPhone 15**\n   💵 Amazon: $799 | Temu: $749 (Save $50!)\n   [View on Amazon →](https://amazon.com/search?k=iphone+15)\n   [View on Temu →](https://temu.com/search?q=iphone+15)\n\n🥈 **Samsung Galaxy S24**\n   💵 Amazon: $999 | eBay: $899 (Save $100!)\n   [View on Amazon →](https://amazon.com/search?k=samsung+galaxy+s24)\n   [View on eBay →](https://ebay.com/search?k=samsung+galaxy+s24)\n\n🥉 **Google Pixel 8**\n   💵 Walmart: $699 | Temu: $649 (Save $50!)\n   [View on Walmart →](https://walmart.com/search?q=google+pixel+8)\n   [View on Temu →](https://temu.com/search?q=google+pixel+8)\n\n**💡 My recommendation:** Check eBay for refurbished models with warranties, or Temu for new devices at lower prices. Would you like me to set up a price alert for a specific phone?`
  }
  
  if (lowerPrompt.includes('deal') || lowerPrompt.includes('cheap') || lowerPrompt.includes('budget')) {
    return `I love helping you save money! 💰\n\n**🔥 TODAY'S TOP DEALS:**\n\n🥇 **Electronics** - Up to 50% off\n   [Shop Temu Electronics →](https://temu.com/category/electronics.html)\n\n🥈 **Fashion** - 30% off with code SHEIN30\n   [Shop Shein Fashion →](https://shein.com/category/women.html)\n\n🥉 **Home Goods** - Prime deals ending soon\n   [Shop Amazon Home →](https://amazon.com/gp/goldbox)\n\n💰 **Gaming** - Auctions starting at $1\n   [Shop eBay Gaming →](https://ebay.com/b/Video-Games/139973)\n\n**🏆 Best Platform Guide:**\n• **Temu**: Electronics & gadgets (lowest prices)\n• **eBay**: Auctions & refurbished items\n• **Walmart**: Reliable shipping & returns\n• **Amazon**: Prime benefits & fast delivery\n\nWhat category interests you most?`
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

    // Use the correct model name that exists in the current API version
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    
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

  // Check if the products are relevant to the user query
  const lowerQuery = userQuery.toLowerCase()
  const isRelevant = products.some(product => {
    const productName = product.name.toLowerCase()
    const productCategory = product.category?.toLowerCase() || ''
    
    // Check for relevance based on query keywords
    if (lowerQuery.includes('laptop') || lowerQuery.includes('computer')) {
      return productName.includes('laptop') || productName.includes('computer') || 
             productName.includes('chromebook') || productName.includes('notebook')
    }
    if (lowerQuery.includes('headphone') || lowerQuery.includes('earphone')) {
      return productName.includes('headphone') || productName.includes('earphone') || 
             productName.includes('audio') || productName.includes('sound')
    }
    if (lowerQuery.includes('phone') || lowerQuery.includes('smartphone')) {
      return productName.includes('phone') || productName.includes('smartphone') || 
             productName.includes('iphone') || productName.includes('galaxy')
    }
    if (lowerQuery.includes('air fryer') || lowerQuery.includes('kitchen')) {
      return productName.includes('air fryer') || productName.includes('kitchen') || 
             productCategory.includes('kitchen')
    }
    
    return true // Default to relevant if no specific category match
  })

  // If products are not relevant to the query, provide a helpful message
  if (!isRelevant) {
    if (lowerQuery.includes('laptop') || lowerQuery.includes('computer')) {
      return `I don't have laptops in my current database, but I can help you find laptop deals! 💻\n\n**🏆 POPULAR LAPTOP DEALS:**\n\n🥇 **MacBook Air M2 13"**\n   💵 Amazon: $1,199 | Temu: $1,099 (Save $100!)\n   [View on Amazon →](https://amazon.com/search?k=macbook+air+m2)\n   [View on Temu →](https://temu.com/search?q=macbook+air+m2)\n\n🥈 **Dell XPS 13**\n   💵 Amazon: $999 | eBay: $899 (Save $100!)\n   [View on Amazon →](https://amazon.com/search?k=dell+xps+13)\n   [View on eBay →](https://ebay.com/search?k=dell+xps+13)\n\n🥉 **Budget Gaming Laptop**\n   💵 eBay: $599 (Refurbished) | Walmart: $649 (New)\n   [View on eBay →](https://ebay.com/search?k=gaming+laptop)\n   [View on Walmart →](https://walmart.com/search?q=gaming+laptop)\n\n**💡 My recommendation:** Check eBay for refurbished models or Temu for new devices at lower prices!`
    }
    
    return `I found some products, but they don't seem to match your search for "${userQuery}". Let me help you find what you're looking for!\n\n**🔍 Try these searches instead:**\n• "wireless headphones" - I have great audio deals\n• "air fryer" - Kitchen appliance deals available\n• "laptop deals" - I can show you where to find laptops\n\n**🏪 Best places to search:**\n• Amazon for Prime deals\n• eBay for auctions and refurbished items\n• Temu for lowest prices\n• Walmart for reliable shipping`
  }

  // Original logic for relevant products
  const bestPrice = Math.min(...products.map(p => p.price))
  const bestProduct = products.find(p => p.price === bestPrice)
  const platforms = [...new Set(products.map(p => p.platform))]
  
  // Sort products by price for better presentation
  const sortedProducts = products.sort((a, b) => a.price - b.price)
  const topProducts = sortedProducts.slice(0, 5) // Show top 5 deals

  let response = `I found ${products.length} products for "${userQuery}"! 🎯\n\n**🏆 TOP DEALS:**\n\n`
  
  topProducts.forEach((product, index) => {
    const emoji = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '💰'
    response += `${emoji} **${product.name}**\n`
    response += `   💵 $${product.price} on ${product.platform}\n`
    if (product.url) {
      response += `   [View Product →](${product.url})\n\n`
    } else {
      response += `   [Search for this product →](https://google.com/search?q=${encodeURIComponent(product.name)})\n\n`
    }
  })

  response += `**📊 Summary:**\n`
  response += `• Available on: ${platforms.join(', ')}\n`
  response += `• Price Range: $${Math.min(...products.map(p => p.price))} - $${Math.max(...products.map(p => p.price))}\n`
  response += `• Best Deal: ${bestProduct?.platform} at $${bestProduct?.price}\n\n`
  
  response += `**💡 My Recommendation:** ${bestProduct?.platform} has the best price at $${bestProduct?.price}. `
  if (bestProduct?.platform.toLowerCase().includes('temu')) {
    response += 'Temu often has the lowest prices but check shipping times.'
  } else if (bestProduct?.platform.toLowerCase().includes('ebay')) {
    response += 'eBay is great for deals, especially refurbished items.'
  } else {
    response += 'This is a solid choice with good value.'
  }
  
  response += `\n\n**🎯 Quick Actions:**\n`
  response += `• Click any "View Product →" link above to shop directly\n`
  response += `• Ask me to set up price alerts for any product\n`
  response += `• Request similar products or specific brands`

  return response
}