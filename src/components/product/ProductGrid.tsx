import { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';
import { Sparkles, ShoppingBag } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  emptyMessage?: string;
}

export const ProductGrid = ({ 
  products, 
  loading = false, 
  emptyMessage = "No products found" 
}: ProductGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="animate-pulse group"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="relative">
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] animate-shimmer"></div>
              <div className="bg-gradient-to-br from-slate-200 to-slate-300 aspect-square rounded-3xl mb-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-100/20 to-fuchsia-100/20"></div>
              </div>
            </div>
            <div className="space-y-3 px-2">
              <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl w-3/4"></div>
              <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl w-1/2"></div>
              <div className="h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl w-1/3"></div>
              <div className="h-12 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl w-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="relative max-w-md mx-auto">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-400/10 to-fuchsia-400/10 rounded-3xl blur-3xl animate-pulse"></div>
          
          <div className="relative bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-12 shadow-2xl">
            {/* Enhanced Empty State Icon */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
              <div className="relative w-24 h-24 mx-auto bg-gradient-to-br from-violet-100 to-fuchsia-100 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-12 h-12 text-violet-600" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Sparkles className="w-5 h-5 text-violet-500" />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                  {emptyMessage}
                </h3>
                <Sparkles className="w-5 h-5 text-fuchsia-500" />
              </div>
              
              <p className="text-slate-600 text-lg leading-relaxed">
                Discover amazing products that match your style.<br />
                Try adjusting your search or explore our categories.
              </p>
              
              {/* Suggested Actions */}
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button className="px-6 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-2xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Browse Categories
                </button>
                <button className="px-6 py-3 border-2 border-violet-200 text-violet-600 rounded-2xl font-semibold hover:border-violet-300 hover:bg-violet-50 transition-all duration-300">
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product, index) => (
        <div
          key={product.id}
          className={`transition-all duration-700 ${
            loading ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'
          }`}
          style={{ 
            animationDelay: `${index * 100}ms`,
            transitionDelay: `${index * 50}ms`
          }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};