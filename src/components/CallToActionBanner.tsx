import React from 'react';
import { Phone, Navigation, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';
import sweetShopStoreImage from '../assets/images/sweet_shop_store_1787856818608.jpg';

export const CallToActionBanner: React.FC = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-[#5C0F15] text-white">
      {/* Background Image with Deep Maroon Overlay */}
      <div className="absolute inset-0 z-0 opacity-25">
        <img
          src={sweetShopStoreImage}
          alt="Gopal Sweets Counter & Sweets Background"
          className="w-full h-full object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Decorative Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#5C0F15] via-[#7A151C]/90 to-[#5C0F15]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <span className="text-xs uppercase tracking-widest text-amber-300 font-bold mb-3 inline-block">
          Barrackpore • Old Calcutta Road
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
          Craving Something Sweet?
        </h2>

        <p className="text-base sm:text-xl text-amber-100/90 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
          Visit <strong>Gopal Sweets</strong> in Barrackpore or get in touch with us today.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* Call Now */}
          <a
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            id="cta-banner-call-btn"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#FAF0E1] text-[#7A151C] hover:bg-white text-base font-bold shadow-xl transition-all duration-200 active:scale-95"
          >
            <Phone className="w-5 h-5 text-[#7A151C]" />
            <span>Call Now: {BUSINESS_INFO.phone}</span>
          </a>

          {/* Get Directions */}
          <a
            href={BUSINESS_INFO.googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="cta-banner-directions-btn"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#8B1D24]/80 text-white hover:bg-[#8B1D24] border border-amber-300/40 text-base font-bold shadow-xl transition-all duration-200 active:scale-95"
          >
            <Navigation className="w-5 h-5 text-amber-300" />
            <span>Get Directions</span>
          </a>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs sm:text-sm text-amber-200/80">
          <MapPin className="w-4 h-4 text-amber-300 shrink-0" />
          <span>181, 93/4 Old Calcutta Rd, Anandapuri, Barrackpore, West Bengal 700122</span>
        </div>

      </div>
    </section>
  );
};
