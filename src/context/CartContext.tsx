import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, SweetItem, SweetUnitOption, OrderDetails, OrderType, PaymentMethodType } from '../types';
import confetti from 'canvas-confetti';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: SweetItem, unitOption: SweetUnitOption, quantity?: number) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  totalItemCount: number;
  subtotal: number;
  packagingFee: number;
  deliveryFee: (orderType: OrderType) => number;
  calculateTotal: (orderType: OrderType) => number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  completedOrder: OrderDetails | null;
  setCompletedOrder: (order: OrderDetails | null) => void;
  placeOrder: (
    orderDetails: Omit<OrderDetails, 'orderId' | 'createdAt' | 'subtotal' | 'packagingFee' | 'deliveryFee' | 'total'>
  ) => OrderDetails;
  toastMessage: string | null;
  setToastMessage: (msg: string | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'gopal_sweets_cart_v1';
const RECENT_ORDER_STORAGE_KEY = 'gopal_sweets_recent_order_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(() => {
    try {
      const saved = localStorage.getItem(RECENT_ORDER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Save cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  // Save recent order to local storage
  useEffect(() => {
    try {
      if (completedOrder) {
        localStorage.setItem(RECENT_ORDER_STORAGE_KEY, JSON.stringify(completedOrder));
      }
    } catch {
      // ignore
    }
  }, [completedOrder]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3000);
  };

  const addToCart = (item: SweetItem, unitOption: SweetUnitOption, quantity = 1) => {
    const cartItemId = `${item.id}-${unitOption.id}`;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            cartItemId,
            itemId: item.id,
            name: item.name,
            image: item.image,
            selectedUnitLabel: unitOption.label,
            unitPrice: unitOption.price,
            quantity,
          },
        ];
      }
    });

    showToast(`Added ${quantity} × ${item.name} (${unitOption.label}) to cart!`);
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showToast('Item removed from cart');
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  // Standard hygienic sweet packing is ₹15, waived if subtotal >= ₹300
  const packagingFee = subtotal > 0 ? (subtotal >= 300 ? 0 : 15) : 0;

  // Free pickup at shop; nominal ₹30 for local Barrackpore delivery
  const deliveryFee = (orderType: OrderType) => {
    if (subtotal === 0) return 0;
    if (orderType === 'pickup') return 0;
    return subtotal >= 500 ? 0 : 30; // Free delivery over ₹500
  };

  const calculateTotal = (orderType: OrderType) => {
    if (subtotal === 0) return 0;
    return subtotal + packagingFee + deliveryFee(orderType);
  };

  const placeOrder = (
    orderInput: Omit<OrderDetails, 'orderId' | 'createdAt' | 'subtotal' | 'packagingFee' | 'deliveryFee' | 'total'>
  ): OrderDetails => {
    const orderId = `GS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const calculatedSubtotal = subtotal;
    const calculatedPackaging = packagingFee;
    const calculatedDelivery = deliveryFee(orderInput.orderType);
    const calculatedTotal = calculatedSubtotal + calculatedPackaging + calculatedDelivery;

    const newOrder: OrderDetails = {
      ...orderInput,
      orderId,
      createdAt: formattedDate,
      items: [...cartItems],
      subtotal: calculatedSubtotal,
      packagingFee: calculatedPackaging,
      deliveryFee: calculatedDelivery,
      total: calculatedTotal,
    };

    setCompletedOrder(newOrder);
    clearCart();
    setIsCartOpen(false);
    setIsCheckoutOpen(false);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#8B1D24', '#D97706', '#10B981', '#F59E0B'],
      });
    } catch {
      // ignore
    }

    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemCount,
        subtotal,
        packagingFee,
        deliveryFee,
        calculateTotal,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        completedOrder,
        setCompletedOrder,
        placeOrder,
        toastMessage,
        setToastMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
