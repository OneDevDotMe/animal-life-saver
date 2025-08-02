const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config();

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  console.log('Please set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runBlogSetup() {
  try {
    console.log('🚀 Starting blog data setup...');

    // Insert categories
    console.log('📝 Inserting blog categories...');
    const categoryData = [
      { name: 'Animal Psychology', description: 'Understanding animal behavior and mental processes', slug: 'animal-psychology', icon_url: 'brain' },
      { name: 'Dog Behavior', description: 'Everything about understanding and training dogs', slug: 'dog-behavior', icon_url: 'dog' },
      { name: 'Cat Behavior', description: 'Understanding feline behavior and communication', slug: 'cat-behavior', icon_url: 'cat' },
      { name: 'Animal Care', description: 'General care tips for various animals', slug: 'animal-care', icon_url: 'heart' },
      { name: 'Emergency Care', description: 'First aid and emergency care for animals', slug: 'emergency-care', icon_url: 'alert-triangle' },
      { name: 'Training Tips', description: 'Training techniques for different animals', slug: 'training-tips', icon_url: 'graduation-cap' },
      { name: 'Nutrition', description: 'Proper nutrition for different animals', slug: 'nutrition', icon_url: 'apple' },
      { name: 'Health & Wellness', description: 'Maintaining animal health and preventing diseases', slug: 'health-wellness', icon_url: 'activity' }
    ];

    for (const category of categoryData) {
      const { error } = await supabase
        .from('blog_categories')
        .upsert(category, { onConflict: 'slug' });

      if (error) {
        console.error(`❌ Error inserting category ${category.name}:`, error);
      } else {
        console.log(`✅ Inserted category: ${category.name}`);
      }
    }

    // Insert social links
    console.log('\n📝 Inserting social links...');
    const socialLinksData = [
      { name: 'Facebook Community', url: 'https://facebook.com/groups/animallifesaver', icon_name: 'facebook', description: 'Join our Facebook community for animal lovers' },
      { name: 'Instagram', url: 'https://instagram.com/animallifesaver', icon_name: 'instagram', description: 'Follow us for daily rescue stories and tips' },
      { name: 'YouTube Channel', url: 'https://youtube.com/@animallifesaver', icon_name: 'youtube', description: 'Watch rescue videos and educational content' },
      { name: 'Twitter', url: 'https://twitter.com/animallifesaver', icon_name: 'twitter', description: 'Stay updated with rescue news and tips' },
      { name: 'WhatsApp Support', url: 'https://wa.me/1234567890', icon_name: 'message-circle', description: 'Get immediate support via WhatsApp' }
    ];

    for (const link of socialLinksData) {
      const { error } = await supabase
        .from('social_links')
        .upsert(link, { onConflict: 'url' });

      if (error) {
        console.error(`❌ Error inserting social link ${link.name}:`, error);
      } else {
        console.log(`✅ Inserted social link: ${link.name}`);
      }
    }

    // Insert sample articles
    console.log('\n📝 Inserting sample articles...');
    const articleData = [
      {
        title: '5 Things to Gain a Dog\'s Trust Within Minutes',
        content: 'Building trust with a dog is essential for a strong relationship. Here are five proven techniques that can help you gain a dog\'s trust quickly and effectively.\n\n1. **Approach Slowly and Sideways**\nWhen approaching a dog, especially one you don\'t know, avoid direct eye contact and approach from the side rather than head-on. This is less threatening and shows you\'re not a predator.\n\n2. **Use the "No Touch, No Talk, No Eye Contact" Rule**\nFor the first few minutes, ignore the dog completely. Let them come to you on their own terms. This gives them control and reduces anxiety.\n\n3. **Offer High-Value Treats**\nUse treats that the dog finds irresistible, like small pieces of chicken or cheese. Toss them near the dog without trying to hand-feed initially.\n\n4. **Respect Their Space**\nDon\'t force interaction. Let the dog decide when they\'re ready to approach you. This builds confidence and trust.\n\n5. **Use Calm, Gentle Body Language**\nKeep your movements slow and deliberate. Avoid sudden gestures or loud noises that might startle the dog.\n\nRemember, every dog is different, and some may take longer to trust than others. Patience and consistency are key to building a lasting bond.',
        excerpt: 'Learn the essential techniques to quickly build trust with any dog, from proper approach methods to using treats effectively.',
        image_url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800',
        author_name: 'Dr. Sarah Johnson',
        read_time: 8,
        tags: ['dog training', 'trust building', 'behavior', 'canine psychology'],
        slug: 'gain-dog-trust-minutes'
      },
      {
        title: 'Understanding Cat Body Language: A Complete Guide',
        content: 'Cats communicate primarily through body language, and understanding these signals is crucial for building a strong relationship with your feline friend.\n\n**Tail Positions:**\n- Straight up with a curl: Happy and confident\n- Puffed up: Frightened or threatened\n- Twitching: Excited or irritated\n- Low and tucked: Scared or submissive\n\n**Ear Positions:**\n- Forward: Alert and interested\n- Backward: Anxious or irritated\n- Flat against head: Very scared or angry\n\n**Eye Contact:**\n- Slow blinking: Trust and affection (try slow blinking back!)\n- Dilated pupils: Excited or frightened\n- Narrowed eyes: Content or sleepy\n\n**Body Posture:**\n- Arched back with raised fur: Threatened\n- Belly exposed: Trusting and relaxed\n- Crouched low: Scared or preparing to pounce\n\n**Vocalizations:**\n- Purring: Usually content, but can also indicate pain\n- Meowing: Attention-seeking or greeting\n- Hissing: Threatened or angry\n- Chirping: Excited (often when watching birds)\n\nUnderstanding these signals will help you better communicate with your cat and respond appropriately to their needs.',
        excerpt: 'Master the art of reading your cat\'s body language to better understand their emotions and needs.',
        image_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
        author_name: 'Dr. Michael Chen',
        read_time: 10,
        tags: ['cat behavior', 'body language', 'feline communication', 'pet care'],
        slug: 'understanding-cat-body-language'
      }
    ];

    for (const article of articleData) {
      // Get the category ID for dog-behavior
      const { data: category } = await supabase
        .from('blog_categories')
        .select('id')
        .eq('slug', 'dog-behavior')
        .single();

      if (category) {
        const { error } = await supabase
          .from('blog_articles')
          .upsert({
            ...article,
            category_id: category.id,
            is_published: true,
            view_count: Math.floor(Math.random() * 1000),
            like_count: Math.floor(Math.random() * 100)
          }, { onConflict: 'slug' });

        if (error) {
          console.error(`❌ Error inserting article ${article.title}:`, error);
        } else {
          console.log(`✅ Inserted article: ${article.title}`);
        }
      }
    }

    // Verify the data was inserted
    console.log('\n🔍 Verifying data insertion...');

    // Check categories
    const { data: categories, error: categoriesError } = await supabase
      .from('blog_categories')
      .select('*');

    if (categoriesError) {
      console.error('❌ Error fetching categories:', categoriesError);
    } else {
      console.log(`✅ Found ${categories.length} blog categories`);
    }

    // Check articles
    const { data: articles, error: articlesError } = await supabase
      .from('blog_articles')
      .select('*');

    if (articlesError) {
      console.error('❌ Error fetching articles:', articlesError);
    } else {
      console.log(`✅ Found ${articles.length} blog articles`);
    }

    // Check social links
    const { data: socialLinks, error: socialLinksError } = await supabase
      .from('social_links')
      .select('*');

    if (socialLinksError) {
      console.error('❌ Error fetching social links:', socialLinksError);
    } else {
      console.log(`✅ Found ${socialLinks.length} social links`);
    }

    console.log('\n🎉 Blog data setup completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`- Categories: ${categories?.length || 0}`);
    console.log(`- Articles: ${articles?.length || 0}`);
    console.log(`- Social Links: ${socialLinks?.length || 0}`);

  } catch (error) {
    console.error('❌ Error during blog setup:', error);
    process.exit(1);
  }
}

runBlogSetup(); 