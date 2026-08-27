import React from 'react';
import { Instagram, ExternalLink, Heart, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO, INSTAGRAM_POSTS_PLACEHOLDER } from '../data/businessData';

export const InstagramSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#FAF5EB] border-t border-[#ECDDCB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100/80 text-pink-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Instagram className="w-3.5 h-3.5 text-pink-600" />
            Social Updates
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#8B1D24] tracking-tight">
            Follow Gopal Sweets on Instagram
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#614736]">
            Follow us for updates, sweets, snacks and more.
          </p>
          <p className="text-sm font-bold text-[#8B1D24] mt-1">
            {BUSINESS_INFO.instagramHandle}
          </p>
          <div className="w-16 h-1 bg-[#D97706] mx-auto mt-4 rounded-full" />
        </div>

        {/* Instagram Visual Previews Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10">
          {INSTAGRAM_POSTS_PLACEHOLDER.map((post) => (
            <a
              key={post.id}
              href={BUSINESS_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 aspect-square bg-[#FAF2E6] border border-[#ECDCCB] block"
            >
              <img
                src={post.image}
                alt="Instagram preview for Gopal Sweets"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                loading="lazy"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-white text-center">
                <Instagram className="w-8 h-8 text-pink-300 mb-2" />
                <div className="flex items-center gap-4 text-xs font-bold mb-2">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5" />
                    View
                  </span>
                </div>
                <p className="text-[11px] text-white/80 line-clamp-2">
                  {post.caption}
                </p>
              </div>

              {/* Mini Instagram badge */}
              <div className="absolute bottom-2.5 right-2.5 bg-black/50 backdrop-blur-xs p-1.5 rounded-full text-white group-hover:opacity-0 transition-opacity">
                <Instagram className="w-3.5 h-3.5" />
              </div>
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href={BUSINESS_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="instagram-follow-btn"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 text-white text-base font-bold shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
          >
            <Instagram className="w-5 h-5" />
            <span>Follow on Instagram ({BUSINESS_INFO.instagramHandle})</span>
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>

      </div>
    </section>
  );
};
