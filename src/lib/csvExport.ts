import { electronicsCategories, electronicsProducts } from './electronicsData';

// Utility function to convert data to CSV format
export function exportCategoriesToCSV(): string {
  const headers = ['ID', 'Name', 'Description', 'Image URL', 'Created At'];
  const rows = electronicsCategories.map(category => [
    category.id,
    category.name,
    category.description,
    category.image,
    category.createdAt.toISOString()
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(field => `"${field}"`).join(','))
  ].join('\n');

  return csvContent;
}

export function exportProductsToCSV(): string {
  const headers = [
    'ID', 'Name', 'Description', 'Price', 'Original Price', 'Category', 
    'Stock', 'Rating', 'Reviews', 'Tags', 'Featured', 'Image URLs', 'Created At'
  ];
  
  const rows = electronicsProducts.map(product => [
    product.id,
    product.name,
    product.description,
    product.price.toString(),
    product.originalPrice?.toString() || '',
    product.category,
    product.stock.toString(),
    product.rating?.toString() || '',
    product.reviews?.toString() || '',
    product.tags?.join(';') || '',
    product.featured?.toString() || 'false',
    product.images.join(';'),
    product.createdAt.toISOString()
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(field => `"${field}"`).join(','))
  ].join('\n');

  return csvContent;
}

// Function to save CSV files (for development/testing)
export function downloadCSV(content: string, filename: string) {
  if (typeof window !== 'undefined') {
    const blob = new Blob([content], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}

// Example usage:
// console.log(exportCategoriesToCSV());
// console.log(exportProductsToCSV());
// downloadCSV(exportProductsToCSV(), 'electronics-products.csv');
// downloadCSV(exportCategoriesToCSV(), 'electronics-categories.csv');
