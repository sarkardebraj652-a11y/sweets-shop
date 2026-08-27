import React, { useState } from 'react';
import { Phone, Sparkles, Utensils, Info, ShoppingBag, Plus, Minus, Check, ArrowRight } from 'lucide-react';
import { SWEET_CATEGORIES, BUSINESS_INFO } from '../data/businessData';
import { useCart } from '../context/CartContext';
import { SweetItem, SweetUnitOption } from '../types';

export const SweetsAndSnacks: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('indian-sweets');
  const { cartItems, addToCart, updateQuantity, setIsCartOpen, totalItemCount, subtotal } = useCart();

  // Selected unit options per item: { [itemId]: selectedUnitOptionId }
  const [selectedUnits, setSelectedUnits] = useState<{ [itemId: string]: string }>({});
  const [justAdded, setJustAdded] = useState<{ [itemId: string]: boolean }>({});

  const activeCategory = SWEET_CATEGORIES.find((cat) => cat.id === activeCategoryId) || SWEET_CATEGORIES[0];

  const getSelectedOption = (item: SweetItem): SweetUnitOption => {
    const selectedId = selectedUnits[item.id];
    if (selectedId && item.unitOptions) {
      const match = item.unitOptions.find((opt) => opt.id === selectedId);
      if (match) return match;
    }
    return item.unitOptions && item.unitOptions.length > 0
      ? item.unitOptions[0]
      : { id: 'default', label: item.baseUnit || 'Standard', multiplier: 1, price: item.basePrice || 100 };
  };

  const handleUnitSelect = (itemId: string, unitId: string) => {
    setSelectedUnits((prev) => ({ ...prev, [itemId]: unitId }));
  };

  const handleAddToCart = (item: SweetItem) => {
    const unitOption = getSelectedOption(item);
    addToCart(item, unitOption, 1);

    // Visual pulse feedback
    setJustAdded((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setJustAdded((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  const getItemCartQuantity = (item: SweetItem, unitOption: SweetUnitOption) => {
    const cartItemId = `${item.id}-${unitOption.id}`;
    const found = cartItems.find((i) => i.cartItemId === cartItemId);
    return found ? found.quantity : 0;
  };

  return (
    <section id="sweets-snacks" className="py-16 md:py-24 bg-[#FAF5EC] border-y border-[#ECDDCB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B1D24]/10 text-[#8B1D24] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
            What We Offer
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#8B1D24] tracking-tight">
            Sweets & Snacks Menu
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#614736]">
            Explore our handcrafted traditional varieties, Bengali chhena sweets, tea-time savories, and festive boxes. Add directly to your cart for pickup or delivery!
          </p>
          <div className="w-16 h-1 bg-[#D97706] mx-auto mt-4 rounded-full" />
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          {SWEET_CATEGORIES.map((category) => {
            const isSelected = category.id === activeCategoryId;
            return (
              <button
                key={category.id}
                id={`cat-tab-${category.id}`}
                type="button"
                onClick={() => setActiveCategoryId(category.id)}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer shadow-xs ${
                  isSelected
                    ? 'bg-[#8B1D24] text-white shadow-md scale-102 ring-2 ring-[#8B1D24]/30'
                    : 'bg-white text-[#523A2B] hover:bg-[#F3E5D3] hover:text-[#8B1D24] border border-[#E3D1BE]'
                }`}
              >
                {category.title}
              </button>
            );
          })}
        </div>

        {/* Category Description Banner */}
        <div className="bg-[#FAF0E1] border border-[#E2CEB8] rounded-2xl p-4 sm:p-5 mb-8 text-center max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#8B1D24]">
              {activeCategory.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#614636] mt-0.5">
              {activeCategory.description}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs bg-[#8B1D24]/10 text-[#8B1D24] font-bold px-3 py-1 rounded-full">
              {activeCategory.badge || 'Fresh Daily'}
            </span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeCategory.items.map((item) => {
            const currentOption = getSelectedOption(item);
            const inCartQty = getItemCartQuantity(item, currentOption);
            const isAdded = justAdded[item.id];

            return (
              <div
                key={item.id}
                id={`sweet-card-${item.id}`}
                className="bg-white rounded-2xl overflow-hidden border border-[#E9D9C7] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group justify-between"
              >
                {/* Product Visual */}
                <div>
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-[#FAF2E6]">
                    <img
                      src={item.image}
                      alt={item.altText}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-[#8B1D24]/90 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow">
                      {item.tag}
                    </div>

                    {item.popular && (
                      <div className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow">
                        Popular
                      </div>
                    )}
                  </div>

                  {/* Product Content */}
                  <div className="p-4 sm:p-5">
                    <h4 className="font-serif text-lg font-bold text-[#2D1B14] group-hover:text-[#8B1D24] transition-colors line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#664D3D] mt-1.5 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>

                    {/* Weight / Pack Options Selector */}
                    {item.unitOptions && item.unitOptions.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-[#F2E7DC]">
                        <span className="text-[11px] font-bold text-[#7A5A43] block mb-1.5 uppercase tracking-wide">
                          Select Portion / Pack:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {item.unitOptions.map((opt) => {
                            const isOptActive = currentOption.id === opt.id;
                            return (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() => handleUnitSelect(item.id, opt.id)}
                                className={`text-[11px] px-2.5 py-1 rounded-lg font-semibold transition-all ${
                                  isOptActive
                                    ? 'bg-[#8B1D24] text-white shadow-2xs'
                                    : 'bg-[#F7EFE4] text-[#5C4537] hover:bg-[#EBDCCB] border border-[#E3D1BE]'
                                }`}
                              >
                                {opt.id.toUpperCase()} (₹{opt.price})
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Pricing & Add to Cart Controls */}
                <div className="p-4 sm:p-5 pt-0">
                  <div className="mt-2 pt-3 border-t border-[#F0E4D5] flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-[#8B1D24]">₹{currentOption.price}</span>
                      <span className="text-[10px] text-[#7A5A43] block -mt-0.5 truncate max-w-[120px]">
                        {currentOption.label}
                      </span>
                    </div>

                    {/* Add / Quantity Button */}
                    {inCartQty > 0 ? (
                      <div className="flex items-center gap-1 bg-[#8B1D24] text-white rounded-xl p-1 shadow-xs">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(`${item.id}-${currentOption.id}`, inCartQty - 1)
                          }
                          className="w-7 h-7 rounded-lg hover:bg-black/20 flex items-center justify-center transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold">{inCartQty}</span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(`${item.id}-${currentOption.id}`, inCartQty + 1)
                          }
                          className="w-7 h-7 rounded-lg hover:bg-black/20 flex items-center justify-center transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        id={`add-to-cart-btn-${item.id}`}
                        onClick={() => handleAddToCart(item)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95 cursor-pointer ${
                          isAdded
                            ? 'bg-emerald-700 text-white'
                            : 'bg-[#8B1D24] hover:bg-[#6e141a] text-white hover:shadow'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add to Cart</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Floating / Sticky Cart Callout Bar when Cart has Items */}
        {totalItemCount > 0 && (
          <div className="mt-8 bg-[#8B1D24] text-white rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <ShoppingBag className="w-5 h-5 text-amber-200" />
              </div>
              <div>
                <p className="font-serif font-bold text-base sm:text-lg">
                  {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'} in your Sweet Box • ₹{subtotal}
                </p>
                <p className="text-xs text-amber-200">
                  Ready for instant UPI Payment, Shop Pickup or Local Barrackpore Delivery
                </p>
              </div>
            </div>

            <button
              type="button"
              id="sticky-cart-view-btn"
              onClick={() => setIsCartOpen(true)}
              className="px-6 py-2.5 rounded-full bg-white text-[#8B1D24] hover:bg-amber-100 font-bold text-xs sm:text-sm shadow flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
            >
              <span>View Cart & Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Informational Disclaimer on Visual Variety */}
        <div className="mt-10 bg-white rounded-2xl p-4 sm:p-5 border border-[#E5D5C2] max-w-3xl mx-auto flex items-start gap-3.5 shadow-xs">
          <Info className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-[#614736] space-y-1">
            <p className="font-semibold text-[#8B1D24]">
              Fresh Preparation & Custom Bulk Orders:
            </p>
            <p className="leading-relaxed">
              Every sweet is crafted fresh every morning using pure chhena and wholesome ingredients. Need customized wedding or puja sweet platters in bulk? Call us or note your instructions during checkout!
            </p>
          </div>
        </div>

        {/* Category CTA Button */}
        <div className="mt-10 text-center">
          <a
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            id="sweets-ask-about-sweets-btn"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#8B1D24] hover:bg-[#6e141a] text-white text-base font-bold shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#8B1D24] focus:ring-offset-2"
          >
            <Phone className="w-5 h-5" />
            <span>Call for Inquiries: {BUSINESS_INFO.phone}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
