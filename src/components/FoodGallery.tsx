import React, { useState } from 'react';
import { Sparkles, ZoomIn, X, Camera } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/businessData';
import { GalleryItem } from '../types';

export const FoodGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Bengali Sweets', 'Indian Sweets', 'Snacks', 'Special Occasion'];

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-16 md:py-24 bg-[#FCF9F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B1D24]/10 text-[#8B1D24] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
            Visual Showcase
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#8B1D24] tracking-tight">
            A Taste Worth Sharing
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#614736]">
            Traditional sweets, freshly prepared savories, and celebratory assortments.
          </p>
          <div className="w-16 h-1 bg-[#D97706] mx-auto mt-4 rounded-full" />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`gallery-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#8B1D24] text-white shadow-sm'
                  : 'bg-[#FAF2E5] text-[#553C2D] hover:bg-[#F2E3D0] border border-[#E5D4C2]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className="group relative rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 bg-[#FAF3E7] border border-[#ECDCCB] cursor-pointer aspect-4/3 sm:aspect-square"
            >
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider">
                  {item.category}
                </span>
                <h3 className="font-serif text-base font-bold mt-0.5">
                  {item.title}
                </h3>
                <div className="mt-2 flex items-center gap-1 text-xs text-white/90">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Click to expand</span>
                </div>
              </div>

              {/* Subtle Tag Badge */}
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-full group-hover:opacity-0 transition-opacity">
                {item.title}
              </div>
            </div>
          ))}
        </div>

        {/* Image Replacement Notice / Photo Notice */}
        <div className="mt-8 text-center text-xs text-[#7D614E] flex items-center justify-center gap-1.5">
          <Camera className="w-3.5 h-3.5 text-[#D97706]" />
          <span>Curated visual showcase of traditional Indian sweet varieties.</span>
        </div>

      </div>

      {/* Lightbox / Modal */}
      {activeModalItem && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="relative bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl border border-[#ECDCCB]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              id="gallery-modal-close-btn"
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-72 sm:h-96 w-full overflow-hidden bg-black">
              <img
                src={activeModalItem.image}
                alt={activeModalItem.alt}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-6 bg-[#FCF9F2]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8B1D24] bg-[#8B1D24]/10 px-2.5 py-1 rounded-full">
                  {activeModalItem.category}
                </span>
                <span className="text-xs text-[#7A5D4B]">Gopal Sweets • Barrackpore</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#2D1B14] mt-2">
                {activeModalItem.title}
              </h3>
              <p className="text-sm text-[#5C4233] mt-1">
                {activeModalItem.alt}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
