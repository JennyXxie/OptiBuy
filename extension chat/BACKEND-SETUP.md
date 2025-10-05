# OptiBuy DealBot Backend Setup Guide

## 🔒 **API Keys Now Hidden from Frontend!**

Your extension has been updated to use a **secure backend API** approach. API keys are no longer exposed in the frontend - they're safely stored on your server.

## 🚀 **Quick Setup**

### **Step 1: Set Up Backend API**

1. **Install Dependencies:**
   ```bash
   # Rename the backend package file
   mv backend-package.json package.json
   
   # Install dependencies
   npm install
   ```

2. **Configure Environment Variables:**
   ```bash
   # Copy the example environment file
   cp env-example.txt .env
   
   # Edit .env and add your API keys
   nano .env
   ```

3. **Add Your API Keys to .env:**
   ```env
   # Google Gemini API Key (Required)
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   
   # SerpAPI Key (Optional)
   SERPAPI_KEY=your_actual_serpapi_key_here
   
   # Server Configuration
   PORT=3001
   NODE_ENV=development
   ```

4. **Start the Backend Server:**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Or production mode
   npm start
   ```

### **Step 2: Configure Extension**

1. **Load Extension in Chrome:**
   - Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select your OptiBuy extension folder

2. **Configure Backend URL:**
   - Click OptiBuy DealBot icon
   - Click settings button (⚙️)
   - Enter backend URL: `http://localhost:3001`
   - Click "Save Settings"

3. **Test the Extension:**
   - Status should show "Online"
   - Try: "Hello, can you help me find deals?"

## 🔧 **API Endpoints**

Your backend provides these endpoints:

### **Chat Endpoint**
- **URL:** `POST /api/chat`
- **Purpose:** Process chat messages with AI
- **Body:** `{ "message": "user message", "sessionId": "optional" }`

### **Health Check**
- **URL:** `GET /api/health`
- **Purpose:** Check if backend is running
- **Response:** `{ "success": true, "message": "API is running" }`

## 🔒 **Security Features**

### **What's Secure Now:**
- ✅ **API keys stored server-side only**
- ✅ **No API keys in frontend code**
- ✅ **Encrypted environment variables**
- ✅ **Backend handles all API calls**
- ✅ **User never sees API keys**

### **How It Works:**
```
User Message → Extension → Backend API → Gemini/SerpAPI → Backend → Extension → User
```

## 🚀 **Deployment Options**

### **Local Development:**
- Backend runs on `http://localhost:3001`
- Extension connects to local backend
- Perfect for development and testing

### **Production Deployment:**
- Deploy backend to cloud service (Heroku, Vercel, AWS, etc.)
- Update extension settings with production URL
- API keys stay secure on server

### **Example Deployment (Heroku):**
```bash
# Create Heroku app
heroku create optibuy-dealbot-api

# Set environment variables
heroku config:set GEMINI_API_KEY=your_key_here
heroku config:set SERPAPI_KEY=your_key_here

# Deploy
git push heroku main
```

## 🧪 **Testing**

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
2. Send test message: "Hello"
3. Should receive AI response
4. Try: "Find laptop deals" (tests SerpAPI)

## 🔧 **Troubleshooting**

### **Backend Won't Start:**
- ✅ Check if port 3001 is available
- ✅ Verify .env file exists with API keys
- ✅ Run `npm install` to install dependencies

### **Extension Shows "Offline":**
- ✅ Make sure backend is running on localhost:3001
- ✅ Check backend URL in extension settings
- ✅ Verify backend health endpoint works

### **API Errors:**
- ✅ Check API keys in .env file
- ✅ Verify Gemini API quota
- ✅ Check SerpAPI quota (if using)

## 📁 **File Structure**

```
OptiBuy/
├── backend-api.js          # Backend API server
├── package.json            # Backend dependencies
├── .env                    # API keys (your secret file)
├── env-example.txt         # Example environment file
├── manifest.json           # Extension manifest
├── popup.html              # Extension popup (no API keys)
├── popup.js                # Extension logic (calls backend)
├── background.js           # Background script (calls backend)
└── ...                     # Other extension files
```

## 🎯 **Benefits of This Approach**

- 🔒 **Maximum Security:** API keys never leave your server
- 🚀 **Easy Deployment:** Deploy backend anywhere
- 📈 **Scalable:** Handle multiple extension users
- 🛠️ **Maintainable:** Centralized API management
- 💰 **Cost Effective:** No client-side API rate limits

Your extension is now enterprise-ready with secure API key management! 🎉
