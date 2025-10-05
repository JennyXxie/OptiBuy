# OptiBuy DealBot Chrome Extension

A powerful Chrome extension that implements the AI chatbot interface and logic from the OptiBuy docs. This extension provides an AI-powered shopping assistant that helps users find the best deals, compare prices across platforms, and get personalized shopping recommendations.

## 🚀 Features

### Core Chatbot Functionality
- **AI DealBot Assistant**: Chat with an AI shopping assistant powered by Google Gemini
- **Real-time Product Search**: Find products across Amazon, Temu, eBay, Walmart, and more
- **Price Comparison**: Compare prices across multiple e-commerce platforms
- **Smart Recommendations**: Get personalized product recommendations and deal alerts

### Website Integration
- **Floating Button**: Access DealBot from any supported e-commerce website
- **Product Detection**: Automatically detect products on Amazon, Temu, eBay, Walmart, Shein, and more
- **Context Menu**: Right-click integration for quick price comparison and analysis
- **Keyboard Shortcuts**: Use Ctrl/Cmd + Shift + D to quickly open DealBot

### User Interface
- **Modern Chat Interface**: Clean, responsive chat UI with message bubbles
- **Product Display**: Visual product cards with images, prices, and platform information
- **Quick Actions**: Pre-defined quick action buttons for common queries
- **Settings Panel**: Easy configuration of API keys and preferences

## 📦 Installation

### Prerequisites
1. **Google Gemini API Key**: Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **SerpAPI Key** (Optional): Get your API key from [SerpAPI](https://serpapi.com/) for enhanced product search

### Install the Extension

1. **Download or Clone**: Get the extension files to your local machine
2. **Open Chrome Extensions**: Go to `chrome://extensions/`
3. **Enable Developer Mode**: Toggle the "Developer mode" switch in the top right
4. **Load Unpacked**: Click "Load unpacked" and select the extension folder
5. **Configure API Keys**: Click the extension icon and go to Settings to add your API keys

## 🔧 Configuration

### Required Settings

1. **Open the Extension**: Click the OptiBuy DealBot icon in your Chrome toolbar
2. **Access Settings**: Click the settings button (⚙️) in the footer
3. **Add Gemini API Key**: Enter your Google Gemini API key for AI functionality
4. **Add SerpAPI Key** (Optional): Enter your SerpAPI key for enhanced product search
5. **Save Settings**: Click "Save Settings" to store your configuration

### API Key Setup

#### Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key and paste it in the extension settings

#### SerpAPI Key (Optional)
1. Visit [SerpAPI](https://serpapi.com/)
2. Sign up for a free account (100 searches/month)
3. Get your API key from the dashboard
4. Copy the key and paste it in the extension settings

## 🎯 Usage

### Basic Chat
1. Click the OptiBuy DealBot icon to open the chat interface
2. Type your question or request in the input field
3. Press Enter or click the send button
4. DealBot will respond with AI-powered recommendations

### Quick Actions
Use the pre-defined quick action buttons:
- 💻 **Laptop deals**: Find the best laptop deals
- 🎧 **Headphones**: Search for wireless headphones under $50
- 🔥 **Today's deals**: Get today's best deals
- 📱 **iPhone prices**: Compare iPhone prices across platforms

### Website Integration

#### Floating Button
- A floating DealBot button appears on supported e-commerce websites
- Click the button to get AI assistance with the current product

#### Context Menu
- Right-click on any product page to see DealBot options:
  - 🔍 **Compare Prices**: Compare the product across platforms
  - 🤖 **Analyze with AI**: Get AI analysis of the product and deal
  - 🔔 **Set Price Alert**: Set up price alerts for the product

#### Keyboard Shortcuts
- **Ctrl/Cmd + Shift + D**: Open DealBot from any page

### Supported Websites
- **Amazon**: All Amazon domains (amazon.com, amazon.ca, etc.)
- **Temu**: All Temu domains
- **eBay**: All eBay domains
- **Walmart**: Walmart.com and regional sites
- **Shein**: Shein.com and regional sites
- **Target**: Target.com
- **Best Buy**: BestBuy.com
- **Home Depot**: HomeDepot.com

## 🤖 AI Capabilities

### Product Search & Comparison
- Find products across multiple platforms
- Compare prices in real-time
- Analyze product quality and reviews
- Recommend best value options

### Shopping Assistance
- Answer questions about products
- Provide buying advice and recommendations
- Help with product specifications
- Suggest alternatives and similar items

### Deal Detection
- Identify current deals and discounts
- Track price history and trends
- Set up price alerts
- Find coupon codes and promotions

## 🛠️ Technical Details

### Architecture
- **Manifest V3**: Uses the latest Chrome extension API
- **Background Service Worker**: Handles API communication and data processing
- **Content Scripts**: Integrate with e-commerce websites
- **Popup Interface**: Clean, responsive chat interface

### APIs Used
- **Google Gemini**: AI language model for natural language processing
- **SerpAPI**: Product search and price comparison
- **Chrome Extension APIs**: Storage, tabs, and messaging

### Data Storage
- **Chrome Storage Sync**: Settings and preferences (synced across devices)
- **Chrome Storage Local**: Chat history and temporary data

## 🔒 Privacy & Security

### Data Handling
- API keys are stored securely in Chrome's sync storage
- Chat history is stored locally on your device
- No personal data is sent to third-party services (except APIs you configure)

### Permissions
- **Storage**: Save settings and chat history
- **Active Tab**: Access current website information
- **Tabs**: Open popup and communicate with content scripts
- **Web Request**: Make API calls to Gemini and SerpAPI

## 🐛 Troubleshooting

### Common Issues

#### "API Key Not Configured" Error
- Make sure you've added your Gemini API key in settings
- Verify the API key is correct and active
- Check if you have API quota remaining

#### Extension Not Working on Websites
- Ensure the website is supported (Amazon, Temu, eBay, etc.)
- Refresh the page after installing the extension
- Check if the floating button appears in the bottom-right corner

#### No Product Results
- Verify your SerpAPI key is configured (optional but recommended)
- Check if you have remaining SerpAPI searches
- Try different search terms or product names

#### Chat Not Responding
- Check your internet connection
- Verify your Gemini API key is working
- Try refreshing the extension or restarting Chrome

### Debug Mode
1. Open Chrome Developer Tools (F12)
2. Go to the Console tab
3. Look for OptiBuy-related error messages
4. Check the Extensions page for any error notifications

## 📝 Development

### File Structure
```
OptiBuy/
├── manifest.json          # Extension manifest
├── popup.html            # Popup interface
├── popup.css             # Popup styles
├── popup.js              # Popup functionality
├── background.js         # Background service worker
├── content.js            # Content script
├── content.css           # Content script styles
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── README.md             # This file
```

### Key Components

#### Background Script (`background.js`)
- Handles API communication with Gemini and SerpAPI
- Processes chat messages and product searches
- Manages extension storage and settings

#### Popup Interface (`popup.html`, `popup.css`, `popup.js`)
- Chat interface with message bubbles
- Product display and quick actions
- Settings panel for API configuration

#### Content Script (`content.js`, `content.css`)
- Detects products on e-commerce websites
- Provides floating button and context menu
- Extracts product information for analysis

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with the Chrome Extension Manifest V3 API
- AI powered by Google Gemini
- Product search powered by SerpAPI
- Inspired by the OptiBuy web application

---

**OptiBuy DealBot** - Never overpay again! 💰