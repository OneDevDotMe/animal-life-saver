-- Complete Product System Setup
-- This script creates all product-related tables, enables RLS, and populates with sample data

-- Product Categories Table (must be created first)
CREATE TABLE IF NOT EXISTS product_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    slug VARCHAR(255) UNIQUE NOT NULL,
    image_url TEXT,
    parent_id UUID REFERENCES product_categories(id),
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products Table (created after product_categories)
CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    short_description TEXT,
    price DECIMAL(10,2) NOT NULL,
    sale_price DECIMAL(10,2),
    cost_price DECIMAL(10,2),
    sku VARCHAR(100),
    barcode VARCHAR(100),
    category_id UUID REFERENCES product_categories(id),
    image_url TEXT,
    gallery TEXT[],
    weight DECIMAL(8,2),
    dimensions JSONB,
    stock_quantity INTEGER DEFAULT 0,
    low_stock_threshold INTEGER DEFAULT 5,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    is_virtual BOOLEAN DEFAULT false,
    is_downloadable BOOLEAN DEFAULT false,
    download_url TEXT,
    tags TEXT[],
    attributes JSONB,
    meta_title VARCHAR(255),
    meta_description TEXT,
    slug VARCHAR(255) UNIQUE NOT NULL,
    view_count INTEGER DEFAULT 0,
    sold_count INTEGER DEFAULT 0,
    rating_average DECIMAL(3,2) DEFAULT 0,
    rating_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product Reviews Table
CREATE TABLE IF NOT EXISTS product_reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    title VARCHAR(255),
    comment TEXT,
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Shopping Cart Table
CREATE TABLE IF NOT EXISTS shopping_cart (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    total_amount DECIMAL(10,2) NOT NULL,
    shipping_address JSONB,
    billing_address JSONB,
    payment_method VARCHAR(100),
    payment_status VARCHAR(50) DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    product_name VARCHAR(255) NOT NULL,
    product_price DECIMAL(10,2) NOT NULL,
    quantity INTEGER NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Wishlist Table
CREATE TABLE IF NOT EXISTS wishlist (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_product_categories_slug ON product_categories(slug);
CREATE INDEX IF NOT EXISTS idx_product_categories_is_active ON product_categories(is_active);
CREATE INDEX IF NOT EXISTS idx_shopping_cart_user_id ON shopping_cart(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_user_id ON wishlist(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopping_cart ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;

-- RLS Policies for product_categories (public read access)
CREATE POLICY "Public read access for product_categories" ON product_categories
    FOR SELECT USING (true);

-- RLS Policies for products (public read access)
CREATE POLICY "Public read access for products" ON products
    FOR SELECT USING (is_active = true);

-- RLS Policies for product_reviews (public read access, authenticated users can create)
CREATE POLICY "Public read access for product_reviews" ON product_reviews
    FOR SELECT USING (is_approved = true);

CREATE POLICY "Authenticated users can create reviews" ON product_reviews
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for shopping_cart (users can only access their own cart)
CREATE POLICY "Users can manage their own cart" ON shopping_cart
    FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for orders (users can only access their own orders)
CREATE POLICY "Users can manage their own orders" ON orders
    FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for order_items (users can only access their own order items)
CREATE POLICY "Users can access their own order items" ON order_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM orders 
            WHERE orders.id = order_items.order_id 
            AND orders.user_id = auth.uid()
        )
    );

-- RLS Policies for wishlist (users can only access their own wishlist)
CREATE POLICY "Users can manage their own wishlist" ON wishlist
    FOR ALL USING (auth.uid() = user_id);

-- Insert sample product categories
INSERT INTO product_categories (name, description, slug, image_url, sort_order) VALUES
('Pet Food & Nutrition', 'High-quality food and supplements for all types of pets', 'pet-food-nutrition', 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400', 1),
('Rescue Equipment', 'Professional equipment for animal rescue operations', 'rescue-equipment', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', 2),
('Medical Supplies', 'First aid and medical supplies for injured animals', 'medical-supplies', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400', 3),
('Transportation', 'Carriers, crates, and transportation equipment', 'transportation', 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400', 4),
('Training & Behavior', 'Training tools and behavior modification products', 'training-behavior', 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400', 5),
('Comfort & Care', 'Beds, toys, and comfort items for rescued animals', 'comfort-care', 'https://images.unsplash.com/photo-1543852786-1cf6624b998d?w=400', 6)
ON CONFLICT (slug) DO NOTHING;

-- Get category IDs for product insertion
DO $$
DECLARE
    pet_food_id UUID;
    rescue_equipment_id UUID;
    medical_supplies_id UUID;
    transportation_id UUID;
    training_behavior_id UUID;
    comfort_care_id UUID;
BEGIN
    SELECT id INTO pet_food_id FROM product_categories WHERE slug = 'pet-food-nutrition';
    SELECT id INTO rescue_equipment_id FROM product_categories WHERE slug = 'rescue-equipment';
    SELECT id INTO medical_supplies_id FROM product_categories WHERE slug = 'medical-supplies';
    SELECT id INTO transportation_id FROM product_categories WHERE slug = 'transportation';
    SELECT id INTO training_behavior_id FROM product_categories WHERE slug = 'training-behavior';
    SELECT id INTO comfort_care_id FROM product_categories WHERE slug = 'comfort-care';

    -- Insert sample products
    INSERT INTO products (name, description, short_description, price, sale_price, category_id, image_url, stock_quantity, is_featured, slug, tags, rating_average, rating_count) VALUES
    ('Premium Dog Food - Rescue Formula', 'High-protein, nutrient-rich food specifically formulated for rescued dogs. Contains essential vitamins and minerals for recovery and health.', 'Premium nutrition for rescued dogs', 45.99, 39.99, pet_food_id, 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400', 50, true, 'premium-dog-food-rescue', ARRAY['dog food', 'premium', 'rescue', 'nutrition'], 4.5, 12),
    ('Emergency Rescue Kit', 'Complete emergency kit containing bandages, antiseptic, gloves, and essential first aid supplies for animal rescue operations.', 'Complete emergency kit for rescue operations', 89.99, NULL, rescue_equipment_id, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', 25, true, 'emergency-rescue-kit', ARRAY['emergency', 'rescue', 'first aid', 'kit'], 4.8, 8),
    ('Professional Animal Carrier', 'Heavy-duty, secure carrier for safe transportation of rescued animals. Multiple sizes available.', 'Secure carrier for animal transport', 129.99, 119.99, transportation_id, 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400', 30, true, 'professional-animal-carrier', ARRAY['carrier', 'transport', 'secure', 'professional'], 4.6, 15),
    ('Veterinary First Aid Kit', 'Comprehensive first aid kit with veterinary-grade supplies for treating injured animals in the field.', 'Veterinary-grade first aid supplies', 149.99, NULL, medical_supplies_id, 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400', 15, true, 'veterinary-first-aid-kit', ARRAY['veterinary', 'first aid', 'medical', 'emergency'], 4.9, 6),
    ('Training Clicker Set', 'Professional training clickers with guide for positive reinforcement training of rescued animals.', 'Professional training tools', 24.99, 19.99, training_behavior_id, 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400', 100, false, 'training-clicker-set', ARRAY['training', 'clicker', 'behavior', 'positive reinforcement'], 4.3, 22),
    ('Comfort Recovery Bed', 'Orthopedic bed designed for injured or recovering animals. Provides comfort and support during healing.', 'Comfortable bed for recovery', 79.99, 69.99, comfort_care_id, 'https://images.unsplash.com/photo-1543852786-1cf6624b998d?w=400', 40, false, 'comfort-recovery-bed', ARRAY['bed', 'comfort', 'recovery', 'orthopedic'], 4.7, 18),
    ('Cat Food - Rescue Formula', 'Specially formulated cat food for rescued felines. High in protein and essential nutrients for recovery.', 'Premium nutrition for rescued cats', 38.99, 34.99, pet_food_id, 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400', 45, false, 'cat-food-rescue-formula', ARRAY['cat food', 'rescue', 'nutrition', 'premium'], 4.4, 14),
    ('Rescue Harness Set', 'Safe and secure harnesses for different animal sizes. Essential for safe handling during rescue operations.', 'Safe handling equipment', 59.99, NULL, rescue_equipment_id, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', 35, false, 'rescue-harness-set', ARRAY['harness', 'safety', 'rescue', 'handling'], 4.2, 9),
    ('Portable Medical Kit', 'Compact medical kit for field rescue operations. Contains essential supplies in a portable case.', 'Portable medical supplies', 69.99, 59.99, medical_supplies_id, 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400', 20, false, 'portable-medical-kit', ARRAY['portable', 'medical', 'field', 'emergency'], 4.6, 11),
    ('Behavior Training Guide', 'Comprehensive guide for training rescued animals. Includes techniques for rehabilitation and behavior modification.', 'Training guide for rescued animals', 29.99, 24.99, training_behavior_id, 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400', 60, false, 'behavior-training-guide', ARRAY['training', 'guide', 'behavior', 'rehabilitation'], 4.1, 7)
    ON CONFLICT (slug) DO NOTHING;
END $$;

-- Verify the setup
SELECT 'Product Categories' as table_name, COUNT(*) as count FROM product_categories
UNION ALL
SELECT 'Products' as table_name, COUNT(*) as count FROM products
UNION ALL
SELECT 'RLS Enabled Tables' as table_name, COUNT(*) as count FROM pg_tables 
WHERE tablename IN ('products', 'product_categories', 'product_reviews', 'shopping_cart', 'orders', 'order_items', 'wishlist') 
AND rowsecurity = true; 