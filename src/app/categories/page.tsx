'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Category } from '@/lib/types';
import { sampleCategories } from '@/lib/sampleData';
import { Search, TrendingUp, Grid, List, Filter, ArrowRight, Sparkles, Package, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCategories(sampleCategories);
      setFilteredCategories(sampleCategories);
      setLoading(false);
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const filtered = categories.filter(category =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [searchQuery, categories]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFDF2' }}>
      {/* Hero Section - Smaller */}
      <section className="relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black to-black/80"></div>
        
        {/* Subtle decorative elements */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gray-600 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-600 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium mb-4">
              <TrendingUp className="h-4 w-4 mr-2" style={{ color: '#AAAAAA' }} />
              Discover Our Collections
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Shop by Category
            </h1>
            
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed" style={{ color: '#AAAAAA' }}>
              Explore our carefully curated collections designed for every lifestyle and passion.
            </p>

            {/* Search Section */}
            <div className="max-w-2xl mx-auto">
              <div className="relative group">
                <div className="relative">
                  <div className="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 focus-within:border-white/40 rounded-xl h-12 shadow-lg">
                    <Search className="w-5 h-5 ml-4" style={{ color: '#AAAAAA' }} />
                    <input
                      type="text"
                      placeholder="Search categories..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 bg-transparent text-white placeholder-gray-400 border-0 outline-none px-4 py-3 text-base"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="p-2 hover:text-white mr-2"
                        style={{ color: '#AAAAAA' }}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-bold text-black mb-2">
                All Categories
              </h2>
              <p style={{ color: '#AAAAAA' }}>
                {filteredCategories.length} {filteredCategories.length === 1 ? 'category' : 'categories'} found
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-white shadow-lg text-black'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    viewMode === 'list'
                      ? 'bg-white shadow-lg text-black'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
              
              <Button variant="outline" className="border-2 border-gray-300 text-black hover:border-black hover:text-black rounded-xl px-6">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-slate-200 rounded-3xl mb-4"></div>
                  <div className="h-4 bg-slate-200 rounded mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            /* Categories Grid */
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8' 
                : 'space-y-6'
            }`}>
              {filteredCategories.map((category, index) => (
                <CategoryCard 
                  key={category.id} 
                  category={category} 
                  viewMode={viewMode}
                  index={index}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredCategories.length === 0 && (
            <div className="text-center py-20">
              <Package className="h-24 w-24 mx-auto mb-6" style={{ color: '#AAAAAA' }} />
              <h3 className="text-2xl font-bold text-black mb-4">No categories found</h3>
              <p className="mb-8 max-w-md mx-auto" style={{ color: '#AAAAAA' }}>
                We couldn&apos;t find any categories matching your search. Try adjusting your search terms.
              </p>
              <Button
                onClick={() => setSearchQuery('')}
                className="bg-black text-white rounded-xl px-8 py-3 hover:bg-gray-800"
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gray-200 rounded-full text-black text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4 mr-2" style={{ color: '#AAAAAA' }} />
              Why Shop by Category?
            </div>
            <h2 className="text-4xl font-bold text-black mb-4">
              Curated Collections
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: '#AAAAAA' }}>
              Our categories are carefully organized to help you discover products that match your interests and needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
              <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black mb-4">Easy Discovery</h3>
              <p style={{ color: '#AAAAAA' }}>Find products quickly by browsing our organized categories and collections.</p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
              <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black mb-4">Trending Items</h3>
              <p style={{ color: '#AAAAAA' }}>Discover what&apos;s popular and trending in each category.</p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
              <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mx-auto mb-6">
                <Package className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black mb-4">Quality Assured</h3>
              <p style={{ color: '#AAAAAA' }}>Every product in our categories meets our high quality standards.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

interface CategoryCardProps {
  category: Category;
  viewMode: 'grid' | 'list';
  index: number;
}

const CategoryCard = ({ category, viewMode, index }: CategoryCardProps) => {
  if (viewMode === 'list') {
    return (
      <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-200 overflow-hidden">
        <div className="flex items-center p-6">
          <div className="relative w-24 h-24 rounded-xl overflow-hidden mr-6 flex-shrink-0">
            <Image
              src={category.image || '/placeholder-category.jpg'}
              alt={category.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-black group-hover:text-gray-800 transition-colors duration-300 mb-2">
              {category.name}
            </h3>
            <p className="mb-4" style={{ color: '#AAAAAA' }}>{category.description}</p>
            
            <Link href={`/products?category=${category.name}`}>
              <Button
                variant="outline"
                className="border-2 border-gray-300 text-black hover:bg-gray-50 hover:border-black rounded-xl"
              >
                Explore Category
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200 overflow-hidden"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={category.image || '/placeholder-category.jpg'}
          alt={category.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute bottom-6 left-6 right-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
          <h3 className="text-xl font-bold mb-2">{category.name}</h3>
          <p className="text-sm text-white/90">{category.description}</p>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-black group-hover:text-gray-800 transition-colors duration-300 mb-2">
          {category.name}
        </h3>
        <p className="mb-6 line-clamp-2" style={{ color: '#AAAAAA' }}>{category.description}</p>
        
        <Link href={`/products?category=${category.name}`} className="block">
          <Button className="w-full bg-black hover:bg-gray-800 text-white rounded-xl font-semibold py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            Explore Category
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
