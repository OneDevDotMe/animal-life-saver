require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function populateDatabase() {
  try {
    console.log('🗄️  Populating Supabase database with comprehensive data...');

    // First, clear existing data
    console.log('🧹 Clearing existing data...');
    await supabase.from('user_badges').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('badges').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('donations').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('order_items').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('orders').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('rescue_stories').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('sos_reports').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('rescue_center_profiles').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('saviour_profiles').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('users').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    // Insert users
    console.log('👥 Creating users...');
    const { data: users, error: usersError } = await supabase
      .from('users')
      .insert([
        {
          google_id: 'google_123456',
          email: 'john.doe@example.com',
          name: 'John Doe',
          phone: '+91-98765-43210',
          location: 'Mumbai, Maharashtra',
          bio: 'Passionate animal lover and volunteer rescuer from Mumbai with 5 years of experience.',
          profile_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
          user_type: 'saviour',
          verified: true
        },
        {
          google_id: 'google_789012',
          email: 'sarah.wilson@example.com',
          name: 'Sarah Wilson',
          phone: '+91-98765-43211',
          location: 'Delhi, NCR',
          bio: 'Veterinarian specializing in emergency animal care and wildlife rescue.',
          profile_image_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
          user_type: 'saviour',
          verified: true
        },
        {
          google_id: 'google_901234',
          email: 'priya.sharma@example.com',
          name: 'Priya Sharma',
          phone: '+91-98765-43213',
          location: 'Chennai, Tamil Nadu',
          bio: 'Animal welfare activist and rescue volunteer with expertise in street dogs.',
          profile_image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
          user_type: 'saviour',
          verified: true
        },
        {
          google_id: 'google_567890',
          email: 'raj.kumar@example.com',
          name: 'Raj Kumar',
          phone: '+91-98765-43214',
          location: 'Hyderabad, Telangana',
          bio: 'Wildlife rescuer and conservationist with focus on birds and reptiles.',
          profile_image_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
          user_type: 'saviour',
          verified: false
        },
        {
          google_id: 'google_234567',
          email: 'anita.patel@example.com',
          name: 'Anita Patel',
          phone: '+91-98765-43215',
          location: 'Pune, Maharashtra',
          bio: 'Emergency responder and first aid specialist for injured animals.',
          profile_image_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
          user_type: 'saviour',
          verified: true
        },
        {
          google_id: 'google_678901',
          email: 'hope.rescue@example.com',
          name: 'Hope Animal Rescue Center',
          phone: '+91-98765-43216',
          location: 'Mumbai, Maharashtra',
          bio: 'Dedicated to helping animals in need with comprehensive rescue services.',
          profile_image_url: 'https://images.unsplash.com/photo-1581888227599-779811939961?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          user_type: 'rescue-center',
          verified: true
        },
        {
          google_id: 'google_890123',
          email: 'paws.care@example.com',
          name: 'Paws Care Foundation',
          phone: '+91-98765-43217',
          location: 'Delhi, NCR',
          bio: 'NGO providing shelter, medical care, and adoption services for stray animals.',
          profile_image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          user_type: 'rescue-center',
          verified: true
        },
        {
          google_id: 'google_456789',
          email: 'wildlife.trust@example.com',
          name: 'Wildlife Trust India',
          phone: '+91-98765-43218',
          location: 'Bangalore, Karnataka',
          bio: 'Registered trust focused on wildlife rescue and rehabilitation.',
          profile_image_url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          user_type: 'rescue-center',
          verified: true
        },
        {
          google_id: 'google_012345',
          email: 'street.dogs@example.com',
          name: 'Street Dogs Protection Society',
          phone: '+91-98765-43219',
          location: 'Chennai, Tamil Nadu',
          bio: 'Community-based organization protecting and caring for street dogs.',
          profile_image_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          user_type: 'rescue-center',
          verified: false
        },
        {
          google_id: 'google_345678',
          email: 'animal.haven@example.com',
          name: 'Animal Haven Shelter',
          phone: '+91-98765-43220',
          location: 'Hyderabad, Telangana',
          bio: 'Private shelter providing temporary housing and medical care for abandoned animals.',
          profile_image_url: 'https://images.unsplash.com/photo-1529429617124-5b1096da02e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          user_type: 'rescue-center',
          verified: true
        }
      ])
      .select();

    if (usersError) throw usersError;
    console.log(`✅ Created ${users.length} users`);

    // Insert saviour profiles
    console.log('🦸‍♂️ Creating saviour profiles...');
    const saviourProfiles = [
      {
        user_id: users.find(u => u.email === 'john.doe@example.com').id,
        full_name: 'John Doe',
        profile_picture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
        contact_number: '+91-98765-43210',
        email_address: 'john.doe@example.com',
        location_area: 'Andheri West, Mumbai',
        verified_badge: true,
        rescues_submitted_count: 15,
        saviour_badge: 'Top Rescuer',
        short_bio: 'Animal lover and volunteer rescuer from Mumbai. Specialized in street dog rescue and emergency response.',
        social_links: { instagram: 'john_animal_rescuer', facebook: 'john.doe.rescuer', linkedin: 'john-doe-animal-rescuer' },
        experience_level: 'Experienced',
        specializations: 'Dogs, Cats, Emergency Response, First Aid'
      },
      {
        user_id: users.find(u => u.email === 'sarah.wilson@example.com').id,
        full_name: 'Dr. Sarah Wilson',
        profile_picture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
        contact_number: '+91-98765-43211',
        email_address: 'sarah.wilson@example.com',
        location_area: 'Connaught Place, Delhi',
        verified_badge: true,
        rescues_submitted_count: 42,
        saviour_badge: 'First Responder',
        short_bio: 'Veterinarian specializing in emergency animal care and wildlife rescue. Available 24/7 for critical cases.',
        social_links: { instagram: 'dr_sarah_wilson', facebook: 'dr.sarah.wilson', youtube: 'DrSarahWilsonVet' },
        experience_level: 'Professional',
        specializations: 'Emergency Care, Surgery, Wildlife, Birds, Reptiles'
      },
      {
        user_id: users.find(u => u.email === 'priya.sharma@example.com').id,
        full_name: 'Priya Sharma',
        profile_picture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
        contact_number: '+91-98765-43213',
        email_address: 'priya.sharma@example.com',
        location_area: 'T Nagar, Chennai',
        verified_badge: true,
        rescues_submitted_count: 28,
        saviour_badge: 'Community Leader',
        short_bio: 'Animal welfare activist and rescue volunteer with expertise in street dogs and community education.',
        social_links: { instagram: 'priya_animal_activist', facebook: 'priya.sharma.activist' },
        experience_level: 'Experienced',
        specializations: 'Street Dogs, Community Education, TNR Programs'
      },
      {
        user_id: users.find(u => u.email === 'raj.kumar@example.com').id,
        full_name: 'Raj Kumar',
        profile_picture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
        contact_number: '+91-98765-43214',
        email_address: 'raj.kumar@example.com',
        location_area: 'Banjara Hills, Hyderabad',
        verified_badge: false,
        rescues_submitted_count: 8,
        saviour_badge: 'Wildlife Specialist',
        short_bio: 'Wildlife rescuer and conservationist with focus on birds and reptiles. Passionate about protecting native species.',
        social_links: { instagram: 'raj_wildlife_rescuer', facebook: 'raj.kumar.wildlife' },
        experience_level: 'Intermediate',
        specializations: 'Birds, Reptiles, Wildlife, Conservation'
      },
      {
        user_id: users.find(u => u.email === 'anita.patel@example.com').id,
        full_name: 'Anita Patel',
        profile_picture: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
        contact_number: '+91-98765-43215',
        email_address: 'anita.patel@example.com',
        location_area: 'Koregaon Park, Pune',
        verified_badge: true,
        rescues_submitted_count: 35,
        saviour_badge: 'Emergency Responder',
        short_bio: 'Emergency responder and first aid specialist for injured animals. Trained in trauma care and rehabilitation.',
        social_links: { instagram: 'anita_emergency_rescuer', facebook: 'anita.patel.emergency' },
        experience_level: 'Professional',
        specializations: 'Emergency Response, Trauma Care, Rehabilitation, First Aid'
      }
    ];

    const { error: saviourError } = await supabase
      .from('saviour_profiles')
      .insert(saviourProfiles);

    if (saviourError) throw saviourError;
    console.log(`✅ Created ${saviourProfiles.length} saviour profiles`);

    // Insert rescue center profiles
    console.log('🏥 Creating rescue center profiles...');
    const rescueCenterProfiles = [
      {
        user_id: users.find(u => u.email === 'hope.rescue@example.com').id,
        center_name: 'Hope Animal Rescue Center',
        logo_profile_image: 'https://images.unsplash.com/photo-1581888227599-779811939961?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        center_type: 'Registered NGO',
        registration_number: 'NGO-123456-MH',
        contact_person_name: 'Mike Johnson',
        contact_number: '+91-98765-43216',
        whatsapp_number: '+91-98765-43216',
        email_address: 'hope.rescue@example.com',
        full_address: '123 Rescue Street, Andheri West, Mumbai, Maharashtra 400058',
        service_area: 'Mumbai Metropolitan Region',
        working_hours: '24/7 Emergency Response',
        emergency_response: true,
        volunteers_count: 25,
        animals_rescued_count: 156,
        facilities_available: ['Ambulance', 'Shelter', 'Medical Treatment', 'Foster Care', 'Adoption Services', 'Rehabilitation'],
        rescue_categories_accepted: ['Dogs', 'Cats', 'Birds', 'Small Animals'],
        verified_badge: true,
        gallery: [
          'https://images.unsplash.com/photo-1581888227599-779811939961?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        social_media_links: { instagram: 'hope_animal_rescue', facebook: 'hopeanimalrescue', youtube: 'HopeAnimalRescue' },
        donate_button_link: 'https://donate.hopeanimalrescue.org',
        website: 'https://hopeanimalrescue.org',
        capacity: '100 animals',
        services: 'Emergency rescue, Medical care, Adoption services, Community education',
        rating: 4.8,
        is_open: true,
        hours: '24/7 Emergency',
        rescues_count: 156,
        years_active: 8
      },
      {
        user_id: users.find(u => u.email === 'paws.care@example.com').id,
        center_name: 'Paws Care Foundation',
        logo_profile_image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        center_type: 'Registered Trust',
        registration_number: 'TRUST-789012-DL',
        contact_person_name: 'Dr. Priya Singh',
        contact_number: '+91-98765-43217',
        whatsapp_number: '+91-98765-43217',
        email_address: 'paws.care@example.com',
        full_address: '456 Animal Care Road, Connaught Place, New Delhi, Delhi 110001',
        service_area: 'Delhi NCR',
        working_hours: 'Monday-Saturday: 9 AM - 6 PM, Sunday: Emergency Only',
        emergency_response: true,
        volunteers_count: 15,
        animals_rescued_count: 89,
        facilities_available: ['Shelter', 'Medical Treatment', 'Adoption Services', 'Spay/Neuter', 'Vaccination'],
        rescue_categories_accepted: ['Dogs', 'Cats', 'Puppies', 'Kittens'],
        verified_badge: true,
        gallery: [
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1529429617124-5b1096da02e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        social_media_links: { instagram: 'paws_care_foundation', facebook: 'pawscarefoundation' },
        donate_button_link: 'https://donate.pawscare.org',
        website: 'https://pawscare.org',
        capacity: '75 animals',
        services: 'Shelter, Medical care, Adoption, Spay/neuter programs',
        rating: 4.6,
        is_open: true,
        hours: '9 AM - 6 PM',
        rescues_count: 89,
        years_active: 5
      },
      {
        user_id: users.find(u => u.email === 'wildlife.trust@example.com').id,
        center_name: 'Wildlife Trust India',
        logo_profile_image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        center_type: 'Registered Trust',
        registration_number: 'TRUST-345678-KA',
        contact_person_name: 'Dr. Rajesh Kumar',
        contact_number: '+91-98765-43218',
        whatsapp_number: '+91-98765-43218',
        email_address: 'wildlife.trust@example.com',
        full_address: '789 Wildlife Sanctuary, Bannerghatta Road, Bangalore, Karnataka 560083',
        service_area: 'Karnataka State',
        working_hours: '24/7 Wildlife Emergency',
        emergency_response: true,
        volunteers_count: 8,
        animals_rescued_count: 234,
        facilities_available: ['Wildlife Sanctuary', 'Medical Treatment', 'Rehabilitation', 'Release Programs', 'Research'],
        rescue_categories_accepted: ['Birds', 'Reptiles', 'Mammals', 'Primates'],
        verified_badge: true,
        gallery: [
          'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1529429617124-5b1096da02e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        social_media_links: { instagram: 'wildlife_trust_india', facebook: 'wildlifetrustindia', youtube: 'WildlifeTrustIndia' },
        donate_button_link: 'https://donate.wildlifetrust.org',
        website: 'https://wildlifetrust.org',
        capacity: '50 animals',
        services: 'Wildlife rescue, Rehabilitation, Research, Conservation',
        rating: 4.9,
        is_open: true,
        hours: '24/7 Wildlife Emergency',
        rescues_count: 234,
        years_active: 12
      },
      {
        user_id: users.find(u => u.email === 'street.dogs@example.com').id,
        center_name: 'Street Dogs Protection Society',
        logo_profile_image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        center_type: 'Community Organization',
        contact_person_name: 'Anand Kumar',
        contact_number: '+91-98765-43219',
        whatsapp_number: '+91-98765-43219',
        email_address: 'street.dogs@example.com',
        full_address: '321 Community Center, T Nagar, Chennai, Tamil Nadu 600017',
        service_area: 'Chennai City',
        working_hours: 'Monday-Friday: 8 AM - 8 PM, Weekends: 10 AM - 6 PM',
        emergency_response: false,
        volunteers_count: 12,
        animals_rescued_count: 67,
        facilities_available: ['Feeding Programs', 'Medical Care', 'TNR Programs', 'Adoption'],
        rescue_categories_accepted: ['Street Dogs', 'Puppies'],
        verified_badge: false,
        gallery: [
          'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        social_media_links: { instagram: 'street_dogs_protection', facebook: 'streetdogsprotectionsociety' },
        capacity: '40 animals',
        services: 'Street dog protection, Feeding programs, TNR, Adoption',
        rating: 4.3,
        is_open: true,
        hours: '8 AM - 8 PM',
        rescues_count: 67,
        years_active: 3
      },
      {
        user_id: users.find(u => u.email === 'animal.haven@example.com').id,
        center_name: 'Animal Haven Shelter',
        logo_profile_image: 'https://images.unsplash.com/photo-1529429617124-5b1096da02e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        center_type: 'Private Shelter',
        contact_person_name: 'Meera Reddy',
        contact_number: '+91-98765-43220',
        whatsapp_number: '+91-98765-43220',
        email_address: 'animal.haven@example.com',
        full_address: '654 Haven Road, Banjara Hills, Hyderabad, Telangana 500034',
        service_area: 'Hyderabad City',
        working_hours: 'Daily: 9 AM - 7 PM',
        emergency_response: true,
        volunteers_count: 6,
        animals_rescued_count: 45,
        facilities_available: ['Temporary Shelter', 'Medical Care', 'Adoption Services', 'Foster Programs'],
        rescue_categories_accepted: ['Dogs', 'Cats', 'Small Animals'],
        verified_badge: true,
        gallery: [
          'https://images.unsplash.com/photo-1529429617124-5b1096da02e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        social_media_links: { instagram: 'animal_haven_shelter', facebook: 'animalhavenshelter' },
        donate_button_link: 'https://donate.animalhaven.org',
        website: 'https://animalhaven.org',
        capacity: '60 animals',
        services: 'Temporary shelter, Medical care, Adoption, Foster programs',
        rating: 4.7,
        is_open: true,
        hours: '9 AM - 7 PM',
        rescues_count: 45,
        years_active: 4
      }
    ];

    const { error: rescueCenterError } = await supabase
      .from('rescue_center_profiles')
      .insert(rescueCenterProfiles);

    if (rescueCenterError) throw rescueCenterError;
    console.log(`✅ Created ${rescueCenterProfiles.length} rescue center profiles`);

// Insert blog categories
    console.log('📚 Creating blog categories...');
    const { data: blogCategories, error: blogCategoriesError } = await supabase
      .from('blog_categories')
      .insert([
        {
          name: 'Animal Psychology',
          description: 'Understand how animals think and feel.',
          slug: 'animal-psychology',
          icon_url: 'https://example.com/animal-psychology-icon.png'
        },
        {
          name: 'Animal Behaviors',
          description: 'Insights into common animal behaviors.',
          slug: 'animal-behaviors',
          icon_url: 'https://example.com/animal-behaviors-icon.png'
        },
        {
          name: 'Dog Behaviors',
          description: 'Learn about various dog behaviors.',
          parent_id: null,
          slug: 'dog-behaviors',
          icon_url: 'https://example.com/dog-behaviors-icon.png'
        },
        {
          name: 'Cat Behaviors',
          description: 'Insights into cat behaviors.',
          parent_id: null,
          slug: 'cat-behaviors',
          icon_url: 'https://example.com/cat-behaviors-icon.png'
        }
      ])
      .select();

    if (blogCategoriesError) throw blogCategoriesError;
    console.log(`✅ Created ${blogCategories.length} blog categories`);

    // Insert blog articles
    console.log('✍️ Creating blog articles...');
    const { error: blogArticlesError } = await supabase
      .from('blog_articles')
      .insert([
        {
          title: '5 Ways to Gain a Dog’s Trust',
          content: 'Here are five trusted ways to gain a dog’s trust within minutes...',
          excerpt: 'Learn the secrets to quickly gaining a dog’s trust.',
          image_url: 'https://example.com/dog-trust.jpg',
          category_id: blogCategories.find(c => c.slug === 'dog-behaviors').id,
          author_id: users.find(u => u.email === 'priya.sharma@example.com').id,
          author_name: 'Priya Sharma',
          author_image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
          published_at: new Date().toISOString(),
          read_time: 5,
          tags: ['dog', 'trust', 'relationship'],
          is_published: true,
          slug: 'gain-dog-trust'
        },
        {
          title: 'Cat Communication Explained',
          content: 'Understanding how cats communicate with each other and humans...',
          excerpt: 'Decipher the secret language of cats.',
          image_url: 'https://example.com/cat-communication.jpg',
          category_id: blogCategories.find(c => c.slug === 'cat-behaviors').id,
          author_id: users.find(u => u.email === 'john.doe@example.com').id,
          author_name: 'John Doe',
          author_image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
          published_at: new Date().toISOString(),
          read_time: 7,
          tags: ['cat', 'communication', 'language'],
          is_published: true,
          slug: 'cat-communication-explained'
        }
      ]);

    if (blogArticlesError) throw blogArticlesError;
    console.log('✅ Created blog articles');

    // Insert products
    console.log('🛍️ Creating products...');
    const { error: productsError } = await supabase
      .from('products')
      .insert([
        {
          name: 'Animal Rescue T-Shirt',
          description: 'Comfortable cotton t-shirt supporting animal rescue efforts. 100% of proceeds go to rescue organizations.',
          price: 25.00,
          image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          category: 'Clothing',
          stock_quantity: 50,
          is_featured: true
        },
        {
          name: 'Rescue Center Mug',
          description: 'Ceramic mug with animal rescue design. Perfect for coffee lovers who support animal welfare.',
          price: 15.00,
          image_url: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          category: 'Accessories',
          stock_quantity: 100,
          is_featured: true
        },
        {
          name: 'Animal Care Kit',
          description: 'Essential supplies for animal first aid and care. Includes bandages, antiseptic, and emergency contact numbers.',
          price: 45.00,
          image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          category: 'Supplies',
          stock_quantity: 25,
          is_featured: false
        },
        {
          name: 'Rescue Volunteer Cap',
          description: 'Comfortable cap for rescue volunteers. Features reflective strips for safety during night rescues.',
          price: 20.00,
          image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          category: 'Clothing',
          stock_quantity: 75,
          is_featured: false
        },
        {
          name: 'Emergency Pet Carrier',
          description: 'Collapsible pet carrier for emergency transport. Lightweight and easy to carry.',
          price: 35.00,
          image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          category: 'Supplies',
          stock_quantity: 30,
          is_featured: true
        }
      ]);

    if (productsError) throw productsError;
    console.log('✅ Created 5 products');

    // Insert badges
    console.log('🏆 Creating badges...');
    const { error: badgesError } = await supabase
      .from('badges')
      .insert([
        {
          name: 'First Rescue',
          description: 'Completed your first animal rescue',
          icon_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
        },
        {
          name: 'Hero',
          description: 'Saved 10 or more animals',
          icon_url: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
        },
        {
          name: 'Emergency Responder',
          description: 'Responded to 5 emergency situations',
          icon_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
        },
        {
          name: 'Community Leader',
          description: 'Helped organize community rescue efforts',
          icon_url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
        },
        {
          name: 'Wildlife Specialist',
          description: 'Specialized in wildlife rescue and rehabilitation',
          icon_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
        },
        {
          name: 'Verified Rescuer',
          description: 'Identity and credentials verified by ALS team',
          icon_url: 'https://images.unsplash.com/photo-1529429617124-5b1096da02e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
        }
      ]);

    if (badgesError) throw badgesError;
    console.log('✅ Created 6 badges');

    // Insert rescue stories
    console.log('📖 Creating rescue stories...');
    const { error: rescueStoriesError } = await supabase
      .from('rescue_stories')
      .insert([
        {
          title: 'Lucky the Street Dog',
          story: 'Found Lucky injured on the streets of Mumbai. After 3 months of treatment and rehabilitation, he was successfully adopted by a loving family. This rescue showed the importance of community involvement in animal welfare.',
          image_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          before_image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          after_image_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          location: 'Mumbai, Maharashtra',
          date: '2024-01-15',
          saviour_id: users.find(u => u.email === 'john.doe@example.com').id,
          rescue_center_id: users.find(u => u.email === 'hope.rescue@example.com').id,
          animal_type: 'Dog',
          status: 'completed'
        },
        {
          title: 'Eagle Rescue from High-Rise',
          story: 'Rescued a young eagle that was trapped on a 15th floor balcony. The bird was dehydrated and exhausted. After proper care and rehabilitation, it was successfully released back into the wild.',
          image_url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          before_image_url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          after_image_url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          location: 'Delhi, NCR',
          date: '2024-02-20',
          saviour_id: users.find(u => u.email === 'sarah.wilson@example.com').id,
          rescue_center_id: users.find(u => u.email === 'wildlife.trust@example.com').id,
          animal_type: 'Bird',
          status: 'completed'
        },
        {
          title: 'Kitten Stuck in Drain',
          story: 'Emergency rescue of a 3-week-old kitten stuck in a storm drain. The rescue required coordination between multiple volunteers and careful extraction. The kitten is now thriving in foster care.',
          image_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          before_image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          after_image_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          location: 'Chennai, Tamil Nadu',
          date: '2024-03-10',
          saviour_id: users.find(u => u.email === 'priya.sharma@example.com').id,
          rescue_center_id: users.find(u => u.email === 'paws.care@example.com').id,
          animal_type: 'Cat',
          status: 'completed'
        },
        {
          title: 'Snake in Residential Area',
          story: 'Rescued a non-venomous rat snake from a residential area where it was causing panic. Safely relocated the snake to a nearby forest area where it can thrive naturally.',
          image_url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          before_image_url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          after_image_url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          location: 'Hyderabad, Telangana',
          date: '2024-03-25',
          saviour_id: users.find(u => u.email === 'raj.kumar@example.com').id,
          rescue_center_id: users.find(u => u.email === 'wildlife.trust@example.com').id,
          animal_type: 'Reptile',
          status: 'completed'
        },
        {
          title: 'Injured Puppy on Highway',
          story: 'Found an injured puppy on the highway with a broken leg. Rushed to emergency care and after surgery and rehabilitation, the puppy made a full recovery and found a forever home.',
          image_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          before_image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          after_image_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          location: 'Pune, Maharashtra',
          date: '2024-04-05',
          saviour_id: users.find(u => u.email === 'anita.patel@example.com').id,
          rescue_center_id: users.find(u => u.email === 'animal.haven@example.com').id,
          animal_type: 'Dog',
          status: 'completed'
        }
      ]);

    if (rescueStoriesError) throw rescueStoriesError;
    console.log('✅ Created 5 rescue stories');

    // Insert SOS reports
    console.log('🚨 Creating SOS reports...');
    const { error: sosReportsError } = await supabase
      .from('sos_reports')
      .insert([
        {
          image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          location: 'Andheri West, Mumbai',
          animal_type: 'Dog',
          description: 'Injured dog with bleeding wound on hind leg. Appears to be in pain and unable to walk properly.',
          status: 'accepted',
          assigned_to: users.find(u => u.email === 'hope.rescue@example.com').id
        },
        {
          image_url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          location: 'Connaught Place, Delhi',
          animal_type: 'Bird',
          description: 'Young eagle found on ground, appears to have injured wing. Unable to fly.',
          status: 'in_progress',
          assigned_to: users.find(u => u.email === 'wildlife.trust@example.com').id
        },
        {
          image_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          location: 'T Nagar, Chennai',
          animal_type: 'Cat',
          description: 'Kitten stuck in storm drain, crying for help. Need immediate assistance.',
          status: 'completed',
          assigned_to: users.find(u => u.email === 'paws.care@example.com').id
        },
        {
          image_url: 'https://images.unsplash.com/photo-1529429617124-5b1096da02e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          location: 'Banjara Hills, Hyderabad',
          animal_type: 'Dog',
          description: 'Puppy with severe mange and malnutrition. Needs immediate medical attention.',
          status: 'pending'
        },
        {
          image_url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          location: 'Koregaon Park, Pune',
          animal_type: 'Reptile',
          description: 'Snake found in residential area. Non-venomous but causing panic among residents.',
          status: 'accepted',
          assigned_to: users.find(u => u.email === 'wildlife.trust@example.com').id
        }
      ]);

    if (sosReportsError) throw sosReportsError;
    console.log('✅ Created 5 SOS reports');

    // Get badges for assignment
    const { data: badges, error: badgesFetchError } = await supabase
      .from('badges')
      .select('*');

    if (badgesFetchError) throw badgesFetchError;

    // Assign badges to users
    console.log('🏅 Assigning badges to users...');
    const userBadges = [
      {
        user_id: users.find(u => u.email === 'john.doe@example.com').id,
        badge_id: badges.find(b => b.name === 'First Rescue').id
      },
      {
        user_id: users.find(u => u.email === 'john.doe@example.com').id,
        badge_id: badges.find(b => b.name === 'Hero').id
      },
      {
        user_id: users.find(u => u.email === 'sarah.wilson@example.com').id,
        badge_id: badges.find(b => b.name === 'Emergency Responder').id
      },
      {
        user_id: users.find(u => u.email === 'sarah.wilson@example.com').id,
        badge_id: badges.find(b => b.name === 'Verified Rescuer').id
      },
      {
        user_id: users.find(u => u.email === 'priya.sharma@example.com').id,
        badge_id: badges.find(b => b.name === 'Community Leader').id
      },
      {
        user_id: users.find(u => u.email === 'priya.sharma@example.com').id,
        badge_id: badges.find(b => b.name === 'Verified Rescuer').id
      },
      {
        user_id: users.find(u => u.email === 'raj.kumar@example.com').id,
        badge_id: badges.find(b => b.name === 'Wildlife Specialist').id
      },
      {
        user_id: users.find(u => u.email === 'anita.patel@example.com').id,
        badge_id: badges.find(b => b.name === 'Emergency Responder').id
      },
      {
        user_id: users.find(u => u.email === 'anita.patel@example.com').id,
        badge_id: badges.find(b => b.name === 'Verified Rescuer').id
      }
    ];

    const { error: userBadgesError } = await supabase
      .from('user_badges')
      .insert(userBadges);

    if (userBadgesError) throw userBadgesError;
    console.log(`✅ Assigned ${userBadges.length} badges to users`);

    // Insert sample donations
    console.log('💝 Creating sample donations...');
    const { error: donationsError } = await supabase
      .from('donations')
      .insert([
        {
          donor_id: users.find(u => u.email === 'john.doe@example.com').id,
          amount: 100.00,
          message: 'Keep up the great work!',
          is_anonymous: false
        },
        {
          donor_id: users.find(u => u.email === 'sarah.wilson@example.com').id,
          amount: 50.00,
          message: 'For the rescue animals',
          is_anonymous: false
        },
        {
          donor_id: users.find(u => u.email === 'hope.rescue@example.com').id,
          amount: 200.00,
          message: 'Supporting our mission',
          is_anonymous: false
        }
      ]);

    if (donationsError) throw donationsError;
    console.log('✅ Created 3 sample donations');

    // Insert social links
    console.log('🔗 Creating social links...');
    const { error: socialLinksError } = await supabase
      .from('social_links')
      .insert([
        {
          name: 'Facebook Community',
          url: 'https://facebook.com/groups/animallifesaver',
          icon_name: 'facebook',
          description: 'Join our Facebook community to connect with other animal rescuers'
        },
        {
          name: 'Instagram',
          url: 'https://instagram.com/animallifesaver',
          icon_name: 'instagram',
          description: 'Follow us for daily rescue updates and tips'
        },
        {
          name: 'Twitter',
          url: 'https://twitter.com/animallifesaver',
          icon_name: 'twitter',
          description: 'Get the latest news and emergency alerts'
        },
        {
          name: 'YouTube',
          url: 'https://youtube.com/animallifesaver',
          icon_name: 'youtube',
          description: 'Watch rescue stories and educational content'
        },
        {
          name: 'WhatsApp Community',
          url: 'https://chat.whatsapp.com/animallifesaver',
          icon_name: 'message-circle',
          description: 'Quick updates and emergency coordination'
        }
      ]);

    if (socialLinksError) throw socialLinksError;
    console.log('✅ Created 5 social links');

    console.log('\n🎉 Database population completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`  - ${users.length} users created`);
    console.log(`  - ${saviourProfiles.length} saviour profiles created`);
    console.log(`  - ${rescueCenterProfiles.length} rescue center profiles created`);
    console.log(`  - 5 products created`);
    console.log(`  - 6 badges created`);
    console.log(`  - 5 rescue stories created`);
    console.log(`  - 5 SOS reports created`);
    console.log(`  - ${userBadges.length} user badges assigned`);
    console.log(`  - 3 sample donations created`);

  } catch (error) {
    console.error('❌ Error populating database:', error.message);
    process.exit(1);
  }
}

populateDatabase(); 