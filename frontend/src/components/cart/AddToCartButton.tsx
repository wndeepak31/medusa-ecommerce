"use client";

import React from "react";
import { useCart } from "@/lib/context/CartContext";
import { Loader2 } from "lucide-react";

export default function AddToCartButton({ variantId, disabled = false }: { variantId: string, disabled?: boolean }) {
  const { addToCart, isAdding } = useCart();

  return (
    <button 
      onClick={() => addToCart(variantId, 1)}
      disabled={disabled || isAdding}
      className="w-full bg-[#18342b] text-white py-4 font-semibold tracking-widest uppercase text-sm hover:bg-black transition-colors mb-4 flex justify-center items-center disabled:opacity-50"
    >
      {isAdding ? <Loader2 className="animate-spin" size={20} /> : "Add to Bag"}
    </button>
  );
}
