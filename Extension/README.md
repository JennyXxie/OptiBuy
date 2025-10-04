# Shopping Price Tracker Chrome Extension

A Chrome extension that helps users track product prices across multiple e-commerce platforms including Amazon, Temu, and Shein.

## Features

### 🛍️ Product Search & Comparison
- **Slot-filling dialog** for collecting product search criteria
- **Multi-platform search** across Amazon, Temu, and Shein
- **Smart filtering** by rating, platform, and description needs
- **Price comparison** with discount calculations
- **Availability tracking** for in-stock products

### 📊 Price Tracking
- **Automatic price monitoring** every 30 minutes
- **Price drop notifications** with percentage changes
- **Price history tracking** for trend analysis
- **One-click product tracking** from search results

### 🎯 User Experience
- **Intuitive step-by-step interface** for product search
- **Confirmation summary** before showing results
- **JSON + natural language output** for both machine and human readability
- **Modern, responsive design** with smooth animations

## Installation

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The extension icon should appear in your Chrome toolbar

## Usage

### Basic Product Search
1. Click the extension icon in your Chrome toolbar
2. Enter the product name you're looking for
3. Choose your preferences for rating, platforms, and description level
4. Review your search criteria and confirm
5. View results with prices, ratings, and availability

### Price Tracking
1. After viewing search results, click "Yes" when asked about price tracking
2. The extension will monitor prices every 30 minutes
3. You'll receive notifications when prices drop
4. Click notifications to view products or stop tracking

### Supported Platforms
- **Amazon** - Full product extraction and price tracking
- **Temu** - Product search and price monitoring
- **Shein** - Fashion and lifestyle product tracking

## File Structure

```
shopping-price-tracker/
├── manifest.json          # Extension configuration
├── popup.html             # Main popup interface
├── popup.css              # Styling for popup
├── popup.js               # Popup functionality and slot-filling
├── background.js          # Price tracking and notifications
├── content.js             # Product extraction from e-commerce sites
├── icons/                 # Extension icons (16px, 48px, 128px)
└── README.md             # This file
```

## Technical Details

### Slot-Filling Dialog
The extension uses a multi-step dialog to collect user preferences:

1. **Product Name** (Required) - The item to search for
2. **Rating Filter** (Optional) - Minimum rating preference (≥4.5★, ≥4.0★, ≥3.5★, or no preference)
3. **Source Filter** (Optional) - Platform selection (Amazon, Temu, Shein, or all)
4. **Description Need** (Optional) - Information level (none, concise, or detailed)

### Data Output
Results are provided in two formats:

**JSON Object** (Machine-readable):
```json
{
  "search_query": "iPhone 15",
  "filters_applied": {
    "rating_minimum": "4.0",
    "platforms": ["amazon", "temu"],
    "description_level": "concise"
  },
  "results": [...],
  "search_timestamp": "2024-01-01T12:00:00.000Z",
  "total_results": 3
}
```

**Natural Language** (Human-readable):
- Best deal highlights
- Average pricing information
- Availability summary
- Individual product cards with key details

### Price Tracking
- Monitors tracked products every 30 minutes
- Stores price history in Chrome's local storage
- Sends desktop notifications for price drops
- Allows users to stop tracking from notifications

## Permissions

The extension requires the following permissions:
- `activeTab` - To interact with current tab
- `storage` - To save tracking data and preferences
- `scripting` - To inject content scripts
- `notifications` - To show price drop alerts
- Host permissions for Amazon, Temu, and Shein

## Development

### Prerequisites
- Chrome browser with developer mode enabled
- Basic knowledge of HTML, CSS, and JavaScript

### Local Development
1. Clone the repository
2. Make your changes
3. Reload the extension in `chrome://extensions/`
4. Test functionality in the browser

### Testing
- Test on actual product pages from supported platforms
- Verify price tracking notifications work
- Check that all slot-filling steps function correctly

## Future Enhancements

- [ ] Support for additional e-commerce platforms
- [ ] Price history charts and analytics
- [ ] Wishlist functionality
- [ ] Price alerts via email
- [ ] Mobile app companion
- [ ] Social sharing of deals
- [ ] Integration with coupon sites

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues, feature requests, or questions:
1. Check the existing issues on GitHub
2. Create a new issue with detailed description
3. Include browser version and extension version

---

**Happy Shopping! 🛍️💰**
