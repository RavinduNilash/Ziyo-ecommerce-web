'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { WishlistButton } from '@/components/ui/WishlistButton';
import { ShoppingCart, Star, Eye } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem, isInCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

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
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl border border-[#AAAAAA]/10 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
    >
      {/* Clean Image Container */}
      <div className="relative overflow-hidden bg-[#FFFDF2]/50">
        <Link href={`/products/${product.id}`}>
          <div className="aspect-square overflow-hidden relative">
            <Image
              src={product.images[0] || '/placeholder-product.jpg'}
              alt={product.name}
              width={400}
              height={400}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          </div>
        </Link>
        
        {/* Minimal Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-[#000000] text-[#FFFDF2] px-2 py-1 rounded-lg text-xs font-semibold">
            -{discountPercentage}%
          </div>
        )}

        {/* Clean Wishlist Button */}
        <div className="absolute top-3 right-3">
          <WishlistButton 
            product={product} 
            size="sm" 
            className="bg-white/80 backdrop-blur-sm hover:bg-white border-0 shadow-sm rounded-lg transition-all duration-200" 
          />
        </div>

        {/* Out of Stock Overlay */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-[#000000]/80 flex items-center justify-center">
            <span className="text-[#FFFDF2] font-medium text-sm">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Streamlined Content Section */}
      <div className="p-4 space-y-3">
        {/* Category Tag */}
        <div className="flex items-center justify-between">
          <span className="inline-block px-2 py-1 bg-[#AAAAAA]/15 text-[#AAAAAA] text-xs font-medium rounded-md">
            {product.category}
          </span>
          {/* Rating - Only show if exists */}
          {product.rating && (
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span className="text-xs font-medium text-[#AAAAAA]">
                {product.rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        {/* Product Title */}
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg text-[#000000] hover:text-[#AAAAAA] transition-colors duration-200 line-clamp-2 leading-tight">
            {product.name}
          </h3>
        </Link>

        {/* Price Section */}
        <div className="flex items-baseline space-x-2">
          <span className="text-xl font-bold text-[#000000]">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-[#AAAAAA]/60 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Stock Status - Simplified */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <div className={`w-1.5 h-1.5 rounded-full ${
              product.stock > 10 ? 'bg-green-500' : 
              product.stock > 0 ? 'bg-amber-500' : 'bg-red-500'
            }`} />
            <span className="text-xs text-[#AAAAAA]">
              {product.stock > 10 ? 'In Stock' : 
               product.stock > 0 ? `${product.stock} left` : 'Out of Stock'}
            </span>
          </div>
        </div>
      </div>

      {/* Clean Action Footer */}
      <div className="p-4 pt-0">
        <div className="flex space-x-2">
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0 || isLoading}
            loading={isLoading}
            className="flex-1 bg-[#000000] hover:bg-[#333333] text-[#FFFDF2] border-0 rounded-lg font-medium py-2.5 text-sm transition-all duration-200"
          >
            <ShoppingCart className="mr-1.5 h-4 w-4" />
            {isInCart(product.id) ? 'Add More' : 'Add to Cart'}
          </Button>
          
          <Link href={`/products/${product.id}`}>
            <Button 
              variant="outline" 
              className="px-3 py-2.5 border border-[#AAAAAA]/30 text-[#AAAAAA] hover:border-[#000000] hover:text-[#000000] hover:bg-[#AAAAAA]/5 rounded-lg transition-all duration-200"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Subtle Hover Effect */}
      <div className="absolute inset-0 rounded-2xl bg-[#000000]/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};