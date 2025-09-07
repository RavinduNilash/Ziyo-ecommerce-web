'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { formatPrice } from '@/lib/utils';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function CartPage() {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());

  const handleQuantityChange = async (productId: string, newQuantity: number) => {
    setUpdatingItems(prev => new Set(prev).add(productId));
    try {
      updateQuantity(productId, newQuantity);
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const handleRemoveItem = (productId: string, productName: string) => {
    removeItem(productId);
    toast.success(`${productName} removed from cart`);
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

  const shipping = total > 50 ? 0 : 9.99;
  const tax = total * 0.08; // 8% tax
  const finalTotal = total + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#FFFDF2' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="mx-auto h-24 w-24" style={{ color: '#AAAAAA' }} />
            <h1 className="mt-6 text-3xl font-bold" style={{ color: '#000000' }}>Your cart is empty</h1>
            <p className="mt-4 text-lg" style={{ color: '#AAAAAA' }}>
              Looks like you haven&apos;t added any items to your cart yet.
            </p>
            <div className="mt-8">
              <Link href="/products">
                <Button
                  size="lg"
                  className="px-8 py-3 text-white font-medium rounded-lg transition-all duration-200 hover:opacity-90"
                  style={{ backgroundColor: '#000000' }}
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFDF2' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold" style={{ color: '#000000' }}>Shopping Cart</h1>
          <p className="mt-2" style={{ color: '#AAAAAA' }}>
            {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold" style={{ color: '#000000' }}>Items</h2>
            <Button
              variant="outline"
              onClick={handleClearCart}
              className="border-2 px-4 py-2 rounded-lg transition-all duration-200 hover:opacity-80"
              style={{
                borderColor: '#000000',
                color: '#000000',
                backgroundColor: 'transparent'
              }}
            >
              Clear Cart
            </Button>
          </div>

          {items.map((item) => (
            <Card
              key={item.id}
              className="border-0 shadow-md rounded-lg overflow-hidden"
              style={{ backgroundColor: 'white' }}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <Image
                      src={item.product.images[0] || '/placeholder-product.jpg'}
                      alt={item.product.name}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.productId}`}
                      className="text-lg font-medium transition-colors duration-200 hover:opacity-70"
                      style={{ color: '#000000' }}
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm mt-1 line-clamp-2" style={{ color: '#AAAAAA' }}>
                      {item.product.description}
                    </p>
                    <p className="text-sm mt-1" style={{ color: '#AAAAAA' }}>
                      Category: {item.product.category}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                      disabled={item.quantity <= 1 || updatingItems.has(item.productId)}
                      className="border rounded-md p-1 transition-all duration-200 hover:opacity-80"
                      style={{
                        borderColor: '#AAAAAA',
                        color: '#000000',
                        backgroundColor: 'transparent'
                      }}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="min-w-[2rem] text-center font-medium" style={{ color: '#000000' }}>
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                      disabled={updatingItems.has(item.productId)}
                      className="border rounded-md p-1 transition-all duration-200 hover:opacity-80"
                      style={{
                        borderColor: '#AAAAAA',
                        color: '#000000',
                        backgroundColor: 'transparent'
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Price and Remove */}
                  <div className="text-right">
                    <p className="text-lg font-semibold" style={{ color: '#000000' }}>
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                    <p className="text-sm" style={{ color: '#AAAAAA' }}>
                      {formatPrice(item.product.price)} each
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem(item.productId, item.product.name)}
                      className="mt-2 p-1 rounded-md transition-all duration-200 hover:opacity-80"
                      style={{
                        color: '#000000',
                        backgroundColor: 'transparent'
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card
            className="sticky top-4 border-0 shadow-md rounded-lg"
            style={{ backgroundColor: 'white' }}
          >
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4" style={{ color: '#000000' }}>Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span style={{ color: '#AAAAAA' }}>Subtotal</span>
                  <span style={{ color: '#000000' }}>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#AAAAAA' }}>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span style={{ color: '#000000' }}>Free</span>
                    ) : (
                      <span style={{ color: '#000000' }}>{formatPrice(shipping)}</span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#AAAAAA' }}>Tax</span>
                  <span style={{ color: '#000000' }}>{formatPrice(tax)}</span>
                </div>
                <div className="pt-3" style={{ borderTop: '1px solid #AAAAAA' }}>
                  <div className="flex justify-between text-lg font-semibold">
                    <span style={{ color: '#000000' }}>Total</span>
                    <span style={{ color: '#000000' }}>{formatPrice(finalTotal)}</span>
                  </div>
                </div>
              </div>

              {total < 50 && (
                <div className="mb-4 p-3 rounded-md" style={{ backgroundColor: '#FFFDF2', border: '1px solid #AAAAAA' }}>
                  <p className="text-sm" style={{ color: '#000000' }}>
                    Add {formatPrice(50 - total)} more for free shipping!
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <Link href="/checkout">
                  <Button
                    className="w-full px-6 py-3 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    size="lg"
                    style={{ backgroundColor: '#000000' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#333333';
                      e.currentTarget.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#000000';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                </Link>
                <Link href="/products">
                  <Button
                    variant="outline"
                    className="w-full border-2 px-6 py-3 font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
                    style={{
                      borderColor: '#000000',
                      color: '#000000',
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#000000';
                      e.currentTarget.style.color = '#FFFFFF';
                      e.currentTarget.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#000000';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    Continue Shopping
                  </Button>
                </Link>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm" style={{ color: '#AAAAAA' }}>
                  Secure checkout powered by SSL encryption
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
      </div>
    </div>
  );
}