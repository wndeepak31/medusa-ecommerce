"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface WishlistContextType {
  wishlist: any[];
  wishlistIsOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
  toggleWishlist: (product: any) => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [wishlistIsOpen, setWishlistIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("antigravity_wishlist");
    if (saved) {
      try {
        setWishlist(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse wishlist");
      }
    }
  }, []);

  const saveWishlist = (newWishlist: any[]) => {
    setWishlist(newWishlist);
    localStorage.setItem("antigravity_wishlist", JSON.stringify(newWishlist));
  };

  const openWishlist = () => setWishlistIsOpen(true);
  const closeWishlist = () => setWishlistIsOpen(false);

  const toggleWishlist = (product: any) => {
    const exists = wishlist.find(item => item.id === product.id);
    if (exists) {
      saveWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      saveWishlist([...wishlist, product]);
      openWishlist();
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{
      wishlist,
      wishlistIsOpen,
      openWishlist,
      closeWishlist,
      toggleWishlist,
      isInWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
