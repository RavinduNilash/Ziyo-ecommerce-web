'use client';

import { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import { AdminNavbar } from '@/components/admin/AdminNavbar';
import { isAdmin } from '@/lib/admin';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export const AdminLayout = ({ 
  children, 
  title = 'Admin Panel',
  description = 'Manage your e-commerce store'
}: AdminLayoutProps) => {
  const { user, loading } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // Check admin access
  if (!user || !isAdmin(user)) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            You don&apos;t have permission to access the admin panel. Please contact an administrator if you believe this is an error.
          </p>
          <div className="space-y-3">
            <Link href="/">
              <Button className="w-full">
                Return to Store
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="w-full">
                Sign In as Admin
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navigation */}
      <AdminNavbar />
      
      {/* Main Content */}
      <main className="flex-1">
        {/* Page Header */}
        {(title !== 'Admin Panel' || description !== 'Manage your e-commerce store') && (
          <div className="bg-white border-b border-gray-200">
            <div className="px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                  {description && (
                    <p className="mt-1 text-sm text-gray-600">{description}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Page Content */}
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>
    </div>
  );
};
