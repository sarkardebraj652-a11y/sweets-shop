import React, { useState } from 'react';
import {
  X,
  MapPin,
  Clock,
  Phone,
  User,
  ShoppingBag,
  CreditCard,
  QrCode,
  Banknote,
  Store,
  CheckCircle,
  Copy,
  Check,
  AlertCircle,
  ShieldCheck,
  Truck,
  Sparkles,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { OrderType, PaymentMethodType } from '../types';
import { BUSINESS_INFO } from '../data/businessData';

export const CheckoutModal: React.FC = () => {
  const {
    cartItems,
    isCheckoutOpen,
    setIsCheckoutOpen,
    setIsCartOpen,
    subtotal,
    packagingFee,
    deliveryFee,
    calculateTotal,
    placeOrder,
  } = useCart();

  const [orderType, setOrderType] = useState<OrderType>('pickup');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pickupTimeSlot, setPickupTimeSlot] = useState('Today (Within 30-45 mins)');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('upi_qr');
  const [transactionRef, setTransactionRef] = useState('');
  
  // Card state for simulated card payment
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // UI helpers
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutOpen) return null;

  const currentDeliveryFee = deliveryFee(orderType);
  const finalTotal = calculateTotal(orderType);

  const handleCopyUpi = () => {
    if (BUSINESS_INFO.upiId) {
      navigator.clipboard.writeText(BUSINESS_INFO.upiId);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2500);
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!customerName.trim()) {
      errors.name = 'Please enter your name';
    }

    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errors.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (orderType === 'delivery') {
      if (!deliveryAddress.trim() || deliveryAddress.trim().length < 8) {
        errors.address = 'Please provide your full delivery address in Barrackpore / nearby area';
      }
    }

    if (paymentMethod === 'card_netbanking') {
      if (!cardNumber.replace(/\s/g, '') || cardNumber.replace(/\s/g, '').length < 16) {
        errors.card = 'Please enter a valid 16-digit card number';
      }
      if (!cardExpiry || !cardCvv) {
        errors.cardDetails = 'Please enter expiry and CVV';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);

    // Simulate short network or verification delay
    setTimeout(() => {
      let paymentStatus: 'paid' | 'pay_on_pickup' | 'cash_on_delivery' = 'pay_on_pickup';
      if (paymentMethod === 'upi_qr') {
        paymentStatus = transactionRef.trim() ? 'paid' : 'pay_on_pickup';
      } else if (paymentMethod === 'card_netbanking') {
        paymentStatus = 'paid';
      } else if (paymentMethod === 'cod') {
        paymentStatus = 'cash_on_delivery';
      } else {
        paymentStatus = 'pay_on_pickup';
      }

      placeOrder({
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        orderType,
        deliveryAddress: orderType === 'delivery' ? deliveryAddress.trim() : undefined,
        landmark: landmark.trim() ? landmark.trim() : undefined,
        pickupTimeSlot: orderType === 'pickup' ? pickupTimeSlot : undefined,
        specialInstructions: specialInstructions.trim() ? specialInstructions.trim() : undefined,
        items: cartItems,
        paymentMethod,
        paymentStatus,
        transactionRef: transactionRef.trim() ? transactionRef.trim() : undefined,
      });

      setIsProcessing(false);
    }, 900);
  };

  // UPI deep link
  const upiDeepLink = `upi://pay?pa=${encodeURIComponent(BUSINESS_INFO.upiId || '7439427696@upi')}&pn=${encodeURIComponent(
    BUSINESS_INFO.name
  )}&am=${finalTotal}&cu=INR&tn=${encodeURIComponent('Gopal Sweets Order')}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
        onClick={() => setIsCheckoutOpen(false)}
      />

      <div className="min-h-screen px-4 text-center flex items-center justify-center py-6 sm:py-10">
        <div className="inline-block w-full max-w-2xl bg-[#FCF9F2] rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all border border-[#E4D1BF] animate-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="px-6 py-4 bg-[#F7EFE4] border-b border-[#E8DACB] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#8B1D24] text-white flex items-center justify-center font-serif text-lg font-bold shadow-xs">
                G
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#4A3327]">Checkout & Payment</h3>
                <p className="text-xs text-[#7A5A43]">
                  {cartItems.reduce((s, i) => s + i.quantity, 0)} items • Total: ₹{finalTotal}
                </p>
              </div>
            </div>

            <button
              type="button"
              id="checkout-modal-close-btn"
              onClick={() => setIsCheckoutOpen(false)}
              className="p-1.5 rounded-lg text-[#7A5A43] hover:text-[#4A3327] hover:bg-[#EBDCCB] transition-colors"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handlePlaceOrder} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            
            {/* Step 1: Fulfillment Type (Pickup vs Delivery) */}
            <div>
              <label className="block text-xs font-bold text-[#4A3327] uppercase tracking-wider mb-2">
                1. Order Fulfillment Mode
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  id="checkout-pickup-tab"
                  onClick={() => setOrderType('pickup')}
                  className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                    orderType === 'pickup'
                      ? 'border-[#8B1D24] bg-[#8B1D24]/8 ring-2 ring-[#8B1D24]/20'
                      : 'border-[#DFCBB7] bg-white hover:border-[#8B1D24]/50'
                  }`}
                >
                  <Store className={`w-5 h-5 mt-0.5 ${orderType === 'pickup' ? 'text-[#8B1D24]' : 'text-[#7A5A43]'}`} />
                  <div>
                    <p className="font-bold text-sm text-[#4A3327]">Shop Pickup (Barrackpore)</p>
                    <p className="text-xs text-[#7A5A43] mt-0.5">Free • 181 Old Calcutta Rd</p>
                  </div>
                </button>

                <button
                  type="button"
                  id="checkout-delivery-tab"
                  onClick={() => setOrderType('delivery')}
                  className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                    orderType === 'delivery'
                      ? 'border-[#8B1D24] bg-[#8B1D24]/8 ring-2 ring-[#8B1D24]/20'
                      : 'border-[#DFCBB7] bg-white hover:border-[#8B1D24]/50'
                  }`}
                >
                  <Truck className={`w-5 h-5 mt-0.5 ${orderType === 'delivery' ? 'text-[#8B1D24]' : 'text-[#7A5A43]'}`} />
                  <div>
                    <p className="font-bold text-sm text-[#4A3327]">Local Delivery</p>
                    <p className="text-xs text-[#7A5A43] mt-0.5">
                      {subtotal >= 500 ? 'Free Delivery' : '₹30 in Barrackpore area'}
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Step 2: Customer Contact Information */}
            <div>
              <label className="block text-xs font-bold text-[#4A3327] uppercase tracking-wider mb-2">
                2. Contact & Details
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="checkout-customer-name" className="block text-xs font-medium text-[#5D4638] mb-1">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#8C715E] absolute left-3 top-3" />
                    <input
                      type="text"
                      id="checkout-customer-name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Debraj Sarkar"
                      className={`w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border text-sm text-[#4A3327] focus:outline-none focus:ring-2 focus:ring-[#8B1D24] ${
                        formErrors.name ? 'border-red-500 bg-red-50/50' : 'border-[#DFCBB7]'
                      }`}
                    />
                  </div>
                  {formErrors.name && <p className="text-xs text-red-600 mt-1">{formErrors.name}</p>}
                </div>

                <div>
                  <label htmlFor="checkout-customer-phone" className="block text-xs font-medium text-[#5D4638] mb-1">
                    Mobile / WhatsApp Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#8C715E] absolute left-3 top-3" />
                    <input
                      type="tel"
                      id="checkout-customer-phone"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      maxLength={14}
                      className={`w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border text-sm text-[#4A3327] focus:outline-none focus:ring-2 focus:ring-[#8B1D24] ${
                        formErrors.phone ? 'border-red-500 bg-red-50/50' : 'border-[#DFCBB7]'
                      }`}
                    />
                  </div>
                  {formErrors.phone && <p className="text-xs text-red-600 mt-1">{formErrors.phone}</p>}
                </div>
              </div>

              {/* Delivery Address (if Delivery selected) */}
              {orderType === 'delivery' && (
                <div className="mt-3 space-y-3 animate-in fade-in duration-200">
                  <div>
                    <label htmlFor="checkout-delivery-address" className="block text-xs font-medium text-[#5D4638] mb-1">
                      Delivery Address in Barrackpore *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-[#8C715E] absolute left-3 top-3" />
                      <textarea
                        id="checkout-delivery-address"
                        rows={2}
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="House / Flat No, Street, Colony or Road in Barrackpore..."
                        className={`w-full pl-9 pr-3 py-2 rounded-xl bg-white border text-sm text-[#4A3327] focus:outline-none focus:ring-2 focus:ring-[#8B1D24] ${
                          formErrors.address ? 'border-red-500 bg-red-50/50' : 'border-[#DFCBB7]'
                        }`}
                      />
                    </div>
                    {formErrors.address && <p className="text-xs text-red-600 mt-1">{formErrors.address}</p>}
                  </div>

                  <div>
                    <label htmlFor="checkout-landmark" className="block text-xs font-medium text-[#5D4638] mb-1">
                      Nearby Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      id="checkout-landmark"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="e.g. Near Anandapuri Club / School"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#DFCBB7] text-sm text-[#4A3327] focus:outline-none focus:ring-2 focus:ring-[#8B1D24]"
                    />
                  </div>
                </div>
              )}

              {/* Pickup Time Slot (if Pickup selected) */}
              {orderType === 'pickup' && (
                <div className="mt-3 animate-in fade-in duration-200">
                  <label htmlFor="checkout-pickup-time" className="block text-xs font-medium text-[#5D4638] mb-1">
                    Pickup Preferred Time Slot
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-[#8C715E] absolute left-3 top-3" />
                    <select
                      id="checkout-pickup-time"
                      value={pickupTimeSlot}
                      onChange={(e) => setPickupTimeSlot(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-[#DFCBB7] text-sm text-[#4A3327] focus:outline-none focus:ring-2 focus:ring-[#8B1D24]"
                    >
                      <option value="Today (Within 30-45 mins)">Today (Within 30–45 mins)</option>
                      <option value="Today Morning (8:00 AM - 10:00 AM)">Today Morning (8:00 AM – 10:00 AM)</option>
                      <option value="Today Forenoon (10:00 AM - 12:00 PM)">Today Forenoon (10:00 AM – 12:00 PM)</option>
                      <option value="Tomorrow Morning (6:30 AM - 9:30 AM)">Tomorrow Morning (6:30 AM – 9:30 AM)</option>
                    </select>
                  </div>
                  <p className="text-[11px] text-[#7A5A43] mt-1 flex items-center gap-1">
                    <Store className="w-3 h-3 text-[#8B1D24]" />
                    Counter Location: 181, 93/4 Old Calcutta Rd, Anandapuri, Barrackpore
                  </p>
                </div>
              )}

              <div className="mt-3">
                <label htmlFor="checkout-special-instructions" className="block text-xs font-medium text-[#5D4638] mb-1">
                  Special Notes / Packaging Request (Optional)
                </label>
                <input
                  type="text"
                  id="checkout-special-instructions"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="e.g. Extra syrup in Rosogolla / Mild spicy samosa chutney"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#DFCBB7] text-sm text-[#4A3327] focus:outline-none focus:ring-2 focus:ring-[#8B1D24]"
                />
              </div>
            </div>

            {/* Step 3: Payment Section */}
            <div>
              <label className="block text-xs font-bold text-[#4A3327] uppercase tracking-wider mb-2">
                3. Choose Payment Method
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {/* Method 1: UPI QR */}
                <button
                  type="button"
                  id="payment-method-upi"
                  onClick={() => setPaymentMethod('upi_qr')}
                  className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                    paymentMethod === 'upi_qr'
                      ? 'border-[#8B1D24] bg-[#8B1D24]/8 ring-2 ring-[#8B1D24]/20'
                      : 'border-[#DFCBB7] bg-white hover:border-[#8B1D24]/40'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <QrCode className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-xs text-[#4A3327]">Instant UPI / QR Code</p>
                    <p className="text-[11px] text-[#7A5A43]">GPay, PhonePe, Paytm</p>
                  </div>
                </button>

                {/* Method 2: Pay on Pickup / Counter */}
                {orderType === 'pickup' ? (
                  <button
                    type="button"
                    id="payment-method-counter"
                    onClick={() => setPaymentMethod('counter')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                      paymentMethod === 'counter'
                        ? 'border-[#8B1D24] bg-[#8B1D24]/8 ring-2 ring-[#8B1D24]/20'
                        : 'border-[#DFCBB7] bg-white hover:border-[#8B1D24]/40'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                      <Banknote className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-[#4A3327]">Pay at Counter</p>
                      <p className="text-[11px] text-[#7A5A43]">Cash / Card at Store</p>
                    </div>
                  </button>
                ) : (
                  <button
                    type="button"
                    id="payment-method-cod"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#8B1D24] bg-[#8B1D24]/8 ring-2 ring-[#8B1D24]/20'
                        : 'border-[#DFCBB7] bg-white hover:border-[#8B1D24]/40'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                      <Banknote className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-[#4A3327]">Cash on Delivery (COD)</p>
                      <p className="text-[11px] text-[#7A5A43]">Pay delivery partner</p>
                    </div>
                  </button>
                )}

                {/* Method 3: Cards / NetBanking */}
                <button
                  type="button"
                  id="payment-method-card"
                  onClick={() => setPaymentMethod('card_netbanking')}
                  className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                    paymentMethod === 'card_netbanking'
                      ? 'border-[#8B1D24] bg-[#8B1D24]/8 ring-2 ring-[#8B1D24]/20'
                      : 'border-[#DFCBB7] bg-white hover:border-[#8B1D24]/40'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-xs text-[#4A3327]">Debit / Credit Card</p>
                    <p className="text-[11px] text-[#7A5A43]">Visa, RuPay, MasterCard</p>
                  </div>
                </button>
              </div>

              {/* Payment Details Container */}
              {paymentMethod === 'upi_qr' && (
                <div className="bg-white border border-[#E0CFBD] rounded-xl p-4 sm:p-5 space-y-4 animate-in fade-in duration-200">
                  <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                    {/* Visual QR Code Generator */}
                    <div className="p-3 bg-white border border-[#D5C2AF] rounded-xl shadow-xs shrink-0 flex flex-col items-center">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                          upiDeepLink
                        )}&color=8B1D24&bgcolor=FCF9F2`}
                        alt="Gopal Sweets UPI QR Code"
                        className="w-32 h-32 rounded-lg"
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-[10px] font-bold text-[#8B1D24] mt-1.5 uppercase tracking-wide">
                        Scan with Any UPI App
                      </span>
                    </div>

                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                        <span className="text-xs font-semibold text-[#5D4638]">Pay to Gopal Sweets:</span>
                        <span className="text-sm font-bold text-[#8B1D24]">₹{finalTotal}</span>
                      </div>

                      {/* UPI ID Copy Bar */}
                      <div className="flex items-center gap-2 bg-[#F7EFE4] px-3 py-2 rounded-lg border border-[#DFCBB7]">
                        <span className="text-xs font-mono font-bold text-[#4A3327] truncate">
                          {BUSINESS_INFO.upiId || '7439427696@upi'}
                        </span>
                        <button
                          type="button"
                          onClick={handleCopyUpi}
                          className="ml-auto inline-flex items-center gap-1 text-[11px] font-bold text-[#8B1D24] hover:text-[#5C0F15] bg-white px-2 py-1 rounded shadow-2xs border border-[#D9C4AC]"
                        >
                          {copiedUpi ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-700">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy UPI</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2 text-[11px] text-[#7A5A43]">
                        <span className="bg-slate-100 px-2 py-0.5 rounded font-medium">Google Pay</span>
                        <span className="bg-slate-100 px-2 py-0.5 rounded font-medium">PhonePe</span>
                        <span className="bg-slate-100 px-2 py-0.5 rounded font-medium">Paytm</span>
                        <span className="bg-slate-100 px-2 py-0.5 rounded font-medium">BHIM</span>
                      </div>

                      <a
                        href={upiDeepLink}
                        className="inline-block sm:hidden text-xs text-[#8B1D24] underline font-bold"
                      >
                        Tap to pay directly in UPI App
                      </a>
                    </div>
                  </div>

                  {/* Optional UTR / Reference Input */}
                  <div className="pt-3 border-t border-[#EFE5D9]">
                    <label htmlFor="checkout-utr" className="block text-xs font-medium text-[#5D4638] mb-1">
                      UPI Transaction / UTR Ref No. (Optional or verify on counter)
                    </label>
                    <input
                      type="text"
                      id="checkout-utr"
                      value={transactionRef}
                      onChange={(e) => setTransactionRef(e.target.value)}
                      placeholder="e.g. 12-digit UTR No. (3248XXXXXXXX)"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#DFCBB7] text-xs font-mono text-[#4A3327] focus:outline-none focus:ring-2 focus:ring-[#8B1D24]"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'counter' && (
                <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 space-y-1.5 animate-in fade-in duration-200">
                  <p className="font-bold flex items-center gap-1.5">
                    <Store className="w-4 h-4 text-[#8B1D24]" />
                    Pay at Gopal Sweets Shop Counter
                  </p>
                  <p className="text-amber-800">
                    Your fresh sweet box will be prepared and reserved for pickup at{' '}
                    <strong>181, 93/4 Old Calcutta Rd, Barrackpore</strong>. You can pay via Cash, QR, or Card during collection.
                  </p>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 space-y-1.5 animate-in fade-in duration-200">
                  <p className="font-bold flex items-center gap-1.5">
                    <Banknote className="w-4 h-4 text-[#8B1D24]" />
                    Cash on Delivery (Barrackpore Local)
                  </p>
                  <p className="text-amber-800">
                    Hand over the exact amount (₹{finalTotal}) or pay via UPI QR to our delivery personnel upon receipt of your order.
                  </p>
                </div>
              )}

              {paymentMethod === 'card_netbanking' && (
                <div className="bg-white border border-[#E0CFBD] rounded-xl p-4 space-y-3 animate-in fade-in duration-200">
                  <div>
                    <label htmlFor="card-number-input" className="block text-xs font-medium text-[#5D4638] mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="card-number-input"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4532 •••• •••• 8921"
                      maxLength={19}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#DFCBB7] text-sm text-[#4A3327] font-mono focus:outline-none focus:ring-2 focus:ring-[#8B1D24]"
                    />
                    {formErrors.card && <p className="text-xs text-red-600 mt-1">{formErrors.card}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="card-expiry-input" className="block text-xs font-medium text-[#5D4638] mb-1">
                        Expiry (MM/YY)
                      </label>
                      <input
                        type="text"
                        id="card-expiry-input"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="08/28"
                        maxLength={5}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#DFCBB7] text-sm text-[#4A3327] font-mono focus:outline-none focus:ring-2 focus:ring-[#8B1D24]"
                      />
                    </div>
                    <div>
                      <label htmlFor="card-cvv-input" className="block text-xs font-medium text-[#5D4638] mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        id="card-cvv-input"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="•••"
                        maxLength={4}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#DFCBB7] text-sm text-[#4A3327] font-mono focus:outline-none focus:ring-2 focus:ring-[#8B1D24]"
                      />
                    </div>
                  </div>
                  {formErrors.cardDetails && <p className="text-xs text-red-600">{formErrors.cardDetails}</p>}
                  <p className="text-[11px] text-[#7A5A43] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    256-Bit SSL Encrypted & Protected
                  </p>
                </div>
              )}
            </div>

            {/* Bill Summary Breakdown */}
            <div className="p-4 rounded-xl bg-[#F5ECDF] border border-[#E3D3C1] space-y-2 text-xs">
              <div className="flex justify-between text-[#5D4638]">
                <span>Items Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="font-semibold text-[#4A3327]">₹{subtotal}</span>
              </div>

              <div className="flex justify-between text-[#5D4638]">
                <span>Hygienic Sealed Box Packing</span>
                <span className="font-semibold text-[#4A3327]">
                  {packagingFee === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : `₹${packagingFee}`}
                </span>
              </div>

              <div className="flex justify-between text-[#5D4638]">
                <span>Fulfillment ({orderType === 'pickup' ? 'Shop Pickup' : 'Barrackpore Delivery'})</span>
                <span className="font-semibold text-[#4A3327]">
                  {currentDeliveryFee === 0 ? (
                    <span className="text-emerald-700 font-bold">FREE</span>
                  ) : (
                    `₹${currentDeliveryFee}`
                  )}
                </span>
              </div>

              <div className="pt-2 border-t border-[#DAC6B2] flex justify-between items-center text-sm font-bold text-[#4A3327]">
                <span className="font-serif">Grand Total Payable</span>
                <span className="text-lg text-[#8B1D24]">₹{finalTotal}</span>
              </div>
            </div>

            {/* Submit / Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                type="submit"
                id="checkout-confirm-order-btn"
                disabled={isProcessing}
                className="w-full py-3.5 px-6 rounded-xl bg-[#8B1D24] hover:bg-[#6e141a] text-white font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-75 active:scale-98 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Confirming Sweet Order...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>
                      {paymentMethod === 'upi_qr'
                        ? `Confirm & Pay ₹${finalTotal} via UPI`
                        : paymentMethod === 'card_netbanking'
                        ? `Pay ₹${finalTotal} Now`
                        : `Place Order (₹${finalTotal})`}
                    </span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setIsCartOpen(true);
                }}
                className="w-full py-2 text-xs font-semibold text-[#7A5A43] hover:text-[#4A3327]"
              >
                ← Back to Edit Sweet Box
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};
