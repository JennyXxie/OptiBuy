# 🚀 Quick Setup Guide - Fix API Keys Issue

## 🔧 **Step 1: Create Environment File**

Create a `.env.local` file in your OptiBuy directory with your API keys:

```bash
# Create .env.local file
touch .env.local
```

Add this content to `.env.local`:
```env
# Google Gemini API Key (Required)
GEMINI_API_KEY=your_actual_gemini_api_key_here

# SerpAPI Key (Optional)
SERPAPI_KEY=your_actual_serpapi_key_here

# Server Configuration
PORT=3001
NODE_ENV=development
```

## 🔑 **Step 2: Get Your API Keys**

### **Gemini API Key (Required):**
1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key (starts with `AIza...`)
5. Replace `your_actual_gemini_api_key_here` in `.env.local`

### **SerpAPI Key (Optional):**
1. Go to: https://serpapi.com/
2. Sign up for free account
3. Get API key from dashboard
4. Replace `your_actual_serpapi_key_here` in `.env.local`

## 📦 **Step 3: Install Dependencies**

```bash
# Rename backend package file
mv backend-package.json package.json

# Install dependencies
npm install
```

## 🚀 **Step 4: Start Backend Server**

```bash
# Start in development mode
npm run dev

# Or start in production mode
npm start
```

You should see:
```
🔑 Loading API keys from .env.local...
Gemini API Key: ✅ Found
SerpAPI Key: ✅ Found
🚀 OptiBuy DealBot API server running on port 3001
```

## 🔧 **Step 5: Configure Extension**

1. **Load Extension in Chrome:**
   - Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select your OptiBuy extension folder

2. **Set Backend URL:**
   - Click OptiBuy DealBot icon
   - Click settings button (⚙️)
   - Enter backend URL: `http://localhost:3001`
   - Click "Save Settings"

## 🧪 **Step 6: Test Everything**

### **Test Backend API:**
```bash
# Health check
curl http://localhost:3001/api/health

# Chat test
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, can you help me find deals?"}'
```

### **Test Extension:**
1. Open extension popup
2. Send message: "Hello"
3. Should receive AI response
4. Try: "Find laptop deals" (tests SerpAPI)

## 🐛 **Troubleshooting**

### **"Gemini API Key: ❌ Missing"**
- ✅ Check `.env.local` file exists
- ✅ Verify `GEMINI_API_KEY=your_actual_key` (no spaces around =)
- ✅ Make sure key starts with `AIza...`

### **"Backend URL not configured"**
- ✅ Set backend URL in extension settings
- ✅ Use: `http://localhost:3001`

### **"Backend API error: 500"**
- ✅ Check if backend server is running
- ✅ Verify API keys are correct
- ✅ Check backend console for error messages

### **Extension shows "Offline"**
- ✅ Backend server must be running
- ✅ Backend URL must be set in extension
- ✅ Try refreshing the extension

## ✅ **Expected Result**

When everything works:
- ✅ Backend shows "Gemini API Key: ✅ Found"
- ✅ Extension shows "Online" status
- ✅ Chat messages get AI responses
- ✅ Product searches return real results

Your API keys are now secure on the backend server! 🎉
