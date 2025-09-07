'use client';

import { AdminLayout } from '@/components/admin/AdminLayout';
import { DataMigrationPanel } from '@/components/admin/DataMigrationPanel';

export default function AdminDataPage() {
  return (
    <AdminLayout 
      title="Data Management" 
      description="Import, export, and manage your product data"
    >
      <DataMigrationPanel />
    </AdminLayout>
  );
}
