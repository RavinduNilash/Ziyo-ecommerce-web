'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { logOut } from '@/lib/auth';
import { Button } from '@/components/ui/Button';
import { SearchBar } from '@/components/ui/SearchBar';
import { ShoppingCart, User, Menu, X, Heart } from 'lucide-react';

export const Header = () => {
  const { user, loading } = useAuth();
  const { itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Simple admin check - in production this should be more robust
  const isAdmin = (user: { email?: string | null } | null) => {
    const adminEmails = ['admin@ziyo.com', 'ravindunilash@gmail.com'];
    return user && user.email && adminEmails.includes(user.email);
  };

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-white/90 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-50 shadow-lg shadow-slate-900/5">
      {/* Top Bar */}
      <div className="border-b border-slate-100/50 bg-gradient-to-r from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-10 text-xs">
            <div className="flex items-center space-x-6 text-slate-600">
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>Free shipping on orders over $50</span>
              </span>
              <span className="hidden sm:block">✨ New arrivals weekly</span>
            </div>
            <div className="flex items-center space-x-4 text-slate-600">
              <span className="hidden md:block">📞 Support: (555) 123-4567</span>
              <div className="flex space-x-2">
                <span className="hover:text-purple-600 cursor-pointer transition-colors">🌍</span>
                <span className="hover:text-purple-600 cursor-pointer transition-colors">💬</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Redesigned Logo */}
          <div className="flex items-center">
            <Link href="/" className="group flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-purple-500/25 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3">
                  <span className="text-white font-black text-xl tracking-tighter">Z</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black bg-gradient-to-r from-slate-800 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent tracking-tight">
                  ZIYO
                </span>
                <span className="text-xs text-slate-500 font-medium tracking-wider -mt-1">PREMIUM STORE</span>
              </div>
            </Link>
          </div>

          {/* Modern Navigation */}
          <nav className="hidden lg:flex items-center bg-slate-50/50 rounded-2xl p-1 backdrop-blur-sm border border-slate-200/50">
            <Link href="/" className="relative px-6 py-3 text-slate-700 hover:text-violet-600 font-semibold text-sm transition-all duration-300 group rounded-xl">
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 bg-white rounded-xl shadow-lg scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
            </Link>
            <Link href="/products" className="relative px-6 py-3 text-slate-700 hover:text-violet-600 font-semibold text-sm transition-all duration-300 group rounded-xl">
              <span className="relative z-10">Products</span>
              <div className="absolute inset-0 bg-white rounded-xl shadow-lg scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
            </Link>
            <Link href="/categories" className="relative px-6 py-3 text-slate-700 hover:text-violet-600 font-semibold text-sm transition-all duration-300 group rounded-xl">
              <span className="relative z-10">Categories</span>
              <div className="absolute inset-0 bg-white rounded-xl shadow-lg scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
            </Link>
            <Link href="/about" className="relative px-6 py-3 text-slate-700 hover:text-violet-600 font-semibold text-sm transition-all duration-300 group rounded-xl">
              <span className="relative z-10">About</span>
              <div className="absolute inset-0 bg-white rounded-xl shadow-lg scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
            </Link>
          </nav>

          {/* Enhanced Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="w-full relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 rounded-2xl blur-lg group-focus-within:blur-xl transition-all duration-300"></div>
              <SearchBar className="relative w-full bg-white/80 backdrop-blur-sm border-2 border-slate-200/50 focus:border-violet-300 focus:ring-4 focus:ring-violet-100 rounded-2xl h-12 text-sm font-medium placeholder:text-slate-400 shadow-lg shadow-slate-900/5" />
            </div>
          </div>

          {/* Modern Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Elegant Wishlist */}
            <Link href="/wishlist" className="relative group">
              <div className="p-3 text-slate-600 hover:text-fuchsia-600 rounded-2xl hover:bg-fuchsia-50 transition-all duration-300 transform hover:scale-110">
                <Heart className="h-6 w-6 transition-all duration-300 group-hover:fill-current" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white text-xs flex items-center justify-center font-bold shadow-lg animate-pulse">
                    {wishlistCount}
                  </span>
                )}
              </div>
            </Link>

            {/* Elegant Cart */}
            <Link href="/cart" className="relative group">
              <div className="p-3 text-slate-600 hover:text-violet-600 rounded-2xl hover:bg-violet-50 transition-all duration-300 transform hover:scale-110">
                <ShoppingCart className="h-6 w-6 transition-all duration-300 group-hover:rotate-12" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs flex items-center justify-center font-bold shadow-lg animate-bounce">
                    {itemCount}
                  </span>
                )}
              </div>
            </Link>

            {/* Sophisticated User Menu */}
            {loading ? (
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 animate-pulse shadow-lg"></div>
            ) : user ? (
              <div className="relative group">
                <button className="flex items-center space-x-3 p-2 text-slate-600 hover:text-violet-600 rounded-2xl hover:bg-gradient-to-r hover:from-violet-50 hover:to-fuchsia-50 transition-all duration-300 transform hover:scale-105">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-500 via-purple-600 to-fuchsia-500 rounded-2xl flex items-center justify-center shadow-xl">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div className="hidden xl:block text-left">
                    <p className="text-sm font-bold text-slate-800">{user.displayName || 'User'}</p>
                    <p className="text-xs text-slate-500">Premium Member</p>
                  </div>
                </button>
                <div className="absolute right-0 mt-4 w-72 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/50 py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <div className="px-6 py-4 border-b border-slate-100">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <User className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-slate-900">{user.displayName || 'User'}</p>
                        <p className="text-sm text-slate-500 truncate max-w-32">{user.email}</p>
                        <span className="inline-block mt-1 px-2 py-1 bg-gradient-to-r from-violet-100 to-fuchsia-100 text-violet-700 text-xs font-semibold rounded-lg">Premium</span>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <Link href="/profile" className="flex items-center px-6 py-3 text-slate-700 hover:bg-violet-50 hover:text-violet-600 transition-all duration-200 group/item">
                      <User className="h-5 w-5 mr-4 group-hover/item:scale-110 transition-transform duration-200" />
                      <span className="font-medium">My Profile</span>
                    </Link>
                    <Link href="/orders" className="flex items-center px-6 py-3 text-slate-700 hover:bg-violet-50 hover:text-violet-600 transition-all duration-200 group/item">
                      <ShoppingCart className="h-5 w-5 mr-4 group-hover/item:scale-110 transition-transform duration-200" />
                      <span className="font-medium">My Orders</span>
                    </Link>
                    {isAdmin(user) && (
                      <Link href="/admin" className="flex items-center px-6 py-3 text-slate-700 hover:bg-amber-50 hover:text-amber-600 transition-all duration-200 border-t border-slate-100 mt-2 group/item">
                        <span className="w-5 h-5 mr-4 text-xl group-hover/item:scale-110 transition-transform duration-200">⚙️</span>
                        <span className="font-medium">Admin Panel</span>
                      </Link>
                    )}
                  </div>
                  <div className="border-t border-slate-100 mt-2 pt-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-6 py-3 text-red-600 hover:bg-red-50 transition-all duration-200 group/item"
                    >
                      <span className="w-5 h-5 mr-4 text-lg group-hover/item:scale-110 transition-transform duration-200">🚪</span>
                      <span className="font-medium">Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-slate-600 hover:text-violet-600 hover:bg-violet-50 rounded-2xl font-semibold px-6 py-3 transition-all duration-300 transform hover:scale-105">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-700 hover:via-purple-700 hover:to-fuchsia-700 text-white rounded-2xl font-semibold px-6 py-3 shadow-2xl shadow-violet-500/25 hover:shadow-violet-500/40 transform hover:scale-105 transition-all duration-300">
                    Join Now
                  </Button>
                </Link>
              </div>
            )}

            {/* Modern Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 text-slate-600 hover:text-violet-600 rounded-2xl hover:bg-violet-50 transition-all duration-300 transform hover:scale-110"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Modern Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-slate-200/50 bg-gradient-to-b from-white to-slate-50/50">
            <div className="space-y-3">
              {/* Mobile Search */}
              <div className="px-3 pb-4">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 rounded-2xl blur-lg group-focus-within:blur-xl transition-all duration-300"></div>
                  <SearchBar className="relative w-full bg-white/80 backdrop-blur-sm border-2 border-slate-200/50 focus:border-violet-300 focus:ring-4 focus:ring-violet-100 rounded-2xl h-12 text-sm font-medium placeholder:text-slate-400 shadow-lg shadow-slate-900/5" />
                </div>
              </div>
              
              {/* Mobile Navigation Links */}
              <div className="space-y-2 px-3">
                <Link href="/" className="flex items-center px-4 py-4 text-slate-700 hover:text-violet-600 hover:bg-gradient-to-r hover:from-violet-50 hover:to-fuchsia-50 rounded-2xl font-semibold transition-all duration-300 group">
                  <span className="w-2 h-2 bg-violet-500 rounded-full mr-4 group-hover:scale-150 transition-transform duration-300"></span>
                  Home
                </Link>
                <Link href="/products" className="flex items-center px-4 py-4 text-slate-700 hover:text-violet-600 hover:bg-gradient-to-r hover:from-violet-50 hover:to-fuchsia-50 rounded-2xl font-semibold transition-all duration-300 group">
                  <span className="w-2 h-2 bg-violet-500 rounded-full mr-4 group-hover:scale-150 transition-transform duration-300"></span>
                  Products
                </Link>
                <Link href="/categories" className="flex items-center px-4 py-4 text-slate-700 hover:text-violet-600 hover:bg-gradient-to-r hover:from-violet-50 hover:to-fuchsia-50 rounded-2xl font-semibold transition-all duration-300 group">
                  <span className="w-2 h-2 bg-violet-500 rounded-full mr-4 group-hover:scale-150 transition-transform duration-300"></span>
                  Categories
                </Link>
                <Link href="/about" className="flex items-center px-4 py-4 text-slate-700 hover:text-violet-600 hover:bg-gradient-to-r hover:from-violet-50 hover:to-fuchsia-50 rounded-2xl font-semibold transition-all duration-300 group">
                  <span className="w-2 h-2 bg-violet-500 rounded-full mr-4 group-hover:scale-150 transition-transform duration-300"></span>
                  About
                </Link>
              </div>

              {/* Mobile Action Buttons */}
              {!user && (
                <div className="flex flex-col space-y-3 px-3 pt-4 border-t border-slate-200/50">
                  <Link href="/login">
                    <Button variant="ghost" className="w-full text-slate-600 hover:text-violet-600 hover:bg-violet-50 rounded-2xl font-semibold py-4 transition-all duration-300">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="w-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-700 hover:via-purple-700 hover:to-fuchsia-700 text-white rounded-2xl font-semibold py-4 shadow-2xl shadow-violet-500/25 transition-all duration-300">
                      Join Now
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};