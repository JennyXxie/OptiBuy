# Chrome Extension API Setup Guide

## 🚨 Important: Chrome Extensions ≠ Web Applications

Chrome extensions **cannot** use:
- ❌ `.env.local` files
- ❌ Server-side environment variables
- ❌ NextAuth secrets
- ❌ Node.js environment variables

Chrome extensions **must** use:
- ✅ Chrome Storage API
- ✅ User-entered API keys
- ✅ Client-side storage (encrypted)

## 🔑 How to Get Your API Keys

### Gemini API Key (Required)
1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key (starts with `AIza...`)

### SerpAPI Key (Optional)
1. Go to: https://serpapi.com/
2. Sign up for free account
3. Get API key from dashboard
4. Copy the key

## ⚙️ Configure in Extension

### Method 1: Extension Popup (Recommended)
1. Click OptiBuy DealBot icon in Chrome toolbar
2. Click settings button (⚙️) in footer
3. Enter API keys in fields
4. Click "Save Settings"

### Method 2: Programmatic Setup (For Testing)
```javascript
// Run this in Chrome DevTools Console
chrome.storage.sync.set({
  geminiApiKey: 'your-gemini-api-key-here',
  serpApiKey: 'your-serpapi-key-here'
});
```

## 🔒 Security Features

### What Makes It Secure:
- ✅ API keys stored in Chrome's encrypted sync storage
- ✅ Only accessible by the extension (not websites)
- ✅ User controls their own keys
- ✅ Keys are not publicly accessible
- ✅ No server-side exposure

### What You DON'T Need:
- ❌ NextAuth secrets (not applicable to extensions)
- ❌ Server-side authentication
- ❌ Environment variables
- ❌ Public API endpoints

## 🧪 Testing Your Setup

1. **Add API keys** via extension settings
2. **Test with message:** "Hello, can you help me find deals?"
3. **Should see:** AI response from Gemini
4. **Status should show:** "Online" instead of "Offline"

## 🚀 Why This Approach is Better

### For Chrome Extensions:
- ✅ **User Control:** Each user manages their own API keys
- ✅ **No Server Costs:** No backend server needed
- ✅ **Privacy:** Keys stay in user's browser
- ✅ **Scalability:** No server-side API rate limits
- ✅ **Security:** Encrypted local storage

### vs Web Application:
- ❌ Web apps need server-side API key management
- ❌ Server costs and complexity
- ❌ Rate limiting and quota management
- ❌ Authentication and user management
