'use client';

import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { HeartIcon, ShoppingCartIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function WishlistPage() {
  const { user } = useAuth();
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addItem } = useCart();

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  const handleRemoveFromWishlist = (productId: string, productName: string) => {
    removeFromWishlist(productId);
    toast.success(`${productName} removed from wishlist`);
  };

  const handleMoveToCart = (product: Product) => {
    addItem(product, 1);
    removeFromWishlist(product.id);
    toast.success(`${product.name} moved to cart!`);
  };

  if (!user) {
    return (
      <div className="min-h-screen py-8" style={{ backgroundColor: '#FFFDF2' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <HeartIcon className="mx-auto h-12 w-12 mb-4" style={{ color: '#AAAAAA' }} />
            <h1 className="text-3xl font-bold text-black mb-4">My Wishlist</h1>
            <p className="text-lg mb-8" style={{ color: '#AAAAAA' }}>Sign in to view your saved items</p>
            <Link href="/login">
              <Button size="lg" className="bg-black hover:bg-gray-800 text-white">Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: '#FFFDF2' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-black">My Wishlist</h1>
            <p className="mt-2" style={{ color: '#AAAAAA' }}>
              {items.length === 0 ? 'No saved items' : `${items.length} ${items.length === 1 ? 'item' : 'items'} saved`}
            </p>
          </div>
          {items.length > 0 && (
            <div className="mt-4 sm:mt-0 space-x-3">
              <Button
                variant="outline"
                className="border-gray-300 text-black hover:bg-gray-50"
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
                    clearWishlist();
                    toast.success('Wishlist cleared');
                  }
                }}
              >
                Clear All
              </Button>
            </div>
          )}
        </div>

        {/* Empty State */}
        {items.length === 0 ? (
          <div className="text-center py-12">
            <HeartIcon className="mx-auto h-16 w-16 mb-6" style={{ color: '#AAAAAA' }} />
            <h2 className="text-2xl font-semibold text-black mb-4">Your wishlist is empty</h2>
            <p className="text-lg mb-8 max-w-md mx-auto" style={{ color: '#AAAAAA' }}>
              Explore our products and save your favorites for later by clicking the heart icon.
            </p>
            <Link href="/products">
              <Button size="lg" className="bg-black hover:bg-gray-800 text-white">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          /* Wishlist Items */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((product) => (
              <Card key={product.id} className="group relative overflow-hidden bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="aspect-square overflow-hidden">
                  <Link href={`/products/${product.id}`}>
                    <Image
                      src={product.images[0] || '/placeholder-product.jpg'}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                </div>
                
                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveFromWishlist(product.id, product.name)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                >
                  <TrashIcon className="w-4 h-4 text-red-500" />
                </button>

                <div className="p-4">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-medium text-black mb-2 hover:text-gray-700 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <p className="text-sm mb-3 line-clamp-2" style={{ color: '#AAAAAA' }}>
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-black">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.stock > 0
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <Button
                      onClick={() => handleMoveToCart(product)}
                      disabled={product.stock === 0}
                      className="w-full bg-black hover:bg-gray-800 text-white"
                      size="sm"
                    >
                      <ShoppingCartIcon className="w-4 h-4 mr-2" />
                      Move to Cart
                    </Button>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Link href={`/products/${product.id}`}>
                        <Button variant="outline" size="sm" className="w-full border-gray-300 text-black hover:bg-gray-50">
                          View Details
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 text-black hover:bg-gray-50"
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock === 0}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Continue Shopping */}
        {items.length > 0 && (
          <div className="mt-12 text-center">
            <Link href="/products">
              <Button variant="outline" size="lg" className="border-gray-300 text-black hover:bg-gray-50">
                Continue Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
