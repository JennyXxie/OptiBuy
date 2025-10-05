// Content script for OptiBuy DealBot Chrome Extension

class OptiBuyContentScript {
  constructor() {
    this.isInitialized = false;
    this.floatingButton = null;
    this.productOverlay = null;
    this.init();
  }
  
  init() {
    // Wait for page to load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initialize());
    } else {
      this.initialize();
    }
  }
  
  initialize() {
    if (this.isInitialized) return;
    
    console.log('OptiBuy DealBot content script initialized');
    
    // Check if we're on a supported e-commerce site
    if (this.isSupportedSite()) {
      this.createFloatingButton();
      this.setupProductDetection();
      this.setupKeyboardShortcuts();
    }
    
    this.isInitialized = true;
  }
  
  isSupportedSite() {
    const hostname = window.location.hostname.toLowerCase();
    const supportedSites = [
      'amazon.com', 'amazon.ca', 'amazon.co.uk', 'amazon.de', 'amazon.fr',
      'temu.com', 'temu.co.uk', 'temu.de', 'temu.fr',
      'ebay.com', 'ebay.ca', 'ebay.co.uk', 'ebay.de',
      'walmart.com', 'walmart.ca',
      'shein.com', 'shein.ca',
      'target.com', 'bestbuy.com', 'homedepot.com'
    ];
    
    return supportedSites.some(site => hostname.includes(site));
  }
  
  createFloatingButton() {
    // Remove existing button if any
    if (this.floatingButton) {
      this.floatingButton.remove();
    }
    
    this.floatingButton = document.createElement('div');
    this.floatingButton.id = 'optibuy-floating-button';
    this.floatingButton.innerHTML = `
      <div class="optibuy-button-content">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
        <span class="optibuy-button-text">DealBot</span>
      </div>
    `;
    
    this.floatingButton.addEventListener('click', () => this.handleFloatingButtonClick());
    
    document.body.appendChild(this.floatingButton);
  }
  
  setupProductDetection() {
    // Detect product pages and add context menu
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          this.detectProductPage();
        }
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Initial check
    this.detectProductPage();
  }
  
  detectProductPage() {
    if (this.isProductPage()) {
      this.addProductContextMenu();
      this.extractProductInfo();
    } else {
      this.removeProductContextMenu();
    }
  }
  
  isProductPage() {
    const hostname = window.location.hostname.toLowerCase();
    const pathname = window.location.pathname.toLowerCase();
    
    // Amazon
    if (hostname.includes('amazon.com')) {
      return pathname.includes('/dp/') || pathname.includes('/gp/product/');
    }
    
    // Temu
    if (hostname.includes('temu.com')) {
      return pathname.includes('/goods/') || pathname.includes('/product/');
    }
    
    // eBay
    if (hostname.includes('ebay.com')) {
      return pathname.includes('/itm/') || pathname.includes('/p/');
    }
    
    // Walmart
    if (hostname.includes('walmart.com')) {
      return pathname.includes('/ip/') || pathname.includes('/product/');
    }
    
    // Shein
    if (hostname.includes('shein.com')) {
      return pathname.includes('/product/') || pathname.includes('/p-');
    }
    
    return false;
  }
  
  extractProductInfo() {
    const hostname = window.location.hostname.toLowerCase();
    let productInfo = {};
    
    try {
      if (hostname.includes('amazon.com')) {
        productInfo = this.extractAmazonProductInfo();
      } else if (hostname.includes('temu.com')) {
        productInfo = this.extractTemuProductInfo();
      } else if (hostname.includes('ebay.com')) {
        productInfo = this.extractEbayProductInfo();
      } else if (hostname.includes('walmart.com')) {
        productInfo = this.extractWalmartProductInfo();
      } else if (hostname.includes('shein.com')) {
        productInfo = this.extractSheinProductInfo();
      }
      
      // Store product info for later use
      if (productInfo.name) {
        chrome.storage.local.set({ 
          currentProduct: {
            ...productInfo,
            url: window.location.href,
            platform: this.getPlatformName(),
            timestamp: new Date().toISOString()
          }
        });
      }
    } catch (error) {
      console.error('Error extracting product info:', error);
    }
  }
  
  extractAmazonProductInfo() {
    const name = document.querySelector('#productTitle')?.textContent?.trim() ||
                 document.querySelector('.product-title')?.textContent?.trim();
    
    const price = document.querySelector('.a-price-whole')?.textContent?.trim() ||
                  document.querySelector('#priceblock_dealprice')?.textContent?.trim() ||
                  document.querySelector('#priceblock_ourprice')?.textContent?.trim();
    
    const image = document.querySelector('#landingImage')?.src ||
                  document.querySelector('.a-dynamic-image')?.src;
    
    const rating = document.querySelector('.a-icon-alt')?.textContent?.match(/(\d+\.?\d*)/)?.[1];
    
    const reviews = document.querySelector('#acrCustomerReviewText')?.textContent?.match(/(\d+,?\d*)/)?.[1];
    
    return {
      name: name || 'Unknown Product',
      price: this.parsePrice(price),
      image: image || '',
      rating: parseFloat(rating) || 0,
      reviews: parseInt(reviews?.replace(',', '')) || 0
    };
  }
  
  extractTemuProductInfo() {
    const name = document.querySelector('.goods-title')?.textContent?.trim() ||
                 document.querySelector('.product-title')?.textContent?.trim();
    
    const price = document.querySelector('.goods-price')?.textContent?.trim() ||
                  document.querySelector('.current-price')?.textContent?.trim();
    
    const image = document.querySelector('.goods-img img')?.src ||
                  document.querySelector('.product-img img')?.src;
    
    const rating = document.querySelector('.rating-score')?.textContent?.trim();
    
    const reviews = document.querySelector('.review-count')?.textContent?.match(/(\d+)/)?.[1];
    
    return {
      name: name || 'Unknown Product',
      price: this.parsePrice(price),
      image: image || '',
      rating: parseFloat(rating) || 0,
      reviews: parseInt(reviews) || 0
    };
  }
  
  extractEbayProductInfo() {
    const name = document.querySelector('#x-title-label-lbl')?.textContent?.trim() ||
                 document.querySelector('.x-title-label-lbl')?.textContent?.trim();
    
    const price = document.querySelector('.notranslate')?.textContent?.trim() ||
                  document.querySelector('.u-flL.condText')?.textContent?.trim();
    
    const image = document.querySelector('#icImg')?.src ||
                  document.querySelector('.img')?.src;
    
    const rating = document.querySelector('.rating-num')?.textContent?.match(/(\d+\.?\d*)/)?.[1];
    
    const reviews = document.querySelector('.review-count')?.textContent?.match(/(\d+)/)?.[1];
    
    return {
      name: name || 'Unknown Product',
      price: this.parsePrice(price),
      image: image || '',
      rating: parseFloat(rating) || 0,
      reviews: parseInt(reviews) || 0
    };
  }
  
  extractWalmartProductInfo() {
    const name = document.querySelector('[data-automation-id="product-title"]')?.textContent?.trim() ||
                 document.querySelector('h1.prod-ProductTitle')?.textContent?.trim();
    
    const price = document.querySelector('[itemprop="price"]')?.textContent?.trim() ||
                  document.querySelector('.price-group')?.textContent?.trim();
    
    const image = document.querySelector('.prod-ProductImageContainer img')?.src ||
                  document.querySelector('.hover-zoom-hero-image')?.src;
    
    const rating = document.querySelector('.rating-number')?.textContent?.match(/(\d+\.?\d*)/)?.[1];
    
    const reviews = document.querySelector('.stars-reviews-count')?.textContent?.match(/(\d+)/)?.[1];
    
    return {
      name: name || 'Unknown Product',
      price: this.parsePrice(price),
      image: image || '',
      rating: parseFloat(rating) || 0,
      reviews: parseInt(reviews) || 0
    };
  }
  
  extractSheinProductInfo() {
    const name = document.querySelector('.product-intro__head-name')?.textContent?.trim() ||
                 document.querySelector('.product-title')?.textContent?.trim();
    
    const price = document.querySelector('.price')?.textContent?.trim() ||
                  document.querySelector('.current-price')?.textContent?.trim();
    
    const image = document.querySelector('.product-intro__head-image img')?.src ||
                  document.querySelector('.product-img img')?.src;
    
    const rating = document.querySelector('.rating-score')?.textContent?.match(/(\d+\.?\d*)/)?.[1];
    
    const reviews = document.querySelector('.review-count')?.textContent?.match(/(\d+)/)?.[1];
    
    return {
      name: name || 'Unknown Product',
      price: this.parsePrice(price),
      image: image || '',
      rating: parseFloat(rating) || 0,
      reviews: parseInt(reviews) || 0
    };
  }
  
  parsePrice(priceText) {
    if (!priceText) return 0;
    
    const priceMatch = priceText.match(/[\d,]+\.?\d*/);
    if (priceMatch) {
      return parseFloat(priceMatch[0].replace(',', ''));
    }
    
    return 0;
  }
  
  getPlatformName() {
    const hostname = window.location.hostname.toLowerCase();
    
    if (hostname.includes('amazon')) return 'Amazon';
    if (hostname.includes('temu')) return 'Temu';
    if (hostname.includes('ebay')) return 'eBay';
    if (hostname.includes('walmart')) return 'Walmart';
    if (hostname.includes('shein')) return 'Shein';
    if (hostname.includes('target')) return 'Target';
    if (hostname.includes('bestbuy')) return 'Best Buy';
    if (hostname.includes('homedepot')) return 'Home Depot';
    
    return 'Unknown';
  }
  
  addProductContextMenu() {
    // Remove existing menu
    this.removeProductContextMenu();
    
    const contextMenu = document.createElement('div');
    contextMenu.id = 'optibuy-context-menu';
    contextMenu.innerHTML = `
      <div class="optibuy-context-content">
        <button class="optibuy-context-btn" data-action="compare">
          🔍 Compare Prices
        </button>
        <button class="optibuy-context-btn" data-action="analyze">
          🤖 Analyze with AI
        </button>
        <button class="optibuy-context-btn" data-action="alert">
          🔔 Set Price Alert
        </button>
      </div>
    `;
    
    // Add event listeners
    contextMenu.querySelectorAll('.optibuy-context-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.handleContextAction(btn.dataset.action);
      });
    });
    
    document.body.appendChild(contextMenu);
  }
  
  removeProductContextMenu() {
    const existingMenu = document.getElementById('optibuy-context-menu');
    if (existingMenu) {
      existingMenu.remove();
    }
  }
  
  handleContextAction(action) {
    chrome.storage.local.get('currentProduct', (result) => {
      const product = result.currentProduct;
      
      if (!product) {
        this.showNotification('No product information available');
        return;
      }
      
      switch (action) {
        case 'compare':
          this.comparePrices(product);
          break;
        case 'analyze':
          this.analyzeWithAI(product);
          break;
        case 'alert':
          this.setPriceAlert(product);
          break;
      }
    });
    
    this.removeProductContextMenu();
  }
  
  comparePrices(product) {
    const query = `Compare prices for ${product.name}`;
    this.openDealBot(query);
  }
  
  analyzeWithAI(product) {
    const query = `Analyze this product: ${product.name} for ${product.price} on ${product.platform}. Is this a good deal?`;
    this.openDealBot(query);
  }
  
  setPriceAlert(product) {
    const query = `Set up a price alert for ${product.name}. Current price is $${product.price} on ${product.platform}.`;
    this.openDealBot(query);
  }
  
  openDealBot(query) {
    // Send message to background script to open popup with query
    chrome.runtime.sendMessage({
      action: 'openPopupWithQuery',
      query: query
    });
  }
  
  handleFloatingButtonClick() {
    // Get current product info if available
    chrome.storage.local.get('currentProduct', (result) => {
      let query = 'Help me find deals and compare prices';
      
      if (result.currentProduct) {
        const product = result.currentProduct;
        query = `I'm looking at ${product.name} for $${product.price} on ${product.platform}. Can you help me find better deals or similar products?`;
      }
      
      this.openDealBot(query);
    });
  }
  
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + Shift + D to open DealBot
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        this.handleFloatingButtonClick();
      }
    });
  }
  
  showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #667eea;
      color: white;
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 14px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      z-index: 10000;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      opacity: 0;
      transform: translateX(100%);
      transition: all 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }
}

// Initialize content script
new OptiBuyContentScript();
