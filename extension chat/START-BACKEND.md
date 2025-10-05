# 🚀 Start Backend Server - Quick Guide

Your `.env.local` file is ready with API keys! Now let's start the backend.

---

## ✅ **Method 1: Using the Startup Script (Easiest)**

Open your terminal and run:

```bash
cd /Users/yunjinxie/Desktop/extension/OptiBuy
chmod +x start-backend.sh
./start-backend.sh
```

This will:
1. Install dependencies automatically
2. Check for `.env.local` file
3. Start the backend server

---

## ✅ **Method 2: Manual Start**

### **Step 1: Install Dependencies**

```bash
cd /Users/yunjinxie/Desktop/extension/OptiBuy
npm install express cors @google/generative-ai dotenv node-fetch
```

### **Step 2: Start Server**

```bash
node backend-api.js
```

---

## 🎯 **What You Should See:**

When the server starts successfully, you'll see:

```
🚀 OctiBuy's DealBot API server running on port 3001
📡 Health check: http://localhost:3001/api/health
💬 Chat endpoint: http://localhost:3001/api/chat
🔑 Loading API keys from .env.local...
Gemini API Key: ✅ Found
SerpAPI Key: ✅ Found
```

**✅ If you see "✅ Found" - you're good to go!**

---

## 🔧 **Configure Extension:**

Once the backend is running:

1. **Open Chrome:** `chrome://extensions/`
2. **Reload Extension:** Click refresh on "OctiBuy's DealBot"
3. **Open Extension:** Click the OctiBuy icon
4. **Open Settings:** Click ⚙️ button
5. **Set Backend URL:** `http://localhost:3001`
6. **Save Settings**
7. **Verify:** Status should show "Online" (green dot)

---

## ✅ **Test It:**

1. Type: "Hello, can you help me find laptop deals?"
2. Should get AI response in 2-3 seconds
3. No more "always thinking" issue!

---

## 🐛 **Troubleshooting:**

### **"Cannot find module 'express'"**
```bash
npm install express cors @google/generative-ai dotenv node-fetch
```

### **"❌ Missing" for API keys**
- Check `.env.local` exists in OptiBuy folder
- Verify no extra spaces in API keys
- Restart server

### **Port already in use**
```bash
# Kill existing process on port 3001
lsof -ti:3001 | xargs kill -9
# Then restart
node backend-api.js
```

---

## 🎉 **You're Ready!**

Your backend server will now handle all API calls securely with your keys hidden from the extension!
