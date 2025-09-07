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
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-4">
              <Sparkles className="w-4 h-4" style={{ color: '#AAAAAA' }} />
              <span className="text-white text-sm font-medium">Product Catalog</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Discover Amazing Products
            </h1>
            
            <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8" style={{ color: '#AAAAAA' }}>
              Explore our curated collection of premium products designed to enhance your lifestyle
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative group">
                <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-2">
                  <div className="flex items-center">
                    <Search className="w-5 h-5 ml-4" style={{ color: '#AAAAAA' }} />
                    <input
                      type="text"
                      placeholder="Search for products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1 bg-transparent text-white placeholder-gray-400 border-0 outline-none px-4 py-2 text-base"
                    />
                    <Button
                      size="lg"
                      className="bg-black hover:bg-gray-800 text-white border border-white/20"
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
      <section className="py-8 bg-white border-b" style={{ borderColor: '#AAAAAA' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-4">
              <Button
                variant={showFilters ? "primary" : "outline"}
                onClick={() => setShowFilters(!showFilters)}
                className={`${showFilters
                  ? 'bg-black text-white border-0'
                  : 'border-gray-300 text-black hover:bg-gray-50'
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
                    ? 'bg-white shadow-sm text-black'
                    : 'text-gray-600 hover:text-black'
                  }
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list'
                    ? 'bg-white shadow-sm text-black'
                    : 'text-gray-600 hover:text-black'
                  }
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Results and Sort */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2" style={{ color: '#AAAAAA' }}>
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {filteredProducts.length} products found
                </span>
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
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
              <div className="absolute inset-0 bg-black rounded-2xl blur opacity-10"></div>
              <div className="relative bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-black mb-8 flex items-center">
                  <SlidersHorizontal className="w-6 h-6 mr-3" style={{ color: '#AAAAAA' }} />
                  Advanced Filters
                  <div className="ml-auto flex items-center space-x-2">
                    <button
                      onClick={() => setShowFilters(false)}
                      className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                      <X className="w-5 h-5" style={{ color: '#AAAAAA' }} />
                    </button>
                  </div>
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Enhanced Category Filter */}
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-black mb-4">
                      Categories
                    </label>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      <button
                        onClick={() => setSelectedCategory('')}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                          selectedCategory === ''
                            ? 'bg-black text-white shadow-lg'
                            : 'bg-gray-50 text-black hover:bg-gray-100'
                        }`}
                      >
                        All Categories
                      </button>
                      {categories.map(category => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.name)}
                          className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                            selectedCategory === category.name
                              ? 'bg-black text-white shadow-lg'
                              : 'bg-gray-50 text-black hover:bg-gray-100'
                          }`}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Price Range */}
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-black mb-4">
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
                            className="w-full pl-8 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-300"
                          />
                        </div>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
                          <input
                            type="number"
                            placeholder="Max"
                            value={priceRange.max}
                            onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                            className="w-full pl-8 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-300"
                          />
                        </div>
                      </div>
                      
                      {/* Quick Price Filters */}
                      <div className="flex flex-wrap gap-2">
                        {[
                          { label: 'Under LKR 8,250', min: '', max: '8250' },
                          { label: 'LKR 8,250-16,500', min: '8250', max: '16500' },
                          { label: 'LKR 16,500-33,000', min: '16500', max: '33000' },
                          { label: 'Over LKR 33,000', min: '33000', max: '' }
                        ].map((range) => (
                          <button
                            key={range.label}
                            onClick={() => setPriceRange({ min: range.min, max: range.max })}
                            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 hover:text-black text-gray-600 rounded-lg transition-all duration-300"
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
                      <label className="block text-sm font-semibold text-black mb-4">
                        Sort By
                      </label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-300"
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
                        className="w-full border-2 border-gray-200 text-black hover:bg-gray-50 rounded-xl py-3"
                      >
                        Clear All Filters
                      </Button>
                      
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="text-sm mb-2" style={{ color: '#AAAAAA' }}>Active Filters:</div>
                        <div className="flex flex-wrap gap-2">
                          {selectedCategory && (
                            <span className="px-3 py-1 bg-gray-200 text-black text-xs rounded-full">
                              Category: {selectedCategory}
                            </span>
                          )}
                          {(priceRange.min || priceRange.max) && (
                            <span className="px-3 py-1 bg-gray-200 text-black text-xs rounded-full">
                              Price: LKR {priceRange.min || '0'} - LKR {priceRange.max || '∞'}
                            </span>
                          )}
                          {searchTerm && (
                            <span className="px-3 py-1 bg-gray-200 text-black text-xs rounded-full">
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
          className="w-14 h-14 rounded-full bg-black hover:bg-gray-800 text-white border-0 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300"
        >
          {showFilters ? <X className="w-6 h-6" /> : <Filter className="w-6 h-6" />}
        </Button>
      </div>

      {/* Enhanced Back to Top Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white border border-gray-200 hover:text-black shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 opacity-0 translate-y-4 animate-fade-in"
          style={{ animationDelay: '2s', animationFillMode: 'forwards', color: '#AAAAAA' }}
        >
          <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
          </svg>
        </button>
      </div>
    </div>
  );
}