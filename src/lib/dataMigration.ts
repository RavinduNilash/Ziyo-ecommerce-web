import { productService } from './products';
import { sampleProducts, sampleCategories } from './sampleData';
import { Product, Category } from './types';

export class DataMigrationService {
  private static instance: DataMigrationService;

  static getInstance(): DataMigrationService {
    if (!DataMigrationService.instance) {
      DataMigrationService.instance = new DataMigrationService();
    }
    return DataMigrationService.instance;
  }

  // Import sample categories to Firebase
  async importCategories(): Promise<string[]> {
    try {
      console.log('Starting category import...');
      const categoryIds: string[] = [];

      for (const category of sampleCategories) {
        const categoryData = {
          name: category.name,
          description: category.description,
          image: category.image,
          parentId: category.parentId
        };

        const categoryId = await productService.createCategory(categoryData);
        categoryIds.push(categoryId);
        console.log(`Created category: ${category.name} (${categoryId})`);
      }

      console.log(`Successfully imported ${categoryIds.length} categories`);
      return categoryIds;
    } catch (error) {
      console.error('Error importing categories:', error);
      throw new Error('Failed to import categories');
    }
  }

  // Import sample products to Firebase
  async importProducts(): Promise<string[]> {
    try {
      console.log('Starting product import...');
      const productIds: string[] = [];

      // Import products in batches to avoid overwhelming Firebase
      const batchSize = 5;
      for (let i = 0; i < sampleProducts.length; i += batchSize) {
        const batch = sampleProducts.slice(i, i + batchSize);
        
        const batchPromises = batch.map(async (product) => {
          const productData = {
            name: product.name,
            description: product.description,
            price: product.price,
            originalPrice: product.originalPrice,
            images: product.images,
            category: product.category,
            stock: product.stock,
            rating: product.rating,
            reviews: product.reviews,
            tags: product.tags,
            featured: product.featured,
            variants: product.variants,
            variantCombinations: product.variantCombinations
          };

          const productId = await productService.createProduct(productData);
          console.log(`Created product: ${product.name} (${productId})`);
          return productId;
        });

        const batchIds = await Promise.all(batchPromises);
        productIds.push(...batchIds);

        // Add a small delay between batches
        if (i + batchSize < sampleProducts.length) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      console.log(`Successfully imported ${productIds.length} products`);
      return productIds;
    } catch (error) {
      console.error('Error importing products:', error);
      throw new Error('Failed to import products');
    }
  }

  // Full data migration
  async importAllSampleData(): Promise<{
    categoryIds: string[];
    productIds: string[];
  }> {
    try {
      console.log('Starting full data migration...');
      
      // Import categories first
      const categoryIds = await this.importCategories();
      
      // Then import products
      const productIds = await this.importProducts();

      console.log('Data migration completed successfully!');
      console.log(`Imported ${categoryIds.length} categories and ${productIds.length} products`);

      return {
        categoryIds,
        productIds
      };
    } catch (error) {
      console.error('Data migration failed:', error);
      throw error;
    }
  }

  // Check if data already exists
  async checkExistingData(): Promise<{
    hasCategories: boolean;
    hasProducts: boolean;
    productCount: number;
    categoryCount: number;
  }> {
    try {
      const [categories, productsResult] = await Promise.all([
        productService.getCategories(),
        productService.getProducts({ pageSize: 1 })
      ]);

      return {
        hasCategories: categories.length > 0,
        hasProducts: productsResult.products.length > 0,
        productCount: productsResult.products.length,
        categoryCount: categories.length
      };
    } catch (error) {
      console.error('Error checking existing data:', error);
      return {
        hasCategories: false,
        hasProducts: false,
        productCount: 0,
        categoryCount: 0
      };
    }
  }

  // Clear all data (use with caution!)
  async clearAllData(): Promise<void> {
    try {
      console.log('Starting data cleanup...');
      
      // Get all products and delete them
      const productsResult = await productService.getProducts({ pageSize: 1000 });
      const productIds = productsResult.products.map(p => p.id);
      
      if (productIds.length > 0) {
        await productService.deleteProductsBatch(productIds);
        console.log(`Deleted ${productIds.length} products`);
      }

      // Note: We don't have a delete categories method yet, but it could be added
      console.log('Data cleanup completed');
    } catch (error) {
      console.error('Error clearing data:', error);
      throw new Error('Failed to clear data');
    }
  }

  // Import specific product
  async importSingleProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      return await productService.createProduct(productData);
    } catch (error) {
      console.error('Error importing single product:', error);
      throw error;
    }
  }

  // Import specific category
  async importSingleCategory(categoryData: Omit<Category, 'id' | 'createdAt'>): Promise<string> {
    try {
      return await productService.createCategory(categoryData);
    } catch (error) {
      console.error('Error importing single category:', error);
      throw error;
    }
  }

  // Get migration status
  async getMigrationStatus(): Promise<{
    isFirebaseConfigured: boolean;
    canConnect: boolean;
    existingData: {
      hasCategories: boolean;
      hasProducts: boolean;
      productCount: number;
      categoryCount: number;
    };
  }> {
    try {
      // Check if Firebase is configured
      const isFirebaseConfigured = process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== 'demo-api-key';
      
      if (!isFirebaseConfigured) {
        return {
          isFirebaseConfigured: false,
          canConnect: false,
          existingData: {
            hasCategories: false,
            hasProducts: false,
            productCount: 0,
            categoryCount: 0
          }
        };
      }

      // Try to connect and get existing data
      const existingData = await this.checkExistingData();

      return {
        isFirebaseConfigured: true,
        canConnect: true,
        existingData
      };
    } catch (error) {
      console.error('Error getting migration status:', error);
      return {
        isFirebaseConfigured: false,
        canConnect: false,
        existingData: {
          hasCategories: false,
          hasProducts: false,
          productCount: 0,
          categoryCount: 0
        }
      };
    }
  }
}

// Export singleton instance
export const dataMigrationService = DataMigrationService.getInstance();

// Utility functions for components
export const useDataMigration = () => dataMigrationService;
