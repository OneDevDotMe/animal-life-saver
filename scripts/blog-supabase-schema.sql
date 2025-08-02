-- Create blog_categories table
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  parent_id UUID REFERENCES blog_categories(id),
  slug VARCHAR(255) UNIQUE NOT NULL,
  icon_url VARCHAR(500),
  article_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_articles table
CREATE TABLE IF NOT EXISTS blog_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url VARCHAR(500),
  category_id UUID REFERENCES blog_categories(id) ON DELETE CASCADE,
  author_id UUID,
  author_name VARCHAR(255) NOT NULL,
  author_image VARCHAR(500),
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read_time INTEGER DEFAULT 5,
  tags TEXT[] DEFAULT '{}',
  is_published BOOLEAN DEFAULT true,
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  slug VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create social_links table
CREATE TABLE IF NOT EXISTS social_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  url VARCHAR(500) NOT NULL,
  icon_name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample blog categories
INSERT INTO blog_categories (name, description, slug, icon_url) VALUES
('Animal Psychology', 'Understanding animal behavior and mental processes', 'animal-psychology', 'brain'),
('Dog Behavior', 'Everything about understanding and training dogs', 'dog-behavior', 'dog'),
('Cat Behavior', 'Understanding feline behavior and communication', 'cat-behavior', 'cat'),
('Animal Care', 'General care tips for various animals', 'animal-care', 'heart'),
('Emergency Care', 'First aid and emergency care for animals', 'emergency-care', 'alert-triangle'),
('Training Tips', 'Training techniques for different animals', 'training-tips', 'graduation-cap'),
('Nutrition', 'Proper nutrition for different animals', 'nutrition', 'apple'),
('Health & Wellness', 'Maintaining animal health and preventing diseases', 'health-wellness', 'activity');

-- Insert sub-categories
INSERT INTO blog_categories (name, description, parent_id, slug, icon_url) VALUES
('Puppy Training', 'Training techniques for young dogs', (SELECT id FROM blog_categories WHERE slug = 'dog-behavior'), 'puppy-training', 'baby'),
('Senior Dog Care', 'Caring for older dogs', (SELECT id FROM blog_categories WHERE slug = 'dog-behavior'), 'senior-dog-care', 'clock'),
('Cat Communication', 'Understanding cat body language', (SELECT id FROM blog_categories WHERE slug = 'cat-behavior'), 'cat-communication', 'message-circle'),
('Kitten Care', 'Caring for young cats', (SELECT id FROM blog_categories WHERE slug = 'cat-behavior'), 'kitten-care', 'baby');

-- Insert sample blog articles
INSERT INTO blog_articles (title, content, excerpt, image_url, category_id, author_name, read_time, tags, slug) VALUES
(
  '5 Things to Gain a Dog''s Trust Within Minutes',
  'Building trust with a dog is essential for a strong relationship. Here are five proven techniques that can help you gain a dog''s trust quickly and effectively.

1. **Approach Slowly and Sideways**
   When approaching a dog, especially one you don''t know, avoid direct eye contact and approach from the side rather than head-on. This is less threatening and shows you''re not a predator.

2. **Use the "No Touch, No Talk, No Eye Contact" Rule**
   For the first few minutes, ignore the dog completely. Let them come to you on their own terms. This gives them control and reduces anxiety.

3. **Offer High-Value Treats**
   Use treats that the dog finds irresistible, like small pieces of chicken or cheese. Toss them near the dog without trying to hand-feed initially.

4. **Respect Their Space**
   Don''t force interaction. Let the dog decide when they''re ready to approach you. This builds confidence and trust.

5. **Use Calm, Gentle Body Language**
   Keep your movements slow and deliberate. Avoid sudden gestures or loud noises that might startle the dog.

Remember, every dog is different, and some may take longer to trust than others. Patience and consistency are key to building a lasting bond.',
  'Learn the essential techniques to quickly build trust with any dog, from proper approach methods to using treats effectively.',
  'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800',
  (SELECT id FROM blog_categories WHERE slug = 'dog-behavior'),
  'Dr. Sarah Johnson',
  8,
  ARRAY['dog training', 'trust building', 'behavior', 'canine psychology'],
  'gain-dog-trust-minutes'
),
(
  'Understanding Cat Body Language: A Complete Guide',
  'Cats communicate primarily through body language, and understanding these signals is crucial for building a strong relationship with your feline friend.

**Tail Positions:**
- Straight up with a curl: Happy and confident
- Puffed up: Frightened or threatened
- Twitching: Excited or irritated
- Low and tucked: Scared or submissive

**Ear Positions:**
- Forward: Alert and interested
- Backward: Anxious or irritated
- Flat against head: Very scared or angry

**Eye Contact:**
- Slow blinking: Trust and affection (try slow blinking back!)
- Dilated pupils: Excited or frightened
- Narrowed eyes: Content or sleepy

**Body Posture:**
- Arched back with raised fur: Threatened
- Belly exposed: Trusting and relaxed
- Crouched low: Scared or preparing to pounce

**Vocalizations:**
- Purring: Usually content, but can also indicate pain
- Meowing: Attention-seeking or greeting
- Hissing: Threatened or angry
- Chirping: Excited (often when watching birds)

Understanding these signals will help you better communicate with your cat and respond appropriately to their needs.',
  'Master the art of reading your cat''s body language to better understand their emotions and needs.',
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
  (SELECT id FROM blog_categories WHERE slug = 'cat-behavior'),
  'Dr. Michael Chen',
  10,
  ARRAY['cat behavior', 'body language', 'feline communication', 'pet care'],
  'understanding-cat-body-language'
),
(
  'Emergency First Aid for Pets: What Every Pet Owner Should Know',
  'Being prepared for pet emergencies can save your animal''s life. Here''s what you need to know about pet first aid.

**Essential First Aid Kit:**
- Gauze pads and rolls
- Adhesive tape
- Scissors
- Tweezers
- Digital thermometer
- Hydrogen peroxide (for wound cleaning)
- Saline solution
- Emergency contact numbers

**Common Emergency Situations:**

1. **Bleeding:**
   Apply direct pressure with clean gauze. If bleeding doesn''t stop within 10 minutes, seek veterinary care immediately.

2. **Choking:**
   For dogs: Perform the Heimlich maneuver by placing your hands below the ribcage and applying upward pressure.
   For cats: Gently pat their back while holding them upside down.

3. **Heatstroke:**
   Move to a cool area, apply cool (not cold) water, and use fans. Never use ice as it can cause shock.

4. **Poisoning:**
   Do NOT induce vomiting unless directed by a veterinarian. Contact animal poison control immediately.

5. **Seizures:**
   Clear the area of objects, don''t restrain the animal, and time the seizure. Seek veterinary care if it lasts more than 3 minutes.

**When to Seek Emergency Care:**
- Difficulty breathing
- Severe bleeding
- Loss of consciousness
- Seizures lasting more than 3 minutes
- Suspected poisoning
- Trauma (hit by car, falls, etc.)

Always have your veterinarian''s emergency number and the nearest emergency animal hospital contact information readily available.',
  'Learn essential first aid techniques and emergency procedures that every pet owner should know to keep their animals safe.',
  'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800',
  (SELECT id FROM blog_categories WHERE slug = 'emergency-care'),
  'Dr. Emily Rodriguez',
  12,
  ARRAY['first aid', 'emergency care', 'pet safety', 'veterinary'],
  'emergency-first-aid-pets'
),
(
  'The Psychology Behind Animal Rescue: Why We Feel So Connected',
  'There''s something deeply human about our connection to animals in need. Understanding the psychology behind this connection can help us become better rescuers and advocates.

**The Science of Animal-Human Bonding:**
Research shows that interacting with animals releases oxytocin, the "love hormone," in both humans and animals. This creates a powerful bond that transcends species barriers.

**Why We Rescue:**
1. **Empathy and Compassion:** We naturally empathize with suffering, regardless of species
2. **Instinctive Care:** Humans evolved as caregivers, and this extends to animals
3. **Emotional Fulfillment:** Helping animals provides deep emotional satisfaction
4. **Social Connection:** Animal rescue often brings people together in meaningful ways

**The Impact on Mental Health:**
- Reduces stress and anxiety
- Provides purpose and meaning
- Creates social connections
- Improves overall well-being

**Understanding Animal Trauma:**
Rescued animals often experience trauma that affects their behavior. Understanding this helps us:
- Be patient with behavioral issues
- Provide appropriate care and rehabilitation
- Set realistic expectations for recovery
- Create safe, trusting environments

**Building Trust with Rescued Animals:**
- Respect their boundaries
- Provide consistent routines
- Use positive reinforcement
- Give them time to adjust
- Understand that progress may be slow

The psychological connection between humans and animals is profound and can be a powerful force for positive change in both species.',
  'Explore the deep psychological connection between humans and animals, and how understanding this bond can make us better rescuers.',
  'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800',
  (SELECT id FROM blog_categories WHERE slug = 'animal-psychology'),
  'Dr. Lisa Thompson',
  15,
  ARRAY['animal psychology', 'human-animal bond', 'rescue psychology', 'empathy'],
  'psychology-behind-animal-rescue'
),
(
  'Nutrition Guide: What to Feed Your Rescue Animal',
  'Proper nutrition is crucial for the health and recovery of rescued animals. Here''s a comprehensive guide to feeding different types of rescue animals.

**General Principles:**
- Start with small, frequent meals
- Gradually transition to new foods
- Monitor weight and energy levels
- Consult with a veterinarian for specific needs

**Dogs:**
- **Puppies:** High-quality puppy food, 3-4 meals daily
- **Adults:** Quality adult dog food, 2 meals daily
- **Seniors:** Senior-specific food with joint support
- **Special Needs:** Prescription diets for medical conditions

**Cats:**
- **Kittens:** Kitten formula or wet food, 4-6 meals daily
- **Adults:** Mix of wet and dry food, 2-3 meals daily
- **Seniors:** Senior cat food with easy digestion
- **Special Needs:** Grain-free or prescription diets

**Common Nutritional Issues in Rescues:**
1. **Malnutrition:** Gradual refeeding to avoid refeeding syndrome
2. **Dental Problems:** Soft foods or dental-specific diets
3. **Digestive Issues:** Bland diets for sensitive stomachs
4. **Allergies:** Limited ingredient or hypoallergenic foods

**Supplements to Consider:**
- Omega-3 fatty acids for skin and coat
- Probiotics for digestive health
- Glucosamine for joint health
- Vitamins as recommended by vet

**Feeding Schedule:**
- Establish regular meal times
- Remove uneaten food after 20 minutes
- Provide fresh water at all times
- Monitor eating habits for health indicators

Remember, every animal is unique, and their nutritional needs may vary based on age, health, and individual circumstances.',
  'Learn how to provide proper nutrition for rescued animals, from initial feeding to long-term dietary management.',
  'https://images.unsplash.com/photo-1587764379873-97837821f39b?w=800',
  (SELECT id FROM blog_categories WHERE slug = 'nutrition'),
  'Dr. James Wilson',
  11,
  ARRAY['nutrition', 'feeding', 'rescue care', 'pet health'],
  'nutrition-guide-rescue-animals'
);

-- Insert social links
INSERT INTO social_links (name, url, icon_name, description) VALUES
('Facebook Community', 'https://facebook.com/groups/animallifesaver', 'facebook', 'Join our Facebook community for animal lovers'),
('Instagram', 'https://instagram.com/animallifesaver', 'instagram', 'Follow us for daily rescue stories and tips'),
('YouTube Channel', 'https://youtube.com/@animallifesaver', 'youtube', 'Watch rescue videos and educational content'),
('Twitter', 'https://twitter.com/animallifesaver', 'twitter', 'Stay updated with rescue news and tips'),
('WhatsApp Support', 'https://wa.me/1234567890', 'message-circle', 'Get immediate support via WhatsApp');

-- Update article counts
UPDATE blog_categories 
SET article_count = (
  SELECT COUNT(*) 
  FROM blog_articles 
  WHERE blog_articles.category_id = blog_categories.id
); 