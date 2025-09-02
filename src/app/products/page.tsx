'use client';

import { useState, useEffect } from 'react';
import { ProductGrid } from '@/components/product/ProductGrid';
import { sampleProducts, sampleCategories } from '@/lib/sampleData';
import { Product, Category } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Search, Filter, SlidersHorizontal, Sparkles, TrendingUp, Grid3X3, List, X } from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // Simulate API call
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProducts(sampleProducts);
      setCategories(sampleCategories);
      setLoading(false);
    };

    loadData();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesPrice = (!priceRange.min || product.price >= parseFloat(priceRange.min)) &&
                        (!priceRange.max || product.price <= parseFloat(priceRange.max));
    
    return matchesSearch && matchesCategory && matchesPrice;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange({ min: '', max: '' });
    setSortBy('name');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-fuchsia-900/20"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-fuchsia-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-violet-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-fuchsia-300" />
              <span className="text-white/90 text-sm font-medium">Product Catalog</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-purple-100 to-fuchsia-100 bg-clip-text text-transparent">
                Discover Amazing Products
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed mb-12">
              Explore our curated collection of premium products designed to enhance your lifestyle
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-purple-600 rounded-2xl blur opacity-30 group-focus-within:opacity-50 transition-opacity"></div>
                <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2">
                  <div className="flex items-center">
                    <Search className="w-6 h-6 text-white/70 ml-4" />
                    <input
                      type="text"
                      placeholder="Search for products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1 bg-transparent text-white placeholder-white/60 border-0 outline-none px-4 py-3 text-lg"
                    />
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white border-0 shadow-xl"
                    >
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Controls Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-4">
              <Button
                variant={showFilters ? "primary" : "outline"}
                onClick={() => setShowFilters(!showFilters)}
                className={`${showFilters 
                  ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white border-0' 
                  : 'border-violet-200 text-violet-600 hover:bg-violet-50'
                }`}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters
                {showFilters && <X className="ml-2 h-4 w-4" />}
              </Button>
              
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' 
                    ? 'bg-white shadow-sm text-violet-600' 
                    : 'text-gray-600 hover:text-violet-600'
                  }
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' 
                    ? 'bg-white shadow-sm text-violet-600' 
                    : 'text-gray-600 hover:text-violet-600'
                  }
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Results and Sort */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {filteredProducts.length} products found
                </span>
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {/* Enhanced Filters Panel */}
          {showFilters && (
            <div className="mt-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-3xl blur opacity-10"></div>
              <div className="relative bg-white/90 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                  <SlidersHorizontal className="w-6 h-6 mr-3 text-violet-600" />
                  Advanced Filters
                  <div className="ml-auto flex items-center space-x-2">
                    <button 
                      onClick={() => setShowFilters(false)}
                      className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Enhanced Category Filter */}
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-4">
                      Categories
                    </label>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      <button
                        onClick={() => setSelectedCategory('')}
                        className={`w-full text-left px-4 py-3 rounded-2xl transition-all duration-300 ${
                          selectedCategory === '' 
                            ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg' 
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        All Categories
                      </button>
                      {categories.map(category => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.name)}
                          className={`w-full text-left px-4 py-3 rounded-2xl transition-all duration-300 ${
                            selectedCategory === category.name
                              ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg' 
                              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Price Range */}
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-4">
                      Price Range
                    </label>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
                          <input
                            type="number"
                            placeholder="Min"
                            value={priceRange.min}
                            onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                            className="w-full pl-8 pr-4 py-3 bg-white border-2 border-gray-200 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-300"
                          />
                        </div>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
                          <input
                            type="number"
                            placeholder="Max"
                            value={priceRange.max}
                            onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                            className="w-full pl-8 pr-4 py-3 bg-white border-2 border-gray-200 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-300"
                          />
                        </div>
                      </div>
                      
                      {/* Quick Price Filters */}
                      <div className="flex flex-wrap gap-2">
                        {[
                          { label: 'Under $25', min: '', max: '25' },
                          { label: '$25-$50', min: '25', max: '50' },
                          { label: '$50-$100', min: '50', max: '100' },
                          { label: 'Over $100', min: '100', max: '' }
                        ].map((range) => (
                          <button
                            key={range.label}
                            onClick={() => setPriceRange({ min: range.min, max: range.max })}
                            className="px-4 py-2 text-sm bg-gray-100 hover:bg-violet-100 hover:text-violet-700 text-gray-600 rounded-xl transition-all duration-300"
                          >
                            {range.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Sort & Actions */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-4">
                        Sort By
                      </label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-300"
                      >
                        <option value="name">Name (A-Z)</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Best Rated</option>
                      </select>
                    </div>
                    
                    <div className="space-y-3">
                      <Button
                        onClick={clearFilters}
                        variant="outline"
                        className="w-full border-2 border-gray-200 text-gray-600 hover:bg-gray-50 rounded-2xl py-3"
                      >
                        Clear All Filters
                      </Button>
                      
                      <div className="bg-gradient-to-r from-violet-50 to-fuchsia-50 rounded-2xl p-4">
                        <div className="text-sm text-gray-600 mb-2">Active Filters:</div>
                        <div className="flex flex-wrap gap-2">
                          {selectedCategory && (
                            <span className="px-3 py-1 bg-violet-100 text-violet-700 text-xs rounded-full">
                              Category: {selectedCategory}
                            </span>
                          )}
                          {(priceRange.min || priceRange.max) && (
                            <span className="px-3 py-1 bg-violet-100 text-violet-700 text-xs rounded-full">
                              Price: ${priceRange.min || '0'} - ${priceRange.max || '∞'}
                            </span>
                          )}                      {searchTerm && (
                        <span className="px-3 py-1 bg-violet-100 text-violet-700 text-xs rounded-full">
                          Search: &ldquo;{searchTerm}&rdquo;
                        </span>
                      )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductGrid 
            products={filteredProducts}
            loading={loading}
            emptyMessage="No products match your search criteria"
          />
        </div>
      </section>

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 z-50 lg:hidden">
        <Button
          onClick={() => setShowFilters(!showFilters)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white border-0 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300"
        >
          {showFilters ? <X className="w-6 h-6" /> : <Filter className="w-6 h-6" />}
        </Button>
      </div>

      {/* Enhanced Back to Top Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white border border-gray-200 text-gray-600 hover:text-violet-600 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 opacity-0 translate-y-4 animate-fade-in"
          style={{ animationDelay: '2s', animationFillMode: 'forwards' }}
        >
          <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
          </svg>
        </button>
      </div>
    </div>
  );
}