'use client';

import { useState, useEffect } from 'react';
import { dataMigrationService } from '@/lib/dataMigration';
import { Button } from '@/components/ui/Button';
import {
  UploadIcon,
  DownloadIcon,
  DatabaseIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  RefreshCwIcon,
  InfoIcon,
  TrashIcon,
  PackageIcon,
  FolderIcon,
  Loader2Icon
} from 'lucide-react';
import toast from 'react-hot-toast';

interface MigrationStatus {
  isFirebaseConfigured: boolean;
  canConnect: boolean;
  existingData: {
    hasCategories: boolean;
    hasProducts: boolean;
    productCount: number;
    categoryCount: number;
  };
}

export const DataMigrationPanel = () => {
  const [status, setStatus] = useState<MigrationStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [clearing, setClearing] = useState(false);

  const loadStatus = async () => {
    setLoading(true);
    try {
      const migrationStatus = await dataMigrationService.getMigrationStatus();
      setStatus(migrationStatus);
    } catch (error) {
      console.error('Error loading migration status:', error);
      toast.error('Failed to load migration status');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStatus();
  }, []);

  const handleImportCategories = async () => {
    setImporting(true);
    try {
      const categoryIds = await dataMigrationService.importCategories();
      toast.success(`Successfully imported ${categoryIds.length} categories!`);
      await loadStatus(); // Refresh status
    } catch (error) {
      console.error('Error importing categories:', error);
      toast.error('Failed to import categories');
    } finally {
      setImporting(false);
    }
  };

  const handleImportProducts = async () => {
    setImporting(true);
    try {
      const productIds = await dataMigrationService.importProducts();
      toast.success(`Successfully imported ${productIds.length} products!`);
      await loadStatus(); // Refresh status
    } catch (error) {
      console.error('Error importing products:', error);
      toast.error('Failed to import products');
    } finally {
      setImporting(false);
    }
  };

  const handleImportAll = async () => {
    setImporting(true);
    try {
      const result = await dataMigrationService.importAllSampleData();
      toast.success(
        `Successfully imported ${result.categoryIds.length} categories and ${result.productIds.length} products!`
      );
      await loadStatus(); // Refresh status
    } catch (error) {
      console.error('Error importing all data:', error);
      toast.error('Failed to import data');
    } finally {
      setImporting(false);
    }
  };

  const handleClearData = async () => {
    if (!window.confirm('Are you sure you want to delete all products? This action cannot be undone.')) {
      return;
    }

    setClearing(true);
    try {
      await dataMigrationService.clearAllData();
      toast.success('All data cleared successfully!');
      await loadStatus(); // Refresh status
    } catch (error) {
      console.error('Error clearing data:', error);
      toast.error('Failed to clear data');
    } finally {
      setClearing(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Migration</h1>
          <p className="text-gray-600">Import sample data and manage your Firebase database</p>
        </div>
        <Button variant="outline" onClick={loadStatus} disabled={loading}>
          <RefreshCwIcon className="w-4 h-4 mr-2" />
          Refresh Status
        </Button>
      </div>

      {/* Firebase Configuration Status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <DatabaseIcon className="w-6 h-6 text-gray-700" />
          <h2 className="text-xl font-semibold text-gray-900">Firebase Configuration</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            {status?.isFirebaseConfigured ? (
              <CheckCircleIcon className="w-5 h-5 text-green-500" />
            ) : (
              <XCircleIcon className="w-5 h-5 text-red-500" />
            )}
            <div>
              <p className="font-medium text-gray-900">Firebase Configuration</p>
              <p className="text-sm text-gray-600">
                {status?.isFirebaseConfigured
                  ? 'Firebase is properly configured'
                  : 'Firebase is not configured (using demo mode)'
                }
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {status?.canConnect ? (
              <CheckCircleIcon className="w-5 h-5 text-green-500" />
            ) : (
              <XCircleIcon className="w-5 h-5 text-red-500" />
            )}
            <div>
              <p className="font-medium text-gray-900">Database Connection</p>
              <p className="text-sm text-gray-600">
                {status?.canConnect
                  ? 'Successfully connected to Firebase'
                  : 'Cannot connect to Firebase database'
                }
              </p>
            </div>
          </div>
        </div>

        {!status?.isFirebaseConfigured && (
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start gap-3">
              <InfoIcon className="w-5 h-5 text-amber-600 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800">Firebase Setup Required</p>
                <p className="text-sm text-amber-700 mt-1">
                  Configure your Firebase environment variables in `.env.local` to enable data migration.
                  Check the PROJECT_SETUP_GUIDE.md for detailed instructions.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Current Data Status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
          <PackageIcon className="w-6 h-6" />
          Current Database Status
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <FolderIcon className="w-5 h-5 text-blue-600" />
              <h3 className="font-medium text-blue-900">Categories</h3>
            </div>
            <p className="text-2xl font-bold text-blue-700">
              {status?.existingData.categoryCount || 0}
            </p>
            <p className="text-sm text-blue-600">
              {status?.existingData.hasCategories ? 'Categories found' : 'No categories'}
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <PackageIcon className="w-5 h-5 text-green-600" />
              <h3 className="font-medium text-green-900">Products</h3>
            </div>
            <p className="text-2xl font-bold text-green-700">
              {status?.existingData.productCount || 0}
            </p>
            <p className="text-sm text-green-600">
              {status?.existingData.hasProducts ? 'Products found' : 'No products'}
            </p>
          </div>
        </div>
      </div>

      {/* Migration Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
          <UploadIcon className="w-6 h-6" />
          Data Migration Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Import Categories */}
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-center">
              <FolderIcon className="w-8 h-8 text-violet-600 mx-auto mb-3" />
              <h3 className="font-medium text-gray-900 mb-2">Import Categories</h3>
              <p className="text-sm text-gray-600 mb-4">
                Import sample product categories
              </p>
              <Button
                size="sm"
                onClick={handleImportCategories}
                disabled={!status?.canConnect || importing}
                className="w-full"
              >
                {importing ? (
                  <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <DownloadIcon className="w-4 h-4 mr-2" />
                )}
                Import
              </Button>
            </div>
          </div>

          {/* Import Products */}
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-center">
              <PackageIcon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-medium text-gray-900 mb-2">Import Products</h3>
              <p className="text-sm text-gray-600 mb-4">
                Import sample product catalog
              </p>
              <Button
                size="sm"
                onClick={handleImportProducts}
                disabled={!status?.canConnect || importing}
                className="w-full"
              >
                {importing ? (
                  <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <DownloadIcon className="w-4 h-4 mr-2" />
                )}
                Import
              </Button>
            </div>
          </div>

          {/* Import All */}
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-center">
              <DatabaseIcon className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-medium text-gray-900 mb-2">Import All Data</h3>
              <p className="text-sm text-gray-600 mb-4">
                Import all sample data at once
              </p>
              <Button
                size="sm"
                onClick={handleImportAll}
                disabled={!status?.canConnect || importing}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
              >
                {importing ? (
                  <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <DownloadIcon className="w-4 h-4 mr-2" />
                )}
                Import All
              </Button>
            </div>
          </div>

          {/* Clear Data */}
          <div className="p-4 border border-red-200 rounded-lg bg-red-50">
            <div className="text-center">
              <AlertTriangleIcon className="w-8 h-8 text-red-600 mx-auto mb-3" />
              <h3 className="font-medium text-red-900 mb-2">Clear All Data</h3>
              <p className="text-sm text-red-700 mb-4">
                Delete all products (irreversible)
              </p>
              <Button
                size="sm"
                variant="outline"
                onClick={handleClearData}
                disabled={!status?.canConnect || !status?.existingData.hasProducts || clearing}
                className="w-full border-red-300 text-red-600 hover:bg-red-50"
              >
                {clearing ? (
                  <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <TrashIcon className="w-4 h-4 mr-2" />
                )}
                Clear Data
              </Button>
            </div>
          </div>
        </div>

        {/* Warning Message */}
        {status?.existingData.hasProducts && (
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangleIcon className="w-5 h-5 text-amber-600 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800">Existing Data Detected</p>
                <p className="text-sm text-amber-700 mt-1">
                  You already have products in your database. Importing more data will add to the existing products.
                  Consider clearing the database first if you want a fresh start.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
