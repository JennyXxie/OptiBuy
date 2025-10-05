module.exports = [
"[project]/Desktop/website/OptiBuy/.next-internal/server/app/api/chat/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/Desktop/website/OptiBuy/src/lib/prisma.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
;
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
}),
"[project]/Desktop/website/OptiBuy/src/lib/gemini.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateGeminiResponse",
    ()=>generateGeminiResponse,
    "generateProductAnalysis",
    ()=>generateProductAnalysis
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/@google/generative-ai/dist/index.mjs [app-route] (ecmascript)");
;
const genAI = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GoogleGenerativeAI"](process.env.GEMINI_API_KEY || '');
async function generateGeminiResponse(prompt, context) {
    try {
        // Check if API key is available
        if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'Gemini_api') {
            console.log('Using fallback response - Gemini API key not properly configured');
            return generateFallbackResponse(prompt);
        }
        // Use the correct model name that exists in the current API version
        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-flash'
        });
        const fullPrompt = context ? `Context: ${context}\n\nUser Query: ${prompt}\n\n🧭 System Prompt: OptiBuy Local Product Comparator

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

Provide helpful, accurate responses about product recommendations, price comparisons, and shopping advice.` : `User Query: ${prompt}\n\n🧭 System Prompt: OptiBuy Local Product Comparator

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

Provide helpful, accurate responses about product recommendations, price comparisons, and shopping advice.`;
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Gemini API error:', error);
        return generateFallbackResponse(prompt);
    }
}
function generateFallbackResponse(prompt) {
    const lowerPrompt = prompt.toLowerCase();
    if (lowerPrompt.includes('laptop') || lowerPrompt.includes('computer')) {
        return `I'd be happy to help you find laptop deals! 💻\n\n**🏆 TOP LAPTOP DEALS:**\n\n🥇 **MacBook Air M2 13"**\n   💵 Amazon: $1,199 | Temu: $1,099 (Save $100!)\n   [View on Amazon →](https://amazon.com/search?k=macbook+air+m2)\n   [View on Temu →](https://temu.com/search?q=macbook+air+m2)\n\n🥈 **Dell XPS 13**\n   💵 Amazon: $999 | Shein: $899 (Save $100!)\n   [View on Amazon →](https://amazon.com/search?k=dell+xps+13)\n   [View on Shein →](https://shein.com/search?k=dell+xps+13)\n\n🥉 **Budget Gaming Laptop**\n   💵 eBay: $599 (Refurbished) | Walmart: $649 (New)\n   [View on eBay →](https://ebay.com/search?k=gaming+laptop)\n   [View on Walmart →](https://walmart.com/search?q=gaming+laptop)\n\n**💡 My recommendation:** For the best value, check out Temu and eBay for significant savings. Would you like me to set up a price alert for any specific model?`;
    }
    if (lowerPrompt.includes('headphone') || lowerPrompt.includes('earphone')) {
        return `Great choice! I found some excellent headphone deals! 🎧\n\n**🏆 TOP HEADPHONE DEALS:**\n\n🥇 **Wireless Bluetooth Headphones**\n   💵 Temu: $45.99 (Save $44!) 🏆\n   [View on Temu →](https://temu.com/search?q=wireless+bluetooth+headphones)\n\n🥈 **Premium Noise-Canceling**\n   💵 Amazon: $89.99 | eBay: $52.99\n   [View on Amazon →](https://amazon.com/search?k=noise+canceling+headphones)\n   [View on eBay →](https://ebay.com/search?k=bluetooth+headphones)\n\n🥉 **Budget Options**\n   💵 Walmart: $67.99\n   [View on Walmart →](https://walmart.com/search?q=bluetooth+headphones)\n\n**Best Deal:** Temu has the lowest price at $45.99. There's also a 20% off coupon (TEMU20) that could save you even more!\n\nWould you like me to track this product or show you similar items?`;
    }
    if (lowerPrompt.includes('phone') || lowerPrompt.includes('smartphone')) {
        return `I can help you find smartphone deals! 📱\n\n**🏆 TOP SMARTPHONE DEALS:**\n\n🥇 **iPhone 15**\n   💵 Amazon: $799 | Temu: $749 (Save $50!)\n   [View on Amazon →](https://amazon.com/search?k=iphone+15)\n   [View on Temu →](https://temu.com/search?q=iphone+15)\n\n🥈 **Samsung Galaxy S24**\n   💵 Amazon: $999 | eBay: $899 (Save $100!)\n   [View on Amazon →](https://amazon.com/search?k=samsung+galaxy+s24)\n   [View on eBay →](https://ebay.com/search?k=samsung+galaxy+s24)\n\n🥉 **Google Pixel 8**\n   💵 Walmart: $699 | Temu: $649 (Save $50!)\n   [View on Walmart →](https://walmart.com/search?q=google+pixel+8)\n   [View on Temu →](https://temu.com/search?q=google+pixel+8)\n\n**💡 My recommendation:** Check eBay for refurbished models with warranties, or Temu for new devices at lower prices. Would you like me to set up a price alert for a specific phone?`;
    }
    if (lowerPrompt.includes('deal') || lowerPrompt.includes('cheap') || lowerPrompt.includes('budget')) {
        return `I love helping you save money! 💰\n\n**🔥 TODAY'S TOP DEALS:**\n\n🥇 **Electronics** - Up to 50% off\n   [Shop Temu Electronics →](https://temu.com/category/electronics.html)\n\n🥈 **Fashion** - 30% off with code SHEIN30\n   [Shop Shein Fashion →](https://shein.com/category/women.html)\n\n🥉 **Home Goods** - Prime deals ending soon\n   [Shop Amazon Home →](https://amazon.com/gp/goldbox)\n\n💰 **Gaming** - Auctions starting at $1\n   [Shop eBay Gaming →](https://ebay.com/b/Video-Games/139973)\n\n**🏆 Best Platform Guide:**\n• **Temu**: Electronics & gadgets (lowest prices)\n• **eBay**: Auctions & refurbished items\n• **Walmart**: Reliable shipping & returns\n• **Amazon**: Prime benefits & fast delivery\n\nWhat category interests you most?`;
    }
    return `I understand you're looking for: "${prompt}"\n\nI'm here to help you find the best deals! I can:\n• Compare prices across Amazon, Temu, eBay, and Walmart\n• Track price history and predict drops\n• Find active coupons and discounts\n• Give personalized recommendations\n\nTry asking me about specific products like "wireless headphones" or "laptop deals" and I'll show you the best options!`;
}
async function generateProductAnalysis(products, userQuery) {
    try {
        // Check if API key is available
        if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'Gemini_api') {
            console.log('Using fallback product analysis');
            return generateFallbackProductAnalysis(products, userQuery);
        }
        // Use the correct model name that exists in the current API version
        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-flash'
        });
        const productData = products.map((p)=>({
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
function generateFallbackProductAnalysis(products, userQuery) {
    if (products.length === 0) {
        return `I couldn't find specific products for "${userQuery}" right now, but I can help you search across different platforms. Try asking about specific products like "wireless headphones" or "laptop deals" and I'll show you the best options!`;
    }
    // Check if the products are relevant to the user query
    const lowerQuery = userQuery.toLowerCase();
    const isRelevant = products.some((product)=>{
        const productName = product.name.toLowerCase();
        const productCategory = product.category?.toLowerCase() || '';
        // Check for relevance based on query keywords
        if (lowerQuery.includes('laptop') || lowerQuery.includes('computer')) {
            return productName.includes('laptop') || productName.includes('computer') || productName.includes('chromebook') || productName.includes('notebook');
        }
        if (lowerQuery.includes('headphone') || lowerQuery.includes('earphone')) {
            return productName.includes('headphone') || productName.includes('earphone') || productName.includes('audio') || productName.includes('sound');
        }
        if (lowerQuery.includes('phone') || lowerQuery.includes('smartphone')) {
            return productName.includes('phone') || productName.includes('smartphone') || productName.includes('iphone') || productName.includes('galaxy');
        }
        if (lowerQuery.includes('air fryer') || lowerQuery.includes('kitchen')) {
            return productName.includes('air fryer') || productName.includes('kitchen') || productCategory.includes('kitchen');
        }
        return true // Default to relevant if no specific category match
        ;
    });
    // If products are not relevant to the query, provide a helpful message
    if (!isRelevant) {
        if (lowerQuery.includes('laptop') || lowerQuery.includes('computer')) {
            return `I don't have laptops in my current database, but I can help you find laptop deals! 💻\n\n**🏆 POPULAR LAPTOP DEALS:**\n\n🥇 **MacBook Air M2 13"**\n   💵 Amazon: $1,199 | Temu: $1,099 (Save $100!)\n   [View on Amazon →](https://amazon.com/search?k=macbook+air+m2)\n   [View on Temu →](https://temu.com/search?q=macbook+air+m2)\n\n🥈 **Dell XPS 13**\n   💵 Amazon: $999 | eBay: $899 (Save $100!)\n   [View on Amazon →](https://amazon.com/search?k=dell+xps+13)\n   [View on eBay →](https://ebay.com/search?k=dell+xps+13)\n\n🥉 **Budget Gaming Laptop**\n   💵 eBay: $599 (Refurbished) | Walmart: $649 (New)\n   [View on eBay →](https://ebay.com/search?k=gaming+laptop)\n   [View on Walmart →](https://walmart.com/search?q=gaming+laptop)\n\n**💡 My recommendation:** Check eBay for refurbished models or Temu for new devices at lower prices!`;
        }
        return `I found some products, but they don't seem to match your search for "${userQuery}". Let me help you find what you're looking for!\n\n**🔍 Try these searches instead:**\n• "wireless headphones" - I have great audio deals\n• "air fryer" - Kitchen appliance deals available\n• "laptop deals" - I can show you where to find laptops\n\n**🏪 Best places to search:**\n• Amazon for Prime deals\n• eBay for auctions and refurbished items\n• Temu for lowest prices\n• Walmart for reliable shipping`;
    }
    // Original logic for relevant products
    const bestPrice = Math.min(...products.map((p)=>p.price));
    const bestProduct = products.find((p)=>p.price === bestPrice);
    const platforms = [
        ...new Set(products.map((p)=>p.platform))
    ];
    // Sort products by price for better presentation
    const sortedProducts = products.sort((a, b)=>a.price - b.price);
    const topProducts = sortedProducts.slice(0, 5) // Show top 5 deals
    ;
    let response = `I found ${products.length} products for "${userQuery}"! 🎯\n\n**🏆 TOP DEALS:**\n\n`;
    topProducts.forEach((product, index)=>{
        const emoji = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '💰';
        response += `${emoji} **${product.name}**\n`;
        response += `   💵 $${product.price} on ${product.platform}\n`;
        if (product.url) {
            response += `   [View Product →](${product.url})\n\n`;
        } else {
            response += `   [Search for this product →](https://google.com/search?q=${encodeURIComponent(product.name)})\n\n`;
        }
    });
    response += `**📊 Summary:**\n`;
    response += `• Available on: ${platforms.join(', ')}\n`;
    response += `• Price Range: $${Math.min(...products.map((p)=>p.price))} - $${Math.max(...products.map((p)=>p.price))}\n`;
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
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/Desktop/website/OptiBuy/src/lib/serpapi.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchAmazonProducts",
    ()=>fetchAmazonProducts,
    "fetchGoogleShoppingProducts",
    ()=>fetchGoogleShoppingProducts,
    "fetchSerpApiProducts",
    ()=>fetchSerpApiProducts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/axios/lib/axios.js [app-route] (ecmascript)");
;
const SERPAPI_KEY = process.env.SERPAPI_KEY;
if (!SERPAPI_KEY) {
    console.warn('⚠️ Missing SERPAPI_KEY in environment variables');
}
async function fetchSerpApiProducts(query, engine = 'google_shopping') {
    if (!SERPAPI_KEY) {
        console.warn('SERPAPI_KEY not available, returning empty results');
        return [];
    }
    try {
        const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&engine=${engine}&api_key=${SERPAPI_KEY}`;
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].get(url, {
            timeout: 10000
        });
        const results = response.data.shopping_results || response.data.organic_results || [];
        return results.map((item)=>({
                title: item.title || '',
                price: item.price || '',
                extracted_price: item.extracted_price || 0,
                link: item.link || item.product_link || '',
                source: item.source || 'Unknown',
                rating: item.rating || undefined,
                reviews: item.reviews || undefined,
                thumbnail: item.thumbnail || '',
                position: item.position || 0
            }));
    } catch (error) {
        console.error('SerpAPI error:', error);
        return [];
    }
}
async function fetchAmazonProducts(query) {
    return fetchSerpApiProducts(query, 'amazon');
}
async function fetchGoogleShoppingProducts(query) {
    return fetchSerpApiProducts(query, 'google_shopping');
}
}),
"[project]/Desktop/website/OptiBuy/src/lib/optimized-chat-flow.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "processOptimizedChatFlow",
    ()=>processOptimizedChatFlow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$src$2f$lib$2f$gemini$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/src/lib/gemini.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$src$2f$lib$2f$serpapi$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/src/lib/serpapi.ts [app-route] (ecmascript)");
;
;
async function processOptimizedChatFlow(userMessage, sessionId) {
    console.log(`🚀 Starting optimized chat flow: User → Gemini → SerpAPI`);
    console.log(`📝 User message: "${userMessage}"`);
    try {
        // Step 1: User → Gemini (Initial response)
        console.log(`🤖 Step 1: Getting Gemini response...`);
        const geminiResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$src$2f$lib$2f$gemini$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateGeminiResponse"])(userMessage);
        console.log(`✅ Gemini response received`);
        // Step 2: Check if this is a product search query
        const searchKeywords = [
            'find',
            'search',
            'look for',
            'show me',
            'recommend',
            'best',
            'cheap',
            'deal',
            'buy'
        ];
        const isProductSearch = searchKeywords.some((keyword)=>userMessage.toLowerCase().includes(keyword));
        if (isProductSearch) {
            console.log(`🔍 Detected product search query`);
            // Extract clean product query
            const productQuery = extractProductQuery(userMessage);
            console.log(`🔍 Product query: "${productQuery}"`);
            // Step 2: Fetch from SerpAPI only (skip CSV database)
            console.log(`🌐 Step 2: Fetching products from SerpAPI...`);
            const serpApiProducts = await fetchMultiSourceProducts(productQuery);
            console.log(`📦 Fetched ${serpApiProducts.length} products from SerpAPI`);
            if (serpApiProducts.length > 0) {
                // Step 3: Generate enhanced response with SerpAPI product data
                console.log(`🤖 Step 3: Getting enhanced Gemini response with SerpAPI product data...`);
                // Generate AI response with product context
                const enhancedResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$src$2f$lib$2f$gemini$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateProductAnalysis"])(serpApiProducts, userMessage);
                console.log(`✅ Enhanced Gemini response with SerpAPI product data received`);
                return {
                    response: enhancedResponse,
                    products: serpApiProducts.slice(0, 5).map((product)=>({
                            name: product.name,
                            price: product.price,
                            platform: product.platform,
                            url: product.url,
                            image: product.image,
                            rating: product.rating || 0,
                            reviews: product.reviews || 0,
                            savings: Math.random() * 50 + 10
                        })),
                    sessionId,
                    timestamp: new Date().toISOString()
                };
            } else {
                console.log(`⚠️ No products found from SerpAPI, using fallback response`);
                return {
                    response: geminiResponse,
                    sessionId,
                    timestamp: new Date().toISOString()
                };
            }
        } else {
            // General conversation - just return Gemini response
            console.log(`💬 General conversation, returning Gemini response`);
            return {
                response: geminiResponse,
                sessionId,
                timestamp: new Date().toISOString()
            };
        }
    } catch (error) {
        console.error('❌ Chat flow error:', error);
        return {
            response: "I'm sorry, I'm having trouble processing your request right now. Please try again later.",
            sessionId,
            timestamp: new Date().toISOString()
        };
    }
}
// Helper function to extract product query from user message
function extractProductQuery(message) {
    const lowerMessage = message.toLowerCase();
    // Remove common question words and search terms
    const cleanedMessage = lowerMessage.replace(/\b(find|search|look for|show me|recommend|best|cheap|deal|buy|me)\b/g, '').replace(/\b(under|below|above|over)\s+\$\d+/g, '') // Remove price constraints
    .trim();
    return cleanedMessage || message;
}
// Fetch products from multiple sources
async function fetchMultiSourceProducts(query) {
    console.log(`🔍 Fetching SerpAPI products for: ${query}`);
    try {
        // Fetch from Google Shopping (includes multiple platforms)
        console.log(`🌐 Fetching from Google Shopping...`);
        const googleProducts = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$src$2f$lib$2f$serpapi$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchSerpApiProducts"])(query);
        console.log(`✅ Got ${googleProducts.length} items from Google Shopping`);
        // Transform and combine results
        const allProducts = googleProducts.map((product)=>{
            // Handle price data properly
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
        // Remove duplicates based on URL
        const uniqueProducts = allProducts.filter((product, index, self)=>index === self.findIndex((p)=>p.url === product.url));
        console.log(`🧩 Unique products: ${uniqueProducts.length}`);
        return uniqueProducts;
    } catch (error) {
        console.error('❌ Error fetching products:', error);
        return [];
    }
}
}),
"[project]/Desktop/website/OptiBuy/src/app/api/chat/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/src/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$src$2f$lib$2f$optimized$2d$chat$2d$flow$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/src/lib/optimized-chat-flow.ts [app-route] (ecmascript)");
;
;
;
;
const chatSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    message: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    sessionId: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    userId: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
});
async function POST(request) {
    try {
        const body = await request.json();
        const validatedData = chatSchema.parse(body);
        // Create or find chat session
        let sessionId = validatedData.sessionId;
        if (!sessionId) {
            const newSession = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].chatSession.create({
                data: {
                    userId: validatedData.userId
                }
            });
            sessionId = newSession.id;
        }
        // Save user message
        await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].chatMessage.create({
            data: {
                sessionId,
                role: 'user',
                content: validatedData.message
            }
        });
        // Process through optimized chat flow: User → Gemini → SerpAPI
        console.log(`🚀 Starting optimized chat flow for session: ${sessionId}`);
        const chatResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$src$2f$lib$2f$optimized$2d$chat$2d$flow$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["processOptimizedChatFlow"])(validatedData.message, sessionId);
        // Save AI response
        await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].chatMessage.create({
            data: {
                sessionId,
                role: 'assistant',
                content: chatResult.response
            }
        });
        // Prepare response data
        const responseData = {
            sessionId: chatResult.sessionId,
            response: chatResult.response,
            timestamp: chatResult.timestamp
        };
        // Add products data if available
        if (chatResult.products && chatResult.products.length > 0) {
            responseData.products = chatResult.products;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: responseData
        });
    } catch (error) {
        console.error('Chat API error:', error);
        if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].ZodError) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Invalid request data',
                details: error.errors
            }, {
                status: 400
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const sessionId = searchParams.get('sessionId');
        if (!sessionId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Session ID is required'
            }, {
                status: 400
            });
        }
        const messages = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].chatMessage.findMany({
            where: {
                sessionId
            },
            orderBy: {
                timestamp: 'asc'
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: messages
        });
    } catch (error) {
        console.error('Chat history error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1a6c324d._.js.map