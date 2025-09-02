'use client';

import { useState, useEffect } from 'react';
import { ProductVariant } from '@/lib/types';

interface ProductVariantSelectorProps {
  variants: ProductVariant[];
  onVariantChange: (selectedVariants: Record<string, string>) => void;
  disabled?: boolean;
}

export function ProductVariantSelector({ 
  variants, 
  onVariantChange, 
  disabled = false 
}: ProductVariantSelectorProps) {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  useEffect(() => {
    onVariantChange(selectedVariants);
  }, [selectedVariants, onVariantChange]);

  const handleVariantSelect = (variantId: string, value: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variantId]: value
    }));
  };

  if (!variants || variants.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {variants.map((variant) => (
        <div key={variant.id} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {variant.name}
          </label>
          <div className="flex flex-wrap gap-2">
            {variant.values.map((value) => {
              const isSelected = selectedVariants[variant.id] === value;
              return (
                <button
                  key={value}
                  onClick={() => handleVariantSelect(variant.id, value)}
                  disabled={disabled}
                  className={`
                    px-3 py-2 text-sm border rounded-md transition-colors
                    ${isSelected 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }
                    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
