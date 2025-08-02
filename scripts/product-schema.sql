-- Product Categories Table
CREATE TABLE IF NOT EXISTS product_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  slug VARCHAR(255) UNIQUE NOT NULL,
  image_url VARCHAR(500),
  parent_id UUID REFERENCES product_categories(id),
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  short_description VARCHAR(500),
  price DECIMAL(10,2) NOT NULL,
  sale_price DECIMAL(10,2),
  cost_price DECIMAL(10,2),
  sku VARCHAR(100) UNIQUE,
  barcode VARCHAR(100),
  category_id UUID REFERENCES product_categories(id),
  image_url VARCHAR(500),
  gallery JSONB DEFAULT '[]',
  weight DECIMAL(8,2),
  dimensions JSONB,
  stock_quantity INTEGER DEFAULT 0,
  low_stock_threshold INTEGER DEFAULT 5,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  is_virtual BOOLEAN DEFAULT false,
  is_downloadable BOOLEAN DEFAULT false,
  download_url VARCHAR(500),
  tags TEXT[] DEFAULT '{}',
  attributes JSONB DEFAULT '{}',
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
  user_id UUID REFERENCES users(id),
  reviewer_name VARCHAR(255) NOT NULL,
  reviewer_email VARCHAR(255),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  comment TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product Attributes Table
CREATE TABLE IF NOT EXISTS product_attributes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  type VARCHAR(50) DEFAULT 'text', -- text, select, multiselect, boolean
  is_required BOOLEAN DEFAULT false,
  is_filterable BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product Attribute Values Table
CREATE TABLE IF NOT EXISTS product_attribute_values (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  attribute_id UUID REFERENCES product_attributes(id) ON DELETE CASCADE,
  value VARCHAR(255) NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product Attribute Mappings Table
CREATE TABLE IF NOT EXISTS product_attribute_mappings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  attribute_id UUID REFERENCES product_attributes(id) ON DELETE CASCADE,
  value_id UUID REFERENCES product_attribute_values(id) ON DELETE CASCADE,
  value_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Shopping Cart Table
CREATE TABLE IF NOT EXISTS shopping_cart (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  session_id VARCHAR(255),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id),
  status VARCHAR(50) DEFAULT 'pending', -- pending, processing, shipped, delivered, cancelled
  total_amount DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  shipping_amount DECIMAL(10,2) DEFAULT 0,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  currency VARCHAR(3) DEFAULT 'USD',
  billing_address JSONB,
  shipping_address JSONB,
  payment_method VARCHAR(100),
  payment_status VARCHAR(50) DEFAULT 'pending', -- pending, paid, failed, refunded
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
  product_sku VARCHAR(100),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Wishlist Table
CREATE TABLE IF NOT EXISTS wishlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_shopping_cart_user_id ON shopping_cart(user_id);
CREATE INDEX IF NOT EXISTS idx_shopping_cart_session_id ON shopping_cart(session_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_wishlist_user_id ON wishlist(user_id);

-- Insert sample product categories
INSERT INTO product_categories (name, description, slug, image_url, sort_order) VALUES
('Pet Food & Nutrition', 'High-quality food and supplements for all types of pets', 'pet-food-nutrition', 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400', 1),
('Rescue Equipment', 'Professional equipment for animal rescue operations', 'rescue-equipment', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', 2),
('Medical Supplies', 'First aid and medical supplies for injured animals', 'medical-supplies', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400', 3),
('Transportation', 'Carriers, crates, and transportation equipment', 'transportation', 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400', 4),
('Training & Behavior', 'Training tools and behavior modification products', 'training-behavior', 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400', 5),
('Comfort & Care', 'Beds, toys, and comfort items for rescued animals', 'comfort-care', 'https://images.unsplash.com/photo-1543852786-1cf6624b998d?w=400', 6);

-- Insert sample products
INSERT INTO products (name, description, short_description, price, sale_price, category_id, image_url, stock_quantity, is_featured, slug, tags) VALUES
('Premium Dog Food - Rescue Formula', 'High-protein, nutrient-rich food specifically formulated for rescued dogs. Contains essential vitamins and minerals for recovery and health.', 'Premium nutrition for rescued dogs', 45.99, 39.99, (SELECT id FROM product_categories WHERE slug = 'pet-food-nutrition'), 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400', 50, true, 'premium-dog-food-rescue', ARRAY['dog food', 'premium', 'rescue', 'nutrition']),
('Emergency Rescue Kit', 'Complete emergency kit containing bandages, antiseptic, gloves, and essential first aid supplies for animal rescue operations.', 'Complete emergency kit for rescue operations', 89.99, NULL, (SELECT id FROM product_categories WHERE slug = 'rescue-equipment'), 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', 25, true, 'emergency-rescue-kit', ARRAY['emergency', 'rescue', 'first aid', 'kit']),
('Professional Animal Carrier', 'Heavy-duty, secure carrier for safe transportation of rescued animals. Multiple sizes available.', 'Secure carrier for animal transport', 129.99, 119.99, (SELECT id FROM product_categories WHERE slug = 'transportation'), 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400', 30, true, 'professional-animal-carrier', ARRAY['carrier', 'transport', 'secure', 'professional']),
('Veterinary First Aid Kit', 'Comprehensive first aid kit with veterinary-grade supplies for treating injured animals in the field.', 'Veterinary-grade first aid supplies', 149.99, NULL, (SELECT id FROM product_categories WHERE slug = 'medical-supplies'), 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400', 15, true, 'veterinary-first-aid-kit', ARRAY['veterinary', 'first aid', 'medical', 'emergency']),
('Training Clicker Set', 'Professional training clickers with guide for positive reinforcement training of rescued animals.', 'Professional training tools', 24.99, 19.99, (SELECT id FROM product_categories WHERE slug = 'training-behavior'), 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400', 100, false, 'training-clicker-set', ARRAY['training', 'clicker', 'behavior', 'positive reinforcement']),
('Comfort Recovery Bed', 'Orthopedic bed designed for injured or recovering animals. Provides comfort and support during healing.', 'Comfortable bed for recovery', 79.99, 69.99, (SELECT id FROM product_categories WHERE slug = 'comfort-care'), 'https://images.unsplash.com/photo-1543852786-1cf6624b998d?w=400', 40, false, 'comfort-recovery-bed', ARRAY['bed', 'comfort', 'recovery', 'orthopedic']),
('Cat Food - Rescue Formula', 'Specially formulated cat food for rescued felines. High in protein and essential nutrients for recovery.', 'Premium nutrition for rescued cats', 38.99, 34.99, (SELECT id FROM product_categories WHERE slug = 'pet-food-nutrition'), 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400', 45, false, 'cat-food-rescue-formula', ARRAY['cat food', 'rescue', 'nutrition', 'premium']),
('Rescue Harness Set', 'Safe and secure harnesses for different animal sizes. Essential for safe handling during rescue operations.', 'Safe handling equipment', 59.99, NULL, (SELECT id FROM product_categories WHERE slug = 'rescue-equipment'), 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', 35, false, 'rescue-harness-set', ARRAY['harness', 'safety', 'rescue', 'handling']),
('Portable Medical Kit', 'Compact medical kit for field rescue operations. Contains essential supplies in a portable case.', 'Portable medical supplies', 69.99, 59.99, (SELECT id FROM product_categories WHERE slug = 'medical-supplies'), 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400', 20, false, 'portable-medical-kit', ARRAY['portable', 'medical', 'field', 'emergency']),
('Behavior Training Guide', 'Comprehensive guide for training rescued animals. Includes techniques for rehabilitation and behavior modification.', 'Training guide for rescued animals', 29.99, 24.99, (SELECT id FROM product_categories WHERE slug = 'training-behavior'), 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400', 60, false, 'behavior-training-guide', ARRAY['training', 'guide', 'behavior', 'rehabilitation']); 