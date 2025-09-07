'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { ProductGrid } from '@/components/product/ProductGrid';
import { sampleProducts, sampleCategories } from '@/lib/sampleData';
import { Product, Category } from '@/lib/types';
import { ArrowRight, Star, TrendingUp, Zap } from 'lucide-react';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Background images for slideshow
  const backgroundImages = [
    '/hero-background.jpg',
    '/hero2.jpg','/hero3.jpg'  ];

  // Auto-change background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 6000); // Change every 6 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

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
      {/* Modern Elegant Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Auto-Moving Background Images */}
        <div className="absolute inset-0">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url('${image}')`
              }}
            ></div>
          ))}
          {/* Black Overlay for dramatic effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#000000]/50 via-[#000000]/40 to-[#000000]/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/30 via-transparent to-transparent"></div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #000000 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, #000000 2px, transparent 2px)`,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 30px 30px'
          }}></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-[#000000]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-48 h-48 bg-[#AAAAAA]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-[#000000]/3 rounded-full blur-2xl animate-bounce"></div>
        
        {/* Luxury Accent Elements */}
        <div className="absolute top-1/4 right-1/4 w-1 h-32 bg-gradient-to-b from-[#000000]/20 to-transparent rotate-45"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-24 bg-gradient-to-t from-[#AAAAAA]/30 to-transparent -rotate-45"></div>
        
        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-12">
            {/* Premium Badge */}
            <div className="inline-flex items-center px-8 py-4 bg-[#FFFDF2]/15 backdrop-blur-sm rounded-full border border-[#FFFDF2]/25 shadow-xl">
              <span className="text-sm font-medium text-[#FFFDF2] tracking-widest uppercase">
                ✨ Luxury Redefined
              </span>
            </div>
            
            {/* Main Heading */}
            <div className="space-y-8">
              <div className="flex justify-center">
                <div className="relative group">
                  <Image 
                    src="/logo-transparent.png" 
                    alt="Ziyo Logo" 
                    width={400}
                    height={400}
                    className="object-contain transition-all duration-500 transform group-hover:scale-105 drop-shadow-2xl"
                  />
                </div>
              </div>
              
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-[#FFFDF2]/90 tracking-wide leading-relaxed">
                Where <span className="font-medium italic">extraordinary</span> meets <span className="font-medium italic">everyday</span>
              </h2>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center pt-12">
              <Link href="/products">
                <Button 
                  size="lg" 
                  className="group bg-[#FFFDF2] hover:bg-[#FFFDF2]/90 text-[#000000] border-0 shadow-2xl transform hover:scale-105 transition-all duration-500 px-16 py-8 text-xl font-medium rounded-3xl"
                >
                  <span className="relative z-10 tracking-wide">Discover Collection</span>
                  <ArrowRight className="ml-4 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </Link>
              <Link href="/categories">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="group border-2 border-[#FFFDF2]/70 text-[#FFFDF2] hover:bg-[#FFFDF2] hover:text-[#000000] backdrop-blur-sm px-16 py-8 text-xl font-medium rounded-3xl transform hover:scale-105 transition-all duration-500"
                >
                  <span className="relative z-10 tracking-wide">Explore Categories</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Slideshow Indicators */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-3">
            {backgroundImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-[#FFFDF2] scale-125' 
                    : 'bg-[#FFFDF2]/40 hover:bg-[#FFFDF2]/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#FFFDF2]/70 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#FFFDF2]/70 rounded-full mt-2 animate-pulse"></div>
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
