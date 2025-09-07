'use client';

import { AdminLayout } from '@/components/admin/AdminLayout';
import { ProductList } from '@/components/admin/ProductList';

export default function AdminProducts() {
  return (
    <AdminLayout 
      title="Product Management" 
      description="Manage your product catalog with advanced tools and analytics"
    >
      <ProductList />
    </AdminLayout>
  );
}
