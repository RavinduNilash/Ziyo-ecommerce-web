'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  Target, 
  Heart, 
  Award, 
  TrendingUp, 
  Shield, 
  Sparkles,
  ArrowRight,
  CheckCircle,
  Globe,
  Clock,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { label: 'Happy Customers', value: '50K+', icon: Users },
    { label: 'Products Listed', value: '10K+', icon: Target },
    { label: 'Years of Excellence', value: '5+', icon: Award },
    { label: 'Customer Satisfaction', value: '99%', icon: Heart }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'Your data and transactions are protected with enterprise-grade security measures.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Every decision we make is centered around providing the best experience for our customers.',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'We constantly evolve and innovate to bring you the latest and greatest products.',
      gradient: 'from-violet-500 to-purple-500'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Connecting sellers and buyers from around the world with seamless international shipping.',
      gradient: 'from-emerald-500 to-teal-500'
    }
  ];

  const features = [
    'Curated product selection',
    'Fast and reliable shipping',
    '24/7 customer support',
    'Secure payment processing',
    'Easy returns and exchanges',
    'Mobile-first experience'
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: '/api/placeholder/400/400',
      description: 'Visionary leader with 10+ years in e-commerce innovation.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: '/api/placeholder/400/400',
      description: 'Tech expert focused on building scalable and secure platforms.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Design',
      image: '/api/placeholder/400/400',
      description: 'Creative director ensuring exceptional user experiences.'
    }
  ];

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
              <span className="text-white text-sm font-medium">Our Story</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              About Ziyo
            </h1>
            
            <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8" style={{ color: '#AAAAAA' }}>
              Revolutionizing e-commerce with cutting-edge technology, exceptional service, and a passion for connecting people with products they love.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-black hover:bg-gray-800 text-white border border-white/20 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
              >
                Join Our Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className={`text-center transition-all duration-700 delay-${index * 100} ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                >
                  <div className="relative group">
                    <div className="absolute inset-0 bg-black rounded-xl blur opacity-10 group-hover:opacity-20 transition-opacity"></div>
                    <div className="relative bg-white border border-gray-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:border-gray-300">
                      <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-3xl md:text-4xl font-bold text-black mb-2">
                        {stat.value}
                      </div>
                      <div className="font-medium" style={{ color: '#AAAAAA' }}>{stat.label}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
              Our Mission & Vision
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#AAAAAA' }}>
              Driving the future of e-commerce through innovation, trust, and exceptional customer experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-black rounded-2xl blur opacity-10"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
                <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-black">Our Mission</h3>
                <p className="leading-relaxed" style={{ color: '#AAAAAA' }}>
                  To democratize e-commerce by providing a platform that empowers businesses of all sizes to reach global audiences while delivering exceptional shopping experiences that delight customers worldwide.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-black rounded-2xl blur opacity-10"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
                <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mb-6">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-black">Our Vision</h3>
                <p className="leading-relaxed" style={{ color: '#AAAAAA' }}>
                  To become the world&apos;s most trusted and innovative e-commerce platform, where technology meets human connection, creating a marketplace that benefits everyone in the ecosystem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
              Our Core Values
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#AAAAAA' }}>
              The principles that guide everything we do and shape our company culture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className={`group transition-all duration-700 delay-${index * 100} ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                >
                  <div className="relative h-full">
                    <div className="absolute inset-0 bg-black rounded-xl blur opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    <div className="relative bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:border-gray-300 h-full">
                      <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-black">{value.title}</h3>
                      <p className="leading-relaxed" style={{ color: '#AAAAAA' }}>{value.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
                What Makes Us Different
              </h2>
              <p className="text-xl mb-8 leading-relaxed" style={{ color: '#AAAAAA' }}>
                We&apos;re not just another e-commerce platform. We&apos;re innovators, dreamers, and builders creating the future of online shopping.
              </p>
              
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div
                    key={feature}
                    className={`flex items-center gap-3 transition-all duration-500 delay-${index * 100} ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                    }`}
                  >
                    <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-black font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button
                  size="lg"
                  className="bg-black hover:bg-gray-800 text-white border-0 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                >
                  Start Shopping
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-black rounded-2xl blur-xl opacity-10"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-2xl border border-gray-200">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-black">24/7</div>
                    <div style={{ color: '#AAAAAA' }}>Support</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Star className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-black">4.9</div>
                    <div style={{ color: '#AAAAAA' }}>Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-black">100%</div>
                    <div style={{ color: '#AAAAAA' }}>Secure</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-black">1M+</div>
                    <div style={{ color: '#AAAAAA' }}>Orders</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
              Meet Our Team
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#AAAAAA' }}>
              The passionate individuals behind Ziyo&apos;s success, dedicated to creating exceptional experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={member.name}
                className={`group transition-all duration-700 delay-${index * 200} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-black rounded-xl blur opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <div className="relative bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:border-gray-300">
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <div className="absolute inset-0 bg-black rounded-full"></div>
                      <div className="relative w-full h-full bg-gray-300 rounded-full overflow-hidden">
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <Users className="w-8 h-8" style={{ color: '#AAAAAA' }} />
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-black text-center mb-2">{member.name}</h3>
                    <p className="font-medium text-center mb-3" style={{ color: '#AAAAAA' }}>{member.role}</p>
                    <p className="text-center text-sm leading-relaxed" style={{ color: '#AAAAAA' }}>{member.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black to-black/80"></div>
        
        {/* Subtle decorative elements */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gray-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gray-600 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Join the Ziyo Family?
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto leading-relaxed" style={{ color: '#AAAAAA' }}>
            Experience the future of e-commerce today. Join thousands of satisfied customers who trust Ziyo for their shopping needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-black hover:bg-gray-800 text-white border border-white/20 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              Start Shopping Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
