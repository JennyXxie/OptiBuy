# 🔧 Chrome Extension Troubleshooting Guide

## ✅ Fixed Issues

### 1. Service Worker Registration Error
**Problem**: `Service worker registration failed. Status code: 15`
**Solution**: ✅ Fixed by removing `"type": "module"` from manifest.json

### 2. ImportScripts Module Error  
**Problem**: `Module scripts don't support importScripts()`
**Solution**: ✅ Fixed by updating database.js to work with service workers

## 🚀 How to Load the Extension

### Step 1: Open Chrome Extensions
1. Open Chrome browser
2. Go to `chrome://extensions/`
3. Enable **Developer mode** (toggle in top right corner)

### Step 2: Load the Extension
1. Click **Load unpacked**
2. Navigate to: `/Users/yunjinxie/Desktop/chatbot 2`
3. Select the folder and click **Select Folder**

### Step 3: Verify Installation
- The extension should appear in the extensions list
- No error messages should be shown
- The extension icon should appear in the Chrome toolbar

## 🔍 Testing the Extension

### Test 1: Basic Functionality
1. Click the extension icon in the toolbar
2. You should see the shopping assistant popup
3. Try searching for "iPhone 15"
4. Complete the slot-filling dialog
5. Verify results are displayed

### Test 2: Database Integration
1. Search for products multiple times
2. Check Chrome DevTools Console (F12) for database messages
3. Look for "Supabase client initialized successfully" message
4. If database fails, it will fall back to mock data

### Test 3: Price Tracking
1. Search for products
2. Click "Yes" when asked about price tracking
3. Check that tracking is enabled
4. Monitor background script activity

## 🐛 Common Issues & Solutions

### Issue: Extension Not Loading
**Symptoms**: Extension doesn't appear in Chrome toolbar
**Solutions**:
- Check that all files are in the correct directory
- Verify manifest.json is valid JSON
- Ensure Developer mode is enabled
- Try refreshing the extensions page

### Issue: Popup Not Opening
**Symptoms**: Clicking extension icon does nothing
**Solutions**:
- Check for JavaScript errors in DevTools Console
- Verify popup.html exists and is valid
- Check that popup.js loads without errors
- Try reloading the extension

### Issue: Database Connection Failed
**Symptoms**: "Supabase not available" messages in console
**Solutions**:
- Check internet connection
- Verify Supabase project is active
- Check API key is correct
- Extension will fall back to mock data

### Issue: Price Tracking Not Working
**Symptoms**: No price drop notifications
**Solutions**:
- Check that notifications permission is granted
- Verify background script is running
- Check for errors in background script
- Ensure products are being tracked

## 🔧 Debug Steps

### Step 1: Check Console Errors
1. Open Chrome DevTools (F12)
2. Go to **Console** tab
3. Look for any red error messages
4. Check both popup and background script logs

### Step 2: Check Extension Details
1. Go to `chrome://extensions/`
2. Find "Shopping Price Tracker"
3. Click **Details**
4. Check permissions and errors

### Step 3: Check Service Worker
1. In extension details, click **Inspect views: background page**
2. Check for errors in the service worker console
3. Look for database initialization messages

### Step 4: Test Individual Components
1. **Popup**: Click extension icon, check if popup opens
2. **Database**: Look for Supabase connection messages
3. **Content Script**: Visit Amazon/Temu/Shein, check for product extraction
4. **Background**: Check service worker is running

## 📊 Expected Console Messages

### Successful Loading:
```
Supabase client initialized successfully
Shopping Price Tracker background script loaded
```

### Database Operations:
```
Searching products in database...
Products found: 3
Adding product to database...
Price tracking enabled for 2 products
```

### Fallback Mode:
```
Supabase not available, using mock data
Database connection failed, using local storage
```

## 🚨 Error Codes

### Status Code 15
- **Meaning**: Service worker registration failed
- **Solution**: ✅ Fixed by removing module type

### ImportScripts Error
- **Meaning**: Cannot use importScripts in module context
- **Solution**: ✅ Fixed by updating database.js

### Permission Denied
- **Meaning**: Extension lacks required permissions
- **Solution**: Check manifest.json permissions

## 📞 Getting Help

If you're still experiencing issues:

1. **Check the Console**: Look for specific error messages
2. **Verify Setup**: Ensure all files are present and correct
3. **Test Incrementally**: Test each component separately
4. **Check Permissions**: Verify all required permissions are granted

## ✅ Success Indicators

Your extension is working correctly when you see:
- ✅ Extension icon appears in Chrome toolbar
- ✅ Popup opens when clicking the icon
- ✅ Slot-filling dialog works step by step
- ✅ Search results are displayed
- ✅ Price tracking can be enabled
- ✅ No error messages in console

---

**The extension should now load without errors! 🎉**

If you're still having issues, please share the specific error messages you're seeing in the Chrome DevTools Console.
