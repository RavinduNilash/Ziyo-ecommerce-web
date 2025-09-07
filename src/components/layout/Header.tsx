'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
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
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll detection for hiding status bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <>
      {/* Top Status Bar - Scrolls away */}
      <div className={`relative overflow-hidden bg-[#000000] transition-all duration-300 ${isScrolled ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-8 text-xs">
            <div className="flex items-center space-x-6 text-[#FFFDF2]/90">
              <span className="flex items-center space-x-2 group hover:text-[#FFFDF2] transition-all duration-300">
                <span className="w-2 h-2 bg-[#FFFDF2] rounded-full animate-pulse"></span>
                <span className="font-medium tracking-wide">Free shipping worldwide over $50</span>
              </span>
              <span className="hidden sm:flex items-center space-x-2 group hover:text-[#FFFDF2] transition-all duration-300">
                <span className="text-sm">✨</span>
                <span className="font-medium">New arrivals every week</span>
              </span>
            </div>
            <div className="flex items-center space-x-4 text-[#FFFDF2]/90">
              <span className="hidden md:flex items-center space-x-2 group hover:text-[#FFFDF2] transition-all duration-300 cursor-pointer">
                <span className="text-sm">📞</span>
                <span className="font-medium tracking-wide">24/7 Support: (555) 123-4567</span>
              </span>
              <div className="flex items-center space-x-2">
                <button className="p-1.5 hover:bg-[#FFFDF2]/10 rounded-lg transition-all duration-300 transform hover:scale-110 group">
                  <span className="text-sm group-hover:scale-110 transition-transform duration-300">🌍</span>
                </button>
                <button className="p-1.5 hover:bg-[#FFFDF2]/10 rounded-lg transition-all duration-300 transform hover:scale-110 group">
                  <span className="text-sm group-hover:scale-110 transition-transform duration-300">💬</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Sticky Navigation */}
      <header className="bg-[#FFFDF2]/95 backdrop-blur-xl border-b border-[#AAAAAA]/20 sticky top-0 z-50 shadow-lg shadow-[#000000]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Clean Logo Only */}
          <div className="flex items-center">
            <Link href="/" className="group">
              <div className="p-2">
                <Image 
                  src="/logo-transparent.png" 
                  alt="Ziyo Logo" 
                  width={200}
                  height={48}
                  className="object-contain transition-all duration-300 transform group-hover:scale-105"
                />
              </div>
            </Link>
          </div>

          {/* Clean Modern Navigation */}
          <nav className="hidden lg:flex items-center bg-[#FFFDF2]/60 backdrop-blur-xl rounded-full px-2 py-1.5 border border-[#AAAAAA]/30 shadow-lg shadow-[#000000]/5">
            <Link href="/" className="relative px-5 py-2.5 text-[#000000] hover:text-[#AAAAAA] font-medium text-sm transition-all duration-300 group rounded-full">
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 bg-[#000000]/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
            </Link>
            <Link href="/products" className="relative px-5 py-2.5 text-[#000000] hover:text-[#AAAAAA] font-medium text-sm transition-all duration-300 group rounded-full">
              <span className="relative z-10">Products</span>
              <div className="absolute inset-0 bg-[#000000]/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
            </Link>
            <Link href="/categories" className="relative px-5 py-2.5 text-[#000000] hover:text-[#AAAAAA] font-medium text-sm transition-all duration-300 group rounded-full">
              <span className="relative z-10">Categories</span>
              <div className="absolute inset-0 bg-[#000000]/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
            </Link>
            <Link href="/about" className="relative px-5 py-2.5 text-[#000000] hover:text-[#AAAAAA] font-medium text-sm transition-all duration-300 group rounded-full">
              <span className="relative z-10">About</span>
              <div className="absolute inset-0 bg-[#000000]/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
            </Link>
          </nav>

          {/* Modern Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <SearchBar className="w-full" />
          </div>

          {/* Minimalist Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Wishlist */}
            <Link href="/wishlist" className="relative group">
              <div className="p-3 text-[#AAAAAA] hover:text-[#000000] rounded-xl hover:bg-[#000000]/5 backdrop-blur-sm transition-all duration-300 transform hover:scale-110">
                <Heart className="h-5 w-5 transition-all duration-300 group-hover:fill-current" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#000000] text-[#FFFDF2] text-xs flex items-center justify-center font-bold shadow-lg animate-pulse">
                    {wishlistCount}
                  </span>
                )}
              </div>
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative group">
              <div className="p-3 text-[#AAAAAA] hover:text-[#000000] rounded-xl hover:bg-[#000000]/5 backdrop-blur-sm transition-all duration-300 transform hover:scale-110">
                <ShoppingCart className="h-5 w-5 transition-all duration-300 group-hover:rotate-12" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#000000] text-[#FFFDF2] text-xs flex items-center justify-center font-bold shadow-lg animate-bounce">
                    {itemCount}
                  </span>
                )}
              </div>
            </Link>

            {/* User Menu */}
            {loading ? (
              <div className="w-10 h-10 rounded-xl bg-[#AAAAAA]/20 animate-pulse shadow-lg"></div>
            ) : user ? (
              <div className="relative group">
                <button className="flex items-center space-x-3 p-2 text-[#AAAAAA] hover:text-[#000000] rounded-xl hover:bg-[#000000]/5 backdrop-blur-sm transition-all duration-300 transform hover:scale-105">
                  <div className="w-10 h-10 bg-[#000000] rounded-xl flex items-center justify-center shadow-lg">
                    <User className="h-5 w-5 text-[#FFFDF2]" />
                  </div>
                  <div className="hidden xl:block text-left">
                    <p className="text-sm font-semibold text-[#000000]">{user.displayName || 'User'}</p>
                    <p className="text-xs text-[#AAAAAA]">Luxury Member</p>
                  </div>
                </button>
                <div className="absolute right-0 mt-3 w-72 bg-[#FFFDF2]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#AAAAAA]/30 py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <div className="px-6 py-4 border-b border-[#AAAAAA]/20">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-[#000000] rounded-xl flex items-center justify-center shadow-lg">
                        <User className="h-6 w-6 text-[#FFFDF2]" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-[#000000]">{user.displayName || 'User'}</p>
                        <p className="text-sm text-[#AAAAAA] truncate max-w-32">{user.email}</p>
                        <span className="inline-block mt-1 px-3 py-1 bg-[#000000]/10 text-[#000000] text-xs font-semibold rounded-full">Luxury</span>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <Link href="/profile" className="flex items-center px-6 py-3 text-[#000000] hover:bg-[#000000]/5 hover:text-[#AAAAAA] transition-all duration-200 group/item">
                      <User className="h-5 w-5 mr-4 group-hover/item:scale-110 transition-transform duration-200" />
                      <span className="font-medium">My Profile</span>
                    </Link>
                    <Link href="/orders" className="flex items-center px-6 py-3 text-[#000000] hover:bg-[#000000]/5 hover:text-[#AAAAAA] transition-all duration-200 group/item">
                      <ShoppingCart className="h-5 w-5 mr-4 group-hover/item:scale-110 transition-transform duration-200" />
                      <span className="font-medium">My Orders</span>
                    </Link>
                    {isAdmin(user) && (
                      <Link href="/admin" className="flex items-center px-6 py-3 text-[#000000] hover:bg-[#AAAAAA]/10 hover:text-[#AAAAAA] transition-all duration-200 border-t border-[#AAAAAA]/20 mt-2 group/item">
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
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-[#AAAAAA] hover:text-[#000000] hover:bg-[#000000]/5 rounded-xl font-medium px-4 py-2 transition-all duration-300 transform hover:scale-105">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-[#000000] hover:bg-[#AAAAAA] text-[#FFFDF2] rounded-xl font-medium px-4 py-2 shadow-lg shadow-[#000000]/25 hover:shadow-[#000000]/40 transform hover:scale-105 transition-all duration-300">
                    Join Now
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 text-[#AAAAAA] hover:text-[#000000] rounded-xl hover:bg-[#000000]/5 transition-all duration-300 transform hover:scale-110"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Clean Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-[#AAAAAA]/20 bg-[#FFFDF2]/90">
            <div className="space-y-3">
              {/* Mobile Search */}
              <div className="px-4 pb-4">
                <SearchBar className="w-full" />
              </div>
              
              {/* Mobile Navigation Links */}
              <div className="space-y-1 px-4">
                <Link href="/" className="flex items-center px-4 py-3 text-[#000000] hover:text-[#AAAAAA] hover:bg-[#000000]/5 rounded-xl font-medium transition-all duration-300 group">
                  <span className="w-2 h-2 bg-[#000000] rounded-full mr-4 group-hover:scale-150 transition-transform duration-300"></span>
                  Home
                </Link>
                <Link href="/products" className="flex items-center px-4 py-3 text-[#000000] hover:text-[#AAAAAA] hover:bg-[#000000]/5 rounded-xl font-medium transition-all duration-300 group">
                  <span className="w-2 h-2 bg-[#000000] rounded-full mr-4 group-hover:scale-150 transition-transform duration-300"></span>
                  Products
                </Link>
                <Link href="/categories" className="flex items-center px-4 py-3 text-[#000000] hover:text-[#AAAAAA] hover:bg-[#000000]/5 rounded-xl font-medium transition-all duration-300 group">
                  <span className="w-2 h-2 bg-[#000000] rounded-full mr-4 group-hover:scale-150 transition-transform duration-300"></span>
                  Categories
                </Link>
                <Link href="/about" className="flex items-center px-4 py-3 text-[#000000] hover:text-[#AAAAAA] hover:bg-[#000000]/5 rounded-xl font-medium transition-all duration-300 group">
                  <span className="w-2 h-2 bg-[#000000] rounded-full mr-4 group-hover:scale-150 transition-transform duration-300"></span>
                  About
                </Link>
              </div>

              {/* Mobile Action Buttons */}
              {!user && (
                <div className="flex flex-col space-y-3 px-4 pt-4 border-t border-[#AAAAAA]/20">
                  <Link href="/login">
                    <Button variant="ghost" className="w-full text-[#AAAAAA] hover:text-[#000000] hover:bg-[#000000]/5 rounded-xl font-medium py-3 transition-all duration-300">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="w-full bg-[#000000] hover:bg-[#AAAAAA] text-[#FFFDF2] rounded-xl font-medium py-3 shadow-lg shadow-[#000000]/25 transition-all duration-300">
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
    </>
  );
};