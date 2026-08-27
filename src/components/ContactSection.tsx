import React, { useState } from 'react';
import { Phone, Mail, Instagram, MapPin, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

export const ContactSection: React.FC = () => {
  const [inquiryText, setInquiryText] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pre-populate email client with visitor message
    const subject = encodeURIComponent(`Sweet Shop Inquiry from ${senderName || 'Customer'}`);
    const body = encodeURIComponent(
      `Name: ${senderName}\nPhone: ${senderPhone}\n\nMessage/Inquiry:\n${inquiryText}`
    );
    window.location.href = `mailto:${BUSINESS_INFO.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#FCF9F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B1D24]/10 text-[#8B1D24] text-xs font-bold uppercase tracking-wider mb-3">
            <Phone className="w-3.5 h-3.5 text-[#D97706]" />
            Connect With Us
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#8B1D24] tracking-tight">
            Get In Touch
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#614736]">
            Have a question about our traditional sweets, snacks, or shop location? We are here to help.
          </p>
          <div className="w-16 h-1 bg-[#D97706] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Contact Cards */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Business Info Highlight Card */}
            <div className="bg-gradient-to-br from-[#8B1D24] to-[#691118] text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
                  Local Sweet Shop • Barrackpore
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-1">
                  {BUSINESS_INFO.name}
                </h3>
                <p className="text-sm text-amber-100/90 mt-1 max-w-md">
                  Traditional taste and hospitality serving Barrackpore, West Bengal.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={`tel:${BUSINESS_INFO.phoneRaw}`}
                    id="contact-hero-call-btn"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#8B1D24] text-sm font-bold shadow hover:bg-[#FAF0E1] transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#8B1D24]" />
                    Call Now
                  </a>
                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    id="contact-hero-email-btn"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FAF0E1]/20 backdrop-blur-xs text-white border border-white/30 text-sm font-semibold hover:bg-white/30 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-amber-300" />
                    Email Us
                  </a>
                  <a
                    href={BUSINESS_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="contact-hero-instagram-btn"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FAF0E1]/20 backdrop-blur-xs text-white border border-white/30 text-sm font-semibold hover:bg-white/30 transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-pink-300" />
                    Instagram
                  </a>
                </div>
              </div>
            </div>

            {/* Individual Contact Detail Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Address Card */}
              <div className="bg-[#FAF4EA] p-5 rounded-2xl border border-[#E9D8C5] shadow-xs hover:border-[#D9C1A7] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#8B1D24] flex items-center justify-center mb-3">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-base font-bold text-[#8B1D24]">
                  Address
                </h4>
                <p className="text-xs sm:text-sm text-[#5C4132] mt-1 leading-relaxed">
                  {BUSINESS_INFO.address}
                </p>
                <div className="mt-3">
                  <a
                    href={BUSINESS_INFO.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#8B1D24] hover:underline inline-flex items-center gap-1"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>

              {/* Phone Card */}
              <div className="bg-[#FAF4EA] p-5 rounded-2xl border border-[#E9D8C5] shadow-xs hover:border-[#D9C1A7] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#8B1D24] flex items-center justify-center mb-3">
                  <Phone className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-base font-bold text-[#8B1D24]">
                  Phone
                </h4>
                <p className="text-sm font-bold text-[#2D1B14] mt-1">
                  {BUSINESS_INFO.phone}
                </p>
                <p className="text-xs text-[#7A5F4E] mt-0.5">
                  Available during morning shop hours
                </p>
                <div className="mt-3">
                  <a
                    href={`tel:${BUSINESS_INFO.phoneRaw}`}
                    id="contact-card-call-btn"
                    className="text-xs font-bold text-[#8B1D24] hover:underline inline-flex items-center gap-1"
                  >
                    Call Immediately →
                  </a>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-[#FAF4EA] p-5 rounded-2xl border border-[#E9D8C5] shadow-xs hover:border-[#D9C1A7] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#D97706] flex items-center justify-center mb-3">
                  <Mail className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-base font-bold text-[#8B1D24]">
                  Email
                </h4>
                <p className="text-xs sm:text-sm font-medium text-[#2D1B14] mt-1 break-all">
                  {BUSINESS_INFO.email}
                </p>
                <div className="mt-3">
                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    id="contact-card-email-btn"
                    className="text-xs font-bold text-[#8B1D24] hover:underline inline-flex items-center gap-1"
                  >
                    Send Email →
                  </a>
                </div>
              </div>

              {/* Instagram Card */}
              <div className="bg-[#FAF4EA] p-5 rounded-2xl border border-[#E9D8C5] shadow-xs hover:border-[#D9C1A7] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-700 flex items-center justify-center mb-3">
                  <Instagram className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-base font-bold text-[#8B1D24]">
                  Instagram
                </h4>
                <p className="text-sm font-bold text-[#2D1B14] mt-1">
                  {BUSINESS_INFO.instagramHandle}
                </p>
                <p className="text-xs text-[#7A5F4E] mt-0.5">
                  Follow for sweet updates
                </p>
                <div className="mt-3">
                  <a
                    href={BUSINESS_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="contact-card-instagram-btn"
                    className="text-xs font-bold text-[#8B1D24] hover:underline inline-flex items-center gap-1"
                  >
                    Visit Profile →
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Quick Inquiry Form (Email mailto wrapper) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#ECDCCB] shadow-sm">
            <div className="flex items-center gap-2 text-[#8B1D24] font-serif text-xl font-bold mb-1">
              <MessageCircle className="w-5 h-5 text-[#D97706]" />
              Send a Quick Inquiry
            </div>
            <p className="text-xs text-[#6E5343] mb-6">
              Send an email inquiry directly to {BUSINESS_INFO.email}.
            </p>

            {submitted ? (
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-900 text-sm">Opening Your Email Client...</h4>
                <p className="text-xs text-emerald-700">
                  Your inquiry draft is ready to be sent to Gopal Sweets. You can also call us directly at {BUSINESS_INFO.phone}.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs text-emerald-800 underline font-semibold"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div>
                  <label htmlFor="inquiry-name" className="block text-xs font-semibold text-[#543929] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="inquiry-name"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Enter your name"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D9C7B4] bg-[#FCFAF5] text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1D24]"
                  />
                </div>

                <div>
                  <label htmlFor="inquiry-phone" className="block text-xs font-semibold text-[#543929] mb-1">
                    Your Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="inquiry-phone"
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D9C7B4] bg-[#FCFAF5] text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1D24]"
                  />
                </div>

                <div>
                  <label htmlFor="inquiry-text" className="block text-xs font-semibold text-[#543929] mb-1">
                    Your Message / Sweet Inquiry
                  </label>
                  <textarea
                    id="inquiry-text"
                    rows={4}
                    value={inquiryText}
                    onChange={(e) => setInquiryText(e.target.value)}
                    placeholder="Ask about sweets, samosas, snack availability, or festival orders..."
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D9C7B4] bg-[#FCFAF5] text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1D24]"
                  />
                </div>

                <button
                  type="submit"
                  id="inquiry-submit-btn"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#8B1D24] hover:bg-[#6e141a] text-white font-bold text-sm shadow transition-all active:scale-98 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Email Inquiry</span>
                </button>
              </form>
            )}

            <div className="mt-4 pt-4 border-t border-[#F0E4D5] text-center">
              <p className="text-xs text-[#7A5F4E]">
                Need immediate response? <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="text-[#8B1D24] font-bold underline">Call {BUSINESS_INFO.phone}</a>
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
