import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustHighlights } from './components/TrustHighlights';
import { AboutSection } from './components/AboutSection';
import { SweetsAndSnacks } from './components/SweetsAndSnacks';
import { CartCheckoutSection } from './components/CartCheckoutSection';
import { FoodGallery } from './components/FoodGallery';
import { CustomerReviews } from './components/CustomerReviews';
import { BusinessHours } from './components/BusinessHours';
import { LocationMap } from './components/LocationMap';
import { InstagramSection } from './components/InstagramSection';
import { ContactSection } from './components/ContactSection';
import { CallToActionBanner } from './components/CallToActionBanner';
import { Footer } from './components/Footer';
import { MobileQuickBar } from './components/MobileQuickBar';
import { CartProvider, useCart } from './context/CartContext';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { CheckCircle2 } from 'lucide-react';

const ToastNotification: React.FC = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-20 right-4 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
      <div className="bg-[#8B1D24] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold border border-white/20">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};

function MainAppContent() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'home',
        'about',
        'sweets-snacks',
        'order-online',
        'gallery',
        'reviews',
        'hours',
        'find-us',
        'contact',
      ];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F2] text-[#2D1B14] antialiased selection:bg-[#8B1D24] selection:text-white pb-16 md:pb-0">
      {/* Toast Notification */}
      <ToastNotification />

      {/* Sticky Header with Navigation & Call CTA */}
      <Header activeSection={activeSection} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Trust / Business Highlights */}
        <TrustHighlights />

        {/* 3. About Gopal Sweets */}
        <AboutSection />

        {/* 4. Sweets & Snacks Showcase with Portions & Add to Cart */}
        <SweetsAndSnacks />

        {/* 5. Online Order & Payment Center */}
        <CartCheckoutSection />

        {/* 6. Food Image Gallery */}
        <FoodGallery />

        {/* 7. Customer Reviews */}
        <CustomerReviews />

        {/* 8. Business Operating Hours */}
        <BusinessHours />

        {/* 9. Find Us / Google Maps */}
        <LocationMap />

        {/* 10. Instagram CTA & Gallery */}
        <InstagramSection />

        {/* 11. Contact Section */}
        <ContactSection />

        {/* 12. Final Call To Action Banner */}
        <CallToActionBanner />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Quick Action Bar */}
      <MobileQuickBar />

      {/* Interactive Cart Slide-Over Drawer */}
      <CartDrawer />

      {/* Checkout and Payment Modal (UPI, QR, Cards, COD, Counter) */}
      <CheckoutModal />

      {/* Order Confirmation Receipt Modal with WhatsApp dispatch */}
      <OrderConfirmationModal />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainAppContent />
    </CartProvider>
  );
}
