import { Product, Category } from '@/lib/types';

export const sampleCategories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    description: 'Latest gadgets and electronic devices',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&h=500&fit=crop',
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Clothing',
    description: 'Fashion and apparel for all occasions',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&h=500&fit=crop',
    createdAt: new Date(),
  },
  {
    id: '3',
    name: 'Home & Garden',
    description: 'Everything for your home and garden',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop',
    createdAt: new Date(),
  },
  {
    id: '4',
    name: 'Sports & Outdoors',
    description: 'Sports equipment and outdoor gear',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop',
    createdAt: new Date(),
  },
];

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium quality wireless headphones with noise cancellation and 30-hour battery life.',
    price: 199.99,
    originalPrice: 249.99,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop'
    ],
    category: 'Electronics',
    stock: 25,
    rating: 4.5,
    reviews: 127,
    tags: ['wireless', 'bluetooth', 'noise-cancelling'],
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Smart Watch Series X',
    description: 'Advanced smartwatch with health monitoring, GPS, and cellular connectivity.',
    price: 399.99,
    originalPrice: 449.99,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=500&fit=crop'
    ],
    category: 'Electronics',
    stock: 15,
    rating: 4.8,
    reviews: 89,
    tags: ['smartwatch', 'fitness', 'gps'],
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable and sustainable organic cotton t-shirt available in multiple colors.',
    price: 29.99,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop'
    ],
    category: 'Clothing',
    stock: 50,
    rating: 4.2,
    reviews: 34,
    tags: ['organic', 'cotton', 'sustainable'],
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: 'Professional Camera Lens',
    description: '85mm f/1.4 professional portrait lens with superior image quality.',
    price: 1299.99,
    images: [
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=500&fit=crop'
    ],
    category: 'Electronics',
    stock: 8,
    rating: 4.9,
    reviews: 23,
    tags: ['camera', 'lens', 'photography'],
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    name: 'Running Shoes Pro',
    description: 'High-performance running shoes with advanced cushioning and breathable design.',
    price: 149.99,
    originalPrice: 179.99,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop'
    ],
    category: 'Sports & Outdoors',
    stock: 30,
    rating: 4.6,
    reviews: 156,
    tags: ['running', 'shoes', 'sports'],
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '6',
    name: 'Modern Table Lamp',
    description: 'Stylish LED table lamp with adjustable brightness and USB charging port.',
    price: 79.99,
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop'
    ],
    category: 'Home & Garden',
    stock: 20,
    rating: 4.3,
    reviews: 67,
    tags: ['lamp', 'led', 'modern'],
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '7',
    name: 'Yoga Mat Premium',
    description: 'Non-slip premium yoga mat made from eco-friendly materials.',
    price: 59.99,
    images: [
      'https://images.unsplash.com/photo-1592432678016-e910b452f9a0?w=500&h=500&fit=crop'
    ],
    category: 'Sports & Outdoors',
    stock: 40,
    rating: 4.4,
    reviews: 92,
    tags: ['yoga', 'fitness', 'eco-friendly'],
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '8',
    name: 'Designer Handbag',
    description: 'Elegant leather handbag perfect for both casual and formal occasions.',
    price: 249.99,
    originalPrice: 299.99,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop'
    ],
    category: 'Clothing',
    stock: 12,
    rating: 4.7,
    reviews: 45,
    tags: ['handbag', 'leather', 'designer'],
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];