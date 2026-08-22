"use client";

import React, { useState } from 'react';
import { Search, User, Heart, ShoppingBag, Video } from 'lucide-react';
import Link from 'next/link';
import { urlForImage } from '@/sanity/lib/image';
import { useCart } from '@/lib/context/CartContext';
import { useWishlist } from '@/lib/context/WishlistContext';
import { useCustomer } from '@/lib/context/CustomerContext';
import SearchModal from './SearchModal';

export default function Header({ siteSettings }: { siteSettings?: any }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const { cart, openCart } = useCart();
  const { wishlist, openWishlist } = useWishlist();
  const { customer, openAuthModal } = useCustomer();
  const itemCount = cart?.items?.reduce((total: number, item: any) => total + item.quantity, 0) || 0;
  const wishlistCount = wishlist?.length || 0;
  const promoBanner = siteSettings?.promotionalBannerText || "ENDS SOON! Receive a Lab Diamond Tennis Bracelet With Purchase Over $1,000. Use Code TENNIS in Cart.";
  const phone = siteSettings?.supportPhoneNumber || "800.691.0952";
  
  const logoType = siteSettings?.logoType || 'text';
  const logoText = siteSettings?.logoText || "ANTIGRAVITY";
  const logoImageUrl = siteSettings?.logoImage ? urlForImage(siteSettings.logoImage)?.url() : null;

  const mainNav = siteSettings?.mainNav?.length > 0 ? siteSettings.mainNav : [
    { label: "ENGAGEMENT RINGS", url: "/collections/engagement-rings" },
    { label: "WEDDING RINGS", url: "/collections/wedding-rings" },
    { label: "DIAMONDS", url: "/collections/diamonds" },
    { label: "GEMSTONES", url: "/collections/gemstones" },
    { label: "JEWELRY", url: "/collections/jewelry" },
    { label: "GIFTS", url: "/collections/gifts" },
    { label: "ABOUT", url: "/about" },
  ];

  return (
    <>
    <header className="w-full bg-white border-b border-[#e5e5e5]">
      {/* Top Promotional Banner */}
      {promoBanner && (
        <div 
          className="w-full bg-[#29463b] text-white py-2 text-xs font-medium text-center tracking-wide"
          dangerouslySetInnerHTML={{ __html: promoBanner }}
        />
      )}

      {/* Main Header Row */}
      <div className="max-w-[1264px] mx-auto px-4 lg:px-0 h-20 flex items-center justify-between">
        {/* Left Side Utilities */}
        <div className="flex items-center space-x-6 text-sm text-gray-700">
          <span className="font-medium text-gray-500">{phone}</span>
          <Link href="/stores" className="flex items-center space-x-1 hover:text-black transition-colors">
            <span>Stores</span>
          </Link>
          <Link href="/appointment" className="flex items-center space-x-1 hover:text-black transition-colors">
            <Video size={16} />
            <span>Virtual Appointment</span>
          </Link>
        </div>

        {/* Center Logo */}
        <Link href="/" className="flex items-center justify-center">
          {logoType === 'image' && logoImageUrl ? (
            <img src={logoImageUrl} alt="Logo" className="h-10 object-contain" />
          ) : (
            <span className="text-3xl font-serif tracking-widest text-black flex items-center">
              {logoText}<sup className="text-xs ml-1">®</sup>
            </span>
          )}
        </Link>

        {/* Right Side Utilities */}
        <div className="flex items-center space-x-5 text-gray-700">
          <button className="hover:text-black transition-colors" onClick={() => setSearchOpen(true)}>
            <Search size={20} strokeWidth={1.5} />
          </button>
          <button className="hover:text-black transition-colors" onClick={() => customer ? window.location.href = '/account' : openAuthModal()}>
            <User size={20} strokeWidth={1.5} />
          </button>
          <button className="hover:text-black transition-colors relative" onClick={openWishlist}>
            <Heart size={20} strokeWidth={1.5} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#18342b] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>
          <button className="hover:text-black transition-colors relative" onClick={openCart}>
            <ShoppingBag size={20} strokeWidth={1.5} />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#18342b] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
          <div className="flex items-center space-x-1 text-sm font-medium pl-2 border-l border-gray-200 cursor-pointer">
            <span className="text-xs">🇮🇳</span>
            <span>INR</span>
          </div>
        </div>
      </div>

      {/* Navigation Links Row */}
      <nav className="max-w-[1264px] mx-auto px-4 lg:px-0 h-12 flex justify-center items-center space-x-8 text-xs font-semibold tracking-widest text-gray-800">
        {mainNav.map((link: any, idx: number) => (
          <Link key={idx} href={link.url || '#'} className="hover:text-gray-500 transition-colors uppercase">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
    <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
