import React from 'react';
import {
  ShoppingBag,
  CreditCard,
  QrCode,
  ShieldCheck,
  Truck,
  Store,
  ArrowRight,
  Clock,
  Sparkles,
  CheckCircle,
  Phone,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BUSINESS_INFO } from '../data/businessData';

export const CartCheckoutSection: React.FC = () => {
  const {
    cartItems,
    totalItemCount,
    subtotal,
    packagingFee,
    setIsCartOpen,
    setIsCheckoutOpen,
  } = useCart();

  return (
    <section id="order-online" className="py-14 sm:py-20 bg-[#F5ECE0] border-t border-b border-[#E8DACB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B1D24]/10 text-[#8B1D24] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fast Online Ordering & Payments</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#4A3327] tracking-tight">
            Order Fresh Sweets & Snacks Online
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#6E5442]">
            Select your favorite traditional Bengali & Indian delicacies, add them to your cart, and checkout with Instant UPI QR, Card, or Pay at Shop Counter.
          </p>
        </div>

        {/* Highlight Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          
          {/* Box 1: Live Cart Status */}
          <div className="bg-[#FCF9F2] rounded-2xl p-6 border border-[#E2D1BF] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8B1D24] flex items-center gap-1.5">
                  <ShoppingBag className="w-4 h-4" />
                  Your Current Sweet Box
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#8B1D24]/10 text-[#8B1D24]">
                  {totalItemCount} {totalItemCount === 1 ? 'Item' : 'Items'}
                </span>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-[#F0E2D2] text-[#8B1D24] flex items-center justify-center mx-auto mb-2">
                    <ShoppingBag className="w-6 h-6 opacity-60" />
                  </div>
                  <p className="font-serif font-bold text-[#4A3327] text-sm">Cart is currently empty</p>
                  <p className="text-xs text-[#7A5A43] mt-1">
                    Pick your sweets from the menu above to build your fresh box.
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div
                      key={item.cartItemId}
                      className="flex items-center justify-between text-xs p-2 rounded-lg bg-[#F7EFE4] border border-[#EBDBCB]"
                    >
                      <div className="truncate pr-2">
                        <span className="font-bold text-[#4A3327]">{item.name}</span>
                        <span className="text-[#7A5A43] block text-[11px]">
                          {item.selectedUnitLabel} × {item.quantity}
                        </span>
                      </div>
                      <span className="font-bold text-[#8B1D24] shrink-0">
                        ₹{item.unitPrice * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-[#E8DACB] space-y-3">
              <div className="flex justify-between items-center text-sm font-bold text-[#4A3327]">
                <span>Items Subtotal:</span>
                <span className="text-base text-[#8B1D24]">₹{subtotal}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  id="section-view-cart-btn"
                  onClick={() => setIsCartOpen(true)}
                  className="w-full py-2.5 px-3 rounded-xl bg-white border border-[#DFCBB7] text-[#4A3327] font-bold text-xs hover:bg-[#F3E7D7] transition-colors"
                >
                  View Full Cart
                </button>
                <button
                  type="button"
                  id="section-checkout-btn"
                  disabled={cartItems.length === 0}
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#8B1D24] text-white font-bold text-xs hover:bg-[#6e141a] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xs flex items-center justify-center gap-1"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Box 2: Accepted Payment Options */}
          <div className="bg-[#FCF9F2] rounded-2xl p-6 border border-[#E2D1BF] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <QrCode className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-[#4A3327]">Accepted Payment Methods</h3>
                  <p className="text-[11px] text-[#7A5A43]">Instant, Secure & Convenient</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-[#5D4638]">
                <div className="p-3 bg-[#F8F2E8] rounded-xl border border-[#EADECE] flex items-start gap-2.5">
                  <QrCode className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold text-[#4A3327]">Instant UPI / QR Code</p>
                    <p className="text-[#7A5A43] text-[11px] mt-0.5">
                      Pay instantly with Google Pay, PhonePe, Paytm, or BHIM using shop UPI ID: <strong className="font-mono text-[#8B1D24]">{BUSINESS_INFO.upiId || '7439427696@upi'}</strong>
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-[#F8F2E8] rounded-xl border border-[#EADECE] flex items-start gap-2.5">
                  <Store className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold text-[#4A3327]">Pay at Shop Counter</p>
                    <p className="text-[#7A5A43] text-[11px] mt-0.5">
                      Reserve your items online and pay in Cash or Card when picking up at our Barrackpore shop.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-[#F8F2E8] rounded-xl border border-[#EADECE] flex items-start gap-2.5">
                  <CreditCard className="w-4 h-4 text-purple-700 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold text-[#4A3327]">Debit / Credit Cards & COD</p>
                    <p className="text-[#7A5A43] text-[11px] mt-0.5">
                      RuPay, Visa, Mastercard, and Cash on Delivery supported for local orders.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#E8DACB] flex items-center justify-between text-[11px] text-[#7A5A43]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                100% Safe Payments
              </span>
              <span>Shop: +91 74394 27696</span>
            </div>
          </div>

          {/* Box 3: Fulfillment & Pickup Assurance */}
          <div className="bg-gradient-to-br from-[#8B1D24] to-[#601016] text-white rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-white/20 text-white flex items-center justify-center">
                  <Store className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-white">Store Pickup & Delivery</h3>
                  <p className="text-[11px] text-amber-200">Barrackpore & Surrounding Areas</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-amber-100/90">
                <div className="bg-white/10 rounded-xl p-3 border border-white/15">
                  <p className="font-bold text-white mb-0.5">⚡ Fresh Preparation</p>
                  <p className="text-[11px]">Morning batches prepared daily by experienced confectioners using fresh milk and pure chhena.</p>
                </div>

                <div className="bg-white/10 rounded-xl p-3 border border-white/15">
                  <p className="font-bold text-white mb-0.5">📍 Easy Store Pickup Location</p>
                  <p className="text-[11px]">181, 93/4 Old Calcutta Rd, Anandapuri, Barrackpore. Ready in 20–30 minutes.</p>
                </div>

                <div className="bg-white/10 rounded-xl p-3 border border-white/15">
                  <p className="font-bold text-white mb-0.5">💬 WhatsApp Order Updates</p>
                  <p className="text-[11px]">Instant receipt dispatch and live preparation updates direct to your phone.</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/20 flex flex-col gap-2">
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="w-full py-2.5 px-3 rounded-xl bg-white text-[#8B1D24] font-bold text-xs hover:bg-amber-100 transition-colors flex items-center justify-center gap-1.5 shadow"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call to Order: {BUSINESS_INFO.phone}</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
