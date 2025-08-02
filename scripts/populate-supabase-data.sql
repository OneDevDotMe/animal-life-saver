-- Insert comprehensive sample data for Animal Life Saver

-- Insert sample users (base table)
INSERT INTO users (google_id, email, name, phone, location, bio, profile_image_url, user_type, verified) VALUES
-- Saviours
('google_123456', 'john.doe@example.com', 'John Doe', '+91-98765-43210', 'Mumbai, Maharashtra', 'Passionate animal lover and volunteer rescuer from Mumbai with 5 years of experience.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', 'saviour', true),
('google_789012', 'sarah.wilson@example.com', 'Sarah Wilson', '+91-98765-43211', 'Delhi, NCR', 'Veterinarian specializing in emergency animal care and wildlife rescue.', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', 'saviour', true),
('google_345678', 'mike.rescue@example.com', 'Mike Johnson', '+91-98765-43212', 'Bangalore, Karnataka', 'Founder of Hope Animal Rescue Center with 8 years of experience.', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', 'both', true),
('google_901234', 'priya.sharma@example.com', 'Priya Sharma', '+91-98765-43213', 'Chennai, Tamil Nadu', 'Animal welfare activist and rescue volunteer with expertise in street dogs.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', 'saviour', true),
('google_567890', 'raj.kumar@example.com', 'Raj Kumar', '+91-98765-43214', 'Hyderabad, Telangana', 'Wildlife rescuer and conservationist with focus on birds and reptiles.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', 'saviour', false),
('google_234567', 'anita.patel@example.com', 'Anita Patel', '+91-98765-43215', 'Pune, Maharashtra', 'Emergency responder and first aid specialist for injured animals.', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', 'saviour', true),

-- Rescue Centers
('google_678901', 'hope.rescue@example.com', 'Hope Animal Rescue Center', '+91-98765-43216', 'Mumbai, Maharashtra', 'Dedicated to helping animals in need with comprehensive rescue services.', 'https://images.unsplash.com/photo-1581888227599-779811939961?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 'rescue-center', true),
('google_890123', 'paws.care@example.com', 'Paws Care Foundation', '+91-98765-43217', 'Delhi, NCR', 'NGO providing shelter, medical care, and adoption services for stray animals.', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'rescue-center', true),
('google_456789', 'wildlife.trust@example.com', 'Wildlife Trust India', '+91-98765-43218', 'Bangalore, Karnataka', 'Registered trust focused on wildlife rescue and rehabilitation.', 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'rescue-center', true),
('google_012345', 'street.dogs@example.com', 'Street Dogs Protection Society', '+91-98765-43219', 'Chennai, Tamil Nadu', 'Community-based organization protecting and caring for street dogs.', 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'rescue-center', false),
('google_345678', 'animal.haven@example.com', 'Animal Haven Shelter', '+91-98765-43220', 'Hyderabad, Telangana', 'Private shelter providing temporary housing and medical care for abandoned animals.', 'https://images.unsplash.com/photo-1529429617124-5b1096da02e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'rescue-center', true);

-- Insert comprehensive saviour profiles
INSERT INTO saviour_profiles (
    user_id, full_name, profile_picture, contact_number, email_address, location_area, 
    verified_badge, rescues_submitted_count, most_recent_activity, saviour_badge, 
    short_bio, social_links, experience_level, specializations
) VALUES
(
    (SELECT id FROM users WHERE email = 'john.doe@example.com'),
    'John Doe',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    '+91-98765-43210',
    'john.doe@example.com',
    'Andheri West, Mumbai',
    true,
    15,
    CURRENT_TIMESTAMP - INTERVAL '2 days',
    'Top Rescuer',
    'Animal lover and volunteer rescuer from Mumbai. Specialized in street dog rescue and emergency response.',
    '{"instagram": "john_animal_rescuer", "facebook": "john.doe.rescuer", "linkedin": "john-doe-animal-rescuer"}',
    'Experienced',
    'Dogs, Cats, Emergency Response, First Aid'
),
(
    (SELECT id FROM users WHERE email = 'sarah.wilson@example.com'),
    'Dr. Sarah Wilson',
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    '+91-98765-43211',
    'sarah.wilson@example.com',
    'Connaught Place, Delhi',
    true,
    42,
    CURRENT_TIMESTAMP - INTERVAL '1 day',
    'First Responder',
    'Veterinarian specializing in emergency animal care and wildlife rescue. Available 24/7 for critical cases.',
    '{"instagram": "dr_sarah_wilson", "facebook": "dr.sarah.wilson", "youtube": "DrSarahWilsonVet"}',
    'Professional',
    'Emergency Care, Surgery, Wildlife, Birds, Reptiles'
),
(
    (SELECT id FROM users WHERE email = 'priya.sharma@example.com'),
    'Priya Sharma',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    '+91-98765-43213',
    'priya.sharma@example.com',
    'T Nagar, Chennai',
    true,
    28,
    CURRENT_TIMESTAMP - INTERVAL '3 days',
    'Community Leader',
    'Animal welfare activist and rescue volunteer with expertise in street dogs and community education.',
    '{"instagram": "priya_animal_activist", "facebook": "priya.sharma.activist"}',
    'Experienced',
    'Street Dogs, Community Education, TNR Programs'
),
(
    (SELECT id FROM users WHERE email = 'raj.kumar@example.com'),
    'Raj Kumar',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    '+91-98765-43214',
    'raj.kumar@example.com',
    'Banjara Hills, Hyderabad',
    false,
    8,
    CURRENT_TIMESTAMP - INTERVAL '1 week',
    'Wildlife Specialist',
    'Wildlife rescuer and conservationist with focus on birds and reptiles. Passionate about protecting native species.',
    '{"instagram": "raj_wildlife_rescuer", "facebook": "raj.kumar.wildlife"}',
    'Intermediate',
    'Birds, Reptiles, Wildlife, Conservation'
),
(
    (SELECT id FROM users WHERE email = 'anita.patel@example.com'),
    'Anita Patel',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    '+91-98765-43215',
    'anita.patel@example.com',
    'Koregaon Park, Pune',
    true,
    35,
    CURRENT_TIMESTAMP - INTERVAL '4 hours',
    'Emergency Responder',
    'Emergency responder and first aid specialist for injured animals. Trained in trauma care and rehabilitation.',
    '{"instagram": "anita_emergency_rescuer", "facebook": "anita.patel.emergency"}',
    'Professional',
    'Emergency Response, Trauma Care, Rehabilitation, First Aid'
);

-- Insert comprehensive rescue center profiles
INSERT INTO rescue_center_profiles (
    user_id, center_name, logo_profile_image, center_type, registration_number,
    contact_person_name, contact_number, whatsapp_number, email_address, full_address,
    service_area, working_hours, emergency_response, volunteers_count, animals_rescued_count,
    facilities_available, rescue_categories_accepted, verified_badge, gallery, social_media_links,
    donate_button_link, website, capacity, services, rating, is_open, hours, rescues_count, years_active
) VALUES
(
    (SELECT id FROM users WHERE email = 'hope.rescue@example.com'),
    'Hope Animal Rescue Center',
    'https://images.unsplash.com/photo-1581888227599-779811939961?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'Registered NGO',
    'NGO-123456-MH',
    'Mike Johnson',
    '+91-98765-43216',
    '+91-98765-43216',
    'hope.rescue@example.com',
    '123 Rescue Street, Andheri West, Mumbai, Maharashtra 400058',
    'Mumbai Metropolitan Region',
    '24/7 Emergency Response',
    true,
    25,
    156,
    ARRAY['Ambulance', 'Shelter', 'Medical Treatment', 'Foster Care', 'Adoption Services', 'Rehabilitation'],
    ARRAY['Dogs', 'Cats', 'Birds', 'Small Animals'],
    true,
    '[
        "https://images.unsplash.com/photo-1581888227599-779811939961?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ]',
    '{"instagram": "hope_animal_rescue", "facebook": "hopeanimalrescue", "youtube": "HopeAnimalRescue"}',
    'https://donate.hopeanimalrescue.org',
    'https://hopeanimalrescue.org',
    '100 animals',
    'Emergency rescue, Medical care, Adoption services, Community education',
    4.8,
    true,
    '24/7 Emergency',
    156,
    8
),
(
    (SELECT id FROM users WHERE email = 'paws.care@example.com'),
    'Paws Care Foundation',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'Registered Trust',
    'TRUST-789012-DL',
    'Dr. Priya Singh',
    '+91-98765-43217',
    '+91-98765-43217',
    'paws.care@example.com',
    '456 Animal Care Road, Connaught Place, New Delhi, Delhi 110001',
    'Delhi NCR',
    'Monday-Saturday: 9 AM - 6 PM, Sunday: Emergency Only',
    true,
    15,
    89,
    ARRAY['Shelter', 'Medical Treatment', 'Adoption Services', 'Spay/Neuter', 'Vaccination'],
    ARRAY['Dogs', 'Cats', 'Puppies', 'Kittens'],
    true,
    '[
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1529429617124-5b1096da02e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ]',
    '{"instagram": "paws_care_foundation", "facebook": "pawscarefoundation"}',
    'https://donate.pawscare.org',
    'https://pawscare.org',
    '75 animals',
    'Shelter, Medical care, Adoption, Spay/neuter programs',
    4.6,
    true,
    '9 AM - 6 PM',
    89,
    5
),
(
    (SELECT id FROM users WHERE email = 'wildlife.trust@example.com'),
    'Wildlife Trust India',
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'Registered Trust',
    'TRUST-345678-KA',
    'Dr. Rajesh Kumar',
    '+91-98765-43218',
    '+91-98765-43218',
    'wildlife.trust@example.com',
    '789 Wildlife Sanctuary, Bannerghatta Road, Bangalore, Karnataka 560083',
    'Karnataka State',
    '24/7 Wildlife Emergency',
    true,
    8,
    234,
    ARRAY['Wildlife Sanctuary', 'Medical Treatment', 'Rehabilitation', 'Release Programs', 'Research'],
    ARRAY['Birds', 'Reptiles', 'Mammals', 'Primates'],
    true,
    '[
        "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1529429617124-5b1096da02e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ]',
    '{"instagram": "wildlife_trust_india", "facebook": "wildlifetrustindia", "youtube": "WildlifeTrustIndia"}',
    'https://donate.wildlifetrust.org',
    'https://wildlifetrust.org',
    '50 animals',
    'Wildlife rescue, Rehabilitation, Research, Conservation',
    4.9,
    true,
    '24/7 Wildlife Emergency',
    234,
    12
),
(
    (SELECT id FROM users WHERE email = 'street.dogs@example.com'),
    'Street Dogs Protection Society',
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'Community Organization',
    NULL,
    'Anand Kumar',
    '+91-98765-43219',
    '+91-98765-43219',
    'street.dogs@example.com',
    '321 Community Center, T Nagar, Chennai, Tamil Nadu 600017',
    'Chennai City',
    'Monday-Friday: 8 AM - 8 PM, Weekends: 10 AM - 6 PM',
    false,
    12,
    67,
    ARRAY['Feeding Programs', 'Medical Care', 'TNR Programs', 'Adoption'],
    ARRAY['Street Dogs', 'Puppies'],
    false,
    '[
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ]',
    '{"instagram": "street_dogs_protection", "facebook": "streetdogsprotectionsociety"}',
    NULL,
    NULL,
    '40 animals',
    'Street dog protection, Feeding programs, TNR, Adoption',
    4.3,
    true,
    '8 AM - 8 PM',
    67,
    3
),
(
    (SELECT id FROM users WHERE email = 'animal.haven@example.com'),
    'Animal Haven Shelter',
    'https://images.unsplash.com/photo-1529429617124-5b1096da02e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'Private Shelter',
    NULL,
    'Meera Reddy',
    '+91-98765-43220',
    '+91-98765-43220',
    'animal.haven@example.com',
    '654 Haven Road, Banjara Hills, Hyderabad, Telangana 500034',
    'Hyderabad City',
    'Daily: 9 AM - 7 PM',
    true,
    6,
    45,
    ARRAY['Temporary Shelter', 'Medical Care', 'Adoption Services', 'Foster Programs'],
    ARRAY['Dogs', 'Cats', 'Small Animals'],
    true,
    '[
        "https://images.unsplash.com/photo-1529429617124-5b1096da02e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ]',
    '{"instagram": "animal_haven_shelter", "facebook": "animalhavenshelter"}',
    'https://donate.animalhaven.org',
    'https://animalhaven.org',
    '60 animals',
    'Temporary shelter, Medical care, Adoption, Foster programs',
    4.7,
    true,
    '9 AM - 7 PM',
    45,
    4
);

-- Insert rescue stories
INSERT INTO rescue_stories (title, story, image_url, before_image_url, after_image_url, location, date, saviour_id, rescue_center_id, animal_type, status) VALUES
(
    'Lucky the Injured Puppy',
    'Found this little guy with a broken leg in Andheri West. After weeks of care and rehabilitation at Hope Animal Rescue Center, he''s now living happily with his new family in Bandra.',
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'Andheri West, Mumbai',
    '2024-01-15',
    (SELECT id FROM users WHERE email = 'john.doe@example.com'),
    (SELECT id FROM users WHERE email = 'hope.rescue@example.com'),
    'Dog',
    'completed'
),
(
    'Fluffy the Abandoned Cat',
    'Rescued this beautiful cat from an abandoned building in T Nagar. She was malnourished and scared, but now she''s thriving in her forever home thanks to Street Dogs Protection Society.',
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'T Nagar, Chennai',
    '2024-02-20',
    (SELECT id FROM users WHERE email = 'priya.sharma@example.com'),
    (SELECT id FROM users WHERE email = 'street.dogs@example.com'),
    'Cat',
    'completed'
),
(
    'Eagle with Broken Wing',
    'Found this majestic eagle with a broken wing near Bannerghatta National Park. After 3 months of rehabilitation at Wildlife Trust India, it was successfully released back into the wild.',
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'Bannerghatta, Bangalore',
    '2024-03-10',
    (SELECT id FROM users WHERE email = 'raj.kumar@example.com'),
    (SELECT id FROM users WHERE email = 'wildlife.trust@example.com'),
    'Bird',
    'completed'
);

-- Insert products
INSERT INTO products (name, description, price, image_url, category, stock_quantity, is_featured) VALUES
(
    'Animal Rescue T-Shirt',
    'Comfortable cotton t-shirt supporting animal rescue efforts. 100% of proceeds go to rescue organizations.',
    25.00,
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'Clothing',
    50,
    true
),
(
    'Rescue Center Mug',
    'Ceramic mug with animal rescue design. Perfect for coffee lovers who support animal welfare.',
    15.00,
    'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'Accessories',
    100,
    true
),
(
    'Animal Care Kit',
    'Essential supplies for animal first aid and care. Includes bandages, antiseptic, and emergency contact numbers.',
    45.00,
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'Supplies',
    25,
    false
),
(
    'Rescue Volunteer Cap',
    'Comfortable cap for rescue volunteers. Features reflective strips for safety during night rescues.',
    20.00,
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'Clothing',
    75,
    false
),
(
    'Emergency Pet Carrier',
    'Collapsible pet carrier for emergency transport. Lightweight and easy to carry.',
    35.00,
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'Supplies',
    30,
    true
);

-- Insert badges
INSERT INTO badges (name, description, icon_url) VALUES
('First Rescue', 'Completed your first animal rescue', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'),
('Hero', 'Saved 10 or more animals', 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'),
('Emergency Responder', 'Responded to 5 emergency situations', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'),
('Community Leader', 'Helped organize community rescue efforts', 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'),
('Wildlife Specialist', 'Specialized in wildlife rescue and rehabilitation', 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'),
('Verified Rescuer', 'Identity and credentials verified by ALS team', 'https://images.unsplash.com/photo-1529429617124-5b1096da02e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'); 