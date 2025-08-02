-- Fix Product RLS Issues
-- This script enables RLS and creates proper policies for the products table

-- Enable RLS on products table
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public read access for products" ON products;
DROP POLICY IF EXISTS "Public read access for product_categories" ON product_categories;

-- Create RLS Policies for product_categories (public read access)
CREATE POLICY "Public read access for product_categories" ON product_categories
    FOR SELECT USING (true);

-- Create RLS Policies for products (public read access)
CREATE POLICY "Public read access for products" ON products
    FOR SELECT USING (is_active = true);

-- Create RLS Policies for product_reviews (public read access, authenticated users can create)
CREATE POLICY "Public read access for product_reviews" ON product_reviews
    FOR SELECT USING (is_approved = true);

CREATE POLICY "Authenticated users can create reviews" ON product_reviews
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS Policies for shopping_cart (users can only access their own cart)
CREATE POLICY "Users can manage their own cart" ON shopping_cart
    FOR ALL USING (auth.uid() = user_id);

-- Create RLS Policies for orders (users can only access their own orders)
CREATE POLICY "Users can manage their own orders" ON orders
    FOR ALL USING (auth.uid() = user_id);

-- Create RLS Policies for order_items (users can only access their own order items)
CREATE POLICY "Users can access their own order items" ON order_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM orders 
            WHERE orders.id = order_items.order_id 
            AND orders.user_id = auth.uid()
        )
    );

-- Create RLS Policies for wishlist (users can only access their own wishlist)
CREATE POLICY "Users can manage their own wishlist" ON wishlist
    FOR ALL USING (auth.uid() = user_id);

-- Verify RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('products', 'product_categories', 'product_reviews', 'shopping_cart', 'orders', 'order_items', 'wishlist');

-- Show created policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('products', 'product_categories', 'product_reviews', 'shopping_cart', 'orders', 'order_items', 'wishlist'); 