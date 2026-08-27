import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, MapPin, Clock, ShoppingBag } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItemCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Sweets & Snacks', href: '#sweets-snacks' },
    { label: 'Order & Pay', href: '#order-online' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Hours', href: '#hours' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top Announcement Bar with Address & Hours highlight */}
      <div className="bg-[#5C0F15] text-[#FAF2E6] text-xs sm:text-sm py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
            <span className="truncate">181, 93/4 Old Calcutta Rd, Anandapuri, Barrackpore, WB 700122</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="hidden md:flex items-center gap-1.5 text-amber-200">
              <Clock className="w-3 h-3 text-amber-300" />
              Open Daily: 6:30 AM – 12:00 PM (Sun till 12:30 PM)
            </span>
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              id="topbar-call-link"
              className="text-[#FBBF24] hover:text-white font-semibold flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3 h-3" />
              {BUSINESS_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FCF9F2]/95 backdrop-blur-md shadow-md py-2.5 border-b border-[#EBDCCB]'
            : 'bg-[#FCF9F2] py-3.5 border-b border-[#F0E4D5]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo / Brand Name */}
            <a
              href="#home"
              id="header-brand-logo"
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#8B1D24] rounded-lg p-1"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#8B1D24] to-[#611016] text-[#FAF2E6] flex items-center justify-center font-serif text-xl sm:text-2xl font-bold shadow-sm ring-2 ring-[#D97706]/40 group-hover:scale-105 transition-transform">
                G
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#8B1D24] tracking-tight leading-tight group-hover:text-[#611016] transition-colors">
                  Gopal Sweets
                </span>
                <span className="text-[10px] sm:text-xs text-[#7A5A43] font-medium tracking-wider uppercase">
                  Barrackpore • Traditional Sweets
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    id={`nav-link-${link.href.replace('#', '')}`}
                    className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-150 ${
                      isActive
                        ? 'text-[#8B1D24] bg-[#8B1D24]/10 font-bold'
                        : 'text-[#4A3327] hover:text-[#8B1D24] hover:bg-[#F3E7D7]'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* Header Actions: Cart Button & Call Now */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Cart Drawer Trigger */}
              <button
                type="button"
                id="header-cart-btn"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-full bg-white border border-[#DECDBB] text-[#4A3327] hover:text-[#8B1D24] hover:border-[#8B1D24] transition-all shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer flex items-center gap-1.5 px-3.5"
                aria-label={`View Cart (${totalItemCount} items)`}
              >
                <ShoppingBag className="w-4 h-4 text-[#8B1D24]" />
                <span className="text-xs font-bold">Sweet Box</span>
                {totalItemCount > 0 && (
                  <span className="inline-flex items-center justify-center w-5 h-5 text-[11px] font-bold text-white bg-[#8B1D24] rounded-full animate-in zoom-in">
                    {totalItemCount}
                  </span>
                )}
              </button>

              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                id="header-call-btn"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#8B1D24] hover:bg-[#6e141a] text-white text-sm font-bold shadow-sm transition-all duration-200 hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#8B1D24] focus:ring-offset-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </a>
            </div>

            {/* Mobile Header Actions (Cart + Menu Toggle) */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                id="mobile-header-cart-btn"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-full bg-white border border-[#DECDBB] text-[#8B1D24]"
                aria-label={`Cart with ${totalItemCount} items`}
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#8B1D24] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItemCount}
                  </span>
                )}
              </button>

              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                id="mobile-header-call-icon"
                className="sm:hidden p-2 rounded-full bg-[#8B1D24] text-white"
                aria-label="Call Gopal Sweets"
              >
                <Phone className="w-4 h-4" />
              </a>

              <button
                type="button"
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-[#4A3327] hover:text-[#8B1D24] hover:bg-[#F3E7D7] focus:outline-none focus:ring-2 focus:ring-[#8B1D24]"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#EBDCCB] bg-[#FCF9F2] px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  id={`mobile-nav-${link.href.replace('#', '')}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-lg text-base font-semibold text-[#4A3327] hover:text-[#8B1D24] hover:bg-[#F3E7D7] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-[#EBDCCB] flex flex-col gap-2.5">
              <button
                type="button"
                id="mobile-drawer-cart-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white border border-[#DFCBB7] text-[#4A3327] font-bold text-center shadow-xs"
              >
                <ShoppingBag className="w-5 h-5 text-[#8B1D24]" />
                <span>View Sweet Box ({totalItemCount} items)</span>
              </button>

              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                id="mobile-drawer-call-btn"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#8B1D24] hover:bg-[#6e141a] text-white font-bold text-center shadow transition-all"
              >
                <Phone className="w-5 h-5" />
                <span>Call Now (+91 74394 27696)</span>
              </a>
              <a
                href={BUSINESS_INFO.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="mobile-drawer-directions-btn"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#FAF0E2] text-[#8B1D24] border border-[#E0CDB9] font-bold text-center hover:bg-[#F3E2CF] transition-colors"
              >
                <MapPin className="w-5 h-5 text-[#8B1D24]" />
                <span>Get Directions on Google Maps</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
