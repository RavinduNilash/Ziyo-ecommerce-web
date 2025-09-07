'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Truck, CreditCard, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { formatPrice } from '@/lib/utils';

interface PaymentIntegrationProps {
  amount: number;
  onSuccess: (paymentId: string, paymentMethod: 'cod' | 'bank_transfer') => void;
  onError: (error: string) => void;
  disabled?: boolean;
}

export function PaymentIntegration({ 
  amount, 
  onSuccess, 
  onError, 
  disabled = false 
}: PaymentIntegrationProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank_transfer'>('cod');

  const handleOrderConfirmation = async () => {
    setIsProcessing(true);

    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate order ID
      const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Order confirmation is always successful for these payment methods
      onSuccess(orderId, paymentMethod);
      
      if (paymentMethod === 'cod') {
        toast.success('Order confirmed! Pay when you receive your items.');
      } else {
        toast.success('Order confirmed! Please complete the bank transfer within 24 hours.');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Order confirmation failed';
      onError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Payment Method Header */}
      <div className="flex items-center justify-between pb-4 border-b">
        <h3 className="text-lg font-semibold text-gray-900">Payment Method</h3>
        <div className="flex items-center text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
          <Lock className="h-4 w-4 mr-1" />
          SSL Secured
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="space-y-3">
        <label className={`flex items-center space-x-4 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
          paymentMethod === 'cod'
            ? 'border-orange-500 bg-orange-50 shadow-md'
            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
        }`}>
          <input
            type="radio"
            name="payment-method"
            value="cod"
            checked={paymentMethod === 'cod'}
            onChange={(e) => setPaymentMethod(e.target.value as 'cod')}
            className="text-orange-600 focus:ring-orange-500 w-4 h-4"
          />
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Truck className="h-5 w-5 text-orange-600" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="block font-semibold text-gray-900">Cash on Delivery</span>
              {paymentMethod === 'cod' && (
                <CheckCircle2 className="h-5 w-5 text-orange-600" />
              )}
            </div>
            <span className="text-sm text-gray-600">Pay when you receive your order</span>
            <div className="flex items-center mt-1">
              <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-medium">
                No extra fees
              </span>
            </div>
          </div>
        </label>

        <label className={`flex items-center space-x-4 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
          paymentMethod === 'bank_transfer'
            ? 'border-blue-500 bg-blue-50 shadow-md'
            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
        }`}>
          <input
            type="radio"
            name="payment-method"
            value="bank_transfer"
            checked={paymentMethod === 'bank_transfer'}
            onChange={(e) => setPaymentMethod(e.target.value as 'bank_transfer')}
            className="text-blue-600 focus:ring-blue-500 w-4 h-4"
          />
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="block font-semibold text-gray-900">Bank Transfer</span>
              {paymentMethod === 'bank_transfer' && (
                <CheckCircle2 className="h-5 w-5 text-blue-600" />
              )}
            </div>
            <span className="text-sm text-gray-600">Transfer to our bank account</span>
            <div className="flex items-center mt-1">
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                100% Secure
              </span>
            </div>
          </div>
        </label>
      </div>

      {/* Payment Method Instructions */}
      {paymentMethod === 'bank_transfer' && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <div className="flex items-center mb-4">
            <CreditCard className="h-5 w-5 text-blue-600 mr-2" />
            <h4 className="font-semibold text-blue-900">Bank Transfer Details</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-800">
            <div className="bg-white p-3 rounded-lg">
              <span className="text-blue-600 font-medium">Bank Name:</span>
              <p className="font-semibold">Commercial Bank of Ceylon</p>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <span className="text-blue-600 font-medium">Account Name:</span>
              <p className="font-semibold">Ziyo Electronics Pvt Ltd</p>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <span className="text-blue-600 font-medium">Account Number:</span>
              <p className="font-semibold">8001234567890</p>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <span className="text-blue-600 font-medium">Branch Code:</span>
              <p className="font-semibold">001</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-100 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="h-4 w-4 text-blue-700 mr-2 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-blue-900">
                <strong>Important:</strong> Include your order number in the transfer reference and send the receipt via email or WhatsApp within 24 hours.
              </div>
            </div>
          </div>
        </div>
      )}

      {paymentMethod === 'cod' && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
          <div className="flex items-center mb-4">
            <Truck className="h-5 w-5 text-orange-600 mr-2" />
            <h4 className="font-semibold text-orange-900">Cash on Delivery Instructions</h4>
          </div>
          <div className="space-y-3 text-sm text-orange-800">
            <div className="flex items-start">
              <CheckCircle2 className="h-4 w-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
              <span>Have the exact amount ready when receiving your order</span>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="h-4 w-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
              <span>Our delivery person will collect payment upon delivery</span>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="h-4 w-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
              <span>You can inspect items before making payment</span>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="h-4 w-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
              <span>Delivery: 2-3 days within Colombo, 3-5 days other areas</span>
            </div>
          </div>
          <div className="mt-4 p-3 bg-orange-100 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="h-4 w-4 text-orange-700 mr-2 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-orange-900">
                <strong>Note:</strong> COD available within Sri Lanka only. Small handling fee may apply for remote areas.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Confirm Order Button */}
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl border">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold text-gray-900">Total Amount</span>
            <span className="text-2xl font-bold text-blue-600">
              {formatPrice(amount)}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            {paymentMethod === 'cod'
              ? "You'll pay when you receive your order"
              : "Complete bank transfer within 24 hours after placing order"
            }
          </p>
        </div>

        <Button
          onClick={handleOrderConfirmation}
          disabled={disabled || isProcessing}
          className={`w-full h-14 text-lg font-semibold rounded-xl transition-all duration-200 ${
            paymentMethod === 'cod'
              ? 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 shadow-lg hover:shadow-xl'
              : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl'
          }`}
          size="lg"
        >
          {isProcessing ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              <span>Processing Order...</span>
            </div>
          ) : (
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 mr-3" />
              <span>
                {paymentMethod === 'cod' ? 'Place Order' : 'Confirm Order'} - {formatPrice(amount)}
              </span>
            </div>
          )}
        </Button>

        <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
          <div className="flex items-center">
            <Lock className="h-3 w-3 mr-1" />
            <span>Secure Payment</span>
          </div>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <div className="flex items-center">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            <span>Order Protection</span>
          </div>
        </div>
      </div>
    </div>
  );
}
