"use client";

import React from 'react';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/lib/context/WishlistContext';

export default function WishlistButton({ product, className = '' }: { product: any, className?: string }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const active = isInWishlist(product.id);

  return (
    <button 
      onClick={(e) => {
        e.preventDefault(); // Prevent link click if inside a Link
        e.stopPropagation();
        toggleWishlist(product);
      }}
      className={`z-20 transition-colors ${active ? 'text-red-500' : 'text-gray-400 hover:text-red-500'} ${className}`}
    >
      <Heart size={20} strokeWidth={1.5} fill={active ? 'currentColor' : 'none'} />
    </button>
  );
}
