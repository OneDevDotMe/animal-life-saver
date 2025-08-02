-- Drop existing tables to recreate with proper schema
DROP TABLE IF EXISTS user_badges CASCADE;
DROP TABLE IF EXISTS badges CASCADE;
DROP TABLE IF EXISTS donations CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS rescue_stories CASCADE;
DROP TABLE IF EXISTS sos_reports CASCADE;
DROP TABLE IF EXISTS rescue_center_profiles CASCADE;
DROP TABLE IF EXISTS saviour_profiles CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (base table for both saviours and rescue centers)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    google_id VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    location VARCHAR(255) NOT NULL,
    bio TEXT,
    profile_image_url TEXT,
    user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('saviour', 'rescue-center', 'both')),
    verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Saviour profiles (comprehensive fields)
CREATE TABLE saviour_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    profile_picture TEXT,
    contact_number VARCHAR(50),
    email_address VARCHAR(255),
    location_area VARCHAR(255),
    verified_badge BOOLEAN DEFAULT false,
    rescues_submitted_count INTEGER DEFAULT 0,
    most_recent_activity TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    saviour_badge VARCHAR(100),
    short_bio TEXT,
    social_links JSONB, -- Instagram, Facebook, LinkedIn, etc.
    experience_level VARCHAR(50),
    specializations TEXT,
    badges JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Rescue center profiles (comprehensive fields)
CREATE TABLE rescue_center_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    center_name VARCHAR(255) NOT NULL,
    logo_profile_image TEXT,
    center_type VARCHAR(100), -- NGO, individual, registered trust, private shelter, etc.
    registration_number VARCHAR(255),
    contact_person_name VARCHAR(255),
    contact_number VARCHAR(50),
    whatsapp_number VARCHAR(50),
    email_address VARCHAR(255),
    full_address TEXT,
    service_area TEXT, -- pincode/city
    working_hours VARCHAR(255),
    emergency_response BOOLEAN DEFAULT false,
    volunteers_count INTEGER,
    animals_rescued_count INTEGER DEFAULT 0,
    facilities_available TEXT[],
    rescue_categories_accepted TEXT[],
    verified_badge BOOLEAN DEFAULT false,
    gallery JSONB, -- 3-5 images
    social_media_links JSONB,
    donate_button_link TEXT,
    website VARCHAR(255),
    organization_name VARCHAR(255),
    capacity VARCHAR(255),
    services TEXT,
    address TEXT,
    coordinates POINT,
    rating DECIMAL(3,2) DEFAULT 0.0,
    is_open BOOLEAN DEFAULT true,
    hours VARCHAR(255),
    rescues_count INTEGER DEFAULT 0,
    years_active INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- SOS Reports
CREATE TABLE sos_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID REFERENCES users(id),
    image_url TEXT,
    location VARCHAR(255) NOT NULL,
    animal_type VARCHAR(100),
    description TEXT,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'in_progress', 'completed', 'declined')),
    assigned_to UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Rescue Stories
CREATE TABLE rescue_stories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    story TEXT NOT NULL,
    image_url TEXT,
    before_image_url TEXT,
    after_image_url TEXT,
    location VARCHAR(255),
    date DATE NOT NULL,
    saviour_id UUID REFERENCES users(id),
    rescue_center_id UUID REFERENCES users(id),
    animal_type VARCHAR(100),
    status VARCHAR(20) DEFAULT 'completed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Products (for shop)
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url TEXT,
    category VARCHAR(100),
    stock_quantity INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Orders
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    shipping_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Order Items
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Donations
CREATE TABLE donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    donor_id UUID REFERENCES users(id),
    amount DECIMAL(10,2) NOT NULL,
    message TEXT,
    is_anonymous BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Badges
CREATE TABLE badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    icon_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User Badges
CREATE TABLE user_badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    badge_id UUID REFERENCES badges(id) ON DELETE CASCADE,
    awarded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, badge_id)
);

-- Blog Categories
CREATE TABLE blog_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    parent_id UUID REFERENCES blog_categories(id),
    slug VARCHAR(255) UNIQUE NOT NULL,
    icon_url TEXT,
    article_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Blog Articles
CREATE TABLE blog_articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    image_url TEXT,
    category_id UUID REFERENCES blog_categories(id),
    author_id UUID REFERENCES users(id),
    author_name VARCHAR(255),
    author_image TEXT,
    published_at TIMESTAMP WITH TIME ZONE,
    read_time INTEGER,
    tags TEXT[],
    is_published BOOLEAN DEFAULT false,
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    slug VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Social Links
CREATE TABLE social_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    icon_name VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_users_google_id ON users(google_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_user_type ON users(user_type);
CREATE INDEX idx_users_verified ON users(verified);
CREATE INDEX idx_saviour_profiles_verified ON saviour_profiles(verified_badge);
CREATE INDEX idx_rescue_center_profiles_verified ON rescue_center_profiles(verified_badge);
CREATE INDEX idx_sos_reports_status ON sos_reports(status);
CREATE INDEX idx_sos_reports_location ON sos_reports(location);
CREATE INDEX idx_rescue_stories_date ON rescue_stories(date);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_featured ON products(is_featured);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_saviour_profiles_updated_at BEFORE UPDATE ON saviour_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rescue_center_profiles_updated_at BEFORE UPDATE ON rescue_center_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sos_reports_updated_at BEFORE UPDATE ON sos_reports FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rescue_stories_updated_at BEFORE UPDATE ON rescue_stories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 