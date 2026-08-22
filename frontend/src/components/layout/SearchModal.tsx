"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { medusaClient } from '@/lib/medusa';
import Link from 'next/link';

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (!isOpen) {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const { products } = await medusaClient.store.product.list({
          q: query,
          limit: 8
        });
        setResults(products);
      } catch (e) {
        console.error("Search error", e);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white font-sans flex flex-col animate-in fade-in duration-200">
      
      {/* Search Header */}
      <div className="h-24 border-b border-gray-200 flex items-center px-4 lg:px-12 max-w-[1440px] w-full mx-auto">
        <Search className="text-gray-400 mr-4" size={24} />
        <input 
          ref={inputRef}
          type="text" 
          placeholder="Search for jewelry, diamonds, or collections..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 text-xl lg:text-3xl font-serif text-gray-900 placeholder:text-gray-300 outline-none bg-transparent"
        />
        <button onClick={onClose} className="ml-4 p-2 text-gray-400 hover:text-black transition-colors">
          <X size={32} strokeWidth={1} />
        </button>
      </div>

      {/* Results Area */}
      <div className="flex-1 overflow-y-auto px-4 lg:px-12 py-12 max-w-[1440px] w-full mx-auto">
        {loading ? (
          <div className="flex items-center justify-center h-48 text-gray-400">
            <Loader2 className="animate-spin mr-2" size={24} /> Searching...
          </div>
        ) : query && results.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <h2 className="text-2xl font-serif mb-2">No results found for "{query}"</h2>
            <p className="text-sm">Try checking your spelling or using more general terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            {results.map((product) => (
              <Link href={`/products/${product.handle}`} key={product.id} className="group cursor-pointer block" onClick={onClose}>
                <div className="aspect-[4/5] overflow-hidden mb-3 bg-gray-100 relative">
                  {product.thumbnail && <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                </div>
                <h3 className="text-xs font-medium text-gray-900 mb-1">{product.title}</h3>
                <p className="text-xs text-gray-500">
                  {product.variants?.[0]?.calculated_price?.calculated_amount 
                    ? `₹${product.variants[0].calculated_price.calculated_amount}` : ""}
                </p>
              </Link>
            ))}
          </div>
        )}

        {!query && (
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-6 border-b border-gray-100 pb-2">Trending Searches</h3>
            <div className="flex flex-wrap gap-3">
              {['Engagement Rings', 'Tennis Bracelets', 'Solitaire', '18K Gold', 'Lab Grown'].map(term => (
                <button 
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-4 py-2 bg-gray-50 text-sm hover:bg-gray-100 transition-colors border border-gray-200 rounded-sm"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
