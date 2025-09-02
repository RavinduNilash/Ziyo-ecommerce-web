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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-fuchsia-900/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-violet-500/10 border border-violet-300/20 rounded-full text-violet-200 text-sm font-medium mb-8 backdrop-blur-sm animate-pulse">
              <TrendingUp className="h-4 w-4 mr-2" />
              Discover Our Collections
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-violet-100 to-white bg-clip-text text-transparent mb-6 leading-tight">
              Shop by Category
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Explore our carefully curated collections designed for every lifestyle and passion.
              <span className="block mt-2 text-violet-300">Find exactly what you&apos;re looking for.</span>
            </p>

            {/* Search Section */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-2xl blur-lg group-focus-within:blur-xl transition-all duration-300"></div>
                <div className="relative">
                  <div className="flex items-center bg-white/10 backdrop-blur-sm border-2 border-white/20 focus-within:border-violet-300 focus-within:ring-4 focus-within:ring-violet-100/20 rounded-2xl h-14 shadow-2xl">
                    <Search className="w-6 h-6 text-white/70 ml-4" />
                    <input
                      type="text"
                      placeholder="Search categories..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 bg-transparent text-white placeholder:text-white/60 border-0 outline-none px-4 py-3 text-lg"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="p-2 text-white/70 hover:text-white mr-2"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-violet-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                All Categories
              </h2>
              <p className="text-slate-600">
                {filteredCategories.length} {filteredCategories.length === 1 ? 'category' : 'categories'} found
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-slate-100 rounded-2xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-white shadow-lg text-violet-600'
                      : 'text-slate-600 hover:text-violet-600'
                  }`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    viewMode === 'list'
                      ? 'bg-white shadow-lg text-violet-600'
                      : 'text-slate-600 hover:text-violet-600'
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
              
              <Button variant="outline" className="border-2 border-slate-200 text-slate-600 hover:border-violet-300 hover:text-violet-600 rounded-2xl px-6">
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
              <Package className="h-24 w-24 text-slate-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-slate-900 mb-4">No categories found</h3>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                We couldn&apos;t find any categories matching your search. Try adjusting your search terms.
              </p>
              <Button 
                onClick={() => setSearchQuery('')}
                className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-2xl px-8 py-3"
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 bg-gradient-to-br from-violet-50 to-fuchsia-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-violet-100 rounded-full text-violet-700 text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4 mr-2" />
              Why Shop by Category?
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Curated Collections
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Our categories are carefully organized to help you discover products that match your interests and needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-3xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Easy Discovery</h3>
              <p className="text-slate-600">Find products quickly by browsing our organized categories and collections.</p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-3xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-fuchsia-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Trending Items</h3>
              <p className="text-slate-600">Discover what&apos;s popular and trending in each category.</p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-3xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Package className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Quality Assured</h3>
              <p className="text-slate-600">Every product in our categories meets our high quality standards.</p>
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
      <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border border-slate-100 overflow-hidden">
        <div className="flex items-center p-6">
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden mr-6 flex-shrink-0">
            <Image
              src={category.image || '/placeholder-category.jpg'}
              alt={category.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-slate-900 group-hover:text-violet-600 transition-colors duration-300 mb-2">
              {category.name}
            </h3>
            <p className="text-slate-600 mb-4">{category.description}</p>
            
            <Link href={`/products?category=${category.name}`}>
              <Button 
                variant="outline" 
                className="border-2 border-violet-200 text-violet-600 hover:bg-violet-50 rounded-2xl"
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
      className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-500 transform hover:-translate-y-2 border border-slate-100 overflow-hidden"
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
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-violet-600 transition-colors duration-300 mb-2">
          {category.name}
        </h3>
        <p className="text-slate-600 mb-6 line-clamp-2">{category.description}</p>
        
        <Link href={`/products?category=${category.name}`} className="block">
          <Button className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white rounded-2xl font-semibold py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            Explore Category
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
