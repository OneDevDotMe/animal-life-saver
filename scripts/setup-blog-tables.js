const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config();

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupBlogTables() {
  try {
    console.log('🚀 Setting up blog tables...');

    // First, let's try to run the schema update
    console.log('📝 Running schema update...');
    
    // Since we can't run SQL directly, let's try to create the tables by inserting data
    // This will fail if tables don't exist, but we can catch the error and provide guidance
    
    console.log('💡 The blog tables need to be created in your Supabase database.');
    console.log('💡 You have a few options:');
    console.log('   1. Go to your Supabase dashboard and run the SQL from scripts/update-supabase-schema.sql');
    console.log('   2. Or run the SQL commands manually in your Supabase SQL editor:');
    console.log('');
    console.log('   CREATE TABLE IF NOT EXISTS blog_categories (');
    console.log('     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,');
    console.log('     name VARCHAR(255) NOT NULL,');
    console.log('     description TEXT,');
    console.log('     parent_id UUID REFERENCES blog_categories(id),');
    console.log('     slug VARCHAR(255) UNIQUE NOT NULL,');
    console.log('     icon_url VARCHAR(500),');
    console.log('     article_count INTEGER DEFAULT 0,');
    console.log('     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),');
    console.log('     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()');
    console.log('   );');
    console.log('');
    console.log('   CREATE TABLE IF NOT EXISTS blog_articles (');
    console.log('     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,');
    console.log('     title VARCHAR(500) NOT NULL,');
    console.log('     content TEXT NOT NULL,');
    console.log('     excerpt TEXT,');
    console.log('     image_url VARCHAR(500),');
    console.log('     category_id UUID REFERENCES blog_categories(id) ON DELETE CASCADE,');
    console.log('     author_id UUID,');
    console.log('     author_name VARCHAR(255) NOT NULL,');
    console.log('     author_image VARCHAR(500),');
    console.log('     published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),');
    console.log('     read_time INTEGER DEFAULT 5,');
    console.log('     tags TEXT[] DEFAULT \'{}\',');
    console.log('     is_published BOOLEAN DEFAULT true,');
    console.log('     view_count INTEGER DEFAULT 0,');
    console.log('     like_count INTEGER DEFAULT 0,');
    console.log('     slug VARCHAR(255) UNIQUE NOT NULL,');
    console.log('     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),');
    console.log('     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()');
    console.log('   );');
    console.log('');
    console.log('   CREATE TABLE IF NOT EXISTS social_links (');
    console.log('     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,');
    console.log('     name VARCHAR(255) NOT NULL,');
    console.log('     url VARCHAR(500) NOT NULL,');
    console.log('     icon_name VARCHAR(100) NOT NULL,');
    console.log('     description TEXT,');
    console.log('     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),');
    console.log('     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()');
    console.log('   );');
    console.log('');
    console.log('💡 After creating the tables, run: bun run supabase:blog-setup');

  } catch (error) {
    console.error('❌ Error during setup:', error);
    process.exit(1);
  }
}

setupBlogTables(); 