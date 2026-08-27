import React from 'react';
import { Phone, Mail, Instagram, MapPin, Clock, ArrowUp, Star } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#260B0E] text-[#FAF0E1] border-t border-[#401217] pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#4A161C]">
          
          {/* Brand & Summary (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B1D24] to-[#B91C1C] text-[#FAF2E6] flex items-center justify-center font-serif text-xl font-bold shadow ring-2 ring-[#D97706]/40">
                G
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-white tracking-tight">
                  {BUSINESS_INFO.name}
                </h3>
                <p className="text-xs text-amber-300 font-medium">
                  Sweet Shop in Barrackpore, West Bengal
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#D1B8A8] leading-relaxed">
              Serving traditional Indian sweets, Bengali classics, and crispy snacks to families in Barrackpore and surrounding areas.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-amber-200">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i < 4 ? 'fill-amber-400' : 'text-amber-500 fill-amber-300/40'}`} />
                ))}
              </div>
              <span className="font-bold text-white">{BUSINESS_INFO.googleRating}★</span>
              <span>({BUSINESS_INFO.googleReviewCount} Google Reviews)</span>
            </div>
          </div>

          {/* Quick Navigation Links (Col 5-7) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-base font-bold text-amber-300 uppercase tracking-wider text-xs">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-[#D1B8A8]">
              <li>
                <a href="#home" className="hover:text-amber-200 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-200 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#sweets-snacks" className="hover:text-amber-200 transition-colors">
                  Sweets & Snacks
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-amber-200 transition-colors">
                  Photo Gallery
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-200 transition-colors">
                  Customer Reviews
                </a>
              </li>
              <li>
                <a href="#hours" className="hover:text-amber-200 transition-colors">
                  Business Hours
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-200 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#find-us" className="hover:text-amber-200 transition-colors">
                  Find Us / Location
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details (Col 8-12) */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="font-serif text-base font-bold text-amber-300 uppercase tracking-wider text-xs">
              Store Information
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-[#D1B8A8]">
              
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{BUSINESS_INFO.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  id="footer-call-link"
                  className="hover:text-white font-semibold underline"
                >
                  {BUSINESS_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  id="footer-email-link"
                  className="hover:text-white underline break-all"
                >
                  {BUSINESS_INFO.email}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
                <a
                  href={BUSINESS_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="footer-instagram-link"
                  className="hover:text-white underline"
                >
                  {BUSINESS_INFO.instagramHandle}
                </a>
              </div>

              <div className="flex items-start gap-2.5 pt-1 text-[11px] text-amber-200/80">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Open: 6:30 AM – 12:00 PM (Sun till 12:30 PM)</span>
              </div>

            </div>
          </div>

        </div>

        {/* Local SEO keywords footnote strip */}
        <div className="py-4 text-[11px] text-[#A68878] border-b border-[#3D1015] flex flex-wrap items-center justify-between gap-2">
          <span>Gopal Sweets Barrackpore • Anandapuri • Old Calcutta Road • Sweet Shop West Bengal</span>
          <span>Traditional Bengali Sweets • Samosas • Khasta Kachori • Rosogolla</span>
        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#BFA695]">
          <p>© 2026 Gopal Sweets. All Rights Reserved.</p>
          
          <button
            type="button"
            id="back-to-top-btn"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#4A161C] hover:bg-[#5C0F15] text-[#FAF0E1] transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-amber-300" />
          </button>
        </div>

      </div>
    </footer>
  );
};
