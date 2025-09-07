'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Category } from '@/lib/types';
import { productService } from '@/lib/products';
import { withFirebaseFallback } from '@/lib/firebaseUtils';
import { toast } from 'react-hot-toast';

interface ProductContextType {
  // Products
  products: Product[];
  categories: Category[];
  loading: boolean;
  
  // CRUD Operations
  createProduct: (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<string>;
  updateProduct: (productId: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  getProduct: (productId: string) => Promise<Product | null>;
  
  // Search and Filter
  searchProducts: (query: string) => Promise<Product[]>;
  filterProducts: (filters: ProductFilters) => Product[];
  
  // Categories
  createCategory: (categoryData: Omit<Category, 'id' | 'createdAt'>) => Promise<string>;
  
  // Image Upload
  uploadProductImage: (file: File, productId: string) => Promise<string>;
  
  // Refresh data
  refreshProducts: () => Promise<void>;
  refreshCategories: () => Promise<void>;
  
  // Stats
  productStats: ProductStats | null;
  refreshStats: () => Promise<void>;
}

interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  inStock?: boolean;
  lowStock?: boolean;
}

interface ProductStats {
  totalProducts: number;
  totalCategories: number;
  lowStockProducts: number;
  outOfStockProducts: number;
  featuredProducts: number;
  totalValue: number;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [productStats, setProductStats] = useState<ProductStats | null>(null);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        // Load all data in parallel with graceful fallbacks
        await Promise.allSettled([
          refreshProducts(),
          refreshCategories(),
          refreshStats()
        ]);
      } catch (error) {
        console.error('Error loading initial data:', error);
        // Fallback data is already handled in individual refresh functions
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const refreshProducts = async () => {
    const result = await withFirebaseFallback(
      async () => {
        const res = await productService.getProducts({
          pageSize: 100,
          sortBy: 'createdAt',
          sortOrder: 'desc'
        });
        return res.products;
      },
      async () => {
        const { sampleProducts } = await import('@/lib/sampleData');
        return sampleProducts;
      },
      'Loading products'
    );
    setProducts(result);
  };

  const refreshCategories = async () => {
    const result = await withFirebaseFallback(
      async () => {
        const categories = await productService.getCategories();
        return categories.length > 0 ? categories : null; // Return null if empty to trigger fallback
      },
      async () => {
        const { sampleCategories } = await import('@/lib/sampleData');
        return sampleCategories;
      },
      'Loading categories'
    );
    
    if (result) {
      setCategories(result);
    }
  };

  const refreshStats = async () => {
    const result = await withFirebaseFallback(
      async () => {
        const stats = await productService.getProductStats();
        return stats.totalProducts > 0 ? stats : null; // Return null if no data to trigger fallback
      },
      async () => {
        const { sampleProducts, sampleCategories } = await import('@/lib/sampleData');
        return {
          totalProducts: sampleProducts.length,
          totalCategories: sampleCategories.length,
          totalValue: sampleProducts.reduce((sum, product) => sum + product.price, 0),
          lowStockProducts: sampleProducts.filter(p => p.stock < 10 && p.stock > 0).length,
          outOfStockProducts: sampleProducts.filter(p => p.stock === 0).length,
          featuredProducts: sampleProducts.filter(p => p.featured).length
        };
      },
      'Loading product stats'
    );
    
    if (result) {
      setProductStats(result);
    }
  };

  const createProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
    try {
      const productId = await productService.createProduct(productData);
      await refreshProducts();
      await refreshStats();
      toast.success('Product created successfully!');
      return productId;
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Failed to create product');
      throw error;
    }
  };

  const updateProduct = async (productId: string, updates: Partial<Product>): Promise<void> => {
    try {
      await productService.updateProduct(productId, updates);
      await refreshProducts();
      await refreshStats();
      toast.success('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
      throw error;
    }
  };

  const deleteProduct = async (productId: string): Promise<void> => {
    try {
      await productService.deleteProduct(productId);
      await refreshProducts();
      await refreshStats();
      toast.success('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
      throw error;
    }
  };

  const getProduct = async (productId: string): Promise<Product | null> => {
    try {
      return await productService.getProduct(productId);
    } catch (error) {
      console.error('Error getting product:', error);
      toast.error('Failed to get product');
      throw error;
    }
  };

  const searchProducts = async (query: string): Promise<Product[]> => {
    try {
      return await productService.searchProducts(query, { pageSize: 50 });
    } catch (error) {
      console.error('Error searching products:', error);
      toast.error('Search failed');
      throw error;
    }
  };

  const filterProducts = (filters: ProductFilters): Product[] => {
    return products.filter(product => {
      // Category filter
      if (filters.category && product.category !== filters.category) {
        return false;
      }

      // Price filters
      if (filters.minPrice !== undefined && product.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice !== undefined && product.price > filters.maxPrice) {
        return false;
      }

      // Featured filter
      if (filters.featured !== undefined && product.featured !== filters.featured) {
        return false;
      }

      // Stock filters
      if (filters.inStock && product.stock <= 0) {
        return false;
      }
      if (filters.lowStock && product.stock > 5) {
        return false;
      }

      return true;
    });
  };

  const createCategory = async (categoryData: Omit<Category, 'id' | 'createdAt'>): Promise<string> => {
    try {
      const categoryId = await productService.createCategory(categoryData);
      await refreshCategories();
      toast.success('Category created successfully!');
      return categoryId;
    } catch (error) {
      console.error('Error creating category:', error);
      toast.error('Failed to create category');
      throw error;
    }
  };

  const uploadProductImage = async (file: File, productId: string): Promise<string> => {
    try {
      const imageUrl = await productService.uploadImage(file, productId);
      toast.success('Image uploaded successfully!');
      return imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
      throw error;
    }
  };

  const value: ProductContextType = {
    products,
    categories,
    loading,
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    searchProducts,
    filterProducts,
    createCategory,
    uploadProductImage,
    refreshProducts,
    refreshCategories,
    productStats,
    refreshStats
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
