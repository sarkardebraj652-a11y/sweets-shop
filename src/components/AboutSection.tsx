import React, { useState } from 'react';
import { Heart, MapPin, Coffee, ShoppingBag, Store, Sparkles, Building2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';
import shopCounterImage from '../assets/images/gopal_sweets_counter_1787842684303.jpg';
import sweetShopFrontImage from '../assets/images/sweet_shop_front_1787856802329.jpg';
import sweetShopStoreImage from '../assets/images/sweet_shop_store_1787856818608.jpg';

export const AboutSection: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<'front' | 'counter' | 'store'>('front');

  const photos = {
    front: {
      image: sweetShopFrontImage,
      title: 'Sweet Shop Storefront',
      badge: 'Gopal Sweets Entrance • Barrackpore',
      alt: 'Gopal Sweets sweet shop storefront and welcoming entrance in Barrackpore West Bengal',
    },
    counter: {
      image: shopCounterImage,
      title: 'Fresh Sweets Counter',
      badge: 'Daily Fresh Mithai Trays',
      alt: 'Gopal Sweets shop display counter in Barrackpore with sweet trays and counter shelves',
    },
    store: {
      image: sweetShopStoreImage,
      title: 'Sweet Display Shelves',
      badge: 'Chhena & Mawa Delights',
      alt: 'Glass display counters inside Gopal Sweets sweet shop showing traditional sweets and packaging',
    },
  };

  const current = photos[activePhoto];

  return (
    <section id="about" className="py-16 md:py-24 bg-[#FCF9F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B1D24]/10 text-[#8B1D24] text-xs font-bold uppercase tracking-wider mb-3">
            Our Story & Heritage
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#8B1D24] tracking-tight">
            About Gopal Sweets
          </h2>
          <div className="w-16 h-1 bg-[#D97706] mx-auto mt-4 rounded-full" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Visual Storytelling & Sweet Shop Photos */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative space-y-4">
              
              {/* Main Photo Card */}
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-[#F5ECDF] relative group">
                <img
                  src={current.image}
                  alt={current.alt}
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#8B1D24]/90 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-amber-300/30 flex items-center gap-1.5 shadow">
                  <Store className="w-3.5 h-3.5 text-amber-300" />
                  <span>{current.badge}</span>
                </div>
              </div>

              {/* Sweet Shop Photo Selector Tabs */}
              <div className="flex items-center justify-between gap-2 p-1.5 bg-[#F2E5D5] rounded-2xl border border-[#E3D3C1]">
                <button
                  type="button"
                  id="about-photo-front-btn"
                  onClick={() => setActivePhoto('front')}
                  className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    activePhoto === 'front'
                      ? 'bg-[#8B1D24] text-white shadow-xs'
                      : 'text-[#5C3F2E] hover:bg-white/60'
                  }`}
                >
                  <Building2 className="w-3 h-3" />
                  <span>Storefront</span>
                </button>
                <button
                  type="button"
                  id="about-photo-counter-btn"
                  onClick={() => setActivePhoto('counter')}
                  className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    activePhoto === 'counter'
                      ? 'bg-[#8B1D24] text-white shadow-xs'
                      : 'text-[#5C3F2E] hover:bg-white/60'
                  }`}
                >
                  <Store className="w-3 h-3" />
                  <span>Main Counter</span>
                </button>
                <button
                  type="button"
                  id="about-photo-store-btn"
                  onClick={() => setActivePhoto('store')}
                  className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    activePhoto === 'store'
                      ? 'bg-[#8B1D24] text-white shadow-xs'
                      : 'text-[#5C3F2E] hover:bg-white/60'
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Displays</span>
                </button>
              </div>

              {/* Decorative Accent Box */}
              <div className="bg-[#8B1D24] text-white p-4 sm:p-5 rounded-2xl shadow-lg">
                <p className="font-serif text-base font-bold flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-300" />
                  Barrackpore, WB
                </p>
                <p className="text-xs text-amber-100/90 mt-1 leading-relaxed">
                  Convenient local sweet shop serving Anandapuri & Old Calcutta Road with fresh daily preparations.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Exact Copy & Pillars */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            
            {/* Prompt Mandated Copy */}
            <div className="bg-[#FAF3E8] p-6 sm:p-8 rounded-3xl border border-[#EBDCCB] shadow-xs">
              <p className="text-base sm:text-lg md:text-xl text-[#3A2418] leading-relaxed font-normal">
                <strong>Gopal Sweets</strong> is a local sweet shop serving customers in Barrackpore, West Bengal. We aim to bring delicious traditional sweets and snacks to customers in a warm and welcoming environment. Whether you're looking for something sweet for a special occasion or a quick snack, Gopal Sweets is a convenient local destination.
              </p>
            </div>

            {/* Core Values / Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              
              <div className="bg-white rounded-2xl p-4 border border-[#ECDCCB] shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-[#D97706] flex items-center justify-center mb-3">
                  <Heart className="w-5 h-5 text-[#8B1D24]" />
                </div>
                <h3 className="font-serif text-base font-bold text-[#8B1D24]">
                  Traditional Taste
                </h3>
                <p className="text-xs text-[#6B5040] mt-1">
                  Classic Indian & Bengali sweet recipes prepared with care.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-[#ECDCCB] shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-red-50 text-[#8B1D24] flex items-center justify-center mb-3">
                  <Coffee className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-base font-bold text-[#8B1D24]">
                  Tea-Time Snacks
                </h3>
                <p className="text-xs text-[#6B5040] mt-1">
                  Crispy samosas, kachoris, and savory bites.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-[#ECDCCB] shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-[#D97706] flex items-center justify-center mb-3">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-base font-bold text-[#8B1D24]">
                  Celebrations
                </h3>
                <p className="text-xs text-[#6B5040] mt-1">
                  Sweets for family gatherings, pujas, and everyday cravings.
                </p>
              </div>

            </div>

            {/* Location Reference Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#FAF1E3] border border-[#E3D0BB]">
              <div>
                <p className="text-xs font-semibold text-[#8B1D24] uppercase tracking-wider">
                  Our Address in Barrackpore
                </p>
                <p className="text-sm font-medium text-[#4A3223] mt-0.5">
                  181, 93/4 Old Calcutta Rd, Anandapuri, Barrackpore, West Bengal 700122
                </p>
              </div>
              <a
                href={BUSINESS_INFO.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="about-view-map-btn"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#8B1D24] text-white text-xs font-bold shrink-0 hover:bg-[#6e141a] transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>View on Map</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
