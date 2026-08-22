"use client";

import React, { useState } from "react";
import { SlidersHorizontal, ChevronDown, X, Check } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function FilterSortBar({ totalResults }: { totalResults: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const currentSort = searchParams.get("sort") || "created_at";
  const currentMetal = searchParams.get("metal");

  const sortOptions = [
    { label: "Newest", value: "created_at" },
    { label: "Price (Low to High)", value: "price_asc" },
    { label: "Price (High to Low)", value: "price_desc" },
  ];

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`${pathname}?${params.toString()}`);
    setIsSortOpen(false);
  };

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get(key) === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("metal");
    params.delete("price");
    router.push(`${pathname}?${params.toString()}`);
    setIsFilterOpen(false);
  };

  return (
    <>
      <div className="max-w-[1264px] mx-auto px-4 lg:px-0 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center font-sans space-y-4 md:space-y-0">
        <button 
          onClick={() => setIsFilterOpen(true)}
          className="bg-[#18342b] text-white px-6 py-2 text-sm flex items-center space-x-2 hover:bg-black transition-colors"
        >
          <span>Filters</span>
          <SlidersHorizontal size={14} />
        </button>

        <div className="relative">
          <div 
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center space-x-2 text-sm text-gray-700 border border-gray-300 px-4 py-2 cursor-pointer hover:border-gray-900 bg-white"
          >
            <span>Sort By: <strong>{sortOptions.find(o => o.value === currentSort)?.label || "Newest"}</strong></span>
            <ChevronDown size={14} />
          </div>

          {isSortOpen && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 shadow-lg z-20">
              {sortOptions.map(option => (
                <div 
                  key={option.value}
                  onClick={() => handleSort(option.value)}
                  className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-[1264px] mx-auto px-4 lg:px-0 mb-4 text-xs font-semibold text-gray-900 tracking-widest uppercase">
        {totalResults} Results
      </div>

      {/* Filter Sidebar Overlay */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex font-sans">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsFilterOpen(false)}></div>
          <div className="relative w-full max-w-sm bg-white h-full shadow-xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-serif">Filters</h2>
              <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              
              {/* Metal Filter */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold uppercase tracking-widest mb-4">Metal</h3>
                <div className="space-y-3">
                  {['18K Yellow Gold', '18K White Gold', '14K Rose Gold', 'Platinum'].map(metal => (
                    <label key={metal} className="flex items-center space-x-3 cursor-pointer group">
                      <div className={`w-4 h-4 border flex items-center justify-center ${currentMetal === metal ? 'bg-black border-black' : 'border-gray-300 group-hover:border-black'}`}>
                        {currentMetal === metal && <Check size={12} className="text-white" />}
                      </div>
                      <span className="text-sm text-gray-700 group-hover:text-black">{metal}</span>
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={currentMetal === metal}
                        onChange={() => handleFilter("metal", metal)} 
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter (Visual Mockup) */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold uppercase tracking-widest mb-4">Price Range</h3>
                <div className="flex items-center space-x-2">
                  <input type="number" placeholder="Min" className="w-full border border-gray-300 p-2 text-sm focus:border-black outline-none" />
                  <span>-</span>
                  <input type="number" placeholder="Max" className="w-full border border-gray-300 p-2 text-sm focus:border-black outline-none" />
                </div>
              </div>

            </div>

            <div className="p-4 border-t border-gray-200 flex space-x-4">
              <button onClick={clearFilters} className="w-1/2 border border-gray-300 py-3 text-sm font-semibold uppercase tracking-widest hover:border-black">
                Clear All
              </button>
              <button onClick={() => setIsFilterOpen(false)} className="w-1/2 bg-[#18342b] text-white py-3 text-sm font-semibold uppercase tracking-widest hover:bg-black">
                Apply
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
