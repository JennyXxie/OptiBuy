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
        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-pro'
        });
        const fullPrompt = context ? `Context: ${context}\n\nUser Query: ${prompt}\n\nAs OptiBuy's AI shopping assistant, provide helpful, accurate responses about product recommendations, price comparisons, and shopping advice. Focus on Amazon, Temu, eBay, and Walmart.` : `User Query: ${prompt}\n\nAs OptiBuy's AI shopping assistant, provide helpful, accurate responses about product recommendations, price comparisons, and shopping advice. Focus on Amazon, Temu, eBay, and Walmart.`;
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
async function generateProductAnalysis(products, userQuery, dataSource) {
    try {
        // Check if API key is available
        if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'Gemini_api') {
            console.log('Using fallback product analysis');
            return generateFallbackProductAnalysis(products, userQuery, dataSource);
        }
        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-pro'
        });
        const productData = products.map((p)=>({
                name: p.name,
                price: p.extracted_price || p.price,
                platform: p.platform || p.source,
                rating: p.rating,
                reviews: p.reviews || p.reviews_count,
                url: p.url,
                image: p.image || p.image_url || p.thumbnail
            }));
        const dataSourceInfo = dataSource === 'local' ? 'local database' : dataSource === 'live' ? 'live e-commerce data' : dataSource === 'local+live' ? 'local database + live e-commerce data' : 'product database';
        const prompt = `
    You are an AI agent that compares local product data with live e-commerce offers.
    
    User Query: "${userQuery}"
    Data Source: ${dataSourceInfo}
    
    Products Found:
    ${JSON.stringify(productData, null, 2)}
    
    As an AI shopping assistant, provide a comprehensive analysis including:
    1. Best value recommendations (ranked by price, rating, and availability)
    2. Price comparisons across platforms
    3. Quality indicators (ratings, reviews count)
    4. Platform-specific advantages (Amazon, Walmart, eBay, etc.)
    5. Data freshness note (local vs live data)
    6. Overall recommendation with clear reasoning
    7. Money-saving tips and alternatives
    
    Be concise but informative, and focus on helping the user make the best purchase decision.
    Format your response with clear sections and emojis for better readability.
    `;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Gemini product analysis error:', error);
        return generateFallbackProductAnalysis(products, userQuery, dataSource);
    }
}
function generateFallbackProductAnalysis(products, userQuery, dataSource) {
    if (products.length === 0) {
        return `I couldn't find specific products for "${userQuery}" right now, but I can help you search across different platforms. Try asking about specific products like "wireless headphones" or "laptop deals" and I'll show you the best options!`;
    }
    const bestPrice = Math.min(...products.map((p)=>p.extracted_price || p.price));
    const bestProduct = products.find((p)=>(p.extracted_price || p.price) === bestPrice);
    const platforms = [
        ...new Set(products.map((p)=>p.platform || p.source))
    ];
    // Sort products by price for better presentation
    const sortedProducts = products.sort((a, b)=>(a.extracted_price || a.price) - (b.extracted_price || b.price));
    const topProducts = sortedProducts.slice(0, 8) // Show top 8 deals
    ;
    const dataSourceInfo = dataSource === 'local' ? 'local database' : dataSource === 'live' ? 'live e-commerce data' : dataSource === 'local+live' ? 'local database + live e-commerce data' : 'product database';
    let response = `I found ${products.length} products for "${userQuery}"! 🎯\n`;
    response += `📊 Data Source: ${dataSourceInfo}\n\n`;
    response += `**🏆 TOP DEALS (Ranked by Price, Rating & Reviews):**\n\n`;
    topProducts.forEach((product, index)=>{
        const emoji = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '💰';
        const price = product.extracted_price || product.price;
        const platform = product.platform || product.source;
        const rating = product.rating || 0;
        const reviews = product.reviews || product.reviews_count || 0;
        response += `${emoji} **${product.name}**\n`;
        response += `   💵 $${price} on ${platform}\n`;
        if (rating > 0) response += `   ⭐ ${rating}/5 (${reviews} reviews)\n`;
        response += `   🔗 [View Product →](${product.url})\n\n`;
    });
    response += `**📊 Summary:**\n`;
    response += `• Available on: ${platforms.join(', ')}\n`;
    response += `• Price Range: $${Math.min(...products.map((p)=>p.extracted_price || p.price))} - $${Math.max(...products.map((p)=>p.extracted_price || p.price))}\n`;
    response += `• Best Deal: ${bestProduct?.platform || bestProduct?.source} at $${bestProduct?.extracted_price || bestProduct?.price}\n`;
    response += `• Data Freshness: ${dataSourceInfo}\n\n`;
    response += `**💡 My Recommendation:** ${bestProduct?.platform || bestProduct?.source} has the best price at $${bestProduct?.extracted_price || bestProduct?.price}. `;
    if (bestProduct?.platform?.toLowerCase().includes('temu') || bestProduct?.source?.toLowerCase().includes('temu')) {
        response += 'Temu often has the lowest prices but check shipping times.';
    } else if (bestProduct?.platform?.toLowerCase().includes('ebay') || bestProduct?.source?.toLowerCase().includes('ebay')) {
        response += 'eBay is great for deals, especially refurbished items.';
    } else if (bestProduct?.platform?.toLowerCase().includes('amazon') || bestProduct?.source?.toLowerCase().includes('amazon')) {
        response += 'Amazon offers reliable shipping and easy returns.';
    } else {
        response += 'This is a solid choice with good value.';
    }
    response += `\n\n**🎯 Quick Actions:**\n`;
    response += `• Click any "View Product →" link above to shop directly\n`;
    response += `• Ask me to set up price alerts for any product\n`;
    response += `• Request similar products or specific brands\n`;
    response += `• Compare with other platforms for better deals`;
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
"[project]/Desktop/website/OptiBuy/src/lib/csv-parser.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseCSVProducts",
    ()=>parseCSVProducts,
    "rankProducts",
    ()=>rankProducts,
    "searchCSVProducts",
    ()=>searchCSVProducts
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
function parseCSVProducts() {
    try {
        const csvPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'products_rows.csv');
        const csvContent = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(csvPath, 'utf-8');
        const lines = csvContent.split('\n').filter((line)=>line.trim());
        const headers = lines[0].split(',').map((header)=>header.replace(/"/g, '').trim());
        const products = [];
        for(let i = 1; i < lines.length; i++){
            const values = parseCSVLine(lines[i]);
            if (values.length >= headers.length) {
                const product = {
                    id: values[0] || '',
                    name: values[1] || '',
                    category: values[2] || '',
                    brand: values[3] || '',
                    price: parseFloat(values[4]) || 0,
                    rating: parseFloat(values[5]) || 0,
                    reviews_count: parseInt(values[6]) || 0,
                    source: values[7] || '',
                    url: values[8] || '',
                    description: values[9] || '',
                    image_url: values[10] || '',
                    date_added: values[11] || '',
                    extracted_price: parseFloat(values[12]) || 0,
                    reviews: values[13] || '',
                    thumbnail: values[14] || '',
                    serpapi_product_api: values[15] || ''
                };
                products.push(product);
            }
        }
        console.log(`📊 Loaded ${products.length} products from CSV`);
        return products;
    } catch (error) {
        console.error('❌ Error parsing CSV:', error);
        return [];
    }
}
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    for(let i = 0; i < line.length; i++){
        const char = line[i];
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current.trim());
    return result;
}
function searchCSVProducts(query, products) {
    const searchTerms = query.toLowerCase().split(' ').filter((term)=>term.length > 2);
    return products.filter((product)=>{
        const searchableText = [
            product.name,
            product.category,
            product.brand,
            product.description
        ].join(' ').toLowerCase();
        return searchTerms.some((term)=>searchableText.includes(term));
    });
}
function rankProducts(products) {
    return products.sort((a, b)=>{
        // Primary sort: by price (ascending - cheaper first)
        const priceA = a.extracted_price || a.price || 0;
        const priceB = b.extracted_price || b.price || 0;
        if (priceA !== priceB) {
            return priceA - priceB;
        }
        // Secondary sort: by rating (descending - higher rating first)
        const ratingA = a.rating || 0;
        const ratingB = b.rating || 0;
        if (ratingA !== ratingB) {
            return ratingB - ratingA;
        }
        // Tertiary sort: by reviews count (descending - more reviews first)
        const reviewsA = a.reviews_count || 0;
        const reviewsB = b.reviews_count || 0;
        return reviewsB - reviewsA;
    });
}
}),
"[externals]/punycode [external] (punycode, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("punycode", () => require("punycode"));

module.exports = mod;
}),
"[project]/Desktop/website/OptiBuy/src/lib/supabase.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAllSupabaseProducts",
    ()=>getAllSupabaseProducts,
    "insertProductsToSupabase",
    ()=>insertProductsToSupabase,
    "searchSupabaseProducts",
    ()=>searchSupabaseProducts,
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/module/index.js [app-route] (ecmascript) <locals>");
;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_KEY;
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn('⚠️ Missing Supabase environment variables');
}
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(SUPABASE_URL || '', SUPABASE_ANON_KEY || '');
async function insertProductsToSupabase(products) {
    try {
        if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
            console.warn('⚠️ Supabase not configured, skipping database insert');
            return false;
        }
        const { data, error } = await supabase.from('products').insert(products.map((product)=>({
                ...product,
                date_added: new Date().toISOString()
            })));
        if (error) {
            console.error('❌ Supabase insert error:', error);
            return false;
        }
        console.log(`✅ Inserted ${products.length} products to Supabase`);
        return true;
    } catch (error) {
        console.error('❌ Supabase error:', error);
        return false;
    }
}
async function searchSupabaseProducts(query) {
    try {
        if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
            console.warn('⚠️ Supabase not configured, returning empty results');
            return [];
        }
        const { data, error } = await supabase.from('products').select('*').or(`name.ilike.%${query}%,category.ilike.%${query}%,brand.ilike.%${query}%,description.ilike.%${query}%`).limit(20);
        if (error) {
            console.error('❌ Supabase search error:', error);
            return [];
        }
        console.log(`🔍 Found ${data?.length || 0} products in Supabase`);
        return data || [];
    } catch (error) {
        console.error('❌ Supabase search error:', error);
        return [];
    }
}
async function getAllSupabaseProducts() {
    try {
        if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
            console.warn('⚠️ Supabase not configured, returning empty results');
            return [];
        }
        const { data, error } = await supabase.from('products').select('*').limit(100);
        if (error) {
            console.error('❌ Supabase fetch error:', error);
            return [];
        }
        console.log(`📊 Loaded ${data?.length || 0} products from Supabase`);
        return data || [];
    } catch (error) {
        console.error('❌ Supabase fetch error:', error);
        return [];
    }
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$src$2f$lib$2f$csv$2d$parser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/src/lib/csv-parser.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/src/lib/supabase.ts [app-route] (ecmascript)");
;
;
;
;
async function processOptimizedChatFlow(userMessage, sessionId) {
    console.log(`🚀 Starting AI agent workflow: User → Gemini → CSV/Supabase → SerpApi`);
    console.log(`📝 User message: "${userMessage}"`);
    try {
        // Step 1: Check if this is a product search query
        const searchKeywords = [
            'find',
            'search',
            'look for',
            'show me',
            'recommend',
            'best',
            'cheap',
            'deal',
            'buy',
            'compare',
            'price'
        ];
        const isProductSearch = searchKeywords.some((keyword)=>userMessage.toLowerCase().includes(keyword));
        if (!isProductSearch) {
            // General conversation - just return Gemini response
            console.log(`💬 General conversation, returning Gemini response`);
            const geminiResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$src$2f$lib$2f$gemini$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateGeminiResponse"])(userMessage);
            return {
                response: geminiResponse,
                sessionId,
                timestamp: new Date().toISOString()
            };
        }
        console.log(`🔍 Detected product search query`);
        // Step 2: Extract product query
        const productQuery = extractProductQuery(userMessage);
        console.log(`🔍 Product query: "${productQuery}"`);
        // Step 3: Load local product data from CSV
        console.log(`📁 Step 1: Loading local product data from CSV...`);
        const csvProducts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$src$2f$lib$2f$csv$2d$parser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseCSVProducts"])();
        console.log(`📊 Loaded ${csvProducts.length} products from CSV`);
        // Step 4: Search local CSV data first
        console.log(`🔍 Step 2: Searching local CSV data...`);
        const localResults = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$src$2f$lib$2f$csv$2d$parser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["searchCSVProducts"])(productQuery, csvProducts);
        console.log(`📦 Found ${localResults.length} relevant local products`);
        let allProducts = [];
        let dataSource = 'local';
        if (localResults.length > 0) {
            // Step 5: We have local results - compare with SerpApi for live offers
            console.log(`🌐 Step 3: Comparing with live SerpApi offers...`);
            const serpApiResults = await fetchMultiSourceProducts(productQuery);
            console.log(`🌐 Fetched ${serpApiResults.length} live offers from SerpApi`);
            // Combine and rank all results
            allProducts = [
                ...localResults,
                ...serpApiResults
            ];
            dataSource = 'local+live';
        } else {
            // Step 6: No local results - fetch fresh from SerpApi
            console.log(`🌐 Step 3: No local results, fetching fresh offers from SerpApi...`);
            const serpApiResults = await fetchMultiSourceProducts(productQuery);
            console.log(`🌐 Fetched ${serpApiResults.length} fresh offers from SerpApi`);
            if (serpApiResults.length > 0) {
                // Step 7: Insert new results into Supabase for caching
                console.log(`💾 Step 4: Caching new results in Supabase...`);
                const supabaseProducts = serpApiResults.map((product)=>({
                        name: product.name,
                        category: 'Electronics',
                        brand: extractBrand(product.name),
                        price: product.price,
                        rating: product.rating || 0,
                        reviews_count: product.reviews || 0,
                        source: product.platform,
                        url: product.url,
                        description: product.name,
                        image_url: product.image || '',
                        date_added: new Date().toISOString(),
                        extracted_price: product.price,
                        reviews: '',
                        thumbnail: product.image || '',
                        serpapi_product_api: ''
                    }));
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["insertProductsToSupabase"])(supabaseProducts);
                console.log(`✅ Cached ${supabaseProducts.length} products in Supabase`);
            }
            allProducts = serpApiResults;
            dataSource = 'live';
        }
        // Step 8: Rank all products by price, rating, and availability
        console.log(`🏆 Step 5: Ranking products by price, rating, and availability...`);
        const rankedProducts = rankAllProducts(allProducts);
        console.log(`✅ Ranked ${rankedProducts.length} products`);
        if (rankedProducts.length > 0) {
            // Step 9: Generate enhanced response with ranked product data
            console.log(`🤖 Step 6: Getting enhanced Gemini response with ranked product data...`);
            const enhancedResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$src$2f$lib$2f$gemini$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateProductAnalysis"])(rankedProducts, userMessage, dataSource);
            console.log(`✅ Enhanced Gemini response with ranked product data received`);
            return {
                response: enhancedResponse,
                products: rankedProducts.slice(0, 8).map((product)=>({
                        name: product.name,
                        price: product.price,
                        platform: product.platform || product.source,
                        url: product.url,
                        image: product.image || product.image_url || product.thumbnail,
                        rating: product.rating || 0,
                        reviews: product.reviews || product.reviews_count || 0,
                        savings: calculateSavings(product)
                    })),
                sessionId,
                timestamp: new Date().toISOString()
            };
        } else {
            console.log(`⚠️ No products found, using fallback response`);
            const geminiResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$src$2f$lib$2f$gemini$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateGeminiResponse"])(userMessage);
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
    const cleanedMessage = lowerMessage.replace(/\b(find|search|look for|show me|recommend|best|cheap|deal|buy|me|compare|price)\b/g, '').replace(/\b(under|below|above|over)\s+\$\d+/g, '') // Remove price constraints
    .trim();
    return cleanedMessage || message;
}
// Helper function to extract brand from product name
function extractBrand(productName) {
    const commonBrands = [
        'Sony',
        'Apple',
        'Bose',
        'JBL',
        'Sennheiser',
        'Beats',
        'Skullcandy',
        'Anker',
        'COWIN',
        'JLab',
        'Logitech',
        'Audio Technica',
        'Shokz',
        'Heyday',
        'Insignia',
        'Samsung',
        'Belkin',
        'Koss',
        'VEATOOL',
        'WIGACH',
        'LXX',
        'WeurGhy',
        'CELL EMPIRE',
        'DOGO ENTERPRISES',
        'SwFoer'
    ];
    for (const brand of commonBrands){
        if (productName.toLowerCase().includes(brand.toLowerCase())) {
            return brand;
        }
    }
    return 'Unknown';
}
// Helper function to rank all products (CSV + SerpApi)
function rankAllProducts(products) {
    return products.sort((a, b)=>{
        // Primary sort: by price (ascending - cheaper first)
        const priceA = a.extracted_price || a.price || 0;
        const priceB = b.extracted_price || b.price || 0;
        if (priceA !== priceB) {
            return priceA - priceB;
        }
        // Secondary sort: by rating (descending - higher rating first)
        const ratingA = a.rating || 0;
        const ratingB = b.rating || 0;
        if (ratingA !== ratingB) {
            return ratingB - ratingA;
        }
        // Tertiary sort: by reviews count (descending - more reviews first)
        const reviewsA = a.reviews || a.reviews_count || 0;
        const reviewsB = b.reviews || b.reviews_count || 0;
        return reviewsB - reviewsA;
    });
}
// Helper function to calculate savings
function calculateSavings(_product) {
    // Mock savings calculation - in real implementation, this would compare with MSRP
    return Math.random() * 50 + 10;
}
// Fetch products from multiple sources
async function fetchMultiSourceProducts(query) {
    console.log(`🔍 Fetching combined products for: ${query}`);
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
                url: product.link,
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

//# sourceMappingURL=%5Broot-of-the-server%5D__700ce903._.js.map