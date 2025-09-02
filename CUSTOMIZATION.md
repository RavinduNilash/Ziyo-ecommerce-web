# Customization Guide

This guide helps you customize the Ziyo E-commerce template for your specific business needs.

## 🎨 Branding & Design

### Logo and Favicon
1. **Replace the logo:**
   - Update the site name in `src/components/layout/Header.tsx`
   - Add your logo image to the `public` folder
   - Update references to use your logo

2. **Update favicon:**
   - Replace `src/app/favicon.ico` with your favicon
   - Add additional favicon formats in the `public` folder
   - Update meta tags in `src/app/layout.tsx`

### Color Scheme
Edit `tailwind.config.js` to customize colors:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6', // Your primary color
          600: '#2563eb',
          700: '#1d4ed8',
        },
        secondary: {
          500: '#6b7280', // Your secondary color
        }
      }
    }
  }
}
```

Update component colors in:
- `src/components/ui/Button.tsx`
- `src/components/layout/Header.tsx`
- `src/app/page.tsx` (hero section)

### Typography
1. **Add custom fonts:**
   ```javascript
   // In src/app/layout.tsx
   import { Inter, Poppins } from 'next/font/google'
   
   const inter = Inter({ subsets: ['latin'] })
   const poppins = Poppins({ 
     weight: ['400', '600', '700'], 
     subsets: ['latin'] 
   })
   ```

2. **Update Tailwind config:**
   ```javascript
   // tailwind.config.js
   fontFamily: {
     sans: ['Inter', 'sans-serif'],
     heading: ['Poppins', 'sans-serif'],
   }
   ```

## 🏪 Business Information

### Site Metadata
Update `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Your Store Name",
  description: "Your store description",
  keywords: "your, keywords, here",
  // Add more SEO metadata
};
```

### Contact Information
Update `src/components/layout/Footer.tsx`:

```typescript
// Replace contact details
const contactInfo = {
  address: "Your Business Address",
  phone: "+1 (555) YOUR-PHONE",
  email: "support@yourstore.com",
  website: "yourstore.com"
};
```

### Business Name
Update throughout the application:
- Header component (`src/components/layout/Header.tsx`)
- Footer component (`src/components/layout/Footer.tsx`)
- Page titles and descriptions
- Environment variables

## 🛍️ Product Customization

### Sample Data
Edit `src/lib/sampleData.ts` to add your products:

```typescript
export const sampleProducts: Product[] = [
  {
    id: 'your-product-1',
    name: 'Your Product Name',
    description: 'Product description',
    price: 99.99,
    originalPrice: 129.99, // Optional
    images: [
      'https://your-image-url.com/product1.jpg'
    ],
    category: 'Your Category',
    stock: 50,
    rating: 4.5,
    reviews: 123,
    tags: ['tag1', 'tag2'],
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];
```

### Categories
Customize categories in the same file:

```typescript
export const sampleCategories: Category[] = [
  {
    id: 'category-1',
    name: 'Your Category',
    description: 'Category description',
    image: 'https://your-image-url.com/category.jpg',
    createdAt: new Date(),
  }
];
```

### Product Images
1. **Use your own images:**
   - Upload to a CDN (Cloudinary, AWS S3, etc.)
   - Update image URLs in sample data
   - Configure Next.js image domains in `next.config.js`

2. **Image optimization:**
   ```javascript
   // next.config.js
   const nextConfig = {
     images: {
       remotePatterns: [
         {
           protocol: 'https',
           hostname: 'your-image-domain.com',
         },
       ],
     },
   };
   ```

## 💳 Payment Integration

### Stripe Integration (Example)
1. **Install Stripe:**
   ```bash
   npm install stripe @stripe/stripe-js
   ```

2. **Create checkout component:**
   ```typescript
   // src/components/checkout/StripeCheckout.tsx
   import { loadStripe } from '@stripe/stripe-js';
   
   const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
   
   export const StripeCheckout = () => {
     // Implement Stripe checkout
   };
   ```

3. **Add to checkout page:**
   ```typescript
   // src/app/checkout/page.tsx
   import { StripeCheckout } from '@/components/checkout/StripeCheckout';
   ```

### PayPal Integration (Example)
1. **Install PayPal SDK:**
   ```bash
   npm install @paypal/react-paypal-js
   ```

2. **Add PayPal buttons to checkout**

## 📧 Email Integration

### Email Templates
1. **Welcome email template:**
   ```html
   <!-- Create email templates -->
   <div style="font-family: Arial, sans-serif;">
     <h1>Welcome to Your Store!</h1>
     <p>Thank you for joining us...</p>
   </div>
   ```

### Email Service Integration
1. **SendGrid integration:**
   ```bash
   npm install @sendgrid/mail
   ```

2. **Create email service:**
   ```typescript
   // src/lib/email.ts
   import sgMail from '@sendgrid/mail';
   
   sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
   
   export const sendWelcomeEmail = async (email: string, name: string) => {
     // Send email logic
   };
   ```

## 🔒 Authentication Customization

### Custom Login/Register Fields
Update `src/app/(auth)/register/page.tsx`:

```typescript
const [formData, setFormData] = useState({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  // Add custom fields
  company: '',
  phone: '',
  agreeToTerms: false,
});
```

### Social Authentication
1. **Enable in Firebase Console:**
   - Go to Authentication > Sign-in method
   - Enable Google, Facebook, etc.

2. **Add social login buttons:**
   ```typescript
   // In login component
   import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
   
   const handleGoogleLogin = async () => {
     const provider = new GoogleAuthProvider();
     await signInWithPopup(auth, provider);
   };
   ```

## 🎯 Features Configuration

### Search Functionality
1. **Add search API:**
   ```typescript
   // src/lib/search.ts
   export const searchProducts = (query: string, products: Product[]) => {
     return products.filter(product =>
       product.name.toLowerCase().includes(query.toLowerCase()) ||
       product.description.toLowerCase().includes(query.toLowerCase()) ||
       product.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
     );
   };
   ```

2. **Enhanced search with filters:**
   ```typescript
   export const advancedSearch = (filters: SearchFilters, products: Product[]) => {
     // Implement advanced filtering logic
   };
   ```

### Wishlist Feature
1. **Create wishlist context:**
   ```typescript
   // src/context/WishlistContext.tsx
   export const WishlistProvider = ({ children }: { children: ReactNode }) => {
     const [wishlist, setWishlist] = useState<Product[]>([]);
     // Implement wishlist logic
   };
   ```

2. **Add wishlist components:**
   ```typescript
   // src/components/wishlist/WishlistButton.tsx
   export const WishlistButton = ({ product }: { product: Product }) => {
     // Wishlist toggle button
   };
   ```

### Product Reviews
1. **Create review components:**
   ```typescript
   // src/components/product/ProductReviews.tsx
   export const ProductReviews = ({ productId }: { productId: string }) => {
     // Display and manage reviews
   };
   ```

2. **Add review form:**
   ```typescript
   // src/components/product/ReviewForm.tsx
   export const ReviewForm = ({ productId }: { productId: string }) => {
     // Review submission form
   };
   ```

## 📱 Mobile Customization

### Progressive Web App (PWA)
1. **Install next-pwa:**
   ```bash
   npm install next-pwa
   ```

2. **Configure PWA:**
   ```javascript
   // next.config.js
   const withPWA = require('next-pwa')({
     dest: 'public',
     register: true,
     skipWaiting: true,
   });
   
   module.exports = withPWA(nextConfig);
   ```

3. **Add manifest.json:**
   ```json
   {
     "name": "Your Store Name",
     "short_name": "YourStore",
     "description": "Your store description",
     "start_url": "/",
     "display": "standalone",
     "background_color": "#ffffff",
     "theme_color": "#3b82f6"
   }
   ```

## 🌐 Internationalization (i18n)

### Setup Next.js i18n
1. **Install dependencies:**
   ```bash
   npm install next-i18next react-i18next i18next
   ```

2. **Configure i18n:**
   ```javascript
   // next.config.js
   const nextConfig = {
     i18n: {
       locales: ['en', 'es', 'fr'],
       defaultLocale: 'en',
     },
   };
   ```

3. **Create translation files:**
   ```json
   // public/locales/en/common.json
   {
     "welcome": "Welcome to {{storeName}}",
     "addToCart": "Add to Cart",
     "checkout": "Checkout"
   }
   ```

## 📊 Analytics Integration

### Google Analytics
1. **Install gtag:**
   ```bash
   npm install gtag
   ```

2. **Add to layout:**
   ```typescript
   // src/app/layout.tsx
   import Script from 'next/script';
   
   export default function RootLayout({ children }) {
     return (
       <html>
         <head>
           <Script
             src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
             strategy="afterInteractive"
           />
           <Script id="google-analytics" strategy="afterInteractive">
             {`
               window.dataLayer = window.dataLayer || [];
               function gtag(){window.dataLayer.push(arguments);}
               gtag('js', new Date());
               gtag('config', '${GA_TRACKING_ID}');
             `}
           </Script>
         </head>
         <body>{children}</body>
       </html>
     );
   }
   ```

## 🔧 Performance Optimization

### Image Optimization
1. **Use next/image everywhere**
2. **Configure image domains**
3. **Implement lazy loading**
4. **Use appropriate image formats (WebP)**

### Code Splitting
1. **Dynamic imports for large components:**
   ```typescript
   const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
     loading: () => <p>Loading...</p>,
   });
   ```

### Caching Strategy
1. **Configure caching headers**
2. **Use SWR for data fetching**
3. **Implement service worker caching**

## 🚀 Deployment Customization

### Environment Variables
Create different environment files:
- `.env.development`
- `.env.staging`
- `.env.production`

### Custom Domains
1. **Update site URLs in configuration**
2. **Configure CDN settings**
3. **Set up SSL certificates**

## 📝 Content Management

### CMS Integration
1. **Contentful integration:**
   ```bash
   npm install contentful
   ```

2. **Sanity integration:**
   ```bash
   npm install @sanity/client
   ```

3. **Create content fetching utilities**

## 🔍 SEO Optimization

### Meta Tags
1. **Dynamic meta tags per page**
2. **Open Graph tags**
3. **Twitter Card tags**
4. **Structured data (JSON-LD)**

### Sitemap
1. **Generate dynamic sitemap**
2. **Submit to search engines**
3. **Configure robots.txt**

---

This customization guide provides a comprehensive overview of how to tailor the Ziyo E-commerce template to your specific needs. Each section can be implemented independently based on your requirements.

**Need help with customization? Create an issue in the repository! 🤝**