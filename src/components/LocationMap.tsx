import React from 'react';
import { MapPin, Navigation, ExternalLink, Compass, Store } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';
import sweetShopFrontImage from '../assets/images/sweet_shop_front_1787856802329.jpg';

export const LocationMap: React.FC = () => {
  /*
   * NOTE FOR DEVELOPER / BUSINESS OWNER:
   * To use Google Maps Embed API with a dedicated Google Maps API Key:
   * 1. Add your key to .env as VITE_GOOGLE_MAPS_API_KEY
   * 2. Replace the iframe src below with:
   * `https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=181,+93/4+Old+Calcutta+Rd,+Anandapuri,+Barrackpore,+West+Bengal+700122`
   * The current embedded map uses open location coordinates for Barrackpore / Old Calcutta Road.
   */

  const encodedAddress = encodeURIComponent(BUSINESS_INFO.address);
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="find-us" className="py-16 md:py-24 bg-[#FAF5EB] border-t border-[#ECDCCB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B1D24]/10 text-[#8B1D24] text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-[#D97706]" />
            Find Our Shop
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#8B1D24] tracking-tight">
            Visit Gopal Sweets
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#614736]">
            Conveniently located on Old Calcutta Road in Anandapuri, Barrackpore.
          </p>
          <div className="w-16 h-1 bg-[#D97706] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Address Information Card */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white p-6 sm:p-8 rounded-3xl border border-[#ECDCCB] shadow-sm">
            <div className="space-y-6">
              
              <div>
                <span className="text-xs font-bold text-[#8B1D24] uppercase tracking-wider">
                  Primary Business Address
                </span>
                <div className="flex items-start gap-3 mt-2">
                  <div className="w-9 h-9 rounded-full bg-red-50 text-[#8B1D24] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-[#2D1B14] leading-snug">
                      {BUSINESS_INFO.address}
                    </p>
                    <p className="text-xs text-[#7A5E4D] mt-1">
                      Landmark / Area: Anandapuri, Barrackpore
                    </p>
                  </div>
                </div>
              </div>

              {/* Sweet Shop Storefront Photo Visual */}
              <div className="relative rounded-2xl overflow-hidden border border-[#E8D7C4] shadow-xs group">
                <img
                  src={sweetShopFrontImage}
                  alt="Gopal Sweets sweet shop storefront on Old Calcutta Road in Barrackpore"
                  className="w-full h-32 sm:h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                  <div className="flex items-center gap-1.5 text-white text-xs font-semibold">
                    <Store className="w-3.5 h-3.5 text-amber-300" />
                    <span>Look for Gopal Sweets on Old Calcutta Road</span>
                  </div>
                </div>
              </div>

              {/* Google Listing Plus Code / Alternate Listing Address */}
              <div className="p-3.5 rounded-2xl bg-[#FAF3E7] border border-[#E8D7C4]">
                <span className="text-[11px] font-semibold text-[#8B1D24] uppercase tracking-wider block">
                  Google Listing Reference Address
                </span>
                <p className="text-xs font-medium text-[#4A3223] mt-0.5">
                  {BUSINESS_INFO.googleListingAddress}
                </p>
              </div>

              {/* Transit & Landmark info */}
              <div className="text-xs sm:text-sm text-[#614736] space-y-1.5">
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#8B1D24]" />
                  <span>Located directly on <strong>Old Calcutta Road</strong></span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D97706]" />
                  <span>Easy walking & rickshaw access from Barrackpore Anandapuri</span>
                </p>
              </div>

            </div>

            {/* CTA Buttons */}
            <div className="mt-8 pt-6 border-t border-[#F0E4D5] flex flex-col sm:flex-row gap-3">
              <a
                href={BUSINESS_INFO.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="maps-get-directions-btn"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#8B1D24] hover:bg-[#6e141a] text-white font-bold text-sm shadow transition-all active:scale-95"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>

              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="maps-open-location-btn"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FAF0E2] text-[#8B1D24] border border-[#D9C4AC] font-bold text-sm hover:bg-[#F3E2CF] transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>
            </div>

          </div>

          {/* Right Column: Google Maps Embed Frame */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden shadow-md border-2 border-[#E9D8C6] bg-white min-h-[380px] sm:min-h-[440px] relative">
            <iframe
              title="Gopal Sweets Barrackpore Location Map"
              src={mapEmbedUrl}
              className="w-full h-full min-h-[380px] sm:min-h-[440px] border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
            
            {/* Overlay link fallback on top-right */}
            <div className="absolute top-3 right-3">
              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/95 backdrop-blur-xs text-[#8B1D24] text-xs font-bold px-3 py-1.5 rounded-lg shadow-md border border-[#ECDCCB] hover:bg-[#8B1D24] hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>View Full Map</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
