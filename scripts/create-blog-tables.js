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

async function createBlogTables() {
  try {
    console.log('🚀 Creating blog tables...');

    // Try to insert a test record to see if tables exist
    console.log('📝 Checking if blog_categories table exists...');
    const { data: testCategory, error: testError } = await supabase
      .from('blog_categories')
      .select('id')
      .limit(1);

    if (testError && testError.code === '42P01') {
      console.log('❌ blog_categories table does not exist');
      console.log('💡 You need to run the schema update first');
      console.log('💡 Try running: bun run supabase:populate');
      return;
    }

    if (testError) {
      console.error('❌ Error checking blog_categories table:', testError);
      return;
    }

    console.log('✅ blog_categories table exists');

    // Check blog_articles table
    console.log('📝 Checking if blog_articles table exists...');
    const { data: testArticle, error: testArticleError } = await supabase
      .from('blog_articles')
      .select('id')
      .limit(1);

    if (testArticleError && testArticleError.code === '42P01') {
      console.log('❌ blog_articles table does not exist');
      console.log('💡 You need to run the schema update first');
      return;
    }

    if (testArticleError) {
      console.error('❌ Error checking blog_articles table:', testArticleError);
      return;
    }

    console.log('✅ blog_articles table exists');

    // Check social_links table
    console.log('📝 Checking if social_links table exists...');
    const { data: testSocial, error: testSocialError } = await supabase
      .from('social_links')
      .select('id')
      .limit(1);

    if (testSocialError && testSocialError.code === '42P01') {
      console.log('❌ social_links table does not exist');
      console.log('💡 You need to run the schema update first');
      return;
    }

    if (testSocialError) {
      console.error('❌ Error checking social_links table:', testSocialError);
      return;
    }

    console.log('✅ social_links table exists');

    console.log('\n🎉 All blog tables exist! You can now run the blog setup.');

  } catch (error) {
    console.error('❌ Error during table check:', error);
    process.exit(1);
  }
}

createBlogTables(); 