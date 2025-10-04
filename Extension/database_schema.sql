-- Shopping Price Tracker Database Schema for Supabase
-- Run these commands in your Supabase SQL editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    rating DECIMAL(3,2) CHECK (rating >= 0 AND rating <= 5),
    source TEXT NOT NULL CHECK (source IN ('Amazon', 'Temu', 'Shein')),
    availability TEXT DEFAULT 'Unknown',
    url TEXT,
    description TEXT,
    category TEXT DEFAULT 'General',
    brand TEXT DEFAULT 'Unknown',
    current_price DECIMAL(10,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Price history table
CREATE TABLE IF NOT EXISTS price_history (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    price DECIMAL(10,2) NOT NULL,
    source TEXT DEFAULT 'manual',
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tracked products table
CREATE TABLE IF NOT EXISTS tracked_products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    notification_threshold DECIMAL(3,2) DEFAULT 0.1,
    check_frequency INTEGER DEFAULT 30,
    is_active BOOLEAN DEFAULT true,
    last_checked TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Search history table
CREATE TABLE IF NOT EXISTS search_history (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    query TEXT NOT NULL,
    filters JSONB,
    results_count INTEGER DEFAULT 0,
    searched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
CREATE INDEX IF NOT EXISTS idx_products_source ON products(source);
CREATE INDEX IF NOT EXISTS idx_products_rating ON products(rating);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_price_history_product_id ON price_history(product_id);
CREATE INDEX IF NOT EXISTS idx_price_history_recorded_at ON price_history(recorded_at);
CREATE INDEX IF NOT EXISTS idx_tracked_products_product_id ON tracked_products(product_id);
CREATE INDEX IF NOT EXISTS idx_tracked_products_is_active ON tracked_products(is_active);
CREATE INDEX IF NOT EXISTS idx_search_history_query ON search_history(query);
CREATE INDEX IF NOT EXISTS idx_search_history_searched_at ON search_history(searched_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tracked_products_updated_at BEFORE UPDATE ON tracked_products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data
INSERT INTO products (name, price, original_price, rating, source, availability, url, description, category, brand) VALUES
('iPhone 15 - Latest Model', 299.99, 399.99, 4.5, 'Amazon', 'In Stock', 'https://amazon.com/iphone-15-latest', 'High-quality product with excellent features and modern design', 'Electronics', 'Apple'),
('iPhone 15 - Budget Option', 149.99, 199.99, 4.2, 'Temu', 'In Stock', 'https://temu.com/iphone-15-budget', 'Affordable alternative with good value and reliable performance', 'Electronics', 'Generic'),
('iPhone 15 - Premium Edition', 599.99, 699.99, 4.8, 'Shein', 'Limited Stock', 'https://shein.com/iphone-15-premium', 'Top-tier product with premium features and luxury materials', 'Electronics', 'Luxury Brand'),
('Gaming Laptop - Latest Model', 1299.99, 1599.99, 4.6, 'Amazon', 'In Stock', 'https://amazon.com/gaming-laptop-latest', 'High-performance gaming laptop with latest graphics', 'Electronics', 'Gaming Brand'),
('Gaming Laptop - Budget Option', 799.99, 999.99, 4.1, 'Temu', 'In Stock', 'https://temu.com/gaming-laptop-budget', 'Affordable gaming laptop with good performance', 'Electronics', 'Value Brand');

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracked_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_history ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous access (since this is a Chrome extension)
CREATE POLICY "Allow anonymous read access to products" ON products
    FOR SELECT USING (true);

CREATE POLICY "Allow anonymous insert to products" ON products
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous update to products" ON products
    FOR UPDATE USING (true);

CREATE POLICY "Allow anonymous read access to price_history" ON price_history
    FOR SELECT USING (true);

CREATE POLICY "Allow anonymous insert to price_history" ON price_history
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous read access to tracked_products" ON tracked_products
    FOR SELECT USING (true);

CREATE POLICY "Allow anonymous insert to tracked_products" ON tracked_products
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous update to tracked_products" ON tracked_products
    FOR UPDATE USING (true);

CREATE POLICY "Allow anonymous delete from tracked_products" ON tracked_products
    FOR DELETE USING (true);

CREATE POLICY "Allow anonymous read access to search_history" ON search_history
    FOR SELECT USING (true);

CREATE POLICY "Allow anonymous insert to search_history" ON search_history
    FOR INSERT WITH CHECK (true);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon;
