'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { sampleProducts } from '@/lib/sampleData';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ReviewForm } from '@/components/ui/ReviewForm';
import { ReviewList } from '@/components/ui/ReviewList';
import { formatPrice } from '@/lib/utils';
import { ArrowLeft, Minus, Plus, Star, Heart, Share2, ShoppingCart } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { ProductVariantSelector } from '@/components/ui/ProductVariantSelector';
import { getVariantPrice, getVariantStock, VariantSelection } from '@/lib/variants';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState<VariantSelection>({});
  
  const { addItem } = useCart();

  // Calculate current price and stock based on variant selection
  const currentPrice = product ? getVariantPrice(product, selectedVariants) : 0;
  const currentStock = product ? getVariantStock(product, selectedVariants) : 0;

  useEffect(() => {
    // Simulate API call to fetch product
    const loadProduct = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate loading
      
      const foundProduct = sampleProducts.find(p => p.id === productId);
      setProduct(foundProduct || null);
      setLoading(false);
    };

    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      toast.success(`Added ${quantity} ${product.name}(s) to cart`);
    }
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: product?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Product link copied to clipboard');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#FFFDF2' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="aspect-square rounded-lg" style={{ backgroundColor: '#AAAAAA', opacity: 0.3 }}></div>
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="aspect-square rounded-md" style={{ backgroundColor: '#AAAAAA', opacity: 0.3 }}></div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="h-8 rounded w-3/4" style={{ backgroundColor: '#AAAAAA', opacity: 0.3 }}></div>
                <div className="h-6 rounded w-1/2" style={{ backgroundColor: '#AAAAAA', opacity: 0.3 }}></div>
                <div className="h-24 rounded" style={{ backgroundColor: '#AAAAAA', opacity: 0.3 }}></div>
                <div className="h-12 rounded w-full" style={{ backgroundColor: '#AAAAAA', opacity: 0.3 }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#FFFDF2' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4" style={{ color: '#000000' }}>Product Not Found</h1>
            <p className="mb-8" style={{ color: '#AAAAAA' }}>The product you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/products">
              <Button
                className="px-6 py-3 text-white font-medium rounded-lg transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: '#000000' }}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFDF2' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm mb-8" style={{ color: '#AAAAAA' }}>
          <Link href="/" className="transition-colors duration-200 hover:opacity-70" style={{ color: '#AAAAAA' }}>Home</Link>
          <span>/</span>
          <Link href="/products" className="transition-colors duration-200 hover:opacity-70" style={{ color: '#AAAAAA' }}>Products</Link>
          <span>/</span>
          <span style={{ color: '#000000' }}>{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square relative overflow-hidden rounded-lg" style={{ backgroundColor: '#FFFDF2' }}>
              <Image
                src={product.images[selectedImage] || '/placeholder-product.jpg'}
                alt={product.name}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square relative overflow-hidden rounded-md transition-all duration-200 ${
                      selectedImage === index
                        ? 'ring-2 ring-black'
                        : 'ring-1 ring-gray-400 hover:ring-2'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Price */}
            <div>
              <h1 className="text-3xl font-bold mb-2" style={{ color: '#000000' }}>{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold" style={{ color: '#000000' }}>
                  {formatPrice(currentPrice)}
                </span>
                {product.originalPrice && product.originalPrice > currentPrice && (
                  <span className="text-lg line-through" style={{ color: '#AAAAAA' }}>
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating!)
                            ? 'fill-current'
                            : ''
                        }`}
                        style={{
                          color: i < Math.floor(product.rating!) ? '#000000' : '#AAAAAA'
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-sm" style={{ color: '#AAAAAA' }}>
                    ({product.rating.toFixed(1)}) • {product.reviews || 0} reviews
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#000000' }}>Description</h3>
              <p className="leading-relaxed" style={{ color: '#AAAAAA' }}>{product.description}</p>
            </div>

            {/* Category and Stock */}
            <div className="flex items-center space-x-6">
              <div>
                <span className="text-sm" style={{ color: '#AAAAAA' }}>Category: </span>
                <span className="text-sm font-medium" style={{ color: '#000000' }}>{product.category}</span>
              </div>
              <div>
                <span className="text-sm" style={{ color: '#AAAAAA' }}>Stock: </span>
                <span className={`text-sm font-medium`}
                  style={{
                    color: currentStock > 10 ? '#000000' :
                           currentStock > 0 ? '#000000' : '#000000'
                  }}
                >
                  {currentStock > 0 ? `${currentStock} available` : 'Out of stock'}
                </span>
              </div>
            </div>

            {/* Product Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold" style={{ color: '#000000' }}>Options</h3>
                <ProductVariantSelector
                  variants={product.variants}
                  onVariantChange={setSelectedVariants}
                  disabled={currentStock === 0}
                />
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#000000' }}>
                  Quantity
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border rounded-md transition-all duration-200 hover:opacity-80"
                    style={{
                      borderColor: '#AAAAAA',
                      color: '#000000',
                      backgroundColor: 'transparent'
                    }}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 border rounded-md min-w-[60px] text-center"
                    style={{
                      borderColor: '#AAAAAA',
                      color: '#000000',
                      backgroundColor: 'white'
                    }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                    className="p-2 border rounded-md transition-all duration-200 hover:opacity-80"
                    style={{
                      borderColor: '#AAAAAA',
                      color: '#000000',
                      backgroundColor: 'transparent'
                    }}
                    disabled={quantity >= currentStock}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                className="w-full px-6 py-3 text-white font-medium rounded-lg transition-all duration-200 hover:opacity-90"
                size="lg"
                disabled={currentStock === 0}
                style={{ backgroundColor: currentStock === 0 ? '#AAAAAA' : '#000000' }}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {currentStock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={handleWishlist}
                  className="flex-1 border-2 px-4 py-3 font-medium rounded-lg transition-all duration-200 hover:opacity-80"
                  style={{
                    borderColor: '#000000',
                    color: isWishlisted ? '#000000' : '#000000',
                    backgroundColor: 'transparent'
                  }}
                >
                  <Heart className={`mr-2 h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`}
                    style={{ color: isWishlisted ? '#000000' : '#000000' }} />
                  {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="flex-1 border-2 px-4 py-3 font-medium rounded-lg transition-all duration-200 hover:opacity-80"
                  style={{
                    borderColor: '#000000',
                    color: '#000000',
                    backgroundColor: 'transparent'
                  }}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <Card className="p-4 border-0 shadow-md rounded-lg" style={{ backgroundColor: 'white' }}>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: '#AAAAAA' }}>Free shipping</span>
                  <span className="font-medium" style={{ color: '#000000' }}>On orders over LKR 16,500</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#AAAAAA' }}>Return policy</span>
                  <span className="font-medium" style={{ color: '#000000' }}>30 days</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#AAAAAA' }}>Warranty</span>
                  <span className="font-medium" style={{ color: '#000000' }}>1 year</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 space-y-8">
          <h2 className="text-2xl font-bold" style={{ color: '#000000' }}>Customer Reviews</h2>
          
          {/* Review Form */}
          <ReviewForm productId={productId} />
          
          {/* Review List */}
          <ReviewList productId={productId} />
        </div>

        {/* Related Products Section - TODO: Implement */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8" style={{ color: '#000000' }}>Related Products</h2>
          <div className="text-center py-12" style={{ color: '#AAAAAA' }}>
            Related products coming soon...
          </div>
        </div>
      </div>
    </div>
  );
}
