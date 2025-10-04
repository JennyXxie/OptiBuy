// Shopping Price Tracker - Content Script
class EcommerceProductExtractor {
    constructor() {
        this.init();
    }

    init() {
        // Wait for page to load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.extractProductInfo());
        } else {
            this.extractProductInfo();
        }
    }

    extractProductInfo() {
        const url = window.location.href;
        let productInfo = null;

        if (url.includes('amazon.com')) {
            productInfo = this.extractAmazonProduct();
        } else if (url.includes('temu.com')) {
            productInfo = this.extractTemuProduct();
        } else if (url.includes('shein.com')) {
            productInfo = this.extractSheinProduct();
        }

        if (productInfo) {
            this.sendProductInfoToBackground(productInfo);
        }
    }

    extractAmazonProduct() {
        try {
            const title = document.querySelector('#productTitle')?.textContent?.trim() ||
                         document.querySelector('h1.a-size-large')?.textContent?.trim();
            
            const priceElement = document.querySelector('.a-price-whole') || 
                               document.querySelector('.a-offscreen') ||
                               document.querySelector('.a-price-range');
            const price = this.extractPrice(priceElement?.textContent);
            
            const ratingElement = document.querySelector('.a-icon-alt') || 
                                document.querySelector('[data-hook="rating-out-of-text"]');
            const rating = this.extractRating(ratingElement?.textContent);
            
            const availability = document.querySelector('#availability span')?.textContent?.trim() ||
                               document.querySelector('.a-color-success')?.textContent?.trim() ||
                               'Unknown';

            return {
                name: title,
                price: price,
                rating: rating,
                availability: availability,
                source: 'Amazon',
                url: window.location.href,
                extractedAt: new Date().toISOString()
            };
        } catch (error) {
            console.error('Error extracting Amazon product:', error);
            return null;
        }
    }

    extractTemuProduct() {
        try {
            const title = document.querySelector('h1[data-testid="product-title"]')?.textContent?.trim() ||
                         document.querySelector('.product-title')?.textContent?.trim();
            
            const priceElement = document.querySelector('[data-testid="price"]') ||
                               document.querySelector('.price') ||
                               document.querySelector('.current-price');
            const price = this.extractPrice(priceElement?.textContent);
            
            const ratingElement = document.querySelector('.rating') ||
                                document.querySelector('[data-testid="rating"]');
            const rating = this.extractRating(ratingElement?.textContent);
            
            const availability = document.querySelector('.stock-status')?.textContent?.trim() ||
                               document.querySelector('[data-testid="availability"]')?.textContent?.trim() ||
                               'Unknown';

            return {
                name: title,
                price: price,
                rating: rating,
                availability: availability,
                source: 'Temu',
                url: window.location.href,
                extractedAt: new Date().toISOString()
            };
        } catch (error) {
            console.error('Error extracting Temu product:', error);
            return null;
        }
    }

    extractSheinProduct() {
        try {
            const title = document.querySelector('.product-intro__head-name')?.textContent?.trim() ||
                         document.querySelector('h1')?.textContent?.trim();
            
            const priceElement = document.querySelector('.price') ||
                               document.querySelector('.product-intro__head-price') ||
                               document.querySelector('[data-testid="price"]');
            const price = this.extractPrice(priceElement?.textContent);
            
            const ratingElement = document.querySelector('.rating') ||
                                document.querySelector('.product-intro__head-rating');
            const rating = this.extractRating(ratingElement?.textContent);
            
            const availability = document.querySelector('.product-intro__head-stock')?.textContent?.trim() ||
                               document.querySelector('.stock-status')?.textContent?.trim() ||
                               'Unknown';

            return {
                name: title,
                price: price,
                rating: rating,
                availability: availability,
                source: 'Shein',
                url: window.location.href,
                extractedAt: new Date().toISOString()
            };
        } catch (error) {
            console.error('Error extracting Shein product:', error);
            return null;
        }
    }

    extractPrice(priceText) {
        if (!priceText) return null;
        
        // Extract numeric price from text
        const priceMatch = priceText.match(/[\d,]+\.?\d*/);
        if (priceMatch) {
            return parseFloat(priceMatch[0].replace(/,/g, ''));
        }
        return null;
    }

    extractRating(ratingText) {
        if (!ratingText) return null;
        
        // Extract numeric rating from text
        const ratingMatch = ratingText.match(/(\d+\.?\d*)/);
        if (ratingMatch) {
            return parseFloat(ratingMatch[1]);
        }
        return null;
    }

    sendProductInfoToBackground(productInfo) {
        chrome.runtime.sendMessage({
            action: 'productExtracted',
            data: productInfo
        });
    }
}

// Initialize the product extractor
new EcommerceProductExtractor();
