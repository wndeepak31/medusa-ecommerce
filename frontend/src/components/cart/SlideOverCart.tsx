"use client";

import React, { Fragment } from 'react';
import { useCart } from '@/lib/context/CartContext';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function SlideOverCart() {
  const { cart, cartIsOpen, closeCart, removeFromCart, updateQuantity } = useCart();

  if (!cartIsOpen) return null;

  return (
    <div className="relative z-50">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity" 
        onClick={closeCart}
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md">
        <div className="w-full h-full flex flex-col bg-white shadow-xl translate-x-0 transition-transform duration-500 ease-in-out">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-serif text-gray-900 flex items-center">
              <ShoppingBag className="mr-2 h-5 w-5" /> Shopping Bag
            </h2>
            <button
              type="button"
              className="-m-2 p-2 text-gray-400 hover:text-gray-500 transition-colors"
              onClick={closeCart}
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {!cart?.items || cart.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-gray-500">
                <ShoppingBag className="h-12 w-12 opacity-20" />
                <p className="font-serif text-lg">Your bag is empty.</p>
                <button onClick={closeCart} className="text-sm font-semibold uppercase tracking-widest border-b border-black text-black hover:text-gray-600">
                  Continue Shopping
                </button>
              </div>
            ) : (
              <ul className="-my-6 divide-y divide-gray-200">
                {cart.items.map((item: any) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden bg-gray-100">
                      {item.thumbnail ? (
                        <img src={item.thumbnail} alt={item.title} className="h-full w-full object-cover object-center" />
                      ) : (
                        <div className="h-full w-full bg-gray-200" />
                      )}
                    </div>

                    <div className="ml-4 flex flex-1 flex-col font-sans">
                      <div>
                        <div className="flex justify-between text-sm font-medium text-gray-900 mb-1">
                          <h3>
                            <Link href={`/products/${item.variant?.product?.handle || '#'}`} onClick={closeCart}>
                              {item.title}
                            </Link>
                          </h3>
                          <p className="ml-4">₹{item.total}</p>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">{item.description}</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm mt-4">
                        
                        {/* Quantity Selector */}
                        <div className="flex items-center border border-gray-300 rounded-sm">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="px-2 py-1 text-gray-500 hover:text-black disabled:opacity-30"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 py-1 text-xs font-semibold">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-gray-500 hover:text-black"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <div className="flex">
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="font-medium text-xs text-gray-500 hover:text-red-600 transition-colors uppercase tracking-widest border-b border-transparent hover:border-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer / Checkout */}
          {cart?.items?.length > 0 && (
            <div className="border-t border-gray-200 px-6 py-6 font-sans">
              <div className="flex justify-between text-sm font-medium text-gray-900 mb-2">
                <p>Subtotal</p>
                <p>₹{cart.subtotal}</p>
              </div>
              <p className="text-xs text-gray-500 mb-6">Shipping and taxes calculated at checkout.</p>
              <div className="mt-6">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="flex items-center justify-center bg-[#18342b] px-6 py-4 text-sm font-semibold tracking-widest text-white shadow-sm hover:bg-black uppercase transition-colors"
                >
                  Checkout
                </Link>
              </div>
              <div className="mt-4 flex justify-center text-center text-xs text-gray-500">
                <p>
                  or{' '}
                  <button
                    type="button"
                    className="font-medium text-black hover:text-gray-500"
                    onClick={closeCart}
                  >
                    Continue Shopping<span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
