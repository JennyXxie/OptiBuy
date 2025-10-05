# API Setup Guide for OptiBuy DealBot

## 🚨 Current Issue
Your extension shows "Offline" status because no Gemini API key is configured.

## 🔑 Step 1: Get Gemini API Key (REQUIRED)

### Option A: Quick Setup (Recommended)
1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key (starts with `AIza...`)
5. Paste it in the extension settings

### Option B: Alternative Method
1. Go to: https://aistudio.google.com/app/apikey
2. Sign in with Google account
3. Create new API key
4. Copy and use in extension

## 🔍 Step 2: Get SerpAPI Key (OPTIONAL)

### For Enhanced Product Search
1. Go to: https://serpapi.com/
2. Sign up for free account
3. Get your API key from dashboard
4. Add to extension settings

## ⚙️ Step 3: Configure in Extension

1. **Open Extension Popup**
2. **Click Settings Button** (⚙️) in footer
3. **Enter Gemini API Key** in first field
4. **Enter SerpAPI Key** in second field (optional)
5. **Click "Save Settings"**
6. **Status should change to "Online"**

## 🧪 Step 4: Test

Try these test messages:
- "Hello" - Should work with Gemini
- "Find laptop deals" - Should work with SerpAPI (if configured)

## 🐛 Troubleshooting

### Still showing "Offline"?
- ✅ Make sure you clicked "Save Settings"
- ✅ Verify API key is complete (no missing characters)
- ✅ Check API key format (should start with `AIza...`)

### API Errors?
- ✅ Check if you have remaining Gemini quota
- ✅ Verify API key is active
- ✅ Try refreshing the extension

### No Product Results?
- ✅ SerpAPI is optional - extension works without it
- ✅ Check SerpAPI quota (100 free searches/month)
