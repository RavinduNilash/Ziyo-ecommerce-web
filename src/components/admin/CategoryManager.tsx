'use client';

import { useState, useEffect } from 'react';
import { Category } from '@/lib/types';
import { useProducts } from '@/context/ProductContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  PlusIcon,
  EditIcon,
  TrashIcon,
  FolderIcon,
  TagIcon,
  SaveIcon,
  XIcon,
  Loader2Icon
} from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';

interface CategoryFormData {
  name: string;
  description: string;
  image?: string;
  parentId?: string;
}

export const CategoryManager = () => {
  const { categories, createCategory, loading } = useProducts();
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    description: '',
    image: '',
    parentId: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingCategory) {
      setFormData({
        name: editingCategory.name,
        description: editingCategory.description,
        image: editingCategory.image || '',
        parentId: editingCategory.parentId || ''
      });
    } else {
      setFormData({
        name: '',
        description: '',
        image: '',
        parentId: ''
      });
    }
  }, [editingCategory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Category name is required');
      return;
    }

    setSubmitting(true);
    try {
      await createCategory({
        name: formData.name.trim(),
        description: formData.description.trim(),
        image: formData.image || undefined,
        parentId: formData.parentId || undefined
      });
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        image: '',
        parentId: ''
      });
      setShowForm(false);
      setEditingCategory(null);
    } catch (error) {
      console.error('Error saving category:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCategory(null);
    setFormData({
      name: '',
      description: '',
      image: '',
      parentId: ''
    });
  };

  // Get top-level categories (no parent)
  const topLevelCategories = categories.filter(cat => !cat.parentId);
  
  // Get subcategories for a parent
  const getSubcategories = (parentId: string) => {
    return categories.filter(cat => cat.parentId === parentId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Category Management</h1>
          <p className="text-gray-600">Organize your products with categories and subcategories</p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Category Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              {editingCategory ? 'Edit Category' : 'Add New Category'}
            </h3>
            <Button variant="outline" size="sm" onClick={handleCancel}>
              <XIcon className="w-4 h-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name *
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter category name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Parent Category
                </label>
                <select
                  value={formData.parentId}
                  onChange={(e) => setFormData(prev => ({ ...prev, parentId: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                >
                  <option value="">Top Level Category</option>
                  {topLevelCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
                placeholder="Enter category description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Image URL
              </label>
              <Input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex gap-4 pt-4 border-t">
              <Button
                type="submit"
                disabled={submitting}
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
              >
                {submitting ? (
                  <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <SaveIcon className="w-4 h-4 mr-2" />
                )}
                {submitting 
                  ? 'Saving...' 
                  : editingCategory 
                  ? 'Update Category' 
                  : 'Create Category'
                }
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Categories List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topLevelCategories.map((category) => (
          <div key={category.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Category Image */}
            <div className="h-32 bg-gradient-to-br from-violet-100 to-purple-100 relative">
              {category.image ? (
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <FolderIcon className="w-12 h-12 text-violet-400" />
                </div>
              )}
            </div>

            {/* Category Info */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg text-gray-900">{category.name}</h3>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(category)}
                    className="p-2"
                  >
                    <EditIcon className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <TrashIcon className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              {category.description && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {category.description}
                </p>
              )}

              {/* Subcategories */}
              {getSubcategories(category.id).length > 0 && (
                <div className="border-t pt-3">
                  <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
                    Subcategories
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {getSubcategories(category.id).map((subcat) => (
                      <span
                        key={subcat.id}
                        className="inline-flex items-center px-2 py-1 bg-violet-100 text-violet-800 text-xs rounded-full"
                      >
                        <TagIcon className="w-3 h-3 mr-1" />
                        {subcat.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mt-4 pt-3 border-t text-xs text-gray-500">
                <span>Created {new Date(category.createdAt).toLocaleDateString()}</span>
                <span>{getSubcategories(category.id).length} subcategories</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {categories.length === 0 && (
        <div className="text-center py-12">
          <FolderIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No categories yet</h3>
          <p className="text-gray-500 mb-4">
            Create your first category to organize your products
          </p>
          <Button onClick={() => setShowForm(true)}>
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </div>
      )}
    </div>
  );
};
