# Ziyo E-commerce Template

A modern, full-featured e-commerce template built with Next.js 14 and Firebase. This template provides a complete foundation for building online stores with authentication, product management, shopping cart functionality, and more.

## 🚀 Features

### Core Features
- **Modern Tech Stack**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Authentication**: Firebase Auth integration with login/register pages
- **Product Management**: Product listing, filtering, search, and detailed product pages
- **Shopping Cart**: Add to cart, quantity management, persistent storage
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Professional UI**: Clean, modern design with reusable components

### Pages & Components
- **Home Page**: Hero section, featured products, categories showcase
- **Products Page**: Full product catalog with search, filtering, and sorting
- **Authentication**: Login and registration pages with form validation
- **Shopping Cart**: Comprehensive cart management with order summary
- **Layout Components**: Header with navigation, footer with links
- **UI Components**: Buttons, inputs, cards with consistent styling

### Technical Features
- **Firebase Integration**: Auth, Firestore, and Storage setup
- **Context Management**: Global state for authentication and cart
- **TypeScript**: Full type safety throughout the application
- **ESLint**: Code quality and consistency
- **Mock Data**: Sample products and categories for development

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Auth, Firestore, Storage)
- **State Management**: React Context API
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Deployment**: Vercel ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ziyo-ecommerce-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your Firebase configuration:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Firebase Setup

1. **Create a Firebase project** at [Firebase Console](https://console.firebase.google.com/)

2. **Enable Authentication**
   - Go to Authentication > Sign-in method
   - Enable Email/Password authentication

3. **Set up Firestore Database**
   - Go to Firestore Database
   - Create database in production mode
   - Set up security rules (see below)

4. **Enable Storage**
   - Go to Storage
   - Set up storage bucket for product images

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Products are readable by all, writable by authenticated users only
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Categories are readable by all
    match /categories/{categoryId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Orders are private to the user
    match /orders/{orderId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
  }
}
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication route group
│   │   ├── login/         # Login page
│   │   └── register/      # Registration page
│   ├── cart/              # Shopping cart page
│   ├── products/          # Products listing page
│   │   └── [id]/         # Product detail page (to be implemented)
│   ├── checkout/          # Checkout page (to be implemented)
│   ├── profile/           # User profile page (to be implemented)
│   ├── admin/             # Admin panel (to be implemented)
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── ui/               # Basic UI components
│   │   ├── Button.tsx    # Button component
│   │   ├── Input.tsx     # Input component
│   │   └── Card.tsx      # Card component
│   ├── layout/           # Layout components
│   │   ├── Header.tsx    # Site header
│   │   └── Footer.tsx    # Site footer
│   ├── product/          # Product-related components
│   │   ├── ProductCard.tsx # Product card
│   │   └── ProductGrid.tsx # Product grid
│   └── cart/             # Cart components (to be implemented)
├── context/              # React Context providers
│   ├── AuthContext.tsx   # Authentication context
│   └── CartContext.tsx   # Shopping cart context
├── lib/                  # Utility libraries
│   ├── firebase.ts       # Firebase configuration
│   ├── auth.ts           # Authentication helpers
│   ├── utils.ts          # General utilities
│   ├── types.ts          # TypeScript type definitions
│   └── sampleData.ts     # Sample data for development
└── styles/               # Global styles
    └── globals.css       # Global CSS with Tailwind
```

## 🎨 Customization

### Branding
- Update colors in `tailwind.config.js`
- Replace logo and favicon in the `public` folder
- Modify the site name in `src/app/layout.tsx`

### Styling
- Customize Tailwind configuration in `tailwind.config.js`
- Modify component styles in individual component files
- Update global styles in `src/app/globals.css`

### Sample Data
- Edit sample products in `src/lib/sampleData.ts`
- Add your own product images (update image URLs)
- Customize categories and sample content

## 📱 Responsive Design

The template is built with a mobile-first approach:
- **Mobile**: Optimized for phones (320px+)
- **Tablet**: Enhanced layout for tablets (768px+)
- **Desktop**: Full-featured desktop experience (1024px+)

Key responsive features:
- Collapsible navigation menu
- Responsive product grids
- Mobile-optimized forms
- Touch-friendly interfaces

## 🔒 Security Features

- **Input Validation**: Client-side and server-side validation
- **Authentication**: Secure Firebase Auth integration
- **HTTPS**: SSL encryption for all communications
- **Error Handling**: Proper error boundaries and user feedback

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Manual Deployment
```bash
npm run build
npm start
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation
- Review the sample implementations

## 🔮 Roadmap

### Upcoming Features
- [ ] Product detail pages with image galleries
- [ ] Checkout process with payment integration
- [ ] Admin panel for product management
- [ ] User profile and order history
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search and filtering
- [ ] Email notifications
- [ ] Inventory management
- [ ] Multi-language support

---

**Built with ❤️ using Next.js and Firebase**
