'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { ProductGrid } from '@/components/product/ProductGrid';
import { sampleProducts, sampleCategories } from '@/lib/sampleData';
import { Product, Category } from '@/lib/types';
import { ArrowRight, Star, Shield, Truck, RefreshCw, TrendingUp, Zap } from 'lucide-react';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadData = async () => {
      setLoading(true);
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFeaturedProducts(sampleProducts.filter(p => p.featured));
      setCategories(sampleCategories);
      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFDF2]">
      {/* Hero Section */}
      <section className="bg-[#FFFDF2] text-[#000000] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-[#000000] mb-6 leading-tight">
              Welcome to Ziyo
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-[#AAAAAA] max-w-3xl mx-auto leading-relaxed">
              Discover extraordinary products curated for the modern lifestyle.
              <span className="block mt-2 text-[#000000]">Premium quality meets unbeatable value.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/products">
                <Button size="lg" className="bg-[#000000] hover:bg-[#333333] text-[#FFFDF2] border-0 shadow-2xl transform hover:scale-105 transition-all duration-300 px-8 py-4">
                  Explore Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/categories">
                <Button size="lg" variant="outline" className="border-[#AAAAAA] text-[#000000] hover:bg-[#000000] hover:text-[#FFFDF2] backdrop-blur-sm px-8 py-4 transform hover:scale-105 transition-all duration-300">
                  Browse Categories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 bg-[#FFFDF2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#000000] mb-4">Why Choose Ziyo?</h2>
            <p className="text-xl text-[#AAAAAA] max-w-2xl mx-auto">Experience the difference with our premium service standards</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-[#AAAAAA]/20">
              <div className="mx-auto w-20 h-20 bg-[#000000] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Truck className="h-10 w-10 text-[#FFFDF2]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#000000]">Lightning Fast Delivery</h3>
              <p className="text-[#AAAAAA] leading-relaxed">Free express shipping on orders over $50. Get your products delivered within 24-48 hours.</p>
            </div>
            <div className="group text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-[#AAAAAA]/20">
              <div className="mx-auto w-20 h-20 bg-[#000000] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Shield className="h-10 w-10 text-[#FFFDF2]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#000000]">Bank-Level Security</h3>
              <p className="text-[#AAAAAA] leading-relaxed">Your payment information is protected with industry-leading encryption and security protocols.</p>
            </div>
            <div className="group text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-[#AAAAAA]/20">
              <div className="mx-auto w-20 h-20 bg-[#000000] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <RefreshCw className="h-10 w-10 text-[#FFFDF2]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#000000]">Hassle-Free Returns</h3>
              <p className="text-[#AAAAAA] leading-relaxed">30-day money-back guarantee. Return any item, no questions asked, for a full refund.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-[#AAAAAA]/20 rounded-full text-[#000000] text-sm font-medium mb-4">
              <TrendingUp className="h-4 w-4 mr-2" />
              Trending Categories
            </div>
            <h2 className="text-4xl font-bold text-[#000000] mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-[#AAAAAA] max-w-2xl mx-auto">
              Discover our carefully curated collections designed for every lifestyle
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link key={category.id} href={`/products?category=${category.name}`}>
                <div className="group cursor-pointer">
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                    <Image
                      src={category.image || '/placeholder-category.jpg'}
                      alt={category.name}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-6 left-6 right-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                      <h3 className="text-lg font-bold mb-1">{category.name}</h3>
                      <p className="text-sm text-gray-200">{category.description}</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-xl font-bold text-[#000000] group-hover:text-[#000000] transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-[#AAAAAA] mt-2">{category.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Featured Products Section */}
      <section className="py-20 bg-[#FFFDF2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-6">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-[#AAAAAA]/20 rounded-full text-[#000000] text-sm font-medium mb-4">
                <Zap className="h-4 w-4 mr-2" />
                Editor&apos;s Choice
              </div>
              <h2 className="text-4xl font-bold text-[#000000] mb-4">
                Featured Products
              </h2>
              <p className="text-xl text-[#AAAAAA] max-w-2xl">
                Hand-picked premium products that define quality and style
              </p>
            </div>
            <Link href="/products">
              <Button variant="outline" className="border-2 border-[#AAAAAA] text-[#000000] hover:bg-[#000000] hover:text-[#FFFDF2] px-6 py-3 font-semibold">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          <ProductGrid 
            products={featuredProducts} 
            loading={loading}
            emptyMessage="No featured products available"
          />
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-20 bg-[#000000] overflow-hidden">
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#FFFDF2] rounded-full mb-8 shadow-2xl">
            <Star className="h-10 w-10 text-[#000000]" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#FFFDF2] leading-tight">
            Join the Ziyo Experience
          </h2>
          
          <p className="text-xl mb-8 text-[#AAAAAA] max-w-2xl mx-auto leading-relaxed">
            Become part of our exclusive community and enjoy premium benefits, early access to new collections, and special member-only discounts.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-[#FFFDF2] text-[#000000] hover:bg-[#AAAAAA] hover:text-[#000000] font-bold px-8 py-4 shadow-2xl transform hover:scale-105 transition-all duration-300">
                Start Shopping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" variant="outline" className="border-[#AAAAAA] text-[#FFFDF2] hover:bg-[#FFFDF2] hover:text-[#000000] backdrop-blur-sm px-8 py-4 transform hover:scale-105 transition-all duration-300">
                Browse Products
              </Button>
            </Link>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-[#AAAAAA]/20">
            <p className="text-[#AAAAAA] text-sm mb-4">Trusted by over 50,000+ customers worldwide</p>
            <div className="flex items-center justify-center space-x-8 text-[#AAAAAA]">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-[#FFFDF2] mr-1" />
                <span className="font-semibold">4.9/5</span>
              </div>
              <div className="text-sm">50K+ Reviews</div>
              <div className="text-sm">24/7 Support</div>
              <div className="text-sm">SSL Secured</div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-[#AAAAAA]/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#AAAAAA]/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </section>
    </div>
  );
}
