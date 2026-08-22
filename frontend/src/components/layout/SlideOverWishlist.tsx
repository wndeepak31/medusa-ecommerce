"use client";

import React from 'react';
import { useWishlist } from '@/lib/context/WishlistContext';
import { useCart } from '@/lib/context/CartContext';
import { X, Heart, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function SlideOverWishlist() {
  const { wishlist, wishlistIsOpen, closeWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!wishlistIsOpen) return null;

  return (
    <div className="relative z-50">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity" 
        onClick={closeWishlist}
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md">
        <div className="w-full h-full flex flex-col bg-white shadow-xl translate-x-0 transition-transform duration-500 ease-in-out">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-serif text-gray-900 flex items-center">
              <Heart className="mr-2 h-5 w-5" /> Wishlist
            </h2>
            <button
              type="button"
              className="-m-2 p-2 text-gray-400 hover:text-gray-500 transition-colors"
              onClick={closeWishlist}
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Wishlist Items */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {!wishlist || wishlist.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-gray-500">
                <Heart className="h-12 w-12 opacity-20" />
                <p className="font-serif text-lg">Your wishlist is empty.</p>
                <button onClick={closeWishlist} className="text-sm font-semibold uppercase tracking-widest border-b border-black text-black hover:text-gray-600">
                  Explore Collections
                </button>
              </div>
            ) : (
              <ul className="-my-6 divide-y divide-gray-200">
                {wishlist.map((item: any) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden bg-gray-100 relative group cursor-pointer">
                      <Link href={`/products/${item.handle}`} onClick={closeWishlist}>
                        {item.thumbnail ? (
                          <img src={item.thumbnail} alt={item.title} className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform" />
                        ) : (
                          <div className="h-full w-full bg-gray-200" />
                        )}
                      </Link>
                    </div>

                    <div className="ml-4 flex flex-1 flex-col font-sans">
                      <div>
                        <div className="flex justify-between text-sm font-medium text-gray-900 mb-1">
                          <h3>
                            <Link href={`/products/${item.handle}`} onClick={closeWishlist} className="hover:underline">
                              {item.title}
                            </Link>
                          </h3>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                          {item.variants?.[0]?.calculated_price?.calculated_amount 
                            ? `₹${item.variants[0].calculated_price.calculated_amount}` : ""}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm mt-4">
                        
                        <button
                          onClick={() => {
                            if (item.variants?.[0]?.id) {
                              addToCart(item.variants[0].id, 1);
                              closeWishlist();
                            }
                          }}
                          className="flex items-center text-xs font-semibold uppercase tracking-widest bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-sm transition-colors"
                        >
                          <ShoppingBag size={14} className="mr-1" /> Add to Bag
                        </button>

                        <button
                          onClick={() => toggleWishlist(item)}
                          className="font-medium text-xs text-gray-500 hover:text-red-600 transition-colors uppercase tracking-widest border-b border-transparent hover:border-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
