import React from 'react';
import { Star, MessageSquare, ExternalLink, ThumbsUp, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO, CUSTOMER_REVIEWS } from '../data/businessData';

export const CustomerReviews: React.FC = () => {
  return (
    <section id="reviews" className="py-16 md:py-24 bg-[#FAF5EB] border-t border-[#EBDDCB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B1D24]/10 text-[#8B1D24] text-xs font-bold uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-[#D97706]" />
            Community Feedback
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#8B1D24] tracking-tight">
            What Our Customers Say
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#614736]">
            Real feedback from Google reviews left by local visitors in Barrackpore.
          </p>
          <div className="w-16 h-1 bg-[#D97706] mx-auto mt-4 rounded-full" />
        </div>

        {/* Rating Summary Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto border border-[#E9D9C7] shadow-sm mb-12 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            
            {/* Score */}
            <div className="flex flex-col items-center">
              <span className="font-serif text-5xl sm:text-6xl font-bold text-[#8B1D24]">
                3.6
              </span>
              <span className="text-xs text-[#7A5E4D] font-medium mt-1">out of 5 stars</span>
            </div>

            <div className="hidden sm:block w-px h-16 bg-[#E8DAC8]" />

            {/* Stars & Total */}
            <div className="text-center sm:text-left space-y-1.5">
              <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-500">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 ${
                      star <= 3
                        ? 'fill-amber-400 text-amber-500'
                        : star === 4
                        ? 'fill-amber-400/60 text-amber-500'
                        : 'text-amber-200 fill-amber-100'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm font-bold text-[#2D1B14]">
                Based on {BUSINESS_INFO.googleReviewCount} Google Reviews
              </p>
              <p className="text-xs text-[#7A5E4D]">
                Verified Google Business Listing Profile
              </p>
            </div>

          </div>
        </div>

        {/* Customer Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {CUSTOMER_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 border border-[#ECDCCB] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating
                            ? 'fill-amber-400 text-amber-500'
                            : 'text-amber-200 fill-amber-50'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-[#8B1D24] bg-[#8B1D24]/10 px-2 py-0.5 rounded-full">
                    {review.source}
                  </span>
                </div>

                {/* Exact Customer Review Quote */}
                <blockquote className="text-sm sm:text-base text-[#3A2418] italic leading-relaxed my-3">
                  "{review.text}"
                </blockquote>
              </div>

              <div className="pt-4 border-t border-[#F0E4D5] flex items-center justify-between text-xs text-[#7A5E4D]">
                <span className="font-semibold text-[#543929]">{review.author}</span>
                {review.tag && (
                  <span className="text-[11px] text-[#8C6F5C] bg-[#FAF2E6] px-2 py-0.5 rounded">
                    {review.tag}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Action Button: View More Reviews on Google */}
        <div className="text-center">
          <a
            href={BUSINESS_INFO.googleSearchReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="reviews-google-view-more-btn"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white hover:bg-[#FAF1E3] text-[#8B1D24] border border-[#D9C4AC] text-sm sm:text-base font-bold shadow-xs hover:shadow-md transition-all duration-200"
          >
            <span>View More Reviews on Google</span>
            <ExternalLink className="w-4 h-4 text-[#8B1D24]" />
          </a>
        </div>

      </div>
    </section>
  );
};
