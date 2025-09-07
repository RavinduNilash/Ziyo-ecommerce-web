'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { PaymentIntegration } from '@/components/ui/PaymentIntegration';
import { formatPrice } from '@/lib/utils';
import { toast } from 'react-hot-toast';
import { ArrowLeft, Truck, Shield, Clock, Package, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CheckoutPage() {
  const { user } = useAuth();
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  
  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Sri Lanka'
  });

  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

  // Calculate totals
  const subtotal = total;
  const shipping = subtotal > 16500 ? 0 : 3300; // Free shipping over LKR 16,500, otherwise LKR 3,300
  const tax = subtotal * 0.08; // 8% tax
  const finalTotal = subtotal + shipping + tax;

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some items to your cart before checking out.</p>
          <Link href="/products">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!shippingAddress.firstName.trim()) errors.firstName = 'First name is required';
    if (!shippingAddress.lastName.trim()) errors.lastName = 'Last name is required';
    if (!shippingAddress.email.trim()) errors.email = 'Email is required';
    if (!shippingAddress.phone.trim()) errors.phone = 'Phone number is required';
    if (!shippingAddress.address.trim()) errors.address = 'Address is required';
    if (!shippingAddress.city.trim()) errors.city = 'City is required';
    
    // Email validation
    if (shippingAddress.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingAddress.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Phone validation (basic Sri Lankan format)
    if (shippingAddress.phone && !/^(\+94|0)[0-9]{9}$/.test(shippingAddress.phone.replace(/\s/g, ''))) {
      errors.phone = 'Please enter a valid Sri Lankan phone number';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const getDeliveryEstimate = () => {
    const today = new Date();
    const deliveryDate = new Date(today);
    
    // Add delivery days based on location
    if (shippingAddress.city.toLowerCase().includes('colombo')) {
      deliveryDate.setDate(today.getDate() + 2);
    } else {
      deliveryDate.setDate(today.getDate() + 4);
    }
    
    return deliveryDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handlePlaceOrder = async (orderId?: string, paymentMethod?: 'cod' | 'bank_transfer') => {
    // Validate form before proceeding
    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly.');
      return;
    }

    setLoading(true);
    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store order with payment info (in real app, this would be sent to backend)
      const orderData = {
        id: orderId || `order_${Date.now()}`,
        paymentMethod: paymentMethod || 'cod',
        items,
        shippingAddress,
        subtotal,
        shipping,
        tax,
        total: finalTotal,
        status: paymentMethod === 'cod' ? 'confirmed' : 'pending_payment',
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'awaiting_transfer',
        createdAt: new Date()
      };
      
      // Store in localStorage for demo
      const existingOrders = JSON.parse(localStorage.getItem('demo-orders') || '[]');
      existingOrders.push(orderData);
      localStorage.setItem('demo-orders', JSON.stringify(existingOrders));
      
      clearCart();
      
      if (paymentMethod === 'cod') {
        toast.success('Order confirmed! We will deliver within 2-3 business days.');
      } else {
        toast.success('Order confirmed! Please complete the bank transfer within 24 hours.');
      }
      
      router.push('/orders/success');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link href="/cart" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Cart
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        <p className="text-gray-600 mt-2">Complete your order</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-lg border-t-4 border-t-blue-500">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Truck className="mr-2 h-5 w-5 text-blue-600" />
                  Shipping Address
                </div>
                <div className="text-sm font-normal text-gray-600">
                  Step 1 of 2
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Input
                    label="First Name"
                    name="firstName"
                    value={shippingAddress.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter first name"
                    className={validationErrors.firstName ? 'border-red-500' : ''}
                  />
                  {validationErrors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.firstName}</p>
                  )}
                </div>
                <div>
                  <Input
                    label="Last Name"
                    name="lastName"
                    value={shippingAddress.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter last name"
                    className={validationErrors.lastName ? 'border-red-500' : ''}
                  />
                  {validationErrors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.lastName}</p>
                  )}
                </div>
                <div>
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={shippingAddress.email}
                    onChange={handleInputChange}
                    placeholder="Enter email"
                    className={validationErrors.email ? 'border-red-500' : ''}
                  />
                  {validationErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                  )}
                </div>
                <div>
                  <Input
                    label="Phone"
                    name="phone"
                    value={shippingAddress.phone}
                    onChange={handleInputChange}
                    placeholder="e.g., +94 77 123 4567"
                    className={validationErrors.phone ? 'border-red-500' : ''}
                  />
                  {validationErrors.phone && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <Input
                    label="Address"
                    name="address"
                    value={shippingAddress.address}
                    onChange={handleInputChange}
                    placeholder="Street address, building name, floor, etc."
                    className={validationErrors.address ? 'border-red-500' : ''}
                  />
                  {validationErrors.address && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.address}</p>
                  )}
                </div>
                <div>
                  <Input
                    label="City"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleInputChange}
                    placeholder="Enter city"
                    className={validationErrors.city ? 'border-red-500' : ''}
                  />
                  {validationErrors.city && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.city}</p>
                  )}
                </div>
                <Input
                  label="State/Province"
                  name="state"
                  value={shippingAddress.state}
                  onChange={handleInputChange}
                  placeholder="Enter state or province"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 order-first lg:order-last">
          <div className="space-y-6">
            {/* Order Summary Card */}
            <Card className="sticky top-4 lg:top-8 shadow-lg border-t-4 border-t-green-500">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Package className="mr-2 h-5 w-5 text-green-600" />
                    Order Summary
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-normal text-gray-600 block">
                      {items.length} item{items.length !== 1 ? 's' : ''}
                    </span>
                    <span className="text-xs text-gray-500">
                      Step 2 of 2
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {/* Product Items */}
                <div className="space-y-3 sm:space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-start space-x-3 sm:space-x-4 p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex-shrink-0">
                        <Image
                          src={item.product.images[0] || '/placeholder-product.jpg'}
                          alt={item.product.name}
                          width={60}
                          height={60}
                          className="w-15 h-15 sm:w-18 sm:h-18 rounded-xl object-cover border-2 border-white shadow-sm"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2 leading-tight">
                          {item.product.name}
                        </h3>
                        <div className="flex items-center justify-between flex-wrap gap-1">
                          <p className="text-xs sm:text-sm text-gray-600 bg-white px-2 py-1 rounded-full">
                            Qty: {item.quantity}
                          </p>
                          <p className="text-xs sm:text-sm font-medium text-gray-900">
                            {formatPrice(item.product.price)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm sm:text-lg font-bold text-blue-600">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Estimation */}
                {shippingAddress.city && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl shadow-sm">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <Clock className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-green-900">
                          Estimated Delivery
                        </p>
                        <p className="text-sm text-green-700 font-medium">
                          {getDeliveryEstimate()}
                        </p>
                        <p className="text-xs text-green-600 mt-1">
                          We&apos;ll notify you with tracking details
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Order Totals */}
                <div className="space-y-3 border-t pt-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal ({items.length} item{items.length !== 1 ? 's' : ''})</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <Truck className="h-4 w-4 mr-1" />
                      <span>Shipping</span>
                    </div>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600 font-semibold">Free</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Tax (8%)</span>
                    <span className="font-medium">{formatPrice(tax)}</span>
                  </div>
                  {shipping === 0 && subtotal < 16500 && (
                    <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
                      🎉 You saved {formatPrice(3300)} on shipping!
                    </div>
                  )}
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-blue-600">
                        {formatPrice(finalTotal)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Security & Trust Indicators */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center justify-center space-x-6 text-xs text-gray-600">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-1 text-green-600" />
                      <span>Secure Checkout</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-1 text-blue-600" />
                      <span>Protected Orders</span>
                    </div>
                  </div>
                </div>

                {/* Payment Integration */}
                <div className="mt-6">
                  <PaymentIntegration
                    amount={finalTotal}
                    onSuccess={(orderId: string, paymentMethod: 'cod' | 'bank_transfer') => handlePlaceOrder(orderId, paymentMethod)}
                    onError={(error: string) => {
                      console.error('Order confirmation error:', error);
                      toast.error('Order confirmation failed. Please try again.');
                    }}
                    disabled={loading}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
