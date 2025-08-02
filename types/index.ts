export interface Badge {
  id: string;
  name: string;
  description: string;
  iconUrl?: string;
}

export interface RescueCenterSummary {
  id: string;
  name: string;
  image: string;
  location: string;
}

export interface SaviourSummary {
  id: string;
  name: string;
  image: string;
  role: string;
  rescuesCount: number;
}

export interface Rescue {
  id: string;
  title: string;
  image: string;
  date: string;
  location: string;
  status: string;
  story: string;
  beforeAfterImages?: {
    before: string;
    after: string;
  };
  saviour: SaviourSummary;
  rescueCenter: RescueCenterSummary;
}

export interface RescueCenter {
  id: string;
  name: string;
  image: string;
  location: string;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  rating: number;
  isOpen: boolean;
  hours: string;
  phone: string;
  email: string;
  website?: string;
  description: string;
  rescuesCount: number;
  capacity: number;
  yearsActive: number;
  recentRescues: Rescue[];
  // Additional comprehensive fields
  verified?: boolean;
  centerType?: string;
  registrationNumber?: string;
  contactPersonName?: string;
  whatsappNumber?: string;
  emergencyResponse?: boolean;
  volunteersCount?: number;
  facilitiesAvailable?: string[];
  rescueCategoriesAccepted?: string[];
  gallery?: string[];
  socialMediaLinks?: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
    [key: string]: string | undefined;
  };
  donateButtonLink?: string;
}

export interface Saviour {
  id: string;
  name: string;
  image: string;
  role: string;
  location: string;
  rescuesCount: number;
  memberSince: string;
  badges: Badge[];
  bio: string;
  recentRescues: Rescue[];
  // Additional comprehensive fields
  verified?: boolean;
  contactNumber?: string;
  email?: string;
  specializations?: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    youtube?: string;
    [key: string]: string | undefined;
  };
  mostRecentActivity?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  slug: string;
  image_url?: string;
  parent_id?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  short_description: string;
  price: number;
  sale_price?: number;
  cost_price?: number;
  sku?: string;
  barcode?: string;
  category_id: string;
  category?: ProductCategory;
  image_url: string;
  gallery?: string[];
  weight?: number;
  dimensions?: any;
  stock_quantity: number;
  low_stock_threshold: number;
  is_featured: boolean;
  is_active: boolean;
  is_virtual: boolean;
  is_downloadable: boolean;
  download_url?: string;
  tags: string[];
  attributes?: any;
  meta_title?: string;
  meta_description?: string;
  slug: string;
  view_count: number;
  sold_count: number;
  rating_average: number;
  rating_count: number;
  created_at: string;
  updated_at: string;
}

export interface ProductReview {
  id: string;
  product_id: string;
  user_id?: string;
  reviewer_name: string;
  reviewer_email?: string;
  rating: number;
  title?: string;
  comment?: string;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: string;
  product_id: string;
  product: Product;
  quantity: number;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  user_id?: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  subtotal: number;
  tax_amount: number;
  shipping_amount: number;
  discount_amount: number;
  currency: string;
  billing_address?: any;
  shipping_address?: any;
  payment_method?: string;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  product_sku?: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
}

export interface SOSReport {
  id: string;
  image: string;
  location: string;
  animalType: string;
  description: string;
  timestamp: string;
  status: "pending" | "accepted" | "in_progress" | "completed" | "declined";
  assignedTo?: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  description: string;
  parentId?: string;
  slug: string;
  iconUrl?: string;
  articleCount?: number;
}

export interface BlogArticle {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  categoryId: string;
  category: BlogCategory;
  authorId: string;
  authorName: string;
  authorImage?: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
  isPublished: boolean;
  viewCount: number;
  likeCount: number;
  slug: string;
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  iconName: string;
  description?: string;
}
