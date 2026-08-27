export interface BusinessInfo {
  name: string;
  tagline: string;
  category: string;
  address: string;
  addressShort: string;
  googleListingAddress: string;
  phone: string;
  phoneRaw: string;
  email: string;
  instagramHandle: string;
  instagramUrl: string;
  googleRating: number;
  googleReviewCount: number;
  googleMapsUrl: string;
  googleMapsDirectionsUrl: string;
  googleSearchReviewsUrl: string;
  upiId?: string;
}

export interface BusinessDayHours {
  day: string;
  hours: string;
  opens: string;
  closes: string;
  isToday?: boolean;
}

export interface SweetUnitOption {
  id: string;
  label: string;
  multiplier: number;
  price: number;
}

export interface SweetItem {
  id: string;
  name: string;
  description: string;
  tag: string;
  image: string;
  altText: string;
  basePrice: number;
  baseUnit: string;
  unitOptions: SweetUnitOption[];
  popular?: boolean;
}

export interface SweetCategory {
  id: string;
  title: string;
  description: string;
  badge?: string;
  items: SweetItem[];
}

export interface CartItem {
  cartItemId: string;
  itemId: string;
  name: string;
  image: string;
  selectedUnitLabel: string;
  unitPrice: number;
  quantity: number;
}

export type OrderType = 'pickup' | 'delivery';
export type PaymentMethodType = 'upi_qr' | 'counter' | 'cod' | 'card_netbanking';
export type OrderStatus = 'placed' | 'confirmed' | 'ready';

export interface OrderDetails {
  orderId: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  orderType: OrderType;
  deliveryAddress?: string;
  landmark?: string;
  pickupTimeSlot?: string;
  specialInstructions?: string;
  items: CartItem[];
  subtotal: number;
  packagingFee: number;
  deliveryFee: number;
  total: number;
  paymentMethod: PaymentMethodType;
  paymentStatus: 'paid' | 'pay_on_pickup' | 'cash_on_delivery';
  transactionRef?: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  date: string;
  rating: number;
  text: string;
  source: string;
  tag?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  alt: string;
}

