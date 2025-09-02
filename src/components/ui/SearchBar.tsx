'use client';

import { useState, useRef, useEffect } from 'react';
import { useSearch } from '@/context/SearchContext';
import { Search, Clock, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  className?: string;
}

export const SearchBar = ({ className = '' }: SearchBarProps) => {
  const router = useRouter();
  const { 
    searchTerm, 
    setSearchTerm, 
    filteredProducts, 
    isSearching, 
    searchHistory, 
    addToSearchHistory,
    clearSearchHistory 
  } = useSearch();
  
  const [isOpen, setIsOpen] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (value: string) => {
    setLocalSearchTerm(value);
    setSearchTerm(value);
    setIsOpen(value.length > 0 || searchHistory.length > 0);
  };

  const handleSearch = (term: string) => {
    if (term.trim()) {
      addToSearchHistory(term.trim());
      setIsOpen(false);
      router.push(`/products?search=${encodeURIComponent(term.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(localSearchTerm);
    }
    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleFocus = () => {
    setIsOpen(localSearchTerm.length > 0 || searchHistory.length > 0);
  };

  const clearSearch = () => {
    setLocalSearchTerm('');
    setSearchTerm('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search products..."
          value={localSearchTerm}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        {localSearchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {/* Search Results */}
          {searchTerm && (
            <div className="p-4">
              {isSearching ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="ml-2 text-gray-600">Searching...</span>
                </div>
              ) : filteredProducts.length > 0 ? (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-900">
                      Products ({filteredProducts.length})
                    </h3>
                    <Link
                      href={`/products?search=${encodeURIComponent(searchTerm)}`}
                      className="text-sm text-blue-600 hover:text-blue-800"
                      onClick={() => {
                        addToSearchHistory(searchTerm);
                        setIsOpen(false);
                      }}
                    >
                      View all
                    </Link>
                  </div>
                  <div className="space-y-2">
                    {filteredProducts.slice(0, 5).map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors"
                        onClick={() => {
                          addToSearchHistory(searchTerm);
                          setIsOpen(false);
                        }}
                      >
                        <Image
                          src={product.images[0] || '/placeholder-product.jpg'}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="object-cover rounded-md mr-3"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            ${product.price.toFixed(2)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <Search className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-gray-600">No products found for &quot;{searchTerm}&quot;</p>
                  <Link
                    href="/products"
                    className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block"
                    onClick={() => setIsOpen(false)}
                  >
                    Browse all products
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Search History */}
          {!searchTerm && searchHistory.length > 0 && (
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">Recent searches</h3>
                <button
                  onClick={clearSearchHistory}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear all
                </button>
              </div>
              <div className="space-y-1">
                {searchHistory.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setLocalSearchTerm(term);
                      handleSearch(term);
                    }}
                    className="flex items-center w-full p-2 text-left hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <Clock className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-700">{term}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
