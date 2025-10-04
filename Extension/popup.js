// Shopping Price Tracker - Popup Script
class ShoppingAssistant {
    constructor() {
        this.currentStep = 1;
        this.searchData = {
            product_name: '',
            rating_filter: 'no-preference',
            source_filter: ['all'],
            description_need: 'none'
        };
        this.database = new ShoppingDatabase();
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateStepVisibility();
    }

    bindEvents() {
        // Step 1: Product Name
        document.getElementById('next-step-1').addEventListener('click', () => this.nextStep(1));
        document.getElementById('product-name').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.nextStep(1);
        });

        // Step 2: Rating Filter
        document.getElementById('prev-step-2').addEventListener('click', () => this.prevStep(2));
        document.getElementById('next-step-2').addEventListener('click', () => this.nextStep(2));

        // Step 3: Source Filter
        document.getElementById('prev-step-3').addEventListener('click', () => this.prevStep(3));
        document.getElementById('next-step-3').addEventListener('click', () => this.nextStep(3));

        // Step 4: Description Need
        document.getElementById('prev-step-4').addEventListener('click', () => this.prevStep(4));
        document.getElementById('search-products').addEventListener('click', () => this.collectDataAndSearch());

        // Confirmation
        document.getElementById('edit-search').addEventListener('click', () => this.editSearch());
        document.getElementById('confirm-search').addEventListener('click', () => this.confirmSearch());

        // Results
        document.getElementById('track-yes').addEventListener('click', () => this.enablePriceTracking());
        document.getElementById('track-no').addEventListener('click', () => this.disablePriceTracking());
        document.getElementById('new-search').addEventListener('click', () => this.resetSearch());

        // Source filter checkboxes
        document.querySelectorAll('input[name="source"]').forEach(checkbox => {
            checkbox.addEventListener('change', this.handleSourceFilterChange.bind(this));
        });
    }

    nextStep(step) {
        if (step === 1) {
            const productName = document.getElementById('product-name').value.trim();
            if (!productName) {
                alert('Please enter a product name to continue.');
                return;
            }
            this.searchData.product_name = productName;
        }

        if (step === 2) {
            const rating = document.querySelector('input[name="rating"]:checked').value;
            this.searchData.rating_filter = rating;
        }

        if (step === 3) {
            const sources = Array.from(document.querySelectorAll('input[name="source"]:checked'))
                .map(cb => cb.value);
            this.searchData.source_filter = sources;
        }

        if (step === 4) {
            const description = document.querySelector('input[name="description"]:checked').value;
            this.searchData.description_need = description;
        }

        this.currentStep = step + 1;
        this.updateStepVisibility();
    }

    prevStep(step) {
        this.currentStep = step - 1;
        this.updateStepVisibility();
    }

    updateStepVisibility() {
        // Hide all steps
        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('active');
        });

        // Show current step
        const currentStepElement = document.getElementById(`step-${this.getStepName(this.currentStep)}`);
        if (currentStepElement) {
            currentStepElement.classList.add('active');
        }
    }

    getStepName(step) {
        const stepNames = {
            1: 'product-name',
            2: 'rating',
            3: 'source',
            4: 'description'
        };
        return stepNames[step] || 'product-name';
    }

    handleSourceFilterChange() {
        const sources = Array.from(document.querySelectorAll('input[name="source"]:checked'))
            .map(cb => cb.value);
        
        // If "all" is selected, uncheck others
        if (sources.includes('all')) {
            document.querySelectorAll('input[name="source"]:not([value="all"])').forEach(cb => {
                cb.checked = false;
            });
        } else {
            // If any specific source is selected, uncheck "all"
            document.querySelector('input[name="source"][value="all"]').checked = false;
        }
    }

    collectDataAndSearch() {
        // Collect final data
        const description = document.querySelector('input[name="description"]:checked').value;
        this.searchData.description_need = description;

        // Show confirmation
        this.showConfirmation();
    }

    showConfirmation() {
        // Hide dialog
        document.getElementById('slot-filling-dialog').classList.add('hidden');
        
        // Show confirmation
        document.getElementById('confirmation').classList.remove('hidden');
        
        // Populate summary
        this.populateSummary();
    }

    populateSummary() {
        const summary = document.getElementById('summary-content');
        const { product_name, rating_filter, source_filter, description_need } = this.searchData;
        
        let sourceText = source_filter.includes('all') ? 'All supported platforms' : source_filter.join(', ');
        let ratingText = rating_filter === 'no-preference' ? 'No preference' : `≥${rating_filter}★`;
        let descriptionText = description_need === 'none' ? 'None' : 
                             description_need === 'concise' ? 'Concise overview' : 'Detailed spec summary';

        summary.innerHTML = `
            <div class="summary-item"><strong>Product:</strong> ${product_name}</div>
            <div class="summary-item"><strong>Rating:</strong> ${ratingText}</div>
            <div class="summary-item"><strong>Platforms:</strong> ${sourceText}</div>
            <div class="summary-item"><strong>Description:</strong> ${descriptionText}</div>
        `;
    }

    editSearch() {
        // Hide confirmation
        document.getElementById('confirmation').classList.add('hidden');
        
        // Show dialog
        document.getElementById('slot-filling-dialog').classList.remove('hidden');
        
        // Reset to first step
        this.currentStep = 1;
        this.updateStepVisibility();
    }

    async confirmSearch() {
        // Hide confirmation
        document.getElementById('confirmation').classList.add('hidden');
        
        // Show loading
        document.getElementById('loading').classList.remove('hidden');
        
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Get search results
            const results = await this.searchProducts();
            
            // Show results
            this.displayResults(results);
            
        } catch (error) {
            console.error('Search error:', error);
            alert('Error searching for products. Please try again.');
        } finally {
            // Hide loading
            document.getElementById('loading').classList.add('hidden');
        }
    }

    async searchProducts() {
        // First try to search the database
        const searchCriteria = {
            query: this.searchData.product_name,
            ratingFilter: this.searchData.rating_filter,
            sourceFilter: this.searchData.source_filter,
            descriptionLevel: this.searchData.description_need
        };

        let products = await this.database.searchProducts(searchCriteria);
        
        // If no results in database, generate mock data and add to database
        if (products.length === 0) {
            const mockProducts = this.generateMockProducts();
            
            // Add mock products to database
            for (const product of mockProducts) {
                await this.database.addProduct(product);
            }
            
            // Search again
            products = await this.database.searchProducts(searchCriteria);
        }

        // Add search to history
        await this.database.addSearchHistory({
            query: this.searchData.product_name,
            filters: {
                rating: this.searchData.rating_filter,
                source: this.searchData.source_filter,
                description: this.searchData.description_need
            },
            resultsCount: products.length
        });

        return products;
    }

    generateMockProducts() {
        const basePrice = 200 + Math.random() * 300; // Random base price between 200-500
        const products = [
            {
                id: 1,
                name: `${this.searchData.product_name} - Latest Model`,
                price: Math.round((basePrice * 0.8) * 100) / 100,
                original_price: Math.round(basePrice * 100) / 100,
                rating: 4.5,
                source: 'Amazon',
                availability: 'In Stock',
                url: `https://amazon.com/${this.searchData.product_name.toLowerCase().replace(/\s+/g, '-')}-latest`,
                description: 'High-quality product with excellent features and modern design',
                category: 'Electronics',
                brand: 'Premium Brand'
            },
            {
                id: 2,
                name: `${this.searchData.product_name} - Budget Option`,
                price: Math.round((basePrice * 0.5) * 100) / 100,
                original_price: Math.round((basePrice * 0.7) * 100) / 100,
                rating: 4.2,
                source: 'Temu',
                availability: 'In Stock',
                url: `https://temu.com/${this.searchData.product_name.toLowerCase().replace(/\s+/g, '-')}-budget`,
                description: 'Affordable alternative with good value and reliable performance',
                category: 'Electronics',
                brand: 'Value Brand'
            },
            {
                id: 3,
                name: `${this.searchData.product_name} - Premium Edition`,
                price: Math.round((basePrice * 1.5) * 100) / 100,
                original_price: Math.round((basePrice * 1.8) * 100) / 100,
                rating: 4.8,
                source: 'Shein',
                availability: 'Limited Stock',
                url: `https://shein.com/${this.searchData.product_name.toLowerCase().replace(/\s+/g, '-')}-premium`,
                description: 'Top-tier product with premium features and luxury materials',
                category: 'Electronics',
                brand: 'Luxury Brand'
            },
            {
                id: 4,
                name: `${this.searchData.product_name} - Standard Version`,
                price: Math.round((basePrice * 0.6) * 100) / 100,
                original_price: Math.round((basePrice * 0.8) * 100) / 100,
                rating: 3.8,
                source: 'Amazon',
                availability: Math.random() > 0.7 ? 'Out of Stock' : 'In Stock',
                url: `https://amazon.com/${this.searchData.product_name.toLowerCase().replace(/\s+/g, '-')}-standard`,
                description: 'Standard model with reliable performance and good build quality',
                category: 'Electronics',
                brand: 'Standard Brand'
            }
        ];

        return products;
    }

    displayResults(products) {
        // Hide loading
        document.getElementById('loading').classList.add('hidden');
        
        // Show results
        document.getElementById('results').classList.remove('hidden');
        
        // Generate JSON output
        const jsonOutput = this.generateJSONOutput(products);
        document.getElementById('json-output').textContent = JSON.stringify(jsonOutput, null, 2);
        
        // Generate natural language output
        const naturalLanguage = this.generateNaturalLanguageOutput(products);
        document.getElementById('natural-language').innerHTML = naturalLanguage;
        
        // Show price tracking opt-in
        document.getElementById('price-tracking-opt-in').classList.remove('hidden');
    }

    generateJSONOutput(products) {
        return {
            search_query: this.searchData.product_name,
            filters_applied: {
                rating_minimum: this.searchData.rating_filter,
                platforms: this.searchData.source_filter,
                description_level: this.searchData.description_need
            },
            results: products.map(p => ({
                product_id: p.id,
                name: p.name,
                price: p.price,
                original_price: p.originalPrice,
                discount_percentage: Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100),
                rating: p.rating,
                source: p.source,
                availability: p.availability,
                url: p.url,
                description: p.description
            })),
            search_timestamp: new Date().toISOString(),
            total_results: products.length
        };
    }

    generateNaturalLanguageOutput(products) {
        if (products.length === 0) {
            return '<p>No products found matching your criteria. Try adjusting your filters or search terms.</p>';
        }

        const bestDeal = products.reduce((best, current) => 
            current.price < best.price ? current : best
        );
        
        const inStockProducts = products.filter(p => p.availability !== 'Out of Stock');
        const avgPrice = products.reduce((sum, p) => sum + p.price, 0) / products.length;
        
        let html = `
            <h3>Found ${products.length} products for "${this.searchData.product_name}"</h3>
            <div class="search-summary">
                <p><strong>Best Deal:</strong> ${bestDeal.name} at $${bestDeal.price} (${bestDeal.source})</p>
                <p><strong>Average Price:</strong> $${avgPrice.toFixed(2)}</p>
                <p><strong>In Stock:</strong> ${inStockProducts.length} of ${products.length} products</p>
            </div>
            <div class="product-list">
        `;

        products.forEach(product => {
            const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
            const availabilityClass = product.availability === 'Out of Stock' ? 'out-of-stock' : '';
            
            html += `
                <div class="product-card">
                    <div class="product-title">${product.name}</div>
                    <div class="product-price">$${product.price} ${discount > 0 ? `(${discount}% off)` : ''}</div>
                    <div class="product-rating">${'★'.repeat(Math.floor(product.rating))}${product.rating}</div>
                    <div class="product-source">${product.source}</div>
                    <div class="product-availability ${availabilityClass}">${product.availability}</div>
                    ${this.searchData.description_need !== 'none' ? `<div class="product-description">${product.description}</div>` : ''}
                </div>
            `;
        });

        html += '</div>';
        return html;
    }

    async enablePriceTracking() {
        try {
            // Get the current search results to track
            const products = await this.database.searchProducts({
                query: this.searchData.product_name,
                ratingFilter: this.searchData.rating_filter,
                sourceFilter: this.searchData.source_filter,
                descriptionLevel: this.searchData.description_need
            });

            // Add each product to tracking
            for (const product of products) {
                await this.database.addTrackedProduct(product.id, {
                    notificationThreshold: 0.1, // 10% price drop
                    checkFrequency: 30 // 30 minutes
                });
            }

            alert(`Price tracking enabled for ${products.length} products! We'll notify you when prices drop.`);
            this.hidePriceTrackingOptIn();
        } catch (error) {
            console.error('Error enabling price tracking:', error);
            alert('Error enabling price tracking. Please try again.');
        }
    }

    disablePriceTracking() {
        this.hidePriceTrackingOptIn();
    }

    hidePriceTrackingOptIn() {
        document.getElementById('price-tracking-opt-in').classList.add('hidden');
    }

    resetSearch() {
        // Reset all data
        this.currentStep = 1;
        this.searchData = {
            product_name: '',
            rating_filter: 'no-preference',
            source_filter: ['all'],
            description_need: 'none'
        };
        
        // Reset form
        document.getElementById('product-name').value = '';
        document.querySelector('input[name="rating"][value="no-preference"]').checked = true;
        document.querySelectorAll('input[name="source"]').forEach(cb => cb.checked = false);
        document.querySelector('input[name="source"][value="all"]').checked = true;
        document.querySelector('input[name="description"][value="none"]').checked = true;
        
        // Hide all sections
        document.getElementById('results').classList.add('hidden');
        document.getElementById('confirmation').classList.add('hidden');
        document.getElementById('price-tracking-opt-in').classList.add('hidden');
        
        // Show dialog
        document.getElementById('slot-filling-dialog').classList.remove('hidden');
        
        // Update step visibility
        this.updateStepVisibility();
    }
}

// Initialize the shopping assistant when the popup loads
document.addEventListener('DOMContentLoaded', () => {
    new ShoppingAssistant();
});
