'use client';

import { useState, useEffect, useRef } from 'react';
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
  const [isVisible, setIsVisible] = useState({
    hero: false,
    categories: false,
    products: false,
    cta: false
  });

  // Refs for intersection observer
  const heroRef = useRef<HTMLElement>(null);
  const categoriesRef = useRef<HTMLElement>(null);
  const productsRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  // Background images for slideshow
  const backgroundImages = [
    '/hero-background.jpg',
    '/hero2.jpg',
    '/hero3.jpg'
  ];

  // Smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Enhanced Intersection Observer for elegant scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          if (target === heroRef.current) {
            setIsVisible(prev => ({ ...prev, hero: true }));
          } else if (target === categoriesRef.current) {
            setIsVisible(prev => ({ ...prev, categories: true }));
          } else if (target === productsRef.current) {
            setIsVisible(prev => ({ ...prev, products: true }));
          } else if (target === ctaRef.current) {
            setIsVisible(prev => ({ ...prev, cta: true }));
          }
        }
      });
    }, observerOptions);

    // Observe elements with slight delay for smoother experience
    const observeElement = (element: HTMLElement | null, delay: number = 0) => {
      if (element) {
        setTimeout(() => observer.observe(element), delay);
      }
    };

    observeElement(heroRef.current, 0);
    observeElement(categoriesRef.current, 100);
    observeElement(productsRef.current, 200);
    observeElement(ctaRef.current, 300);

    // Initial hero animation with elegant timing
    const heroTimer = setTimeout(() => {
      setIsVisible(prev => ({ ...prev, hero: true }));
    }, 300);

    return () => {
      observer.disconnect();
      clearTimeout(heroTimer);
    };
  }, []);

  // Enhanced auto-change background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 8000); // Slower transition for more elegance

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  useEffect(() => {
    // Enhanced data loading with elegant timing
    const loadData = async () => {
      setLoading(true);
      // Simulate API call with more realistic timing
      await new Promise(resolve => setTimeout(resolve, 800));
      setFeaturedProducts(sampleProducts.filter(p => p.featured));
      setCategories(sampleCategories);
      
      // Gradual reveal for better UX
      setTimeout(() => {
        setLoading(false);
      }, 200);
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFDF2]">
      {/* Enhanced Hero Section with Scroll Animations */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Enhanced Auto-Moving Background Images with Smoother Transitions */}
        <div className="absolute inset-0">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-3000 ease-in-out ${
                index === currentImageIndex 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-110'
              }`}
              style={{
                backgroundImage: `url('${image}')`
              }}
            ></div>
          ))}
          {/* Sophisticated Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#000000]/70 via-[#000000]/50 to-[#000000]/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/50 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/30 via-transparent to-[#000000]/30"></div>
        </div>
        
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0 animate-pulse" 
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #FFFFFF 2px, transparent 2px),
                               radial-gradient(circle at 75% 75%, #FFFFFF 2px, transparent 2px)`,
              backgroundSize: '80px 80px',
              backgroundPosition: '0 0, 40px 40px'
            }}
          ></div>
        </div>
        
        {/* Enhanced Floating Elements with Different Animation Speeds */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-[#FFFFFF]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-48 h-48 bg-[#FFFFFF]/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-[#FFFFFF]/8 rounded-full blur-2xl animate-bounce" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-[#FFFFFF]/12 rounded-full blur-xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        
        {/* Elegant Accent Lines */}
        <div className="absolute top-1/4 right-1/4 w-1 h-32 bg-gradient-to-b from-[#FFFFFF]/30 to-transparent rotate-45 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-24 bg-gradient-to-t from-[#FFFFFF]/40 to-transparent -rotate-45 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Main Content with Staggered Animations */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-12">
            {/* Premium Badge with Slide-in Animation */}
            <div className={`transition-all duration-1000 transform ${
              isVisible.hero 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}>
              <div className="inline-flex items-center px-8 py-4 bg-[#FFFDF2]/20 backdrop-blur-md rounded-full border border-[#FFFDF2]/30 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
                <span className="text-sm font-medium text-[#FFFDF2] tracking-widest uppercase">
                  ✨ Luxury Redefined
                </span>
              </div>
            </div>
            
            {/* Logo and Heading with Staggered Animation */}
            <div className="space-y-8">
              <div className={`flex justify-center transition-all duration-1200 transform ${
                isVisible.hero 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-12 scale-95'
              }`} style={{ transitionDelay: '200ms' }}>
                <div className="relative group">
                  <Image 
                    src="/logo-transparent.png" 
                    alt="Ziyo Logo" 
                    width={400}
                    height={400}
                    className="object-contain transition-all duration-700 transform group-hover:scale-110 drop-shadow-2xl filter brightness-110"
                  />
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-[#FFFDF2]/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                </div>
              </div>
              
              <h2 className={`text-2xl md:text-4xl lg:text-5xl font-light text-[#FFFDF2]/95 tracking-wide leading-relaxed transition-all duration-1400 transform ${
                isVisible.hero 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-16'
              }`} style={{ transitionDelay: '400ms' }}>
                Where <span className="font-medium italic bg-gradient-to-r from-[#FFFDF2] to-[#FFFDF2]/80 bg-clip-text text-transparent">extraordinary</span> meets <span className="font-medium italic bg-gradient-to-r from-[#FFFDF2] to-[#FFFDF2]/80 bg-clip-text text-transparent">everyday</span>
              </h2>
            </div>
            
            {/* CTA Buttons with Staggered Animation */}
            <div className={`flex flex-col sm:flex-row gap-8 justify-center pt-12 transition-all duration-1600 transform ${
              isVisible.hero 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-20'
            }`} style={{ transitionDelay: '600ms' }}>
              <Link href="/products">
                <Button 
                  size="lg" 
                  className="group bg-[#FFFDF2] hover:bg-[#FFFDF2]/95 text-[#000000] border-0 shadow-2xl transform hover:scale-110 transition-all duration-500 px-16 py-8 text-xl font-medium rounded-3xl hover:shadow-[#FFFDF2]/50"
                >
                  <span className="relative z-10 tracking-wide">Discover Collection</span>
                  <ArrowRight className="ml-4 h-6 w-6 group-hover:translate-x-3 transition-transform duration-300" />
                </Button>
              </Link>
              <Link href="/categories">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="group border-2 border-[#FFFDF2]/80 text-[#FFFDF2] hover:bg-[#FFFDF2] hover:text-[#000000] backdrop-blur-md px-16 py-8 text-xl font-medium rounded-3xl transform hover:scale-110 transition-all duration-500 hover:shadow-2xl"
                >
                  <span className="relative z-10 tracking-wide">Explore Categories</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Enhanced Slideshow Indicators */}
        <div className={`absolute bottom-20 left-1/2 transform -translate-x-1/2 transition-all duration-1800 ${
          isVisible.hero 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '800ms' }}>
          <div className="flex space-x-4">
            {backgroundImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-4 h-4 rounded-full transition-all duration-500 transform hover:scale-125 ${
                  index === currentImageIndex 
                    ? 'bg-[#FFFDF2] scale-125 shadow-lg shadow-[#FFFDF2]/50'
                    : 'bg-[#FFFDF2]/50 hover:bg-[#FFFDF2]/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Enhanced Scroll Indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-2000 ${
          isVisible.hero 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '1000ms' }}>
          <div className="w-6 h-12 border-2 border-[#FFFDF2]/80 rounded-full flex justify-center animate-bounce hover:border-[#FFFDF2] transition-colors duration-300">
            <div className="w-1 h-4 bg-[#FFFDF2]/80 rounded-full mt-3 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Enhanced Categories Section with Scroll Animations */}
      <section 
        ref={categoriesRef}
        className="py-20 bg-white overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 transform ${
            isVisible.categories 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}>
            <div className="inline-flex items-center px-6 py-3 bg-[#000000]/10 backdrop-blur-sm rounded-full text-[#000000] text-sm font-medium mb-6 hover:bg-[#000000]/20 transition-colors duration-300">
              <TrendingUp className="h-4 w-4 mr-2" />
              Trending Categories
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#000000] mb-6 leading-tight">
              Shop by Category
            </h2>
            <p className="text-xl text-[#666666] max-w-3xl mx-auto leading-relaxed">
              Discover our carefully curated collections designed for every lifestyle and passion
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link key={category.id} href={`/products?category=${category.name}`}>
                <div className={`group cursor-pointer transition-all duration-700 transform ${
                  isVisible.categories 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-16'
                }`} style={{ transitionDelay: `${index * 150}ms` }}>
                  <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105">
                    <Image
                      src={category.image || '/placeholder-category.jpg'}
                      alt={category.name}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30 opacity-60"></div>
                    <div className="absolute bottom-6 left-6 right-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
                      <h3 className="text-lg font-bold mb-1 drop-shadow-lg">{category.name}</h3>
                      <p className="text-sm text-gray-200 drop-shadow-md">{category.description}</p>
                      <div className="mt-3 flex items-center text-xs">
                        <ArrowRight className="h-4 w-4 mr-1" />
                        <span>Explore Collection</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-bold text-[#000000] group-hover:text-[#333333] transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-[#666666] mt-2 text-sm leading-relaxed">{category.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Featured Products Section with Scroll Animations */}
      <section 
        ref={productsRef}
        className="py-20 bg-[#FFFDF2] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-8 transition-all duration-1000 transform ${
            isVisible.products 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}>
            <div className="flex-1">
              <div className="inline-flex items-center px-6 py-3 bg-[#000000]/10 backdrop-blur-sm rounded-full text-[#000000] text-sm font-medium mb-6 hover:bg-[#000000]/20 transition-colors duration-300">
                <Zap className="h-4 w-4 mr-2" />
                Editor&apos;s Choice
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#000000] mb-6 leading-tight">
                Featured Products
              </h2>
              <p className="text-xl text-[#666666] max-w-3xl leading-relaxed">
                Hand-picked premium products that define quality, innovation, and style
              </p>
            </div>
            <div className={`transition-all duration-1200 transform ${
              isVisible.products 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-8'
            }`} style={{ transitionDelay: '300ms' }}>
              <Link href="/products">
                <Button variant="outline" className="border-2 border-[#000000] text-[#000000] hover:bg-[#000000] hover:text-[#FFFDF2] px-8 py-4 font-semibold rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  View All Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className={`transition-all duration-1400 transform ${
            isVisible.products 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-16'
          }`} style={{ transitionDelay: '400ms' }}>
            <ProductGrid 
              products={featuredProducts} 
              loading={loading}
              emptyMessage="No featured products available"
            />
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section with Scroll Animations */}
      <section 
        ref={ctaRef}
        className="relative py-24 bg-[#000000] overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-40 h-40 bg-[#FFFDF2] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-56 h-56 bg-[#FFFDF2] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-[#FFFDF2] rounded-full blur-2xl animate-bounce" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-1000 transform ${
            isVisible.cta 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-12 scale-95'
          }`}>
            <div className="inline-flex items-center justify-center w-24 h-24 bg-[#FFFDF2] rounded-full mb-8 shadow-2xl group hover:scale-110 transition-transform duration-300">
              <Star className="h-12 w-12 text-[#000000] group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          
          <h2 className={`text-4xl md:text-6xl font-bold mb-8 text-[#FFFDF2] leading-tight transition-all duration-1200 transform ${
            isVisible.cta 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-16'
          }`} style={{ transitionDelay: '200ms' }}>
            Join the Ziyo Experience
          </h2>
          
          <p className={`text-xl md:text-2xl mb-12 text-[#AAAAAA] max-w-4xl mx-auto leading-relaxed transition-all duration-1400 transform ${
            isVisible.cta 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-20'
          }`} style={{ transitionDelay: '400ms' }}>
            Become part of our exclusive community and enjoy premium benefits, early access to new collections, and special member-only discounts.
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-6 justify-center mb-12 transition-all duration-1600 transform ${
            isVisible.cta 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-24'
          }`} style={{ transitionDelay: '600ms' }}>
            <Link href="/register">
              <Button size="lg" className="bg-[#FFFDF2] text-[#000000] hover:bg-[#AAAAAA] hover:text-[#FFFDF2] font-bold px-12 py-6 text-lg shadow-2xl transform hover:scale-110 transition-all duration-300 rounded-2xl">
                Start Shopping
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" variant="outline" className="border-2 border-[#AAAAAA] text-[#FFFDF2] hover:bg-[#FFFDF2] hover:text-[#000000] backdrop-blur-sm px-12 py-6 text-lg transform hover:scale-110 transition-all duration-300 rounded-2xl">
                Browse Products
              </Button>
            </Link>
          </div>
          
          {/* Enhanced Trust Indicators */}
          <div className={`pt-12 border-t border-[#AAAAAA]/30 transition-all duration-1800 transform ${
            isVisible.cta 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-28'
          }`} style={{ transitionDelay: '800ms' }}>
            <p className="text-[#AAAAAA] text-lg mb-6 font-medium">Trusted by over 50,000+ customers worldwide</p>
            <div className="flex flex-wrap items-center justify-center gap-8 text-[#AAAAAA]">
              <div className="flex items-center group hover:text-[#FFFDF2] transition-colors duration-300">
                <Star className="h-6 w-6 text-[#FFFDF2] mr-2 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-bold text-lg">4.9/5</span>
              </div>
              <div className="text-base font-medium hover:text-[#FFFDF2] transition-colors duration-300 cursor-default">50K+ Reviews</div>
              <div className="text-base font-medium hover:text-[#FFFDF2] transition-colors duration-300 cursor-default">24/7 Support</div>
              <div className="text-base font-medium hover:text-[#FFFDF2] transition-colors duration-300 cursor-default">SSL Secured</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
