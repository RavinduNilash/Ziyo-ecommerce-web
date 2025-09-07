'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { CheckCircle, Package, Truck, Clock, ArrowRight, CreditCard, Banknote } from 'lucide-react';

interface OrderData {
  id: string;
  paymentMethod: 'cod' | 'bank_transfer';
  total: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

export default function OrderSuccessPage() {
  const [latestOrder, setLatestOrder] = useState<OrderData | null>(null);
  
  // Generate a random order number for demo
  const orderNumber = `ZY${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5); // 5 days from now

  useEffect(() => {
    // Get the latest order from localStorage
    try {
      const orders = JSON.parse(localStorage.getItem('demo-orders') || '[]');
      if (orders.length > 0) {
        const latest = orders[orders.length - 1];
        setLatestOrder(latest);
      }
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        {/* Success Icon */}
        <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Order Placed Successfully!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          {latestOrder?.paymentMethod === 'cod' 
            ? "Thank you for your order! Pay when you receive your items."
            : latestOrder?.paymentMethod === 'bank_transfer'
            ? "Thank you for your order! Please complete the bank transfer within 24 hours."
            : "Thank you for your purchase. Your order has been confirmed and is being processed."
          }
        </p>

        {/* Payment Method Alert */}
        {latestOrder?.paymentMethod === 'bank_transfer' && (
          <div className="max-w-2xl mx-auto mb-8">
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <CreditCard className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Complete Your Bank Transfer</h3>
                    <div className="text-sm text-blue-800 space-y-1">
                      <p><strong>Bank:</strong> Commercial Bank of Ceylon</p>
                      <p><strong>Account Name:</strong> Ziyo Electronics Pvt Ltd</p>
                      <p><strong>Account Number:</strong> 8001234567890</p>
                      <p><strong>Reference:</strong> Order #{latestOrder.id}</p>
                    </div>
                    <p className="text-xs text-blue-700 mt-3 font-medium">
                      Please send the transfer receipt to support@ziyo.lk or WhatsApp +94 77 123 4567
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {latestOrder?.paymentMethod === 'cod' && (
          <div className="max-w-2xl mx-auto mb-8">
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <Banknote className="h-6 w-6 text-orange-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-orange-900 mb-2">Cash on Delivery Instructions</h3>
                    <div className="text-sm text-orange-800">
                      <p>• Please have the exact amount ready when receiving your order</p>
                      <p>• You can inspect the items before making payment</p>
                      <p>• Our delivery person will collect the payment upon delivery</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Order Details Card */}
        <Card className="max-w-2xl mx-auto mb-8">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {/* Order Information */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Order Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Number:</span>
                    <span className="font-medium">#{orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date:</span>
                    <span className="font-medium">{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-medium">
                      {latestOrder?.paymentMethod === 'cod' ? 'Cash on Delivery' : 
                       latestOrder?.paymentMethod === 'bank_transfer' ? 'Bank Transfer' : 
                       'Cash on Delivery'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Status:</span>
                    <span className={`font-medium ${
                      latestOrder?.paymentMethod === 'cod' ? 'text-orange-600' : 
                      latestOrder?.paymentMethod === 'bank_transfer' ? 'text-blue-600' : 
                      'text-gray-600'
                    }`}>
                      {latestOrder?.paymentMethod === 'cod' ? 'Pay on Delivery' : 
                       latestOrder?.paymentMethod === 'bank_transfer' ? 'Awaiting Transfer' : 
                       'Pending'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Delivery Information */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Delivery Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Delivery:</span>
                    <span className="font-medium">{estimatedDelivery.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping Method:</span>
                    <span className="font-medium">Standard Delivery</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tracking:</span>
                    <span className="font-medium">Available soon</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Status Timeline */}
            <div className="mt-8 pt-8 border-t">
              <h3 className="font-semibold text-gray-900 mb-6">Order Status</h3>
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-green-600">Order Placed</span>
                  <span className="text-xs text-gray-500">Just now</span>
                </div>
                
                <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
                
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                    <Package className="h-6 w-6 text-gray-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-400">Processing</span>
                  <span className="text-xs text-gray-500">1-2 days</span>
                </div>
                
                <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
                
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                    <Truck className="h-6 w-6 text-gray-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-400">Shipped</span>
                  <span className="text-xs text-gray-500">3-4 days</span>
                </div>
                
                <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
                
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle className="h-6 w-6 text-gray-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-400">Delivered</span>
                  <span className="text-xs text-gray-500">5-7 days</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What&apos;s Next Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Track Your Order</h3>
              <p className="text-sm text-gray-600 mb-4">
                You&apos;ll receive email updates about your order status
              </p>
              <Button variant="outline" size="sm" disabled>
                Track Order
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Package className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Order Details</h3>
              <p className="text-sm text-gray-600 mb-4">
                View your complete order history and details
              </p>
              <Link href="/orders">
                <Button variant="outline" size="sm" disabled>
                  View Orders
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Truck className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Contact our customer service for any questions
              </p>
              <Button variant="outline" size="sm" disabled>
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products">
            <Button size="lg">
              Continue Shopping
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" size="lg">
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Additional Information */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg text-left max-w-2xl mx-auto">
          <h3 className="font-semibold text-gray-900 mb-4">What happens next?</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
              <span>You&apos;ll receive an order confirmation email shortly</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
              <span>We&apos;ll process your order within 1-2 business days</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
              <span>You&apos;ll get shipping confirmation with tracking information</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
              <span>Your order will be delivered within 5-7 business days</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
