# OptiBuy Integration Setup Guide

This guide will help you set up the real AI and data integrations for OptiBuy.

## 🔑 Required API Keys

### 1. Gemini AI (Google)
- Visit: https://makersuite.google.com/app/apikey
- Create a new API key
- Copy the key

### 2. SerpAPI
- Visit: https://serpapi.com/
- Sign up for a free account (100 searches/month free)
- Get your API key from the dashboard

## 🛠️ Environment Setup

Create a `.env.local` file in your project root with:

```env
# Database
DATABASE_URL="file:./dev.db"

# Gemini AI
GEMINI_API_KEY="Gem"

# SerpAPI
SERPAPI_KEY="your_serpapi_key_here"

# NextAuth
NEXTAUTH_SECRET="your_nextauth_secret_here"
NEXTAUTH_URL="http://localhost:3000"
```

## 🚀 Features Implemented

### 1. **Gemini AI Integration**
- **File**: `src/lib/gemini.ts`
- **Features**: 
  - Natural language responses
  - Product analysis and recommendations
  - Context-aware conversations

### 2. **Web Scraping**
- **File**: `src/lib/scrapers.ts`
- **Platforms**: Temu, eBay, Walmart
- **Features**:
  - Real-time price fetching
  - Product information extraction
  - Rating and review data

### 3. **SerpAPI Integration**
- **File**: `src/lib/serpapi.ts`
- **Features**:
  - Google Shopping results
  - Amazon product data
  - Structured product information

### 4. **Unified Product Service**
- **File**: `src/lib/product-service.ts`
- **Features**:
  - Combines all data sources
  - Deduplication and sorting
  - Database caching
  - Price history tracking

## 🧪 Testing the Integration

### Test API Endpoint
Visit: `http://localhost:3000/api/test-integration?query=wireless%20headphones`

### Test Parameters:
- `query`: Product search term
- `type`: `products`, `gemini`, or `all`

### Example Test Requests:
```bash
# Test product search
curl "http://localhost:3000/api/test-integration?query=laptop&type=products"

# Test Gemini AI
curl "http://localhost:3000/api/test-integration?query=smartphone&type=gemini"

# Test everything
curl "http://localhost:3000/api/test-integration?query=wireless%20headphones&type=all"
```

## 🤖 Chat Integration

The chat system now uses:
1. **Gemini AI** for natural language processing
2. **Product Service** for real product data
3. **Smart routing** - product queries get AI analysis of real data
4. **General queries** get Gemini responses

### Example Chat Queries:
- "Find me wireless headphones under $50"
- "Show me laptop deals on Amazon"
- "What's the best smartphone for gaming?"
- "Compare prices for gaming chairs"

## 🔧 API Endpoints

### Chat API
- **Endpoint**: `POST /api/chat`
- **Features**: Gemini AI + Product search integration

### Product Search API
- **Endpoint**: `GET /api/products/search?query=...`
- **Features**: Multi-platform product search

### Test Integration API
- **Endpoint**: `GET /api/test-integration?query=...&type=...`
- **Features**: Test all integrations

## 🚨 Important Notes

### Rate Limits
- **SerpAPI**: 100 free searches/month
- **Gemini**: Check Google's current limits
- **Web Scraping**: Be respectful of robots.txt

### Error Handling
- All services have fallback mechanisms
- API errors won't break the chat experience
- Scraping failures fall back to cached data

### Performance
- Product searches are cached in database
- Scraping results are deduplicated
- API responses are optimized

## 🐛 Troubleshooting

### Common Issues:

1. **"Missing API Key" errors**
   - Check your `.env.local` file
   - Restart the development server
   - Verify API key format

2. **Scraping failures**
   - Some sites may block requests
   - Check network connectivity
   - Verify site accessibility

3. **Gemini API errors**
   - Check API key validity
   - Verify quota limits
   - Check request format

### Debug Mode:
Set `NODE_ENV=development` for detailed logging.

## 🎯 Next Steps

1. **Add your API keys** to `.env.local`
2. **Restart the development server**
3. **Test the integration** using the test endpoint
4. **Try the chat** with product queries
5. **Monitor performance** and adjust as needed

The system is now ready for real-world product search and AI-powered shopping assistance!
