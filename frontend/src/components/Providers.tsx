"use client";

import { CartProvider } from "@/lib/context/CartContext";
import { WishlistProvider } from "@/lib/context/WishlistContext";
import { CustomerProvider } from "@/lib/context/CustomerContext";
import SlideOverCart from "@/components/cart/SlideOverCart";
import SlideOverWishlist from "@/components/layout/SlideOverWishlist";
import AuthModal from "@/components/auth/AuthModal";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CustomerProvider>
      <WishlistProvider>
        <CartProvider>
          {children}
          <SlideOverCart />
          <SlideOverWishlist />
          <AuthModal />
        </CartProvider>
      </WishlistProvider>
    </CustomerProvider>
  );
}
