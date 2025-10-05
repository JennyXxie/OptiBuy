# 🔒 Backend Setup Guide - Secure API Keys

This guide will help you set up the backend server to keep your API keys secure and hidden from the frontend.

## 🎯 **Why Use Backend?**

✅ **Security** - API keys are never exposed in the extension  
✅ **Control** - Centralized API management  
✅ **Scalability** - Easy to update without redistributing extension  
✅ **Best Practice** - Industry standard for production apps

---

## 📋 **Prerequisites**

Make sure you have:
- ✅ Node.js installed (v14 or higher)
- ✅ Your API keys ready:
  - Gemini API Key: https://makersuite.google.com/app/apikey
  - SerpAPI Key (optional): https://serpapi.com/

---

## 🚀 **Step 1: Install Backend Dependencies**

Open terminal in the OptiBuy folder and run:

```bash
cd /Users/yunjinxie/Desktop/extension/OptiBuy
npm install express cors @google/generative-ai dotenv node-fetch nodemon
```

---

## 🔑 **Step 2: Create Environment File**

Create a file named `.env.local` in the OptiBuy folder:

```bash
# In the OptiBuy folder, create .env.local
touch .env.local
```

Then add your API keys to `.env.local`:

```env
# Gemini AI API Key (Required)
GEMINI_API_KEY=your_gemini_api_key_here

# SerpAPI Key (Optional - for product search)
SERPAPI_KEY=your_serpapi_key_here

# Server Port (Optional - defaults to 3001)
PORT=3001
```

**⚠️ IMPORTANT:** Replace `your_gemini_api_key_here` with your actual API key!

---

## 🏃 **Step 3: Start Backend Server**

Run the backend server:

```bash
node backend-api.js
```

You should see:
```
🚀 OctiBuy's DealBot API server running on port 3001
📡 Health check: http://localhost:3001/api/health
💬 Chat endpoint: http://localhost:3001/api/chat
🔑 Loading API keys from .env.local...
Gemini API Key: ✅ Found
SerpAPI Key: ✅ Found
```

**✅ If you see "✅ Found" for both keys, you're good to go!**

---

## 🔧 **Step 4: Configure Extension**

1. **Reload Extension:**
   - Go to `chrome://extensions/`
   - Find "OctiBuy's DealBot"
   - Click refresh button 🔄

2. **Open Extension:**
   - Click the OctiBuy's DealBot icon

3. **Configure Backend URL:**
   - Click settings button (⚙️)
   - Backend URL should be: `http://localhost:3001`
   - Click "Save Settings"

4. **Test It:**
   - Status should show "Online" (green dot)
   - Try: "Hello, can you help me find deals?"
   - Should get AI response in 2-3 seconds

---

## ✅ **Verification Checklist**

- [ ] Backend server is running (see console output)
- [ ] API keys are loaded (see ✅ Found messages)
- [ ] Extension is reloaded
- [ ] Backend URL is set to `http://localhost:3001`
- [ ] Status shows "Online"
- [ ] Chat messages get AI responses

---

## 🐛 **Troubleshooting**

### **Problem: "❌ Missing" for API keys**

**Solution:**
1. Check `.env.local` file exists in OptiBuy folder
2. Verify API keys are correct (no extra spaces)
3. Restart backend server: `Ctrl+C` then `node backend-api.js`

### **Problem: Extension shows "Offline"**

**Solution:**
1. Make sure backend server is running
2. Check Backend URL is `http://localhost:3001`
3. Test health endpoint: http://localhost:3001/api/health

### **Problem: "Backend API error: 500"**

**Solution:**
1. Check backend console for errors
2. Verify Gemini API key is valid
3. Check internet connection

### **Problem: No product results**

**Solution:**
1. SerpAPI key might be missing (optional feature)
2. Check SerpAPI quota: https://serpapi.com/dashboard
3. Backend will still work with Gemini-only responses

---

## 🎯 **How It Works**

```
┌─────────────┐
│  Extension  │  (No API keys stored here!)
└──────┬──────┘
       │
       │ HTTP Request
       │
       ▼
┌─────────────┐
│   Backend   │  (API keys stored in .env.local)
│   Server    │
└──────┬──────┘
       │
       ├──► Gemini API (AI responses)
       │
       └──► SerpAPI (Product search)
```

---

## 🔐 **Security Best Practices**

✅ **DO:**
- Keep `.env.local` file private
- Add `.env.local` to `.gitignore`
- Use environment variables for production
- Restart server after changing API keys

❌ **DON'T:**
- Commit `.env.local` to git
- Share API keys publicly
- Hardcode API keys in code
- Use same keys for dev and production

---

## 🚀 **Production Deployment**

For production, deploy the backend to a hosting service:

### **Option 1: Heroku**
```bash
heroku create octibuy-backend
heroku config:set GEMINI_API_KEY=your_key
heroku config:set SERPAPI_KEY=your_key
git push heroku main
```

### **Option 2: Railway**
1. Connect GitHub repo
2. Add environment variables in dashboard
3. Deploy automatically

### **Option 3: Vercel/Netlify**
1. Deploy as serverless function
2. Add environment variables
3. Update extension Backend URL

Then update extension Backend URL to your production URL!

---

## 📝 **Quick Commands**

```bash
# Start backend server
node backend-api.js

# Start with auto-reload (if nodemon installed)
nodemon backend-api.js

# Test health endpoint
curl http://localhost:3001/api/health

# Test chat endpoint
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello"}'
```

---

## 🎉 **You're All Set!**

Your API keys are now secure in the backend! The extension will communicate with your backend server, which handles all API calls securely.

**Need help?** Check the troubleshooting section or review the console logs for error messages.
