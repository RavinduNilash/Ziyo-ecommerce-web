'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CreditCard, Lock } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface PaymentIntegrationProps {
  amount: number;
  onSuccess: (paymentId: string) => void;
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
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'apple_pay'>('card');

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, simulate a successful payment
      const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Simulate payment success/failure (90% success rate)
      if (Math.random() > 0.1) {
        onSuccess(paymentId);
        toast.success('Payment successful!');
      } else {
        throw new Error('Payment failed. Please try again.');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Payment failed';
      onError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Payment Method</h3>
          <div className="flex items-center text-sm text-gray-600">
            <Lock className="h-4 w-4 mr-1" />
            Secure Payment
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="space-y-3">
          <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="payment-method"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={(e) => setPaymentMethod(e.target.value as 'card')}
              className="text-blue-600"
            />
            <CreditCard className="h-5 w-5 text-gray-600" />
            <span className="flex-1">Credit/Debit Card</span>
            <div className="flex space-x-1">
              <Image src="/visa.svg" alt="Visa" width={32} height={24} className="h-6 w-8 object-contain" />
              <Image src="/mastercard.svg" alt="Mastercard" width={32} height={24} className="h-6 w-8 object-contain" />
            </div>
          </label>

          <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 opacity-50">
            <input
              type="radio"
              name="payment-method"
              value="paypal"
              checked={paymentMethod === 'paypal'}
              onChange={(e) => setPaymentMethod(e.target.value as 'paypal')}
              className="text-blue-600"
              disabled
            />
            <div className="h-5 w-5 bg-blue-600 rounded"></div>
            <span className="flex-1">PayPal</span>
            <span className="text-sm text-gray-500">(Coming Soon)</span>
          </label>

          <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 opacity-50">
            <input
              type="radio"
              name="payment-method"
              value="apple_pay"
              checked={paymentMethod === 'apple_pay'}
              onChange={(e) => setPaymentMethod(e.target.value as 'apple_pay')}
              className="text-blue-600"
              disabled
            />
            <div className="h-5 w-5 bg-black rounded"></div>
            <span className="flex-1">Apple Pay</span>
            <span className="text-sm text-gray-500">(Coming Soon)</span>
          </label>
        </div>

        {/* Card Form (Demo) */}
        {paymentMethod === 'card' && (
          <div className="space-y-4 pt-4 border-t">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="4242 4242 4242 4242"
                disabled={disabled}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue="12/28"
                  disabled={disabled}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue="123"
                  disabled={disabled}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cardholder Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="John Doe"
                disabled={disabled}
              />
            </div>
          </div>
        )}

        {/* Payment Summary */}
        <div className="pt-4 border-t">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Total Amount</span>
            <span className="text-xl font-bold text-blue-600">
              ${amount.toFixed(2)}
            </span>
          </div>

          <Button
            onClick={handlePayment}
            disabled={disabled || isProcessing}
            className="w-full"
            size="lg"
          >
            {isProcessing ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing Payment...
              </div>
            ) : (
              `Pay $${amount.toFixed(2)}`
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center mt-3">
            Your payment information is secure and encrypted
          </p>
        </div>
      </div>
    </Card>
  );
}
