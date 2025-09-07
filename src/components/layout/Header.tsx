'use client';

import Link from 'next/link';
import Image from 'next/image';
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
    <header className="bg-[#FFFDF2]/90 backdrop-blur-xl border-b border-[#AAAAAA]/20 sticky top-0 z-50 shadow-lg shadow-[#000000]/5">
      {/* Top Bar */}
      <div className="border-b border-[#AAAAAA]/20 bg-[#FFFDF2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-10 text-xs">
            <div className="flex items-center space-x-6 text-[#AAAAAA]">
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-[#000000] rounded-full animate-pulse"></span>
                <span>Free shipping on orders over $50</span>
              </span>
              <span className="hidden sm:block">✨ New arrivals weekly</span>
            </div>
            <div className="flex items-center space-x-4 text-[#AAAAAA]">
              <span className="hidden md:block">📞 Support: (555) 123-4567</span>
              <div className="flex space-x-2">
                <span className="hover:text-[#000000] cursor-pointer transition-colors">🌍</span>
                <span className="hover:text-[#000000] cursor-pointer transition-colors">💬</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="group flex items-center space-x-3">
              <div className="relative">
                <Image
                  src="/logo-transparent.png"
                  alt="Ziyo Logo"
                  width={120}
                  height={60}
                  className="h-12 w-auto transition-all duration-300 group-hover:scale-105"
                />
              </div>
            </Link>
          </div>

          {/* Modern Navigation */}
          <nav className="hidden lg:flex items-center bg-white/50 rounded-2xl p-1 backdrop-blur-sm border border-[#AAAAAA]/20">
            <Link href="/" className="relative px-6 py-3 text-[#AAAAAA] hover:text-[#000000] font-semibold text-sm transition-all duration-300 group rounded-xl">
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 bg-white rounded-xl shadow-lg scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
            </Link>
            <Link href="/products" className="relative px-6 py-3 text-[#AAAAAA] hover:text-[#000000] font-semibold text-sm transition-all duration-300 group rounded-xl">
              <span className="relative z-10">Products</span>
              <div className="absolute inset-0 bg-white rounded-xl shadow-lg scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
            </Link>
            <Link href="/categories" className="relative px-6 py-3 text-[#AAAAAA] hover:text-[#000000] font-semibold text-sm transition-all duration-300 group rounded-xl">
              <span className="relative z-10">Categories</span>
              <div className="absolute inset-0 bg-white rounded-xl shadow-lg scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
            </Link>
            <Link href="/about" className="relative px-6 py-3 text-[#AAAAAA] hover:text-[#000000] font-semibold text-sm transition-all duration-300 group rounded-xl">
              <span className="relative z-10">About</span>
              <div className="absolute inset-0 bg-white rounded-xl shadow-lg scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
            </Link>
          </nav>

          {/* Enhanced Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="w-full relative group">
              <div className="absolute inset-0 bg-[#AAAAAA]/10 rounded-2xl blur-lg group-focus-within:blur-xl transition-all duration-300"></div>
              <SearchBar className="relative w-full bg-white/80 backdrop-blur-sm border-2 border-[#AAAAAA]/20 focus:border-[#000000] focus:ring-4 focus:ring-[#AAAAAA]/20 rounded-2xl h-12 text-sm font-medium placeholder:text-[#AAAAAA] shadow-lg shadow-[#000000]/5" />
            </div>
          </div>

          {/* Modern Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Elegant Wishlist */}
            <Link href="/wishlist" className="relative group">
              <div className="p-3 text-[#AAAAAA] hover:text-[#000000] rounded-2xl hover:bg-[#AAAAAA]/10 transition-all duration-300 transform hover:scale-110">
                <Heart className="h-6 w-6 transition-all duration-300 group-hover:fill-current" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-[#000000] text-[#FFFDF2] text-xs flex items-center justify-center font-bold shadow-lg animate-pulse">
                    {wishlistCount}
                  </span>
                )}
              </div>
            </Link>

            {/* Elegant Cart */}
            <Link href="/cart" className="relative group">
              <div className="p-3 text-[#AAAAAA] hover:text-[#000000] rounded-2xl hover:bg-[#AAAAAA]/10 transition-all duration-300 transform hover:scale-110">
                <ShoppingCart className="h-6 w-6 transition-all duration-300 group-hover:rotate-12" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-[#000000] text-[#FFFDF2] text-xs flex items-center justify-center font-bold shadow-lg animate-bounce">
                    {itemCount}
                  </span>
                )}
              </div>
            </Link>

            {/* Sophisticated User Menu */}
            {loading ? (
              <div className="w-12 h-12 rounded-2xl bg-[#AAAAAA]/20 animate-pulse shadow-lg"></div>
            ) : user ? (
              <div className="relative group">
                <button className="flex items-center space-x-3 p-2 text-[#AAAAAA] hover:text-[#000000] rounded-2xl hover:bg-[#AAAAAA]/10 transition-all duration-300 transform hover:scale-105">
                  <div className="w-12 h-12 bg-[#000000] rounded-2xl flex items-center justify-center shadow-xl">
                    <User className="h-6 w-6 text-[#FFFDF2]" />
                  </div>
                  <div className="hidden xl:block text-left">
                    <p className="text-sm font-bold text-[#000000]">{user.displayName || 'User'}</p>
                    <p className="text-xs text-[#AAAAAA]">Premium Member</p>
                  </div>
                </button>
                <div className="absolute right-0 mt-4 w-72 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#AAAAAA]/20 py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <div className="px-6 py-4 border-b border-[#AAAAAA]/20">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-[#000000] rounded-2xl flex items-center justify-center shadow-lg">
                        <User className="h-7 w-7 text-[#FFFDF2]" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-[#000000]">{user.displayName || 'User'}</p>
                        <p className="text-sm text-[#AAAAAA] truncate max-w-32">{user.email}</p>
                        <span className="inline-block mt-1 px-2 py-1 bg-[#AAAAAA]/20 text-[#000000] text-xs font-semibold rounded-lg">Premium</span>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <Link href="/profile" className="flex items-center px-6 py-3 text-[#AAAAAA] hover:bg-[#AAAAAA]/10 hover:text-[#000000] transition-all duration-200 group/item">
                      <User className="h-5 w-5 mr-4 group-hover/item:scale-110 transition-transform duration-200" />
                      <span className="font-medium">My Profile</span>
                    </Link>
                    <Link href="/orders" className="flex items-center px-6 py-3 text-[#AAAAAA] hover:bg-[#AAAAAA]/10 hover:text-[#000000] transition-all duration-200 group/item">
                      <ShoppingCart className="h-5 w-5 mr-4 group-hover/item:scale-110 transition-transform duration-200" />
                      <span className="font-medium">My Orders</span>
                    </Link>
                    {isAdmin(user) && (
                      <Link href="/admin" className="flex items-center px-6 py-3 text-[#AAAAAA] hover:bg-[#AAAAAA]/10 hover:text-[#000000] transition-all duration-200 border-t border-[#AAAAAA]/20 mt-2 group/item">
                        <span className="w-5 h-5 mr-4 text-xl group-hover/item:scale-110 transition-transform duration-200">⚙️</span>
                        <span className="font-medium">Admin Panel</span>
                      </Link>
                    )}
                  </div>
                  <div className="border-t border-[#AAAAAA]/20 mt-2 pt-2">
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
                  <Button variant="ghost" size="sm" className="text-[#AAAAAA] hover:text-[#000000] hover:bg-[#AAAAAA]/10 rounded-2xl font-semibold px-6 py-3 transition-all duration-300 transform hover:scale-105">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-[#000000] hover:bg-[#333333] text-[#FFFDF2] rounded-2xl font-semibold px-6 py-3 shadow-2xl shadow-[#000000]/25 hover:shadow-[#000000]/40 transform hover:scale-105 transition-all duration-300">
                    Join Now
                  </Button>
                </Link>
              </div>
            )}

            {/* Modern Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 text-[#AAAAAA] hover:text-[#000000] rounded-2xl hover:bg-[#AAAAAA]/10 transition-all duration-300 transform hover:scale-110"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Modern Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-[#AAAAAA]/20 bg-[#FFFDF2]">
            <div className="space-y-3">
              {/* Mobile Search */}
              <div className="px-3 pb-4">
                <div className="relative group">
                  <div className="absolute inset-0 bg-[#AAAAAA]/10 rounded-2xl blur-lg group-focus-within:blur-xl transition-all duration-300"></div>
                  <SearchBar className="relative w-full bg-white/80 backdrop-blur-sm border-2 border-[#AAAAAA]/20 focus:border-[#000000] focus:ring-4 focus:ring-[#AAAAAA]/20 rounded-2xl h-12 text-sm font-medium placeholder:text-[#AAAAAA] shadow-lg shadow-[#000000]/5" />
                </div>
              </div>
              
              {/* Mobile Navigation Links */}
              <div className="space-y-2 px-3">
                <Link href="/" className="flex items-center px-4 py-4 text-[#AAAAAA] hover:text-[#000000] hover:bg-[#AAAAAA]/10 rounded-2xl font-semibold transition-all duration-300 group">
                  <span className="w-2 h-2 bg-[#000000] rounded-full mr-4 group-hover:scale-150 transition-transform duration-300"></span>
                  Home
                </Link>
                <Link href="/products" className="flex items-center px-4 py-4 text-[#AAAAAA] hover:text-[#000000] hover:bg-[#AAAAAA]/10 rounded-2xl font-semibold transition-all duration-300 group">
                  <span className="w-2 h-2 bg-[#000000] rounded-full mr-4 group-hover:scale-150 transition-transform duration-300"></span>
                  Products
                </Link>
                <Link href="/categories" className="flex items-center px-4 py-4 text-[#AAAAAA] hover:text-[#000000] hover:bg-[#AAAAAA]/10 rounded-2xl font-semibold transition-all duration-300 group">
                  <span className="w-2 h-2 bg-[#000000] rounded-full mr-4 group-hover:scale-150 transition-transform duration-300"></span>
                  Categories
                </Link>
                <Link href="/about" className="flex items-center px-4 py-4 text-[#AAAAAA] hover:text-[#000000] hover:bg-[#AAAAAA]/10 rounded-2xl font-semibold transition-all duration-300 group">
                  <span className="w-2 h-2 bg-[#000000] rounded-full mr-4 group-hover:scale-150 transition-transform duration-300"></span>
                  About
                </Link>
              </div>

              {/* Mobile Action Buttons */}
              {!user && (
                <div className="flex flex-col space-y-3 px-3 pt-4 border-t border-[#AAAAAA]/20">
                  <Link href="/login">
                    <Button variant="ghost" className="w-full text-[#AAAAAA] hover:text-[#000000] hover:bg-[#AAAAAA]/10 rounded-2xl font-semibold py-4 transition-all duration-300">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="w-full bg-[#000000] hover:bg-[#333333] text-[#FFFDF2] rounded-2xl font-semibold py-4 shadow-2xl shadow-[#000000]/25 transition-all duration-300">
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