import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter,
  QueryDocumentSnapshot,
  writeBatch,
  serverTimestamp,
  onSnapshot,
  Unsubscribe
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { storage, isFirebaseAvailable, getSafeFirestore, getSafeStorage } from './firebase';
import { Product, Category } from './types';

// Enhanced helper functions with Firebase availability check
const safeGetFirestore = () => {
  if (!isFirebaseAvailable()) {
    throw new Error('Firebase not available');
  }
  return getSafeFirestore();
};

const safeGetStorage = () => {
  if (!isFirebaseAvailable()) {
    throw new Error('Firebase Storage not available');
  }
  return getSafeStorage();
};

// Product CRUD Operations
export class ProductService {
  private static instance: ProductService;
  private productListeners: Map<string, Unsubscribe> = new Map();

  static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  // Create Product
  async createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const firestore = safeGetFirestore();

    try {
      const productWithTimestamps = {
        ...productData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(firestore, 'products'), productWithTimestamps);
      console.log('Product created with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error('Failed to create product');
    }
  }

  // Get Product by ID
  async getProduct(productId: string): Promise<Product | null> {
    const firestore = safeGetFirestore();

    try {
      const docRef = doc(firestore, 'products', productId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as Product;
      }
      return null;
    } catch (error) {
      console.error('Error getting product:', error);
      throw new Error('Failed to get product');
    }
  }

  // Get All Products with pagination
  async getProducts(options: {
    pageSize?: number;
    lastDoc?: QueryDocumentSnapshot;
    category?: string;
    featured?: boolean;
    sortBy?: 'name' | 'price' | 'createdAt' | 'rating';
    sortOrder?: 'asc' | 'desc';
  } = {}): Promise<{
    products: Product[];
    lastDoc: QueryDocumentSnapshot | null;
    hasMore: boolean;
  }> {
    const firestore = safeGetFirestore();

    try {
      const {
        pageSize = 20,
        lastDoc,
        category,
        featured,
        sortBy = 'createdAt',
        sortOrder = 'desc'
      } = options;

      let q = query(collection(firestore, 'products'));

      // Add filters
      if (category) {
        q = query(q, where('category', '==', category));
      }
      if (featured !== undefined) {
        q = query(q, where('featured', '==', featured));
      }

      // Add sorting
      q = query(q, orderBy(sortBy, sortOrder));

      // Add pagination
      if (lastDoc) {
        q = query(q, startAfter(lastDoc));
      }
      q = query(q, limit(pageSize + 1)); // Get one extra to check if there are more

      const querySnapshot = await getDocs(q);
      const products: Product[] = [];
      const docs = querySnapshot.docs;

      // Process documents
      for (let i = 0; i < Math.min(docs.length, pageSize); i++) {
        const doc = docs[i];
        const data = doc.data();
        products.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as Product);
      }

      return {
        products,
        lastDoc: docs.length > pageSize ? docs[pageSize - 1] : null,
        hasMore: docs.length > pageSize
      };
    } catch (error) {
      console.error('Error getting products:', error);
      // Return empty result instead of throwing
      return {
        products: [],
        lastDoc: null,
        hasMore: false
      };
    }
  }

  // Search Products
  async searchProducts(searchTerm: string, options: {
    category?: string;
    maxPrice?: number;
    minPrice?: number;
    pageSize?: number;
  } = {}): Promise<Product[]> {
    const firestore = safeGetFirestore();

    try {
      let q = query(collection(firestore, 'products'));

      // Add category filter if provided
      if (options.category) {
        q = query(q, where('category', '==', options.category));
      }

      // Add price filters if provided
      if (options.minPrice !== undefined) {
        q = query(q, where('price', '>=', options.minPrice));
      }
      if (options.maxPrice !== undefined) {
        q = query(q, where('price', '<=', options.maxPrice));
      }

      // Limit results
      if (options.pageSize) {
        q = query(q, limit(options.pageSize));
      }

      const querySnapshot = await getDocs(q);
      const products: Product[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const product = {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as Product;

        // Client-side text search (Firestore doesn't have full-text search)
        const searchLower = searchTerm.toLowerCase();
        if (
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.tags?.some(tag => tag.toLowerCase().includes(searchLower))
        ) {
          products.push(product);
        }
      });

      return products;
    } catch (error) {
      console.error('Error searching products:', error);
      throw new Error('Failed to search products');
    }
  }

  // Update Product
  async updateProduct(productId: string, updates: Partial<Omit<Product, 'id' | 'createdAt'>>): Promise<void> {
    const firestore = safeGetFirestore();

    try {
      const docRef = doc(firestore, 'products', productId);
      const updateData = {
        ...updates,
        updatedAt: serverTimestamp(),
      };
      
      await updateDoc(docRef, updateData);
      console.log('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
      throw new Error('Failed to update product');
    }
  }

  // Delete Product
  async deleteProduct(productId: string): Promise<void> {
    const firestore = safeGetFirestore();

    try {
      // First, get the product to access its images
      const product = await this.getProduct(productId);
      
      // Delete product images from storage
      if (product && product.images.length > 0) {
        await Promise.all(
          product.images.map(imageUrl => this.deleteImage(imageUrl))
        );
      }

      // Delete the product document
      const docRef = doc(firestore, 'products', productId);
      await deleteDoc(docRef);
      console.log('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new Error('Failed to delete product');
    }
  }

  // Bulk operations
  async createProductsBatch(products: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>[]): Promise<string[]> {
    const firestore = safeGetFirestore();

    try {
      const batch = writeBatch(firestore);
      const productIds: string[] = [];

      products.forEach((productData) => {
        const docRef = doc(collection(firestore, 'products'));
        productIds.push(docRef.id);
        
        const productWithTimestamps = {
          ...productData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };
        
        batch.set(docRef, productWithTimestamps);
      });

      await batch.commit();
      console.log(`${products.length} products created successfully`);
      return productIds;
    } catch (error) {
      console.error('Error creating products batch:', error);
      throw new Error('Failed to create products batch');
    }
  }

  async deleteProductsBatch(productIds: string[]): Promise<void> {
    const firestore = safeGetFirestore();

    try {
      const batch = writeBatch(firestore);

      productIds.forEach((productId) => {
        const docRef = doc(firestore, 'products', productId);
        batch.delete(docRef);
      });

      await batch.commit();
      console.log(`${productIds.length} products deleted successfully`);
    } catch (error) {
      console.error('Error deleting products batch:', error);
      throw new Error('Failed to delete products batch');
    }
  }

  // Image management
  async uploadImage(file: File, productId: string): Promise<string> {
    const firebaseStorage = safeGetStorage();

    try {
      const timestamp = Date.now();
      const fileName = `${productId}_${timestamp}_${file.name}`;
      const storageRef = ref(firebaseStorage, `products/${fileName}`);
      
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      console.log('Image uploaded successfully:', downloadURL);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload image');
    }
  }

  async deleteImage(imageUrl: string): Promise<void> {
    if (!storage) return;

    try {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
      console.log('Image deleted successfully');
    } catch (error) {
      console.error('Error deleting image:', error);
      // Don't throw error for image deletion failures
    }
  }

  // Real-time listeners
  subscribeToProducts(
    callback: (products: Product[]) => void,
    options: {
      category?: string;
      featured?: boolean;
      limit?: number;
    } = {}
  ): Unsubscribe {
    const firestore = safeGetFirestore();

    let q = query(collection(firestore, 'products'));

    if (options.category) {
      q = query(q, where('category', '==', options.category));
    }
    if (options.featured !== undefined) {
      q = query(q, where('featured', '==', options.featured));
    }
    if (options.limit) {
      q = query(q, limit(options.limit));
    }

    q = query(q, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const products: Product[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        products.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as Product);
      });
      callback(products);
    });

    return unsubscribe;
  }

  // Category management
  async getCategories(): Promise<Category[]> {
    const firestore = safeGetFirestore();

    try {
      const q = query(collection(firestore, 'categories'), orderBy('name'));
      const querySnapshot = await getDocs(q);
      const categories: Category[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        categories.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
        } as Category);
      });

      return categories;
    } catch (error) {
      console.error('Error getting categories:', error);
      // Don't throw error, let the context handle the fallback
      return [];
    }
  }

  async createCategory(categoryData: Omit<Category, 'id' | 'createdAt'>): Promise<string> {
    const firestore = safeGetFirestore();

    try {
      const categoryWithTimestamp = {
        ...categoryData,
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(firestore, 'categories'), categoryWithTimestamp);
      console.log('Category created with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error creating category:', error);
      throw new Error('Failed to create category');
    }
  }

  // Analytics
  async getProductStats(): Promise<{
    totalProducts: number;
    totalCategories: number;
    lowStockProducts: number;
    outOfStockProducts: number;
    featuredProducts: number;
    totalValue: number;
  }> {
    const firestore = safeGetFirestore();

    try {
      const [productsSnapshot, categoriesSnapshot] = await Promise.all([
        getDocs(collection(firestore, 'products')),
        getDocs(collection(firestore, 'categories'))
      ]);

      const products: Product[] = [];
      productsSnapshot.forEach((doc) => {
        const data = doc.data();
        products.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as Product);
      });

      const lowStockProducts = products.filter(p => p.stock > 0 && p.stock <= 5).length;
      const outOfStockProducts = products.filter(p => p.stock === 0).length;
      const featuredProducts = products.filter(p => p.featured).length;
      const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);

      return {
        totalProducts: products.length,
        totalCategories: categoriesSnapshot.size,
        lowStockProducts,
        outOfStockProducts,
        featuredProducts,
        totalValue
      };
    } catch (error) {
      console.error('Error getting product stats:', error);
      // Return default stats instead of throwing
      return {
        totalProducts: 0,
        totalCategories: 0,
        lowStockProducts: 0,
        outOfStockProducts: 0,
        featuredProducts: 0,
        totalValue: 0
      };
    }
  }

  // Cleanup listeners
  cleanup(): void {
    this.productListeners.forEach(unsubscribe => unsubscribe());
    this.productListeners.clear();
  }
}

// Export singleton instance
export const productService = ProductService.getInstance();

// Utility functions for components
export const useProductService = () => productService;
