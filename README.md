# Animal Life Saver - Mobile App

A React Native/Expo application for connecting animal rescuers, rescue centers, and rescue stories. Built with modern technologies and clean architecture.

## 🚀 Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router
- **State Management**: Zustand + React Query
- **Database**: Supabase (PostgreSQL)
- **Styling**: NativeWind (Tailwind CSS)
- **Package Manager**: Bun
- **Icons**: Lucide React Native
- **Type Safety**: TypeScript

## 📁 Project Structure

```
├── app/                    # Expo Router pages
│   ├── (tabs)/           # Tab navigation screens
│   ├── saviour/[id].tsx  # Individual saviour profile
│   ├── rescue-center/[id].tsx # Individual rescue center profile
│   ├── rescue/[id].tsx   # Individual rescue story
│   └── _layout.tsx       # Root layout
├── components/            # Reusable UI components
│   ├── home/             # Home screen components
│   ├── rescues/          # Rescue-related components
│   ├── rescue-centers/   # Rescue center components
│   └── NavigationMenu.tsx
├── hooks/                # Custom React hooks
│   ├── useSaviour.ts     # Single saviour data
│   ├── useSaviours.ts    # List of saviours
│   ├── useRescueCenter.ts # Single rescue center data
│   ├── useRescueCenters.ts # List of rescue centers
│   ├── useRescue.ts      # Single rescue story data
│   ├── useRescues.ts     # List of rescue stories
│   ├── useCart.ts        # Shopping cart functionality
│   └── useSOS.ts         # Emergency SOS functionality
├── lib/                  # Core utilities
│   └── supabase.ts       # Supabase client configuration
├── types/                # TypeScript type definitions
│   └── index.ts          # All type interfaces
├── constants/            # App constants and configuration
├── assets/               # Static assets (images, fonts)
├── scripts/              # Database and setup scripts
│   ├── populate-supabase.js # Populate Supabase with sample data
│   ├── test-supabase.js  # Test Supabase connection
│   └── *.sql            # SQL schema and data files
└── .expo/               # Expo configuration
```

## 🛠️ Setup & Installation

### Prerequisites

- Node.js 18+ or Bun
- Expo CLI
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd animal-life-saver
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Environment Setup**
   Create a `.env` file with your Supabase credentials:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database Setup**
   ```bash
   # Test Supabase connection
   bun run supabase:test
   
   # Populate with sample data
   bun run supabase:populate
   ```

5. **Start the development server**
   ```bash
   bun run start
   ```

## 🎯 Key Features

### Core Functionality
- **Saviour Profiles**: Individual rescuer profiles with contact info, specializations, and rescue history
- **Rescue Centers**: Organization profiles with facilities, contact details, and rescue statistics
- **Rescue Stories**: Detailed rescue narratives with before/after images and outcomes
- **Emergency SOS**: Quick emergency response system
- **Shopping Cart**: E-commerce functionality for rescue supplies

### Data Management
- **Supabase Integration**: Real-time database with PostgreSQL backend
- **React Query**: Efficient data fetching, caching, and synchronization
- **Type Safety**: Full TypeScript implementation
- **Fallback Data**: Sample data for testing when database is empty

### UI/UX
- **Modern Design**: Clean, intuitive interface
- **Responsive Layout**: Works across different screen sizes
- **NativeWind Styling**: Tailwind CSS for React Native
- **Icon Integration**: Lucide React Native icons

## 📱 App Structure

### Navigation
- **Tab Navigation**: Home, Saviours, Rescue Centers, Rescue Stories, Profile
- **Stack Navigation**: Individual profile pages and modals
- **Deep Linking**: Direct links to specific profiles and stories

### Data Flow
1. **Hooks Layer**: Custom hooks handle data fetching from Supabase
2. **Components Layer**: Reusable UI components with proper TypeScript types
3. **Pages Layer**: Screen components using hooks and components
4. **State Management**: Zustand for global state, React Query for server state

## 🔧 Development

### Available Scripts
- `bun run start` - Start development server
- `bun run start-web` - Start web version
- `bun run start-web-dev` - Start web version with debug logging
- `bun run supabase:test` - Test Supabase connection
- `bun run supabase:populate` - Populate database with sample data

### Code Organization
- **Clean Architecture**: Separation of concerns between data, UI, and business logic
- **Type Safety**: Comprehensive TypeScript interfaces
- **Reusable Components**: Modular component design
- **Custom Hooks**: Encapsulated data fetching logic
- **Consistent Styling**: NativeWind utility classes

## 🗄️ Database Schema

The app uses Supabase with the following main tables:
- `users` - User accounts and profiles
- `saviour_profiles` - Saviour-specific data
- `rescue_center_profiles` - Rescue center-specific data
- `rescue_stories` - Rescue story narratives and media

## 🚀 Deployment

The app is configured for:
- **Expo Development Builds**: For testing on physical devices
- **Web Deployment**: Via Expo's web platform
- **App Store Deployment**: Ready for iOS/Android stores

## 📄 License

This project is part of the Animal Life Saver initiative to connect and support animal rescue efforts worldwide. 