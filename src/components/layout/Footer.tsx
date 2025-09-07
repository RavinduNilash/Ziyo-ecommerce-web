import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#000000] text-[#FFFDF2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-[#FFFDF2] mb-4">Ziyo</h3>
            <p className="text-[#AAAAAA] mb-4">
              Your premier destination for quality products and exceptional service.
              We&apos;re committed to providing the best shopping experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#AAAAAA] hover:text-[#FFFDF2]">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#AAAAAA] hover:text-[#FFFDF2]">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#AAAAAA] hover:text-[#FFFDF2]">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-[#AAAAAA] hover:text-[#FFFDF2]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-[#AAAAAA] hover:text-[#FFFDF2]">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-[#AAAAAA] hover:text-[#FFFDF2]">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#AAAAAA] hover:text-[#FFFDF2]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#AAAAAA] hover:text-[#FFFDF2]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-[#AAAAAA] hover:text-[#FFFDF2]">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-[#AAAAAA] hover:text-[#FFFDF2]">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-[#AAAAAA] hover:text-[#FFFDF2]">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-[#AAAAAA] hover:text-[#FFFDF2]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[#AAAAAA] hover:text-[#FFFDF2]">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-[#FFFDF2]" />
                <span className="text-[#AAAAAA]">
                  123 Commerce Street<br />
                  Business City, BC 12345
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[#FFFDF2]" />
                <span className="text-[#AAAAAA]">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[#FFFDF2]" />
                <span className="text-[#AAAAAA]">support@ziyo.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#AAAAAA]/20 mt-8 pt-8 text-center">
          <p className="text-[#AAAAAA]">
            © {new Date().getFullYear()} Ziyo E-commerce. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};