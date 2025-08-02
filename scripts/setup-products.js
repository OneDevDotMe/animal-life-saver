const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  console.log('Please set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupProducts() {
  try {
    console.log('🚀 Setting up product tables...');

    // Check if tables already exist
    const { data: existingCategories, error: categoriesError } = await supabase
      .from('product_categories')
      .select('id')
      .limit(1);

    if (categoriesError && categoriesError.code === '42P01') {
      console.log('💡 Product tables need to be created in your Supabase database.');
      console.log('💡 Please run the SQL from scripts/product-schema-fixed.sql in your Supabase SQL editor.');
      console.log('💡 After creating the tables, run: bun run setup:products');
      return;
    }

    console.log('✅ Product tables already exist. Checking for sample data...');

    // Check if we have sample data
    const { data: existingProducts, error: productsError } = await supabase
      .from('products')
      .select('id')
      .limit(1);

    if (productsError) {
      console.error('❌ Error checking products:', productsError);
      return;
    }

    if (existingProducts && existingProducts.length > 0) {
      console.log('✅ Sample products already exist.');
      console.log('💡 To reset and recreate sample data, delete the existing products first.');
      return;
    }

    console.log('📝 Inserting sample product categories...');
    
    // Insert sample categories
    const categoryData = [
      { name: 'Pet Food & Nutrition', description: 'High-quality food and supplements for all types of pets', slug: 'pet-food-nutrition', image_url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400', sort_order: 1 },
      { name: 'Rescue Equipment', description: 'Professional equipment for animal rescue operations', slug: 'rescue-equipment', image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', sort_order: 2 },
      { name: 'Medical Supplies', description: 'First aid and medical supplies for injured animals', slug: 'medical-supplies', image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400', sort_order: 3 },
      { name: 'Transportation', description: 'Carriers, crates, and transportation equipment', slug: 'transportation', image_url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400', sort_order: 4 },
      { name: 'Training & Behavior', description: 'Training tools and behavior modification products', slug: 'training-behavior', image_url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400', sort_order: 5 },
      { name: 'Comfort & Care', description: 'Beds, toys, and comfort items for rescued animals', slug: 'comfort-care', image_url: 'https://images.unsplash.com/photo-1543852786-1cf6624b998d?w=400', sort_order: 6 }
    ];

    for (const category of categoryData) {
      const { error } = await supabase
        .from('product_categories')
        .upsert(category, { onConflict: 'slug' });

      if (error) {
        console.error(`❌ Error inserting category ${category.name}:`, error);
      } else {
        console.log(`✅ Inserted category: ${category.name}`);
      }
    }

    console.log('\n📝 Inserting sample products...');

    // Get category IDs
    const { data: categories } = await supabase
      .from('product_categories')
      .select('id, slug');

    const categoryMap = categories?.reduce((acc, cat) => {
      acc[cat.slug] = cat.id;
      return acc;
    }, {}) || {};

    // Insert sample products
    const productData = [
      {
        name: 'Premium Dog Food - Rescue Formula',
        description: 'High-protein, nutrient-rich food specifically formulated for rescued dogs. Contains essential vitamins and minerals for recovery and health.',
        short_description: 'Premium nutrition for rescued dogs',
        price: 45.99,
        sale_price: 39.99,
        category_id: categoryMap['pet-food-nutrition'],
        image_url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400',
        stock_quantity: 50,
        is_featured: true,
        slug: 'premium-dog-food-rescue',
        tags: ['dog food', 'premium', 'rescue', 'nutrition'],
        rating_average: 4.5,
        rating_count: 12
      },
      {
        name: 'Emergency Rescue Kit',
        description: 'Complete emergency kit containing bandages, antiseptic, gloves, and essential first aid supplies for animal rescue operations.',
        short_description: 'Complete emergency kit for rescue operations',
        price: 89.99,
        category_id: categoryMap['rescue-equipment'],
        image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
        stock_quantity: 25,
        is_featured: true,
        slug: 'emergency-rescue-kit',
        tags: ['emergency', 'rescue', 'first aid', 'kit'],
        rating_average: 4.8,
        rating_count: 8
      },
      {
        name: 'Professional Animal Carrier',
        description: 'Heavy-duty, secure carrier for safe transportation of rescued animals. Multiple sizes available.',
        short_description: 'Secure carrier for animal transport',
        price: 129.99,
        sale_price: 119.99,
        category_id: categoryMap['transportation'],
        image_url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400',
        stock_quantity: 30,
        is_featured: true,
        slug: 'professional-animal-carrier',
        tags: ['carrier', 'transport', 'secure', 'professional'],
        rating_average: 4.6,
        rating_count: 15
      },
      {
        name: 'Veterinary First Aid Kit',
        description: 'Comprehensive first aid kit with veterinary-grade supplies for treating injured animals in the field.',
        short_description: 'Veterinary-grade first aid supplies',
        price: 149.99,
        category_id: categoryMap['medical-supplies'],
        image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400',
        stock_quantity: 15,
        is_featured: true,
        slug: 'veterinary-first-aid-kit',
        tags: ['veterinary', 'first aid', 'medical', 'emergency'],
        rating_average: 4.9,
        rating_count: 6
      },
      {
        name: 'Training Clicker Set',
        description: 'Professional training clickers with guide for positive reinforcement training of rescued animals.',
        short_description: 'Professional training tools',
        price: 24.99,
        sale_price: 19.99,
        category_id: categoryMap['training-behavior'],
        image_url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
        stock_quantity: 100,
        is_featured: false,
        slug: 'training-clicker-set',
        tags: ['training', 'clicker', 'behavior', 'positive reinforcement'],
        rating_average: 4.3,
        rating_count: 22
      },
      {
        name: 'Comfort Recovery Bed',
        description: 'Orthopedic bed designed for injured or recovering animals. Provides comfort and support during healing.',
        short_description: 'Comfortable bed for recovery',
        price: 79.99,
        sale_price: 69.99,
        category_id: categoryMap['comfort-care'],
        image_url: 'https://images.unsplash.com/photo-1543852786-1cf6624b998d?w=400',
        stock_quantity: 40,
        is_featured: false,
        slug: 'comfort-recovery-bed',
        tags: ['bed', 'comfort', 'recovery', 'orthopedic'],
        rating_average: 4.7,
        rating_count: 18
      },
      {
        name: 'Cat Food - Rescue Formula',
        description: 'Specially formulated cat food for rescued felines. High in protein and essential nutrients for recovery.',
        short_description: 'Premium nutrition for rescued cats',
        price: 38.99,
        sale_price: 34.99,
        category_id: categoryMap['pet-food-nutrition'],
        image_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
        stock_quantity: 45,
        is_featured: false,
        slug: 'cat-food-rescue-formula',
        tags: ['cat food', 'rescue', 'nutrition', 'premium'],
        rating_average: 4.4,
        rating_count: 14
      },
      {
        name: 'Rescue Harness Set',
        description: 'Safe and secure harnesses for different animal sizes. Essential for safe handling during rescue operations.',
        short_description: 'Safe handling equipment',
        price: 59.99,
        category_id: categoryMap['rescue-equipment'],
        image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
        stock_quantity: 35,
        is_featured: false,
        slug: 'rescue-harness-set',
        tags: ['harness', 'safety', 'rescue', 'handling'],
        rating_average: 4.2,
        rating_count: 9
      },
      {
        name: 'Portable Medical Kit',
        description: 'Compact medical kit for field rescue operations. Contains essential supplies in a portable case.',
        short_description: 'Portable medical supplies',
        price: 69.99,
        sale_price: 59.99,
        category_id: categoryMap['medical-supplies'],
        image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400',
        stock_quantity: 20,
        is_featured: false,
        slug: 'portable-medical-kit',
        tags: ['portable', 'medical', 'field', 'emergency'],
        rating_average: 4.6,
        rating_count: 11
      },
      {
        name: 'Behavior Training Guide',
        description: 'Comprehensive guide for training rescued animals. Includes techniques for rehabilitation and behavior modification.',
        short_description: 'Training guide for rescued animals',
        price: 29.99,
        sale_price: 24.99,
        category_id: categoryMap['training-behavior'],
        image_url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
        stock_quantity: 60,
        is_featured: false,
        slug: 'behavior-training-guide',
        tags: ['training', 'guide', 'behavior', 'rehabilitation'],
        rating_average: 4.1,
        rating_count: 7
      }
    ];

    for (const product of productData) {
      const { error } = await supabase
        .from('products')
        .upsert(product, { onConflict: 'slug' });

      if (error) {
        console.error(`❌ Error inserting product ${product.name}:`, error);
      } else {
        console.log(`✅ Inserted product: ${product.name}`);
      }
    }

    console.log('\n🎉 Product setup completed successfully!');

    // Verify the data
    console.log('\n🔍 Verifying data insertion...');

    const { data: categories, error: categoriesError } = await supabase
      .from('product_categories')
      .select('*');

    if (categoriesError) {
      console.error('❌ Error fetching categories:', categoriesError);
    } else {
      console.log(`✅ Found ${categories.length} product categories`);
    }

    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*');

    if (productsError) {
      console.error('❌ Error fetching products:', productsError);
    } else {
      console.log(`✅ Found ${products.length} products`);
    }

    console.log('\n📊 Summary:');
    console.log(`- Categories: ${categories?.length || 0}`);
    console.log(`- Products: ${products?.length || 0}`);

  } catch (error) {
    console.error('❌ Error during product setup:', error);
    process.exit(1);
  }
}

setupProducts(); 