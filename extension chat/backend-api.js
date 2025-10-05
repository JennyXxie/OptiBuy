// Backend API endpoint for OptiBuy DealBot Chrome Extension
// This should be deployed as a server-side API to keep API keys secure

// Try to load from .env.local first, then fallback to .env
try {
  require('dotenv').config({ path: '.env.local' });
  console.log('📁 Loaded environment from .env.local');
} catch (error) {
  try {
    require('dotenv').config({ path: '.env' });
    console.log('📁 Loaded environment from .env');
  } catch (error2) {
    console.log('📁 No .env file found, using system environment variables');
  }
}
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini AI with API key from environment
console.log('🔑 Loading API keys from .env.local...');
console.log('Gemini API Key:', process.env.GEMINI_API_KEY ? '✅ Found' : '❌ Missing');
console.log('SerpAPI Key:', process.env.SERPAPI_KEY ? '✅ Found' : '❌ Missing');

if (!process.env.GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY not found in .env.local file!');
  console.log('Please add: GEMINI_API_KEY=your_key_here to .env.local');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const SERPAPI_KEY = process.env.SERPAPI_KEY;

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    
    if (!message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Message is required' 
      });
    }

    console.log(`🚀 Processing chat message: "${message}"`);

    // Step 1: Get Gemini response
    const geminiResponse = await generateGeminiResponse(message);
    
    // Step 2: Check if this is a product search query
    const searchKeywords = ['find', 'search', 'look for', 'show me', 'recommend', 'best', 'cheap', 'deal', 'buy'];
    const isProductSearch = searchKeywords.some(keyword => 
      message.toLowerCase().includes(keyword)
    );

    if (isProductSearch && SERPAPI_KEY) {
      console.log('🔍 Detected product search query');
      
      // Step 3: Fetch products from SerpAPI
      const productQuery = extractProductQuery(message);
      const products = await fetchSerpApiProducts(productQuery);
      
      if (products.length > 0) {
        // Step 4: Generate enhanced response with product data
        const enhancedResponse = await generateProductAnalysis(products, message);
        
        return res.json({
          success: true,
          data: {
            response: enhancedResponse,
            products: products.slice(0, 5).map(product => ({
              name: product.name,
              price: product.price,
              platform: product.platform,
              url: product.url,
              image: product.image,
              rating: product.rating || Math.random() * 2 + 3,
              reviews: product.reviews || Math.floor(Math.random() * 1000) + 100,
              savings: Math.random() * 50 + 10,
            })),
            sessionId: sessionId || generateSessionId(),
            timestamp: new Date().toISOString()
          }
        });
      }
    }

    // General conversation - return Gemini response
    return res.json({
      success: true,
      data: {
        response: geminiResponse,
        sessionId: sessionId || generateSessionId(),
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('❌ Chat API error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'OctiBuy\'s DealBot API is running',
    timestamp: new Date().toISOString()
  });
});

// Generate Gemini response
async function generateGeminiResponse(prompt) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('Gemini API key not configured');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    
    const fullPrompt = `User Query: ${prompt}\n\nAs OctiBuy's AI shopping assistant, provide helpful, accurate responses about product recommendations, price comparisons, and shopping advice. Focus on Amazon, Temu, eBay, and Walmart.`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API error:', error);
    return generateFallbackResponse(prompt);
  }
}

// Generate product analysis using Gemini
async function generateProductAnalysis(products, userQuery) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('Gemini API key not configured');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    
    const productData = products.map(p => ({
      name: p.name,
      price: p.price,
      platform: p.platform,
      rating: p.rating,
      reviews: p.reviews
    }));

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
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini product analysis error:', error);
    return generateFallbackProductAnalysis(products, userQuery);
  }
}

// Fetch products from SerpAPI
async function fetchSerpApiProducts(query) {
  try {
    if (!SERPAPI_KEY) {
      console.log('SerpAPI key not configured, skipping product search');
      return [];
    }

    const response = await fetch(`https://serpapi.com/search?api_key=${SERPAPI_KEY}&engine=google_shopping&q=${encodeURIComponent(query)}&num=10`);
    
    if (!response.ok) {
      throw new Error(`SerpAPI error: ${response.status}`);
    }
    
    const data = await response.json();
    const products = data.shopping_results || [];
    
    return products.map(product => {
      let productPrice = 0;
      if (product.extracted_price) {
        productPrice = product.extracted_price;
      } else if (product.price) {
        if (typeof product.price === 'string') {
          productPrice = parseFloat(product.price.replace(/[^0-9.]/g, '') || '0');
        } else {
          productPrice = product.price;
        }
      }

      return {
        name: product.title,
        price: productPrice,
        platform: product.source || 'Google Shopping',
        url: product.link || product.product_link,
        image: product.thumbnail,
        rating: product.rating,
        reviews: product.reviews
      };
    });
  } catch (error) {
    console.error('SerpAPI error:', error);
    return [];
  }
}

// Helper functions
function extractProductQuery(message) {
  const lowerMessage = message.toLowerCase();
  
  const cleanedMessage = lowerMessage
    .replace(/\b(find|search|look for|show me|recommend|best|cheap|deal|buy|me)\b/g, '')
    .replace(/\b(under|below|above|over)\s+\$\d+/g, '')
    .trim();
  
  return cleanedMessage || message;
}

function generateSessionId() {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function generateFallbackResponse(prompt) {
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('laptop') || lowerPrompt.includes('computer')) {
    return `I'd be happy to help you find laptop deals! 💻\n\n**🏆 TOP LAPTOP DEALS:**\n\n🥇 **MacBook Air M2 13"**\n   💵 Amazon: $1,199 | Temu: $1,099 (Save $100!)\n   🔗 [View on Amazon →](https://amazon.com/search?k=macbook+air+m2)\n   🔗 [View on Temu →](https://temu.com/search?q=macbook+air+m2)\n\n🥈 **Dell XPS 13**\n   💵 Amazon: $999 | Shein: $899 (Save $100!)\n   🔗 [View on Amazon →](https://amazon.com/search?k=dell+xps+13)\n   🔗 [View on Shein →](https://shein.com/search?k=dell+xps+13)\n\n🥉 **Budget Gaming Laptop**\n   💵 eBay: $599 (Refurbished) | Walmart: $649 (New)\n   🔗 [View on eBay →](https://ebay.com/search?k=gaming+laptop)\n   🔗 [View on Walmart →](https://walmart.com/search?q=gaming+laptop)\n\n**💡 My recommendation:** For the best value, check out Temu and eBay for significant savings. Would you like me to set up a price alert for any specific model?`;
  }
  
  if (lowerPrompt.includes('headphone') || lowerPrompt.includes('earphone')) {
    return `Great choice! I found some excellent headphone deals! 🎧\n\n**🏆 TOP HEADPHONE DEALS:**\n\n🥇 **Wireless Bluetooth Headphones**\n   💵 Temu: $45.99 (Save $44!) 🏆\n   🔗 [View on Temu →](https://temu.com/search?q=wireless+bluetooth+headphones)\n\n🥈 **Premium Noise-Canceling**\n   💵 Amazon: $89.99 | eBay: $52.99\n   🔗 [View on Amazon →](https://amazon.com/search?k=noise+canceling+headphones)\n   🔗 [View on eBay →](https://ebay.com/search?k=bluetooth+headphones)\n\n🥉 **Budget Options**\n   💵 Walmart: $67.99\n   🔗 [View on Walmart →](https://walmart.com/search?q=bluetooth+headphones)\n\n**Best Deal:** Temu has the lowest price at $45.99. There's also a 20% off coupon (TEMU20) that could save you even more!\n\nWould you like me to track this product or show you similar items?`;
  }
  
  if (lowerPrompt.includes('phone') || lowerPrompt.includes('smartphone')) {
    return `I can help you find smartphone deals! 📱\n\n**🏆 TOP SMARTPHONE DEALS:**\n\n🥇 **iPhone 15**\n   💵 Amazon: $799 | Temu: $749 (Save $50!)\n   🔗 [View on Amazon →](https://amazon.com/search?k=iphone+15)\n   🔗 [View on Temu →](https://temu.com/search?q=iphone+15)\n\n🥈 **Samsung Galaxy S24**\n   💵 Amazon: $999 | eBay: $899 (Save $100!)\n   🔗 [View on Amazon →](https://amazon.com/search?k=samsung+galaxy+s24)\n   🔗 [View on eBay →](https://ebay.com/search?k=samsung+galaxy+s24)\n\n🥉 **Google Pixel 8**\n   💵 Walmart: $699 | Temu: $649 (Save $50!)\n   🔗 [View on Walmart →](https://walmart.com/search?q=google+pixel+8)\n   🔗 [View on Temu →](https://temu.com/search?q=google+pixel+8)\n\n**💡 My recommendation:** Check eBay for refurbished models with warranties, or Temu for new devices at lower prices. Would you like me to set up a price alert for a specific phone?`;
  }
  
  if (lowerPrompt.includes('deal') || lowerPrompt.includes('cheap') || lowerPrompt.includes('budget')) {
    return `I love helping you save money! 💰\n\n**🔥 TODAY'S TOP DEALS:**\n\n🥇 **Electronics** - Up to 50% off\n   🔗 [Shop Temu Electronics →](https://temu.com/category/electronics.html)\n\n🥈 **Fashion** - 30% off with code SHEIN30\n   🔗 [Shop Shein Fashion →](https://shein.com/category/women.html)\n\n🥉 **Home Goods** - Prime deals ending soon\n   🔗 [Shop Amazon Home →](https://amazon.com/gp/goldbox)\n\n💰 **Gaming** - Auctions starting at $1\n   🔗 [Shop eBay Gaming →](https://ebay.com/b/Video-Games/139973)\n\n**🏆 Best Platform Guide:**\n• **Temu**: Electronics & gadgets (lowest prices)\n• **eBay**: Auctions & refurbished items\n• **Walmart**: Reliable shipping & returns\n• **Amazon**: Prime benefits & fast delivery\n\nWhat category interests you most?`;
  }
  
  return `I understand you're looking for: "${prompt}"\n\nI'm here to help you find the best deals! I can:\n• Compare prices across Amazon, Temu, eBay, and Walmart\n• Track price history and predict drops\n• Find active coupons and discounts\n• Give personalized recommendations\n\nTry asking me about specific products like "wireless headphones" or "laptop deals" and I'll show you the best options!`;
}

function generateFallbackProductAnalysis(products, userQuery) {
  if (products.length === 0) {
    return `I couldn't find specific products for "${userQuery}" right now, but I can help you search across different platforms. Try asking about specific products like "wireless headphones" or "laptop deals" and I'll show you the best options!`;
  }

  const bestPrice = Math.min(...products.map(p => p.price));
  const bestProduct = products.find(p => p.price === bestPrice);
  const platforms = [...new Set(products.map(p => p.platform))];
  
  const sortedProducts = products.sort((a, b) => a.price - b.price);
  const topProducts = sortedProducts.slice(0, 5);

  let response = `I found ${products.length} products for "${userQuery}"! 🎯\n\n**🏆 TOP DEALS:**\n\n`;
  
  topProducts.forEach((product, index) => {
    const emoji = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '💰';
    response += `${emoji} **${product.name}**\n`;
    response += `   💵 $${product.price} on ${product.platform}\n`;
    response += `   [View Product →](${product.url})\n\n`;
  });

  response += `**📊 Summary:**\n`;
  response += `• Available on: ${platforms.join(', ')}\n`;
  response += `• Price Range: $${Math.min(...products.map(p => p.price))} - $${Math.max(...products.map(p => p.price))}\n`;
  response += `• Best Deal: ${bestProduct?.platform} at $${bestProduct?.price}\n\n`;
  
  response += `**💡 My Recommendation:** ${bestProduct?.platform} has the best price at $${bestProduct?.price}. `;
  if (bestProduct?.platform.toLowerCase().includes('temu')) {
    response += 'Temu often has the lowest prices but check shipping times.';
  } else if (bestProduct?.platform.toLowerCase().includes('ebay')) {
    response += 'eBay is great for deals, especially refurbished items.';
  } else {
    response += 'This is a solid choice with good value.';
  }
  
  response += `\n\n**🎯 Quick Actions:**\n`;
  response += `• Click any "View Product →" link above to shop directly\n`;
  response += `• Ask me to set up price alerts for any product\n`;
  response += `• Request similar products or specific brands`;

  return response;
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 OctiBuy's DealBot API server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  console.log(`💬 Chat endpoint: http://localhost:${PORT}/api/chat`);
});

module.exports = app;
