'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { WishlistButton } from '@/components/ui/WishlistButton';
import { ShoppingCart, Star, Eye, Zap, Package } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem, isInCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      addItem(product);
    } finally {
      setIsLoading(false);
    }
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div 
      className="group relative bg-white rounded-3xl shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-500 transform hover:-translate-y-2 border border-slate-100/50 backdrop-blur-sm overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Modern Image Container */}
      <div className="relative overflow-hidden rounded-t-3xl bg-gradient-to-br from-slate-50 to-slate-100">
        <Link href={`/products/${product.id}`}>
          <div className="aspect-square overflow-hidden relative">
            <Image
              src={product.images[0] || '/placeholder-product.jpg'}
              alt={product.name}
              width={400}
              height={400}
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            {/* Gradient Overlay on Hover */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
          </div>
        </Link>
        
        {/* Enhanced Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-2 rounded-2xl text-sm font-bold shadow-lg animate-pulse">
            <span className="flex items-center space-x-1">
              <Zap className="h-3 w-3" />
              <span>-{discountPercentage}%</span>
            </span>
          </div>
        )}

        {/* Modern Wishlist Button */}
        <div className="absolute top-4 right-4">
          <WishlistButton 
            product={product} 
            size="md" 
            className="bg-white/90 backdrop-blur-sm hover:bg-white border-0 shadow-lg hover:shadow-xl rounded-2xl transition-all duration-300 transform hover:scale-110" 
          />
        </div>

        {/* Quick Action Buttons */}
        <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="flex space-x-2">
            <Link href={`/products/${product.id}`}>
              <button className="p-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 group/btn">
                <Eye className="h-5 w-5 text-slate-600 group-hover/btn:text-violet-600" />
              </button>
            </Link>
            <button 
              onClick={handleAddToCart}
              disabled={product.stock === 0 || isLoading}
              className="p-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        {/* Elegant Out of Stock Overlay */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center rounded-t-3xl">
            <div className="text-center">
              <Package className="h-12 w-12 text-white/80 mx-auto mb-2" />
              <span className="text-white font-semibold text-lg">Out of Stock</span>
              <p className="text-white/80 text-sm mt-1">Notify when available</p>
            </div>
          </div>
        )}

        {/* Stock Status Indicator */}
        {product.stock > 0 && product.stock <= 5 && (
          <div className="absolute bottom-4 right-4 bg-amber-500 text-white px-2 py-1 rounded-xl text-xs font-semibold">
            Only {product.stock} left
          </div>
        )}
      </div>

      {/* Modern Content Section */}
      <div className="p-6 space-y-4">
        {/* Product Title */}
        <Link href={`/products/${product.id}`}>
          <h3 className="font-bold text-xl text-slate-800 hover:text-violet-600 transition-colors duration-300 line-clamp-2 leading-tight">
            {product.name}
          </h3>
        </Link>
        
        {/* Category Tag */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-xl">
            {product.category}
          </span>
          
          {/* Enhanced Rating */}
          {product.rating && (
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating!)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-slate-600">
                {product.rating?.toFixed(1)}
              </span>
              <span className="text-xs text-slate-400">
                ({product.reviews || 0})
              </span>
            </div>
          )}
        </div>

        {/* Product Description */}
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
          {product.description}
        </p>

        {/* Enhanced Price Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-slate-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-slate-400 line-through font-medium">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          {/* Stock Indicator */}
          <div className="flex items-center space-x-1 text-xs">
            <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-green-500' : product.stock > 0 ? 'bg-amber-500' : 'bg-red-500'}`} />
            <span className={`font-medium ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-amber-600' : 'text-red-600'}`}>
              {product.stock > 10 ? 'In Stock' : product.stock > 0 ? `${product.stock} left` : 'Out of Stock'}
            </span>
          </div>
        </div>
      </div>

      {/* Modern Action Footer */}
      <div className="px-6 pb-6">
        <div className="flex space-x-3">
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0 || isLoading}
            loading={isLoading}
            className="flex-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white border-0 rounded-2xl font-semibold py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            {isInCart(product.id) ? 'Add More' : 'Add to Cart'}
          </Button>
          
          <Link href={`/products/${product.id}`}>
            <Button 
              variant="outline" 
              className="px-6 py-3 border-2 border-slate-200 text-slate-600 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <Eye className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Subtle Glow Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-violet-600/5 to-fuchsia-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
};