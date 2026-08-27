import React from 'react';
import {
  CheckCircle,
  Phone,
  MessageCircle,
  Printer,
  X,
  MapPin,
  Clock,
  ShoppingBag,
  Store,
  Truck,
  Sparkles,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BUSINESS_INFO } from '../data/businessData';

export const OrderConfirmationModal: React.FC = () => {
  const { completedOrder, setCompletedOrder } = useCart();

  if (!completedOrder) return null;

  const handlePrint = () => {
    window.print();
  };

  // Compose pre-filled WhatsApp message for Gopal Sweets
  const orderItemsText = completedOrder.items
    .map((item, idx) => `${idx + 1}. ${item.name} (${item.selectedUnitLabel}) × ${item.quantity} = ₹${item.unitPrice * item.quantity}`)
    .join('\n');

  const whatsappMessage = encodeURIComponent(
    `*🍬 Gopal Sweets Online Order Confirmation*\n` +
    `*Order ID:* ${completedOrder.orderId}\n` +
    `*Name:* ${completedOrder.customerName}\n` +
    `*Phone:* ${completedOrder.customerPhone}\n` +
    `*Fulfillment:* ${completedOrder.orderType === 'pickup' ? 'Shop Pickup' : 'Home Delivery'}\n` +
    (completedOrder.deliveryAddress ? `*Delivery Address:* ${completedOrder.deliveryAddress}\n` : '') +
    (completedOrder.pickupTimeSlot ? `*Pickup Slot:* ${completedOrder.pickupTimeSlot}\n` : '') +
    `\n*Items Ordered:*\n${orderItemsText}\n\n` +
    `*Subtotal:* ₹${completedOrder.subtotal}\n` +
    `*Packaging:* ${completedOrder.packagingFee === 0 ? 'FREE' : `₹${completedOrder.packagingFee}`}\n` +
    `*Delivery:* ${completedOrder.deliveryFee === 0 ? 'FREE' : `₹${completedOrder.deliveryFee}`}\n` +
    `*Grand Total:* ₹${completedOrder.total}\n` +
    `*Payment Method:* ${completedOrder.paymentMethod.toUpperCase()} (${completedOrder.paymentStatus})\n` +
    (completedOrder.transactionRef ? `*UTR / Ref:* ${completedOrder.transactionRef}\n` : '') +
    (completedOrder.specialInstructions ? `*Note:* ${completedOrder.specialInstructions}\n` : '') +
    `\n_Thank you for choosing Gopal Sweets Barrackpore!_`
  );

  const whatsappLink = `https://wa.me/${BUSINESS_INFO.phoneRaw.replace('+', '')}?text=${whatsappMessage}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
        onClick={() => setCompletedOrder(null)}
      />

      <div className="min-h-screen px-4 text-center flex items-center justify-center py-6 sm:py-10">
        <div className="inline-block w-full max-w-lg bg-[#FCF9F2] rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all border border-[#E4D1BF] animate-in zoom-in-95 duration-200">
          
          {/* Top Banner */}
          <div className="bg-gradient-to-r from-[#8B1D24] to-[#631017] text-white p-6 text-center relative">
            <button
              type="button"
              id="order-confirmation-close-btn"
              onClick={() => setCompletedOrder(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-3 text-emerald-600 shadow-md">
              <CheckCircle className="w-9 h-9" />
            </div>

            <h3 className="font-serif text-2xl font-bold tracking-tight">Order Placed Successfully!</h3>
            <p className="text-amber-200 text-xs mt-1">Thank you for ordering with Gopal Sweets</p>
            <div className="mt-2.5 inline-block bg-white/15 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider">
              ORDER #{completedOrder.orderId}
            </div>
          </div>

          {/* Receipt Body */}
          <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
            
            {/* Fulfillment Status Card */}
            <div className="p-3.5 bg-[#F6EDE1] rounded-xl border border-[#E1CEBB] flex items-start gap-3">
              {completedOrder.orderType === 'pickup' ? (
                <Store className="w-5 h-5 text-[#8B1D24] mt-0.5 shrink-0" />
              ) : (
                <Truck className="w-5 h-5 text-[#8B1D24] mt-0.5 shrink-0" />
              )}
              <div className="text-xs space-y-0.5">
                <p className="font-bold text-sm text-[#4A3327]">
                  {completedOrder.orderType === 'pickup' ? 'Shop Pickup Order' : 'Local Home Delivery'}
                </p>
                <p className="text-[#6D5342]">
                  {completedOrder.orderType === 'pickup'
                    ? `Collect at 181, 93/4 Old Calcutta Rd, Barrackpore (${completedOrder.pickupTimeSlot || 'Within 45 mins'})`
                    : `Delivering to: ${completedOrder.deliveryAddress}`}
                </p>
              </div>
            </div>

            {/* Itemized Bill */}
            <div>
              <h4 className="text-xs font-bold text-[#4A3327] uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Sweet Box Summary</span>
                <span className="text-[11px] text-[#7A5A43] font-normal">{completedOrder.createdAt}</span>
              </h4>
              <div className="bg-white rounded-xl border border-[#DFCBB7] divide-y divide-[#EFE4D7] overflow-hidden">
                {completedOrder.items.map((item) => (
                  <div key={item.cartItemId} className="p-3 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-[#4A3327]">{item.name}</p>
                      <p className="text-[11px] text-[#7A5A43]">
                        {item.selectedUnitLabel} × {item.quantity}
                      </p>
                    </div>
                    <span className="font-bold text-[#4A3327]">₹{item.unitPrice * item.quantity}</span>
                  </div>
                ))}

                <div className="p-3 bg-[#FBF7F0] space-y-1 text-xs text-[#634C3E]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#4A3327]">₹{completedOrder.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hygienic Packaging</span>
                    <span className="font-semibold text-[#4A3327]">
                      {completedOrder.packagingFee === 0 ? 'FREE' : `₹${completedOrder.packagingFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery / Pickup</span>
                    <span className="font-semibold text-[#4A3327]">
                      {completedOrder.deliveryFee === 0 ? 'FREE' : `₹${completedOrder.deliveryFee}`}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[#E8DACB] flex justify-between items-center text-sm font-bold text-[#4A3327]">
                    <span className="font-serif">Total Amount</span>
                    <span className="text-base text-[#8B1D24]">₹{completedOrder.total}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment & Customer Details */}
            <div className="text-xs text-[#634C3E] space-y-1 bg-[#F6EDE1] p-3.5 rounded-xl border border-[#E1CEBB]">
              <div className="flex justify-between">
                <span className="text-[#7A5A43]">Customer:</span>
                <span className="font-bold text-[#4A3327]">{completedOrder.customerName} ({completedOrder.customerPhone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A5A43]">Payment:</span>
                <span className="font-bold text-emerald-800 uppercase">
                  {completedOrder.paymentMethod.replace('_', ' ')} • {completedOrder.paymentStatus}
                </span>
              </div>
              {completedOrder.transactionRef && (
                <div className="flex justify-between">
                  <span className="text-[#7A5A43]">UTR Ref:</span>
                  <span className="font-mono text-[#4A3327]">{completedOrder.transactionRef}</span>
                </div>
              )}
            </div>

            {/* Quick Action Buttons: WhatsApp dispatch, Call Shop, Print */}
            <div className="space-y-2 pt-1">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                id="order-send-whatsapp-btn"
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow flex items-center justify-center gap-2 transition-transform active:scale-98"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Order & Updates via WhatsApp</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  id="order-call-shop-btn"
                  className="py-2.5 px-3 rounded-xl bg-[#8B1D24] text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow hover:bg-[#6e141a] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Gopal Sweets</span>
                </a>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="py-2.5 px-3 rounded-xl bg-white border border-[#DFCBB7] text-[#4A3327] font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-[#F3E7D7] transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setCompletedOrder(null)}
                className="w-full py-2.5 text-xs font-bold text-[#8B1D24] hover:text-[#611016] text-center"
              >
                Done / Place Another Order
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
