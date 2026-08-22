"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { medusaClient } from "@/lib/medusa";

interface CartContextType {
  cart: any;
  cartIsOpen: boolean;
  isAdding: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (variantId: string, quantity: number) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_KEY = "medusa_cart_id";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<any>(null);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const initCart = async () => {
    const cartId = Cookies.get(CART_KEY);

    if (cartId) {
      try {
        const { cart } = await medusaClient.store.cart.retrieve(cartId);
        // Only use cart if it hasn't been completed
        if (cart.completed_at) {
          Cookies.remove(CART_KEY);
          createCart();
        } else {
          setCart(cart);
        }
      } catch (e) {
        // If cart fetch fails (e.g., deleted on backend), create a new one
        Cookies.remove(CART_KEY);
        createCart();
      }
    } else {
      createCart();
    }
  };

  // Initialize Cart
  useEffect(() => {
    initCart();
  }, []);

    const createCart = async () => {
      try {
        const { regions } = await medusaClient.store.region.list();
        const inrRegion = regions.find((r: any) => r.currency_code === 'inr') || regions[0];
        
        if (inrRegion) {
          const { cart } = await medusaClient.store.cart.create({ region_id: inrRegion.id });
          Cookies.set(CART_KEY, cart.id, { expires: 7 }); // expires in 7 days
          setCart(cart);
        }
      } catch (e) {
        console.error("Failed to create cart", e);
      }
    };

  const openCart = () => setCartIsOpen(true);
  const closeCart = () => setCartIsOpen(false);

  const addToCart = async (variantId: string, quantity: number) => {
    if (!cart?.id) return;
    setIsAdding(true);
    try {
      const { cart: updatedCart } = await medusaClient.store.cart.createLineItem(cart.id, {
        variant_id: variantId,
        quantity,
      });
      setCart(updatedCart);
      openCart();
    } catch (e) {
      console.error("Error adding to cart", e);
    } finally {
      setIsAdding(false);
    }
  };

  const removeFromCart = async (lineId: string) => {
    if (!cart?.id) return;
    try {
      const { cart: updatedCart } = await medusaClient.store.cart.deleteLineItem(cart.id, lineId);
      setCart(updatedCart);
    } catch (e) {
      console.error("Error removing from cart", e);
    }
  };

  const updateQuantity = async (lineId: string, quantity: number) => {
    if (!cart?.id) return;
    try {
      const { cart: updatedCart } = await medusaClient.store.cart.updateLineItem(cart.id, lineId, {
        quantity,
      });
      setCart(updatedCart);
    } catch (e) {
      console.error("Error updating quantity", e);
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      cartIsOpen,
      isAdding,
      openCart,
      closeCart,
      addToCart,
      removeFromCart,
      updateQuantity,
      refreshCart: initCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
