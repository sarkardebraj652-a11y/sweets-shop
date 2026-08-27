import React from 'react';
import { Star, MessageSquare, MapPin, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

export const TrustHighlights: React.FC = () => {
  return (
    <section className="bg-[#FAF3E6] py-8 border-b border-[#ECDCC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          
          {/* Highlight 1: Google Rating */}
          <div className="bg-white/90 rounded-2xl p-5 border border-[#E9D9C7] shadow-xs text-center flex flex-col items-center justify-center hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 mb-2">
              <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
            </div>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-[#8B1D24]">
              {BUSINESS_INFO.googleRating}★
            </p>
            <p className="text-xs sm:text-sm font-semibold text-[#5A4032]">
              Google Rating
            </p>
          </div>

          {/* Highlight 2: Google Reviews */}
          <div className="bg-white/90 rounded-2xl p-5 border border-[#E9D9C7] shadow-xs text-center flex flex-col items-center justify-center hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-[#8B1D24] mb-2">
              <MessageSquare className="w-5 h-5" />
            </div>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-[#8B1D24]">
              {BUSINESS_INFO.googleReviewCount}+
            </p>
            <p className="text-xs sm:text-sm font-semibold text-[#5A4032]">
              Google Reviews
            </p>
          </div>

          {/* Highlight 3: Local Sweet Shop */}
          <div className="bg-white/90 rounded-2xl p-5 border border-[#E9D9C7] shadow-xs text-center flex flex-col items-center justify-center hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-[#D97706] mb-2">
              <MapPin className="w-5 h-5" />
            </div>
            <p className="font-serif text-lg sm:text-xl font-bold text-[#8B1D24]">
              Local Sweet Shop
            </p>
            <p className="text-xs sm:text-sm font-semibold text-[#5A4032]">
              Barrackpore
            </p>
          </div>

          {/* Highlight 4: Traditional Taste */}
          <div className="bg-white/90 rounded-2xl p-5 border border-[#E9D9C7] shadow-xs text-center flex flex-col items-center justify-center hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-[#8B1D24] mb-2">
              <Sparkles className="w-5 h-5" />
            </div>
            <p className="font-serif text-lg sm:text-xl font-bold text-[#8B1D24]">
              Traditional Taste
            </p>
            <p className="text-xs sm:text-sm font-semibold text-[#5A4032]">
              Indian Sweets & Snacks
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
