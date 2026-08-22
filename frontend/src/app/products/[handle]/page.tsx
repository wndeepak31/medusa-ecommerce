import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BlockRenderer from "@/components/layout/BlockRenderer";
import { medusaClient } from "@/lib/medusa";
import { client } from "@/sanity/lib/client";
import { Heart, Star, ChevronDown, ChevronRight, Truck, ShieldCheck, Ruler } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import AddToCartButton from "@/components/cart/AddToCartButton";
import WishlistButton from "@/components/collections/WishlistButton";

export const revalidate = 0;

export default async function ProductPage(props: { params: Promise<{ handle: string }> }) {
  const params = await props.params;
  const handle = params.handle;

  // Fetch Medusa Product Data
  let product = null;
  try {
    const { regions } = await medusaClient.store.region.list();
    const inrRegion = regions.find((r: any) => r.currency_code === 'inr') || regions[0];

    const { products } = await medusaClient.store.product.list({ 
      handle, 
      region_id: inrRegion?.id,
      fields: "*variants,*variants.prices,*variants.calculated_price"
    } as any);
    
    if (products.length > 0) {
      product = products[0];
    }
  } catch (error) {
    console.error("Error fetching medusa product:", error);
  }

  if (!product) {
    return notFound();
  }

  // Fetch Sanity Data (Site Settings + Product Template)
  // We try to find a specific template for this handle, OR the global fallback template
  const [sanityProduct, sanityGlobalProduct, siteSettings, extraProductsRes] = await Promise.all([
    client.fetch(`*[_type == "productPage" && handle == $handle][0]`, { handle }).catch(() => null),
    client.fetch(`*[_type == "productPage" && (!defined(handle) || handle == "")][0]`).catch(() => null),
    client.fetch(`*[_type == "siteSettings" && _id == "siteSettings"][0]`).catch(() => null),
    medusaClient.store.product.list({ limit: 12 }).catch(() => ({ products: [] })),
  ]);

  const activeTemplate = sanityProduct || sanityGlobalProduct;
  const extraProducts = extraProductsRes?.products || [];
  
  // In Medusa V2, if calculated_price is missing, we fallback to the raw prices array
  const firstVariant = product.variants?.[0];
  const calculatedAmount = firstVariant?.calculated_price?.calculated_amount;
  const rawPriceAmount = firstVariant?.prices?.[0]?.amount;
  
  const displayPrice = calculatedAmount !== undefined && calculatedAmount !== null 
    ? calculatedAmount 
    : rawPriceAmount;

  const price = displayPrice !== undefined && displayPrice !== null 
    ? `₹${displayPrice}` : "Price unavailable";

  return (
    <main className="min-h-screen bg-white font-sans text-gray-900">
      <Header siteSettings={siteSettings} />
      
      {/* Breadcrumbs */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-12 py-6 text-xs text-gray-500 flex items-center space-x-2">
        <Link href="/" className="hover:text-black transition-colors">Home</Link> 
        <ChevronRight size={12} />
        <Link href="/collections/all" className="hover:text-black transition-colors">Jewelry</Link> 
        <ChevronRight size={12} />
        <span className="text-gray-900 font-medium">{product.title}</span>
      </div>

      {/* Main PDP Layout */}
      <section className="max-w-[1440px] mx-auto px-4 lg:px-12 pb-16 md:pb-24">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          
          {/* Left Column: Images */}
          <div className="w-full lg:w-3/5 grid grid-cols-2 gap-4">
            <div className="col-span-2 aspect-[4/5] md:aspect-square bg-[#f9f9f9] relative group overflow-hidden">
              {product.thumbnail && (
                <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              )}
            </div>
            <div className="aspect-square bg-[#f9f9f9] relative overflow-hidden group">
              {product.thumbnail && (
                <img src={product.thumbnail} alt={`${product.title} Detail`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
              )}
            </div>
            <div className="aspect-square bg-[#f9f9f9] relative overflow-hidden group flex items-center justify-center">
              <span className="text-gray-400 text-sm tracking-widest uppercase">+ View More</span>
            </div>
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="w-full lg:w-2/5 pt-4 lg:pt-8 flex flex-col sticky top-24 self-start">
            
            <div className="flex justify-between items-start mb-2 relative">
              <h1 className="text-3xl lg:text-4xl font-serif text-gray-900 leading-tight">{product.title}</h1>
              <div className="relative w-8 h-8 flex items-center justify-center">
                <WishlistButton product={product} />
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <p className="text-xl font-sans tracking-wide">{price}</p>
              <div className="flex items-center space-x-1 text-yellow-500">
                <Star size={14} fill="currentColor" strokeWidth={0} />
                <Star size={14} fill="currentColor" strokeWidth={0} />
                <Star size={14} fill="currentColor" strokeWidth={0} />
                <Star size={14} fill="currentColor" strokeWidth={0} />
                <Star size={14} fill="currentColor" strokeWidth={0} opacity={0.3} />
                <span className="text-xs text-gray-500 ml-2 border-b border-gray-300 hover:border-black cursor-pointer leading-none">42 Reviews</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-8">
              {product.description || "An exquisite piece crafted with exceptional attention to detail. This design captures timeless elegance and modern sophistication, making it a perfect addition to any collection."}
            </p>

            {/* Options (Mocked for visual) */}
            <div className="mb-6">
              <div className="flex justify-between text-xs mb-3 font-semibold uppercase tracking-widest">
                <span>Metal</span>
                <span className="text-gray-500 font-normal">18K Yellow Gold</span>
              </div>
              <div className="flex space-x-3">
                <button className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ffd700] to-[#daa520] border-2 border-black ring-2 ring-transparent transition-all" title="Yellow Gold"></button>
                <button className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f0f0f0] to-[#dcdcdc] border border-gray-300 hover:border-gray-500 transition-all" title="White Gold"></button>
                <button className="w-10 h-10 rounded-full bg-gradient-to-br from-[#e0bfb8] to-[#c89b91] border border-gray-300 hover:border-gray-500 transition-all" title="Rose Gold"></button>
                <button className="w-10 h-10 rounded-full bg-gradient-to-br from-[#e5e4e2] to-[#b0b0b0] border border-gray-300 hover:border-gray-500 transition-all" title="Platinum"></button>
              </div>
            </div>

            {/* Size (Mocked) */}
            <div className="mb-8">
              <div className="flex justify-between items-end text-xs mb-3">
                <span className="font-semibold uppercase tracking-widest">Ring Size</span>
                <span className="text-gray-500 flex items-center hover:text-black cursor-pointer border-b border-transparent hover:border-black transition-colors">
                  <Ruler size={14} className="mr-1" /> Size Guide
                </span>
              </div>
              <button className="w-full flex justify-between items-center border border-gray-300 p-4 hover:border-black transition-colors text-sm">
                <span className="text-gray-500">Select your size</span>
                <ChevronDown size={16} />
              </button>
            </div>

            {/* Add to Cart */}
            <AddToCartButton 
              variantId={product.variants?.[0]?.id} 
              disabled={!product.variants?.length} 
            />
            
            <p className="text-center text-[10px] text-gray-500 uppercase tracking-widest mb-10">
              Complimentary shipping and returns on all orders.
            </p>

            {/* Accordions */}
            <div className="border-t border-gray-200">
              <details className="group" open>
                <summary className="flex justify-between items-center font-semibold text-sm cursor-pointer list-none py-5 border-b border-gray-200">
                  <span className="tracking-widest uppercase">Product Details</span>
                  <span className="transition group-open:rotate-180">
                    <ChevronDown size={16} />
                  </span>
                </summary>
                <div className="text-gray-600 text-sm leading-relaxed py-4 pb-6">
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Style: Classic Solitaire</li>
                    <li>Metal: 18K Yellow Gold</li>
                    <li>Width: 2.0 mm</li>
                    <li>Ethically sourced and conflict-free</li>
                  </ul>
                </div>
              </details>
              <details className="group">
                <summary className="flex justify-between items-center font-semibold text-sm cursor-pointer list-none py-5 border-b border-gray-200">
                  <span className="tracking-widest uppercase">Shipping & Returns</span>
                  <span className="transition group-open:rotate-180">
                    <ChevronDown size={16} />
                  </span>
                </summary>
                <div className="text-gray-600 text-sm leading-relaxed py-4 pb-6">
                  We offer free FedEx Priority Overnight shipping on all orders. Need to return it? We offer a 30-day, no-questions-asked return policy.
                </div>
              </details>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center space-x-6 mt-8 pt-8 border-t border-gray-200 text-xs text-gray-700">
              <div className="flex flex-col items-center justify-center flex-1 space-y-2">
                <Truck size={24} strokeWidth={1} />
                <span className="text-center text-[10px] uppercase tracking-widest">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center justify-center flex-1 space-y-2">
                <ShieldCheck size={24} strokeWidth={1} />
                <span className="text-center text-[10px] uppercase tracking-widest">Lifetime Warranty</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Universal Page Builder for Products */}
      {activeTemplate?.pageBuilderBottom && (
        <div className="border-t border-gray-100">
          <BlockRenderer blocks={activeTemplate.pageBuilderBottom} medusaProducts={extraProducts} />
        </div>
      )}

      <Footer siteSettings={siteSettings} />
    </main>
  );
}
