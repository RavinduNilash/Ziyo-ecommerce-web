import { Product, ProductVariant } from '@/lib/types';

export interface VariantSelection {
  [variantId: string]: string;
}

export function getVariantKey(selection: VariantSelection): string {
  return Object.entries(selection)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}:${value}`)
    .join(',');
}

export function getVariantPrice(product: Product, selection: VariantSelection): number {
  if (!product.variants || !product.variantCombinations) {
    return product.price;
  }

  const variantKey = getVariantKey(selection);
  const combination = product.variantCombinations[variantKey];
  
  return combination?.price ?? product.price;
}

export function getVariantStock(product: Product, selection: VariantSelection): number {
  if (!product.variants || !product.variantCombinations) {
    return product.stock;
  }

  const variantKey = getVariantKey(selection);
  const combination = product.variantCombinations[variantKey];
  
  return combination?.stock ?? product.stock;
}

export function getVariantImages(product: Product, selection: VariantSelection): string[] {
  if (!product.variants || !product.variantCombinations) {
    return product.images;
  }

  const variantKey = getVariantKey(selection);
  const combination = product.variantCombinations[variantKey];
  
  return combination?.images ?? product.images;
}

export function isValidVariantSelection(product: Product, selection: VariantSelection): boolean {
  if (!product.variants) {
    return true;
  }

  // Check if all required variants are selected
  for (const variant of product.variants) {
    if (!selection[variant.id]) {
      return false;
    }
  }

  // Check if the combination exists
  const variantKey = getVariantKey(selection);
  return !product.variantCombinations || !!product.variantCombinations[variantKey];
}

export function getAllVariantCombinations(variants: ProductVariant[]): VariantSelection[] {
  if (!variants || variants.length === 0) {
    return [{}];
  }

  function generateCombinations(index: number): VariantSelection[] {
    if (index >= variants.length) {
      return [{}];
    }

    const currentVariant = variants[index];
    const restCombinations = generateCombinations(index + 1);
    const combinations: VariantSelection[] = [];

    for (const value of currentVariant.values) {
      for (const restCombination of restCombinations) {
        combinations.push({
          [currentVariant.id]: value,
          ...restCombination
        });
      }
    }

    return combinations;
  }

  return generateCombinations(0);
}
