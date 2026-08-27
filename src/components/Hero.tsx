import React from 'react';
import { Phone, Navigation, UtensilsCrossed, Star, MapPin, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';
import shopCounterImage from '../assets/images/gopal_sweets_counter_1787842684303.jpg';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative overflow-hidden bg-[#FAF6EE] pt-8 pb-16 md:pt-14 md:pb-24 border-b border-[#EEDFCD]">
      {/* Decorative Traditional Backdrop Motifs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#8B1D24]/5 to-[#D97706]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#D97706]/5 to-[#8B1D24]/5 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Top Local Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B1D24]/10 border border-[#8B1D24]/20 text-[#8B1D24] text-xs sm:text-sm font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Traditional Sweet Shop in Barrackpore, West Bengal</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#8B1D24] tracking-tight leading-[1.15]">
                Traditional Taste, <br className="hidden sm:inline" />
                <span className="text-[#A4252F]">Made With Love</span>
              </h1>
              <p className="text-lg sm:text-xl font-medium text-[#78350F]">
                Delicious Indian sweets and snacks for every occasion.
              </p>
            </div>

            {/* Prompt Mandated Introductory Paragraph */}
            <p className="text-base sm:text-lg text-[#523A2B] leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Welcome to <strong>Gopal Sweets</strong>, your local sweet shop in Barrackpore, West Bengal. Discover delicious traditional sweets and popular snacks made to bring sweetness to every celebration and everyday moment.
            </p>

            {/* Location Pill */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-[#654836] bg-[#F4EDE0] p-2.5 rounded-xl border border-[#E5D5C2] max-w-xl mx-auto lg:mx-0">
              <MapPin className="w-4 h-4 text-[#8B1D24] shrink-0" />
              <span className="truncate font-medium">181, 93/4 Old Calcutta Rd, Anandapuri, Barrackpore</span>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
              {/* Primary CTA: Explore Our Sweets */}
              <a
                href="#sweets-snacks"
                id="hero-explore-sweets-btn"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#8B1D24] hover:bg-[#6e141a] text-white text-base font-bold shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#8B1D24] focus:ring-offset-2"
              >
                <UtensilsCrossed className="w-5 h-5" />
                <span>Explore Our Sweets</span>
              </a>

              {/* Primary CTA 2: Get Directions */}
              <a
                href={BUSINESS_INFO.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-get-directions-btn"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#FAF0E2] text-[#8B1D24] hover:bg-[#F3E2CF] border border-[#D9C4AC] text-base font-bold shadow-sm transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#8B1D24]"
              >
                <Navigation className="w-5 h-5 text-[#8B1D24]" />
                <span>Get Directions</span>
              </a>

              {/* Smaller CTA: Call Us */}
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                id="hero-call-us-btn"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/80 hover:bg-white text-[#4A3327] hover:text-[#8B1D24] border border-[#E6D8C8] text-sm font-semibold shadow-xs transition-colors active:scale-95"
              >
                <Phone className="w-4 h-4 text-[#D97706]" />
                <span>Call Us</span>
              </a>
            </div>

            {/* Quick Micro Trust Indicators */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-[#6E4F3B]">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < 4 ? 'fill-amber-400 text-amber-500' : 'text-amber-300 fill-amber-200'}`} />
                  ))}
                </div>
                <span className="font-bold text-[#2D1B14]">{BUSINESS_INFO.googleRating}★</span>
                <span>(216+ Google Reviews)</span>
              </div>
            </div>

          </div>

          {/* Right Visual Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FDFBF7] bg-[#FAF3E7]">
                <img
                  src={shopCounterImage}
                  alt="Gopal Sweets shop display counter in Barrackpore with fresh sweets and snacks"
                  className="w-full h-80 sm:h-96 lg:h-[430px] object-cover hover:scale-105 transition-transform duration-700"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Photo Caption */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="bg-[#8B1D24]/90 backdrop-blur-xs px-3.5 py-1 rounded-full font-semibold border border-amber-300/30 shadow">
                      Gopal Sweets Counter • Barrackpore
                    </span>
                    <span className="text-amber-200 font-semibold drop-shadow">
                      Fresh Daily
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Highlight Card 1: Rasgulla & Sandesh */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-[#ECDCCB] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FAF1E3] flex items-center justify-center text-xl">
                  🍯
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#8B1D24]">Bengali Classics</p>
                  <p className="text-[11px] text-[#785C4B]">Rasgulla & Sandesh</p>
                </div>
              </div>

              {/* Floating Highlight Card 2: Tea-time snacks */}
              <div className="absolute -bottom-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-[#ECDCCB] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FAF1E3] flex items-center justify-center text-xl">
                  🥟
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#8B1D24]">Fresh Snacks</p>
                  <p className="text-[11px] text-[#785C4B]">Samosa & Kachori</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
