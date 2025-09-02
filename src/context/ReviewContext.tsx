'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Review } from '@/lib/types';
import { useAuth } from './AuthContext';

interface ReviewContextType {
  reviews: Review[];
  addReview: (productId: string, rating: number, comment: string) => Promise<void>;
  getProductReviews: (productId: string) => Review[];
  getProductRating: (productId: string) => { averageRating: number; totalReviews: number };
  deleteReview: (reviewId: string) => Promise<void>;
  updateReview: (reviewId: string, rating: number, comment: string) => Promise<void>;
  loading: boolean;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  return context;
};

interface ReviewProviderProps {
  children: ReactNode;
}

export const ReviewProvider = ({ children }: ReviewProviderProps) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  // Load reviews from localStorage on mount
  useEffect(() => {
    const savedReviews = localStorage.getItem('ziyo-reviews');
    if (savedReviews) {
      try {
        const parsedReviews = JSON.parse(savedReviews).map((review: Review) => ({
          ...review,
          createdAt: new Date(review.createdAt)
        }));
        setReviews(parsedReviews);
      } catch (error) {
        console.error('Error loading reviews:', error);
      }
    }
  }, []);

  // Save reviews to localStorage whenever reviews change
  useEffect(() => {
    localStorage.setItem('ziyo-reviews', JSON.stringify(reviews));
  }, [reviews]);

  const addReview = async (productId: string, rating: number, comment: string) => {
    if (!user) {
      throw new Error('You must be logged in to leave a review');
    }

    setLoading(true);
    try {
      // Check if user already reviewed this product
      const existingReview = reviews.find(
        r => r.productId === productId && r.userId === user.uid
      );

      if (existingReview) {
        throw new Error('You have already reviewed this product');
      }

      const newReview: Review = {
        id: Date.now().toString(),
        productId,
        userId: user.uid,
        userName: user.displayName || user.email || 'Anonymous',
        rating,
        comment,
        createdAt: new Date()
      };

      setReviews(prev => [newReview, ...prev]);
    } finally {
      setLoading(false);
    }
  };

  const updateReview = async (reviewId: string, rating: number, comment: string) => {
    if (!user) {
      throw new Error('You must be logged in to update a review');
    }

    setLoading(true);
    try {
      setReviews(prev => prev.map(review => 
        review.id === reviewId && review.userId === user.uid
          ? { ...review, rating, comment, createdAt: new Date() }
          : review
      ));
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (reviewId: string) => {
    if (!user) {
      throw new Error('You must be logged in to delete a review');
    }

    setLoading(true);
    try {
      setReviews(prev => prev.filter(review => 
        !(review.id === reviewId && review.userId === user.uid)
      ));
    } finally {
      setLoading(false);
    }
  };

  const getProductReviews = (productId: string) => {
    return reviews
      .filter(review => review.productId === productId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  const getProductRating = (productId: string) => {
    const productReviews = getProductReviews(productId);
    const totalReviews = productReviews.length;
    
    if (totalReviews === 0) {
      return { averageRating: 0, totalReviews: 0 };
    }

    const averageRating = productReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
    
    return { 
      averageRating: Math.round(averageRating * 10) / 10, 
      totalReviews 
    };
  };

  const value: ReviewContextType = {
    reviews,
    addReview,
    getProductReviews,
    getProductRating,
    deleteReview,
    updateReview,
    loading,
  };

  return (
    <ReviewContext.Provider value={value}>
      {children}
    </ReviewContext.Provider>
  );
};
