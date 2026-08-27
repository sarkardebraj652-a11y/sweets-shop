import React from 'react';
import { Phone, Navigation, ShoppingBag, ArrowRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';
import { useCart } from '../context/CartContext';

export const MobileQuickBar: React.FC = () => {
  const { totalItemCount, subtotal, setIsCartOpen } = useCart();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FCF9F2]/95 backdrop-blur-md border-t border-[#E8DAC9] p-2.5 shadow-2xl px-4">
      {/* If items in cart, show prominent cart checkout banner */}
      {totalItemCount > 0 && (
        <button
          type="button"
          id="mobile-sticky-active-cart-btn"
          onClick={() => setIsCartOpen(true)}
          className="w-full mb-2 py-2.5 px-3.5 rounded-xl bg-[#8B1D24] text-white text-xs font-bold flex items-center justify-between shadow-md active:scale-98 transition-transform"
        >
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
              {totalItemCount}
            </span>
            <span>View Sweet Box • ₹{subtotal}</span>
          </div>
          <div className="flex items-center gap-1 text-amber-200">
            <span>Pay & Order</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </button>
      )}

      <div className="flex items-center justify-between gap-2.5">
        {/* Call Button */}
        <a
          href={`tel:${BUSINESS_INFO.phoneRaw}`}
          id="mobile-sticky-call-btn"
          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#8B1D24] text-white font-bold text-xs shadow-sm active:scale-95 transition-transform"
        >
          <Phone className="w-4 h-4" />
          <span>Call Shop</span>
        </a>

        {/* Directions Button */}
        <a
          href={BUSINESS_INFO.googleMapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          id="mobile-sticky-directions-btn"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#FAF0E1] text-[#8B1D24] border border-[#D9C4AC] font-bold text-xs shadow-sm active:scale-95 transition-transform"
        >
          <Navigation className="w-4 h-4 text-[#8B1D24]" />
          <span>Directions</span>
        </a>

        {/* Cart Quick Toggle */}
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          id="mobile-sticky-cart-toggle-btn"
          className="relative p-2.5 rounded-xl bg-white border border-[#D9C4AC] text-[#8B1D24] active:scale-95 transition-transform"
          aria-label={`Cart with ${totalItemCount} items`}
        >
          <ShoppingBag className="w-4 h-4" />
          {totalItemCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#8B1D24] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {totalItemCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
