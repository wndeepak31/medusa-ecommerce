import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BlockRenderer from "@/components/layout/BlockRenderer";
import FilterSortBar from "@/components/collections/FilterSortBar";
import WishlistButton from "@/components/collections/WishlistButton";
import { medusaClient } from "@/lib/medusa";
import { client } from "@/sanity/lib/client";
import { Heart, SlidersHorizontal, ChevronDown } from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

export default async function CollectionPage(props: any) {
  const params = await Promise.resolve(props.params);
  const searchParams = await Promise.resolve(props.searchParams || {});
  const handle = params.handle;
  
  const sort = typeof searchParams?.sort === 'string' ? searchParams.sort : 'created_at';
  const metal = typeof searchParams?.metal === 'string' ? searchParams.metal : null;

  // Fetch Sanity Data
  const [sanityCollection, siteSettings] = await Promise.all([
    client.fetch(`*[_type == "collectionPage" && handle == $handle][0]`, { handle }).catch(() => null),
    client.fetch(`*[_type == "siteSettings" && _id == "siteSettings"][0]`).catch(() => null),
  ]);

  // Fetch Medusa Data
  let collection = null;
  let products: any[] = [];
  try {
    const { regions } = await medusaClient.store.region.list();
    const inrRegion = regions.find((r: any) => r.currency_code === 'inr') || regions[0];

    let productParams: any = { 
      region_id: inrRegion?.id, 
      limit: 20,
      order: sort
    };
    
    // Check if it's a real Medusa collection
    const { collections } = await medusaClient.store.collection.list({ handle: [handle] } as any);
    if (collections && collections.length > 0) {
      collection = collections[0];
      productParams.collection_id = [collection.id];
    } else {
      console.log("No specific collection found, falling back to all products");
    }

    const res = await medusaClient.store.product.list(productParams);
    products = res.products || [];

    // Temporary Frontend Filtering for Metal (Since Medusa tags might not match exactly)
    if (metal) {
      products = products.filter(p => p.title.includes(metal) || p.description?.includes(metal));
    }
  } catch (error) {
    console.error("Error fetching medusa data:", error);
  }

  const fallbackTitle = handle.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const title = sanityCollection?.title || collection?.title || fallbackTitle;

  return (
    <main className="min-h-screen bg-white">
      <Header siteSettings={siteSettings} />
      
      {/* Top Page Builder */}
      {sanityCollection?.pageBuilderTop && (
        <BlockRenderer blocks={sanityCollection.pageBuilderTop} medusaProducts={products} />
      )}

      {/* Breadcrumbs */}
      <div className="max-w-[1264px] mx-auto px-4 lg:px-0 py-4 text-xs text-gray-500 font-sans border-b border-gray-100 mb-8">
        <Link href="/" className="hover:text-black">Home</Link> / <span className="text-gray-900">{title}</span>
      </div>

      {/* Page Header */}
      {!sanityCollection?.pageBuilderTop && (
        <div className="max-w-[1264px] mx-auto px-4 lg:px-0 text-center mb-12">
          <h1 className="text-4xl font-serif text-gray-900 mb-4">{title}</h1>
          <p className="text-sm text-gray-600 font-sans leading-relaxed max-w-3xl mx-auto">
            Shop {title.toLowerCase()} across a wide range of designs. Choose a setting, select a natural diamond, lab grown diamond, or gemstone... <span className="font-semibold underline cursor-pointer hover:text-black">Read More</span>
          </p>
        </div>
      )}

      {/* Filter & Sort Bar */}
      <FilterSortBar totalResults={products.length} />

      {/* Product Grid */}
      <section className="max-w-[1264px] mx-auto px-4 lg:px-0 pb-24">
        {products.length === 0 ? (
          <div className="text-center text-gray-500 py-10 font-serif text-xl">No products found in this collection.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12">
            {products.map((product: any, idx: number) => {
              const price = product.variants?.[0]?.calculated_price?.calculated_amount 
                ? `₹${product.variants[0].calculated_price.calculated_amount}` : "";
              const tags = ["AWARD WINNING", "MOST LOVED", "HIDDEN HALO", "NEW"];
              const tag = tags[idx % tags.length];
                
              return (
                <Link href={`/products/${product.handle}`} key={product.id} className="group cursor-pointer flex flex-col relative font-sans block">
                  
                  <div className="absolute top-4 left-4 z-10 bg-[#18342b] text-white text-[9px] font-bold tracking-widest px-2 py-1 rounded-sm uppercase">
                    {tag}
                  </div>
                  <WishlistButton product={product} className="absolute top-4 right-4" />

                  <div className="aspect-[4/5] bg-[#f9f9f9] mb-4 relative overflow-hidden flex items-center justify-center">
                    {product.thumbnail ? (
                      <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                       <svg className="text-gray-200 w-24 h-24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="14" r="6"></circle><polygon points="12 4 14 7 10 7"></polygon></svg>
                    )}
                    {/* Hover transparent overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                  </div>

                  <div className="flex justify-center space-x-2 mb-4">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#ffd700] to-[#daa520] border border-gray-200" title="Yellow Gold"></div>
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#f0f0f0] to-[#dcdcdc] border border-gray-200" title="White Gold"></div>
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#e0bfb8] to-[#c89b91] border border-gray-200" title="Rose Gold"></div>
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#e5e4e2] to-[#b0b0b0] border border-gray-200" title="Platinum"></div>
                  </div>

                  <div className="text-center px-4">
                    <h3 className="text-sm text-gray-900 font-medium mb-1 line-clamp-2">{product.title}</h3>
                    <p className="text-sm text-gray-600">{price}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Bottom Page Builder */}
      {sanityCollection?.pageBuilderBottom && (
        <BlockRenderer blocks={sanityCollection.pageBuilderBottom} medusaProducts={products} />
      )}

      <Footer siteSettings={siteSettings} />
    </main>
  );
}
