// Shopping Price Tracker - Supabase Database Integration
class ShoppingDatabase {
    constructor() {
        this.supabaseUrl = 'https://ldyugkhxqygmdlbxhajun.supabase.co';
        this.supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkeXVna2h4cXlnbWRsYnhhanVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1OTY1MDUsImV4cCI6MjA3NTE3MjUwNX0.8Ls49SNgPurwRszSmEch3oYfJ8VrHu42rXjrx-Oa80Q';
        this.client = null;
        this.init();
    }

    async init() {
        try {
            // Load Supabase client using fetch for service worker compatibility
            const response = await fetch('https://cdn.skypack.dev/@supabase/supabase-js@2');
            const supabaseModule = await response.text();
            
            // Create a simple Supabase client for service worker
            this.client = this.createSimpleSupabaseClient();
            console.log('Supabase client initialized successfully');
        } catch (error) {
            console.error('Error initializing Supabase client:', error);
            // Fallback to mock data if Supabase fails
            this.client = null;
        }
    }

    createSimpleSupabaseClient() {
        // Simple Supabase client implementation for service worker
        return {
            from: (table) => ({
                select: (columns = '*') => ({
                    ilike: (column, pattern) => this.queryWithFilter(table, 'select', { column, pattern, columns }),
                    gte: (column, value) => this.queryWithFilter(table, 'select', { column, value, columns, operator: 'gte' }),
                    in: (column, values) => this.queryWithFilter(table, 'select', { column, values, columns, operator: 'in' }),
                    order: (column, options) => this.queryWithFilter(table, 'select', { column, options, columns, operator: 'order' }),
                    eq: (column, value) => this.queryWithFilter(table, 'select', { column, value, columns, operator: 'eq' }),
                    single: () => this.queryWithFilter(table, 'select', { columns, single: true })
                }),
                insert: (data) => ({
                    select: (columns = '*') => this.queryWithFilter(table, 'insert', { data, columns }),
                    single: () => this.queryWithFilter(table, 'insert', { data, single: true })
                }),
                update: (updateData) => ({
                    eq: (column, value) => ({
                        select: (columns = '*') => this.queryWithFilter(table, 'update', { updateData, column, value, columns }),
                        single: () => this.queryWithFilter(table, 'update', { updateData, column, value, single: true })
                    })
                }),
                delete: () => ({
                    eq: (column, value) => this.queryWithFilter(table, 'delete', { column, value })
                })
            })
        };
    }

    async queryWithFilter(table, operation, options) {
        if (!this.client) {
            return { data: null, error: { message: 'Supabase client not initialized' } };
        }

        try {
            const url = `${this.supabaseUrl}/rest/v1/${table}`;
            const headers = {
                'apikey': this.supabaseKey,
                'Authorization': `Bearer ${this.supabaseKey}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            };

            let requestOptions = {
                method: operation.toUpperCase(),
                headers: headers
            };

            if (operation === 'select') {
                requestOptions.method = 'GET';
                const params = new URLSearchParams();
                if (options.columns !== '*') {
                    params.append('select', options.columns);
                }
                if (options.column && options.pattern) {
                    params.append(`${options.column}`, `ilike.*${options.pattern}*`);
                }
                if (options.column && options.value && options.operator === 'gte') {
                    params.append(`${options.column}`, `gte.${options.value}`);
                }
                if (options.column && options.values && options.operator === 'in') {
                    params.append(`${options.column}`, `in.(${options.values.join(',')})`);
                }
                if (options.column && options.value && options.operator === 'eq') {
                    params.append(`${options.column}`, `eq.${options.value}`);
                }
                if (options.column && options.options && options.operator === 'order') {
                    params.append('order', `${options.column}.${options.options.ascending ? 'asc' : 'desc'}`);
                }
                if (options.single) {
                    params.append('limit', '1');
                }
                
                const queryUrl = `${url}?${params.toString()}`;
                const response = await fetch(queryUrl, requestOptions);
                const data = await response.json();
                return { data: options.single ? (Array.isArray(data) ? data[0] : data) : data, error: null };
            }

            if (operation === 'insert') {
                requestOptions.body = JSON.stringify(options.data);
                const response = await fetch(url, requestOptions);
                const data = await response.json();
                return { data: options.single ? (Array.isArray(data) ? data[0] : data) : data, error: null };
            }

            if (operation === 'update') {
                requestOptions.body = JSON.stringify(options.updateData);
                const params = new URLSearchParams();
                params.append(`${options.column}`, `eq.${options.value}`);
                const queryUrl = `${url}?${params.toString()}`;
                const response = await fetch(queryUrl, requestOptions);
                const data = await response.json();
                return { data: options.single ? (Array.isArray(data) ? data[0] : data) : data, error: null };
            }

            if (operation === 'delete') {
                const params = new URLSearchParams();
                params.append(`${options.column}`, `eq.${options.value}`);
                const queryUrl = `${url}?${params.toString()}`;
                const response = await fetch(queryUrl, requestOptions);
                return { data: null, error: null };
            }

            return { data: null, error: { message: 'Unknown operation' } };
        } catch (error) {
            console.error('Database query error:', error);
            return { data: null, error: error };
        }
    }

    async searchProducts(searchCriteria) {
        if (!this.client) {
            console.log('Supabase not available, using mock data');
            return this.generateMockProducts(searchCriteria);
        }

        try {
            let query = this.client
                .from('products')
                .select('*')
                .ilike('name', `%${searchCriteria.query}%`);

            // Apply rating filter
            if (searchCriteria.ratingFilter && searchCriteria.ratingFilter !== 'no-preference') {
                const minRating = parseFloat(searchCriteria.ratingFilter);
                query = query.gte('rating', minRating);
            }

            // Apply source filter
            if (searchCriteria.sourceFilter && !searchCriteria.sourceFilter.includes('all')) {
                query = query.in('source', searchCriteria.sourceFilter.map(s => s.charAt(0).toUpperCase() + s.slice(1)));
            }

            const { data, error } = await query.order('price', { ascending: true });

            if (error) {
                console.error('Error searching products:', error);
                return this.generateMockProducts(searchCriteria);
            }

            return data || [];
        } catch (error) {
            console.error('Error in searchProducts:', error);
            return this.generateMockProducts(searchCriteria);
        }
    }

    async addProduct(productData) {
        if (!this.client) {
            console.log('Supabase not available, product not saved');
            return null;
        }

        try {
            const { data, error } = await this.client
                .from('products')
                .insert([{
                    name: productData.name,
                    price: productData.price,
                    original_price: productData.originalPrice,
                    rating: productData.rating,
                    source: productData.source,
                    availability: productData.availability,
                    url: productData.url,
                    description: productData.description,
                    category: productData.category || 'General',
                    brand: productData.brand || 'Unknown',
                    created_at: new Date().toISOString()
                }])
                .select()
                .single();

            if (error) {
                console.error('Error adding product:', error);
                return null;
            }

            return data;
        } catch (error) {
            console.error('Error in addProduct:', error);
            return null;
        }
    }

    async updateProduct(productId, updateData) {
        if (!this.client) {
            console.log('Supabase not available, product not updated');
            return null;
        }

        try {
            const { data, error } = await this.client
                .from('products')
                .update({
                    ...updateData,
                    updated_at: new Date().toISOString()
                })
                .eq('id', productId)
                .select()
                .single();

            if (error) {
                console.error('Error updating product:', error);
                return null;
            }

            return data;
        } catch (error) {
            console.error('Error in updateProduct:', error);
            return null;
        }
    }

    async addPriceHistory(productId, price, source = 'manual') {
        if (!this.client) {
            console.log('Supabase not available, price history not saved');
            return null;
        }

        try {
            const { data, error } = await this.client
                .from('price_history')
                .insert([{
                    product_id: productId,
                    price: price,
                    source: source,
                    recorded_at: new Date().toISOString()
                }])
                .select()
                .single();

            if (error) {
                console.error('Error adding price history:', error);
                return null;
            }

            return data;
        } catch (error) {
            console.error('Error in addPriceHistory:', error);
            return null;
        }
    }

    async addTrackedProduct(productId, trackingData) {
        if (!this.client) {
            console.log('Supabase not available, tracking not saved');
            return null;
        }

        try {
            const { data, error } = await this.client
                .from('tracked_products')
                .insert([{
                    product_id: productId,
                    notification_threshold: trackingData.notificationThreshold || 0.1,
                    check_frequency: trackingData.checkFrequency || 30,
                    is_active: true,
                    created_at: new Date().toISOString()
                }])
                .select()
                .single();

            if (error) {
                console.error('Error adding tracked product:', error);
                return null;
            }

            return data;
        } catch (error) {
            console.error('Error in addTrackedProduct:', error);
            return null;
        }
    }

    async removeTrackedProduct(productId) {
        if (!this.client) {
            console.log('Supabase not available, tracking not removed');
            return null;
        }

        try {
            const { error } = await this.client
                .from('tracked_products')
                .delete()
                .eq('product_id', productId);

            if (error) {
                console.error('Error removing tracked product:', error);
                return null;
            }

            return true;
        } catch (error) {
            console.error('Error in removeTrackedProduct:', error);
            return null;
        }
    }

    async getTrackedProducts() {
        if (!this.client) {
            console.log('Supabase not available, returning empty tracked products');
            return {};
        }

        try {
            const { data, error } = await this.client
                .from('tracked_products')
                .select(`
                    *,
                    products (*)
                `)
                .eq('is_active', true);

            if (error) {
                console.error('Error getting tracked products:', error);
                return {};
            }

            // Convert array to object with product_id as key
            const trackedProducts = {};
            data.forEach(item => {
                trackedProducts[item.product_id] = {
                    ...item,
                    product: item.products
                };
            });

            return trackedProducts;
        } catch (error) {
            console.error('Error in getTrackedProducts:', error);
            return {};
        }
    }

    async addSearchHistory(searchData) {
        if (!this.client) {
            console.log('Supabase not available, search history not saved');
            return null;
        }

        try {
            const { data, error } = await this.client
                .from('search_history')
                .insert([{
                    query: searchData.query,
                    filters: searchData.filters,
                    results_count: searchData.resultsCount,
                    searched_at: new Date().toISOString()
                }])
                .select()
                .single();

            if (error) {
                console.error('Error adding search history:', error);
                return null;
            }

            return data;
        } catch (error) {
            console.error('Error in addSearchHistory:', error);
            return null;
        }
    }

    async getProducts() {
        if (!this.client) {
            console.log('Supabase not available, returning empty products');
            return {};
        }

        try {
            const { data, error } = await this.client
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error getting products:', error);
                return {};
            }

            // Convert array to object with id as key
            const products = {};
            data.forEach(product => {
                products[product.id] = product;
            });

            return products;
        } catch (error) {
            console.error('Error in getProducts:', error);
            return {};
        }
    }

    async getProduct(productId) {
        if (!this.client) {
            console.log('Supabase not available, returning null');
            return null;
        }

        try {
            const { data, error } = await this.client
                .from('products')
                .select('*')
                .eq('id', productId)
                .single();

            if (error) {
                console.error('Error getting product:', error);
                return null;
            }

            return data;
        } catch (error) {
            console.error('Error in getProduct:', error);
            return null;
        }
    }

    async updateTrackedProduct(productId, updateData) {
        if (!this.client) {
            console.log('Supabase not available, tracking not updated');
            return null;
        }

        try {
            const { data, error } = await this.client
                .from('tracked_products')
                .update({
                    ...updateData,
                    updated_at: new Date().toISOString()
                })
                .eq('product_id', productId)
                .select()
                .single();

            if (error) {
                console.error('Error updating tracked product:', error);
                return null;
            }

            return data;
        } catch (error) {
            console.error('Error in updateTrackedProduct:', error);
            return null;
        }
    }

    generateMockProducts(searchCriteria) {
        const basePrice = 200 + Math.random() * 300; // Random base price between 200-500
        const products = [
            {
                id: 1,
                name: `${searchCriteria.query} - Latest Model`,
                price: Math.round((basePrice * 0.8) * 100) / 100,
                original_price: Math.round(basePrice * 100) / 100,
                rating: 4.5,
                source: 'Amazon',
                availability: 'In Stock',
                url: `https://amazon.com/${searchCriteria.query.toLowerCase().replace(/\s+/g, '-')}-latest`,
                description: 'High-quality product with excellent features and modern design',
                category: 'Electronics',
                brand: 'Premium Brand'
            },
            {
                id: 2,
                name: `${searchCriteria.query} - Budget Option`,
                price: Math.round((basePrice * 0.5) * 100) / 100,
                original_price: Math.round((basePrice * 0.7) * 100) / 100,
                rating: 4.2,
                source: 'Temu',
                availability: 'In Stock',
                url: `https://temu.com/${searchCriteria.query.toLowerCase().replace(/\s+/g, '-')}-budget`,
                description: 'Affordable alternative with good value and reliable performance',
                category: 'Electronics',
                brand: 'Value Brand'
            },
            {
                id: 3,
                name: `${searchCriteria.query} - Premium Edition`,
                price: Math.round((basePrice * 1.5) * 100) / 100,
                original_price: Math.round((basePrice * 1.8) * 100) / 100,
                rating: 4.8,
                source: 'Shein',
                availability: 'Limited Stock',
                url: `https://shein.com/${searchCriteria.query.toLowerCase().replace(/\s+/g, '-')}-premium`,
                description: 'Top-tier product with premium features and luxury materials',
                category: 'Electronics',
                brand: 'Luxury Brand'
            },
            {
                id: 4,
                name: `${searchCriteria.query} - Standard Version`,
                price: Math.round((basePrice * 0.6) * 100) / 100,
                original_price: Math.round((basePrice * 0.8) * 100) / 100,
                rating: 3.8,
                source: 'Amazon',
                availability: Math.random() > 0.7 ? 'Out of Stock' : 'In Stock',
                url: `https://amazon.com/${searchCriteria.query.toLowerCase().replace(/\s+/g, '-')}-standard`,
                description: 'Standard model with reliable performance and good build quality',
                category: 'Electronics',
                brand: 'Standard Brand'
            }
        ];

        return products;
    }
}

// ShoppingDatabase class is now available globally for importScripts
