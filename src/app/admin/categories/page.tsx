'use client';

import { AdminLayout } from '@/components/admin/AdminLayout';
import { CategoryManager } from '@/components/admin/CategoryManager';

export default function AdminCategoriesPage() {
  return (
    <AdminLayout 
      title="Category Management" 
      description="Manage product categories and organize your inventory"
    >
      <CategoryManager />
    </AdminLayout>
  );
}
