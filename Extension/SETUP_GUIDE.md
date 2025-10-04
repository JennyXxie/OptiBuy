# 🛍️ Shopping Price Tracker - Supabase Integration Setup Guide

## Overview
Your Chrome extension now integrates with Supabase for real database functionality, replacing the mock data with persistent storage for products, price tracking, and search history.

## 🗄️ Database Setup

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `shopping-price-tracker`
   - **Database Password**: Choose a strong password
   - **Region**: Select closest to your users

### Step 2: Set Up Database Schema
1. In your Supabase dashboard, go to **SQL Editor**
2. Copy and paste the entire contents of `database_schema.sql`
3. Click **Run** to execute the schema creation
4. This will create all necessary tables, indexes, and sample data

### Step 3: Configure API Access
1. Go to **Settings** → **API** in your Supabase dashboard
2. Copy your **Project URL** and **anon public key**
3. The extension is already configured with your API key:
   - **Project URL**: `https://ldyugkhxqygmdlbxhajun.supabase.co`
   - **API Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## 🔧 Extension Installation

### Step 1: Load Extension in Chrome
1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top right)
3. Click **Load unpacked**
4. Select the extension folder: `/Users/yunjinxie/Desktop/chatbot 2`

### Step 2: Grant Permissions
The extension will request permissions for:
- **Active Tab**: To interact with e-commerce sites
- **Storage**: To save user preferences
- **Scripting**: To inject content scripts
- **Notifications**: To show price drop alerts
- **Host Permissions**: For Amazon, Temu, and Shein

## 🚀 Features Now Available

### ✅ Real Database Integration
- **Product Storage**: All searched products are saved to Supabase
- **Price History**: Track price changes over time
- **Search History**: Remember user search patterns
- **Persistent Tracking**: Price tracking survives browser restarts

### ✅ Enhanced Search
- **Database-First**: Searches real database before generating mock data
- **Smart Fallback**: If no database results, generates and saves mock data
- **Filtered Results**: Apply rating, source, and description filters
- **Search Analytics**: Track search patterns and results

### ✅ Advanced Price Tracking
- **Database-Backed**: All tracking data stored in Supabase
- **Price History**: Complete price change timeline
- **Smart Notifications**: Only notify on significant price drops
- **Cross-Device Sync**: Tracking data syncs across devices

## 📊 Database Tables

### `products`
- Stores all product information
- Includes name, price, rating, source, availability
- Tracks original price and current price
- Categorizes by brand and category

### `price_history`
- Records all price changes over time
- Links to products via foreign key
- Tracks source of price update (manual, monitor, content script)
- Enables price trend analysis

### `tracked_products`
- Manages user's price tracking preferences
- Links to products being tracked
- Configurable notification thresholds
- Tracks last check time and frequency

### `search_history`
- Records all user searches
- Stores search filters and result counts
- Enables search analytics and recommendations
- Tracks search patterns over time

## 🔍 Testing the Integration

### Test Product Search
1. Click the extension icon
2. Search for "iPhone 15" or "Gaming Laptop"
3. Check that results are saved to database
4. Verify search history is recorded

### Test Price Tracking
1. Search for products
2. Click "Yes" when asked about price tracking
3. Check that products are added to `tracked_products` table
4. Verify price monitoring works in background

### Test Database Queries
1. Go to Supabase dashboard → **Table Editor**
2. View data in each table:
   - `products`: See searched products
   - `price_history`: See price changes
   - `tracked_products`: See active tracking
   - `search_history`: See search patterns

## 🛠️ Troubleshooting

### Common Issues

**Extension Not Loading**
- Check that all files are in the correct directory
- Verify manifest.json syntax
- Check Chrome developer console for errors

**Database Connection Failed**
- Verify Supabase project is active
- Check API key is correct
- Ensure database schema is properly set up
- Check browser console for connection errors

**No Search Results**
- Check if products exist in database
- Verify search filters are working
- Check database logs in Supabase dashboard

**Price Tracking Not Working**
- Verify `tracked_products` table has entries
- Check background script is running
- Ensure notifications permission is granted

### Debug Mode
1. Open Chrome DevTools (F12)
2. Go to **Console** tab
3. Look for database connection messages
4. Check for any error messages

## 📈 Monitoring & Analytics

### Supabase Dashboard
- **Table Editor**: View and edit data
- **SQL Editor**: Run custom queries
- **Logs**: Monitor database activity
- **API**: Check API usage and limits

### Extension Analytics
- Search frequency and patterns
- Most tracked products
- Price drop notifications sent
- User engagement metrics

## 🔒 Security & Privacy

### Data Protection
- All data encrypted in transit and at rest
- Row Level Security (RLS) enabled
- Anonymous access only (no user accounts)
- No personal information stored

### API Security
- API key is public (safe for client-side use)
- RLS policies control data access
- Rate limiting prevents abuse
- CORS configured for extension domains

## 🚀 Next Steps

### Potential Enhancements
1. **User Accounts**: Add user authentication
2. **Advanced Analytics**: Price trend charts
3. **Email Notifications**: Price drop alerts via email
4. **Mobile App**: Companion mobile application
5. **API Integration**: Real e-commerce APIs
6. **Machine Learning**: Price prediction algorithms

### Performance Optimization
1. **Caching**: Implement client-side caching
2. **Pagination**: Handle large result sets
3. **Background Sync**: Optimize price checking
4. **Database Indexing**: Optimize query performance

---

**Your Shopping Price Tracker is now fully integrated with Supabase! 🎉**

The extension will now:
- ✅ Store all data in a real database
- ✅ Track prices persistently across sessions
- ✅ Provide detailed search analytics
- ✅ Scale to handle thousands of products
- ✅ Sync data across devices

Happy shopping! 🛍️💰
