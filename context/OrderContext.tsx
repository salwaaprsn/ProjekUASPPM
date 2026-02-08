import React, { createContext, ReactNode, useContext, useState } from 'react';

export interface Order {
  id: string;
  name: string;
  price: number;
  image: string;
  date: string;
  items?: CartItem[];
  total?: number;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category?: string;
}

interface OrderContextType {
  orders: Order[];
  cart: CartItem[];
  addToCart: (item: any) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  checkout: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i);
      }
      const cleanPrice = typeof item.price === 'string' ? Number(item.price.replace(/\./g, '')) : Number(item.price);
      return [...prev, { ...item, quantity: item.quantity || 1, price: cleanPrice }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  };

  const clearCart = () => setCart([]);

  const checkout = () => {
    if (cart.length === 0) return;

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      name: cart.length === 1 ? cart[0].name : `${cart[0].name} & ${cart.length - 1} lainnya`,
      price: total,
      image: cart[0].image,
      items: [...cart],
      total: total,
      date: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
  };

  return (
    <OrderContext.Provider value={{
      orders,
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      checkout
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrder harus di dalam OrderProvider');
  return context;
};