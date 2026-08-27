import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BUSINESS_INFO } from '../data/businessData';

export const CartDrawer: React.FC = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    packagingFee,
    deliveryFee,
    calculateTotal,
    setIsCheckoutOpen,
  } = useCart();

  if (!isCartOpen) return null;

  const total = calculateTotal('pickup'); // Default reference total

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="cart-slide-over-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FCF9F2] shadow-2xl flex flex-col justify-between border-l border-[#E6D5C3] animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="px-5 py-4 border-b border-[#E8DACB] bg-[#F7EFE4] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#8B1D24] text-white flex items-center justify-center shadow-xs">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 id="cart-slide-over-title" className="font-serif text-lg font-bold text-[#4A3327]">
                  Your Sweet Box ({cartItems.reduce((s, i) => s + i.quantity, 0)})
                </h2>
                <p className="text-[11px] text-[#7A5A43]">Gopal Sweets • Barrackpore</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cartItems.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs text-[#8B1D24] hover:text-[#5C0F15] font-semibold px-2 py-1 rounded hover:bg-[#EBDCCB] transition-colors"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                id="cart-drawer-close-btn"
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-lg text-[#7A5A43] hover:text-[#4A3327] hover:bg-[#EBDCCB] transition-colors"
                aria-label="Close cart drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-5 py-4 divide-y divide-[#EEDECF]">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#F0E2D2] text-[#8B1D24] flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#4A3327] mb-1">Your cart is empty</h3>
                <p className="text-xs text-[#7A5A43] max-w-xs mb-6">
                  Add fresh Rosogolla, Sandesh, Kaju Katli, or hot Bengali Shingara to start your order!
                </p>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-full bg-[#8B1D24] text-white font-bold text-sm shadow hover:bg-[#6e141a] transition-all"
                >
                  Explore Sweets Menu
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.cartItemId} className="py-3.5 flex items-center gap-3 group">
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover border border-[#DFCBB7] shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-sm text-[#4A3327] truncate">{item.name}</h4>
                    <p className="text-xs text-[#7A5A43] truncate">{item.selectedUnitLabel}</p>
                    <p className="text-xs font-bold text-[#8B1D24] mt-0.5">
                      ₹{item.unitPrice} <span className="text-[10px] text-[#7A5A43] font-normal">each</span>
                    </p>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-1.5 bg-[#F0E4D5] rounded-lg p-1 border border-[#DFCEBD]">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                      className="w-6 h-6 rounded flex items-center justify-center text-[#4A3327] hover:bg-[#DFCEBD] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      {item.quantity === 1 ? <Trash2 className="w-3.5 h-3.5 text-red-700" /> : <Minus className="w-3.5 h-3.5" />}
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-[#4A3327]">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                      className="w-6 h-6 rounded flex items-center justify-center text-[#4A3327] hover:bg-[#DFCEBD] transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right shrink-0">
                    <span className="font-bold text-sm text-[#4A3327]">
                      ₹{item.unitPrice * item.quantity}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout Button */}
          {cartItems.length > 0 && (
            <div className="p-5 bg-[#F7EFE4] border-t border-[#E8DACB] space-y-3.5">
              {/* Packaging / Free Delivery Perk Badge */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 flex items-start gap-2 text-xs text-amber-900">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Fresh Daily Guarantee:</span> All sweets packed in sealed food-grade containers with sweet syrup preservation.
                </div>
              </div>

              {/* Bill Details */}
              <div className="space-y-1.5 text-xs text-[#5D4638]">
                <div className="flex justify-between">
                  <span>Items Total</span>
                  <span className="font-semibold text-[#4A3327]">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Hygienic Box Packaging</span>
                  <span className="font-semibold text-[#4A3327]">
                    {packagingFee === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : `₹${packagingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-[#7A5A43]">
                  <span>Delivery / Pickup</span>
                  <span className="font-semibold">Calculated at Checkout</span>
                </div>
                <div className="pt-2 border-t border-[#E2D1BF] flex justify-between items-center text-sm font-bold text-[#4A3327]">
                  <span className="font-serif">Estimated Total</span>
                  <span className="text-base text-[#8B1D24]">₹{subtotal + packagingFee}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                id="cart-drawer-checkout-btn"
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-[#8B1D24] hover:bg-[#6e141a] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <span>Proceed to Checkout & Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#7A5A43]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>UPI QR, Counter Pay & Cash on Delivery Accepted</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
