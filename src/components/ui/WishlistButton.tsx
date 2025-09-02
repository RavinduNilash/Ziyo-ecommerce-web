'use client';

import { useState } from 'react';
import { HeartIcon } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { Product } from '@/lib/types';
import toast from 'react-hot-toast';

interface WishlistButtonProps {
  product: Product;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const WishlistButton = ({ product, size = 'md', className = '' }: WishlistButtonProps) => {
  const { user } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isAnimating, setIsAnimating] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error('Please sign in to save items to your wishlist');
      return;
    }

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.success(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist`);
    }
  };

  const sizeClasses = {
    sm: 'w-6 h-6 p-1',
    md: 'w-8 h-8 p-1.5',
    lg: 'w-10 h-10 p-2'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <button
      onClick={handleClick}
      className={`
        ${sizeClasses[size]}
        rounded-full 
        border-2 
        transition-all 
        duration-200 
        flex 
        items-center 
        justify-center
        ${inWishlist
          ? 'bg-red-500 border-red-500 text-white hover:bg-red-600 hover:border-red-600'
          : 'bg-white border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500'
        }
        ${isAnimating ? 'scale-110' : 'scale-100'}
        ${className}
      `}
      title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <HeartIcon 
        className={`${iconSizes[size]} ${inWishlist ? 'fill-current' : ''}`} 
      />
    </button>
  );
};
