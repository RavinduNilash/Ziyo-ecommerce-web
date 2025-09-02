# 🔥 Ziyo E-commerce Website - Complete Setup Guide

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Local Development Setup](#local-development-setup)
4. [Firebase Configuration](#firebase-configuration)
5. [Project Structure](#project-structure)
6. [Development Workflow](#development-workflow)
7. [Feature Implementation Guide](#feature-implementation-guide)
8. [Deployment Guide](#deployment-guide)
9. [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

**Project Name:** Ziyo Electronics E-commerce Website
**Technology Stack:** 
- Frontend: Next.js 14, React, TypeScript
- Backend: Firebase (Firestore, Authentication, Storage)
- Styling: Tailwind CSS
- State Management: React Context API
- Payment: Stripe (Future integration)

**Project Goals:**
- Full-featured e-commerce platform
- Admin panel for inventory management
- User authentication and profiles
- Shopping cart and checkout
- Order management system
- Mobile responsive design

---

## ⚙️ Prerequisites

### Required Software:
```bash
# Node.js (v18 or higher)
https://nodejs.org/

# Git
https://git-scm.com/

# VS Code (Recommended)
https://code.visualstudio.com/
```

### VS Code Extensions (Recommended):
```
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Importer
- Auto Rename Tag
- Prettier - Code formatter
```

---

## 🚀 Local Development Setup

### Step 1: Repository Clone කරන්න
```bash
# Terminal/Command Prompt open කරන්න
git clone https://github.com/Rnilash/Ziyo-ecommerce-web.git

# Project directory එකට යන්න
cd Ziyo-ecommerce-web

# VS Code එකෙන් open කරන්න
code .
```

### Step 2: Dependencies Install කරන්න
```bash
# NPM packages install කරන්න
npm install

# හෝ yarn use කරන්න නම්
yarn install
```

### Step 3: Environment Variables Setup
Project root එකේ `.env.local` file එකක් create කරන්න:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# App Configuration
NEXT_PUBLIC_APP_NAME="Ziyo Electronics"
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Admin Configuration
NEXT_PUBLIC_ADMIN_EMAIL=admin@ziyo.com
```

### Step 4: Development Server Start කරන්න
```bash
npm run dev
```
Visit: `http://localhost:3000`

---

## 🔥 Firebase Configuration

### Step 1: Firebase Project Create කරන්න
1. Visit: https://console.firebase.google.com
2. Click "Create a project"
3. Project name: "Ziyo Electronics"
4. Enable Google Analytics (optional)
5. Click "Create project"

### Step 2: Web App Add කරන්න
1. Project Overview → Click Web icon (</>) 
2. App nickname: "Ziyo Web App"
3. Setup Firebase Hosting: ✅ (Yes)
4. Click "Register app"
5. Copy configuration object

### Step 3: Firebase Services Enable කරන්න

#### Authentication Setup:
```
1. Left sidebar → Authentication
2. Get started
3. Sign-in method tab
4. Enable "Email/Password"
5. Enable "Google" (optional)
6. Save
```

#### Firestore Database Setup:
```
1. Left sidebar → Firestore Database
2. Create database
3. Start in "test mode"
4. Choose location: asia-southeast1 (Singapore)
5. Done
```

#### Storage Setup:
```
1. Left sidebar → Storage
2. Get started
3. Start in test mode
4. Done
```

### Step 4: Security Rules Setup
#### Firestore Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products collection
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && 
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null && 
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Orders collection
    match /orders/{orderId} {
      allow read, write: if request.auth != null && 
                           (resource.data.userId == request.auth.uid || 
                            get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
    
    // Categories collection
    match /categories/{categoryId} {
      allow read: if true;
      allow write: if request.auth != null && 
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

#### Storage Rules:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

## 📁 Project Structure

```
Ziyo-ecommerce-web/
├── public/
│   ├── images/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Modal.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── products/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductList.tsx
│   │   │   └── ProductDetails.tsx
│   │   └── cart/
│   │       ├── CartItem.tsx
│   │       └── CartSummary.tsx
│   ├── pages/
│   │   ├── api/
│   │   ├── admin/
│   │   ├── products/
│   │   ├── cart.tsx
│   │   ├── checkout.tsx
│   │   └── index.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useCart.ts
│   │   └── useProducts.ts
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── CartContext.tsx
│   ├── lib/
│   │   ├── firebase.ts
│   │   ├── auth.ts
│   │   └── firestore.ts
│   ├── types/
│   │   ├── product.ts
│   │   ├── user.ts
│   │   └── order.ts
│   └── styles/
│       └── globals.css
├── .env.local
├── next.config.js
├── tailwind.config.js
├── package.json
└── README.md
```

---

## 🛠️ Development Workflow

### Daily Development Steps:
1. **Morning Setup:**
   ```bash
   git pull origin main
   npm install  # if package.json changed
   npm run dev
   ```

2. **Feature Development:**
   ```bash
   # New feature branch create කරන්න
   git checkout -b feature/cart-functionality
   
   # Changes commit කරන්න
   git add .
   git commit -m "Add cart functionality"
   
   # Push කරන්න
   git push origin feature/cart-functionality
   ```

3. **Code Quality Checks:**
   ```bash
   # Type checking
   npm run type-check
   
   # Linting
   npm run lint
   
   # Build test
   npm run build
   ```

---

## ⭐ Feature Implementation Guide

### Phase 1: Core Setup (Week 1)
#### Day 1-2: Basic Setup
- [x] Project initialization
- [x] Firebase configuration
- [ ] Basic routing setup
- [ ] Layout components

#### Day 3-4: Authentication
- [ ] User registration
- [ ] User login/logout
- [ ] Protected routes
- [ ] User profile management

#### Day 5-7: Product System
- [ ] Product model design
- [ ] Product CRUD operations
- [ ] Product listing page
- [ ] Product detail page

### Phase 2: Shopping Features (Week 2)
#### Day 1-3: Shopping Cart
- [ ] Cart context setup
- [ ] Add to cart functionality
- [ ] Cart page design
- [ ] Quantity management

#### Day 4-5: Search & Filter
- [ ] Product search
- [ ] Category filtering
- [ ] Price range filtering
- [ ] Sort functionality

#### Day 6-7: Checkout Process
- [ ] Checkout form
- [ ] Order validation
- [ ] Order confirmation
- [ ] Email notifications

### Phase 3: Admin Panel (Week 3)
#### Day 1-3: Admin Authentication
- [ ] Admin role system
- [ ] Admin dashboard
- [ ] Protected admin routes

#### Day 4-7: Inventory Management
- [ ] Product management interface
- [ ] Image upload system
- [ ] Category management
- [ ] Order management

### Phase 4: Advanced Features (Week 4)
#### Day 1-3: User Experience
- [ ] Loading states
- [ ] Error handling
- [ ] Form validations
- [ ] Responsive design

#### Day 4-5: Performance
- [ ] Image optimization
- [ ] Code splitting
- [ ] SEO optimization

#### Day 6-7: Testing & Deployment
- [ ] Unit testing
- [ ] Integration testing
- [ ] Production deployment

---

## 📱 Deployment Guide

### Vercel Deployment (Recommended)
1. **Vercel Account Setup:**
   - Visit: https://vercel.com
   - Sign up with GitHub account

2. **Project Import:**
   ```bash
   # Vercel CLI install කරන්න
   npm install -g vercel
   
   # Login කරන්න
   vercel login
   
   # Deploy කරන්න
   vercel
   ```

3. **Environment Variables Setup:**
   - Vercel dashboard → Project → Settings → Environment Variables
   - Add all variables from `.env.local`

### Firebase Hosting (Alternative)
```bash
# Firebase CLI install කරන්න
npm install -g firebase-tools

# Login කරන්න
firebase login

# Initialize hosting
firebase init hosting

# Build and deploy
npm run build
firebase deploy
```

---

## 🔧 Troubleshooting

### Common Issues:

#### 1. Firebase Connection Issues
```javascript
// lib/firebase.ts file check කරන්න
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  // Your config here
};

const app = initializeApp(firebaseConfig);
export default app;
```

#### 2. Environment Variables Not Loading
```bash
# .env.local file name correct ද check කරන්න
# Variables NEXT_PUBLIC_ prefix සමඟ start වෙනවද check කරන්න
# Development server restart කරන්න
npm run dev
```

#### 3. Build Errors
```bash
# Dependencies update කරන්න
npm update

# Cache clear කරන්න
npm run build -- --no-cache

# Node modules reinstall කරන්න
rm -rf node_modules package-lock.json
npm install
```

#### 4. TypeScript Errors
```bash
# Type checking
npx tsc --noEmit

# Auto-fix some issues
npm run lint -- --fix
```

---

## 📞 Support & Resources

### Documentation Links:
- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

### Learning Resources:
- [Next.js Tutorial](https://nextjs.org/learn)
- [Firebase Tutorial](https://firebase.google.com/docs/web/setup)
- [React TypeScript Tutorial](https://react-typescript-cheatsheet.netlify.app/)

### Community:
- [Next.js GitHub Discussions](https://github.com/vercel/next.js/discussions)
- [Firebase Community](https://firebase.google.com/community)

---

## 📈 Progress Tracking

### Checklist Template:
```markdown
## Development Progress

### Week 1: Foundation
- [ ] Project setup complete
- [ ] Firebase integration
- [ ] Basic routing
- [ ] Authentication system

### Week 2: Core Features  
- [ ] Product management
- [ ] Shopping cart
- [ ] Search functionality
- [ ] Checkout process

### Week 3: Admin Features
- [ ] Admin dashboard
- [ ] Inventory management
- [ ] Order tracking
- [ ] User management

### Week 4: Polish & Deploy
- [ ] UI/UX improvements
- [ ] Performance optimization
- [ ] Testing complete
- [ ] Production deployment
```

---

## 🎯 Next Steps

1. **Immediate Actions:**
   - Complete Firebase setup
   - Test authentication flow
   - Create first product entry
   - Verify database connection

2. **This Week Goals:**
   - Complete Phase 1 features
   - Set up basic product listing
   - Implement user authentication
   - Create admin access

3. **Long-term Vision:**
   - Scale to 1000+ products
   - Multi-vendor support
   - Mobile app development
   - Payment gateway integration

---

**Happy Coding! 🚀**

*Created by: GitHub Copilot*  
*Last Updated: 2025-01-14*