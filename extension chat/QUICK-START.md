# ⚡ Quick Start - Backend with Secure API Keys

## 🎯 **3-Step Setup**

### **Step 1: Create `.env.local` file**
```bash
# In OptiBuy folder
echo 'GEMINI_API_KEY=your_gemini_key_here
SERPAPI_KEY=your_serpapi_key_here
PORT=3001' > .env.local
```

### **Step 2: Install & Start Backend**
```bash
npm install express cors @google/generative-ai dotenv node-fetch
node backend-api.js
```

### **Step 3: Configure Extension**
1. Reload extension in `chrome://extensions/`
2. Open OctiBuy's DealBot
3. Click settings ⚙️
4. Backend URL: `http://localhost:3001`
5. Save settings

---

## ✅ **Verify It's Working**

You should see:
- ✅ Backend console: "✅ Found" for API keys
- ✅ Extension status: "Online" (green dot)
- ✅ Chat works: Get AI responses in 2-3 seconds

---

## 🔑 **Get Your API Keys**

- **Gemini API:** https://makersuite.google.com/app/apikey
- **SerpAPI:** https://serpapi.com/ (optional)

---

## 🐛 **Quick Fixes**

**Extension shows "Offline"?**
- Make sure backend is running: `node backend-api.js`
- Check Backend URL: `http://localhost:3001`

**API keys not found?**
- Check `.env.local` exists in OptiBuy folder
- Restart backend: `Ctrl+C` then `node backend-api.js`

---

## 🔒 **Security Benefits**

✅ API keys stored in backend (`.env.local`)  
✅ Never exposed in extension  
✅ Can't be extracted by users  
✅ Industry best practice

---

**Full guide:** See `BACKEND-SETUP-GUIDE.md` for detailed instructions!
