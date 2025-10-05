# 🐛 Troubleshooting - No Response After 5 Minutes

If your chatbot isn't responding, follow these steps:

---

## 🔍 **Step 1: Run Diagnostic Test**

Open Terminal and run:

```bash
cd /Users/yunjinxie/Desktop/extension/OptiBuy
node test-backend.js
```

This will check:
- ✅ .env.local file is loaded
- ✅ API keys are present
- ✅ Gemini API connection works
- ✅ Required packages are installed

**Look for any ❌ errors and fix them first!**

---

## 🚨 **Common Issues & Fixes:**

### **Issue 1: Backend Not Running**

**Symptoms:** Extension shows "Offline" or "Backend API error"

**Fix:**
```bash
cd /Users/yunjinxie/Desktop/extension/OptiBuy
node backend-api.js
```

Keep this terminal window open! The backend must stay running.

---

### **Issue 2: Invalid API Key**

**Symptoms:** "API_KEY_INVALID" error in backend console

**Fix:**
1. Get a new Gemini API key: https://makersuite.google.com/app/apikey
2. Open `.env.local` in OptiBuy folder
3. Replace the `GEMINI_API_KEY` value
4. Restart backend: `Ctrl+C` then `node backend-api.js`

---

### **Issue 3: Missing Dependencies**

**Symptoms:** "Cannot find module 'express'" or similar errors

**Fix:**
```bash
cd /Users/yunjinxie/Desktop/extension/OptiBuy
npm install express cors @google/generative-ai dotenv node-fetch
```

Then restart backend: `node backend-api.js`

---

### **Issue 4: Wrong Backend URL**

**Symptoms:** Extension shows "Online" but no response

**Fix:**
1. Click OctiBuy icon
2. Click settings ⚙️
3. Check Backend URL is **exactly**: `http://localhost:3001`
4. Save settings
5. Try again

---

### **Issue 5: Port Already in Use**

**Symptoms:** "Error: listen EADDRINUSE: address already in use :::3001"

**Fix:**
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9

# Restart backend
node backend-api.js
```

---

### **Issue 6: CORS Error**

**Symptoms:** Console shows "CORS policy" error

**Fix:** Backend should already have CORS enabled. If not, check that `backend-api.js` has:
```javascript
app.use(cors());
```

---

## 🔄 **Quick Reset (If Nothing Works):**

### **Option A: Use Fallback Version (No Backend Needed)**

This version works without a backend server:

```bash
cd /Users/yunjinxie/Desktop/extension/OptiBuy
cp background-fallback.js background.js
cp popup-fallback.html popup.html
```

Then:
1. Reload extension in Chrome
2. Click OctiBuy icon
3. Click settings ⚙️
4. Add your Gemini API key directly
5. Save and test

**Note:** This stores API keys in the extension (less secure but easier for testing)

---

### **Option B: Fresh Backend Start**

```bash
cd /Users/yunjinxie/Desktop/extension/OptiBuy

# Kill any existing backend
lsof -ti:3001 | xargs kill -9

# Reinstall dependencies
rm -rf node_modules
npm install express cors @google/generative-ai dotenv node-fetch

# Start backend
node backend-api.js
```

---

## 📊 **Check Backend Health:**

While backend is running, open in your browser:
http://localhost:3001/api/health

**Should see:**
```json
{
  "success": true,
  "message": "OctiBuy's DealBot API is running",
  "timestamp": "2025-10-05T..."
}
```

If this doesn't work, the backend isn't running properly.

---

## 🧪 **Test Backend Directly:**

Test the chat endpoint with curl:

```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello"}'
```

**Should see:** JSON response with AI message

**If error:** Check backend console for error messages

---

## 📝 **Checklist:**

- [ ] Backend server is running (`node backend-api.js`)
- [ ] Console shows "✅ Found" for Gemini API key
- [ ] http://localhost:3001/api/health returns success
- [ ] Extension is reloaded in Chrome
- [ ] Extension settings has Backend URL: `http://localhost:3001`
- [ ] Extension status shows "Online" (green dot)
- [ ] No errors in Chrome DevTools console (F12)
- [ ] No errors in backend terminal

---

## 🆘 **Still Not Working?**

### **Check Extension Console:**
1. Right-click OctiBuy icon → "Inspect popup"
2. Go to Console tab
3. Look for error messages
4. Share the error message for help

### **Check Backend Console:**
Look at the terminal where backend is running for error messages.

### **Common Error Messages:**

**"Failed to fetch"** → Backend not running or wrong URL
**"API_KEY_INVALID"** → Get new Gemini API key
**"ECONNREFUSED"** → Backend not started
**"500 Internal Server Error"** → Check backend console for details

---

## 💡 **Quick Test Command:**

Run this all-in-one test:

```bash
cd /Users/yunjinxie/Desktop/extension/OptiBuy && \
node test-backend.js && \
echo "---" && \
echo "Starting backend..." && \
node backend-api.js
```

This will test everything then start the backend if tests pass!
