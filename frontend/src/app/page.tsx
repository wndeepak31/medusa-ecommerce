import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BlockRenderer from "@/components/layout/BlockRenderer";
import { medusaClient } from "@/lib/medusa";
import { client } from "@/sanity/lib/client";

export const revalidate = 0;

export default async function Home() {
  // Fetch the page with slug '/' or 'home'
  const [page, siteSettings, regionRes] = await Promise.all([
    client.fetch(`*[_type == "page" && (slug.current == "/" || slug.current == "home")][0]`).catch(() => null),
    client.fetch(`*[_type == "siteSettings" && _id == "siteSettings"][0]`).catch(() => null),
    medusaClient.store.region.list().catch(() => ({ regions: [] }))
  ]);

  const inrRegion = regionRes?.regions?.find((r: any) => r.currency_code === 'inr');
  
  const { products } = inrRegion 
    ? await medusaClient.store.product.list({ region_id: inrRegion.id, limit: 10 }).catch(() => ({ products: [] }))
    : { products: [] };

  return (
    <main className="min-h-screen bg-white">
      <Header siteSettings={siteSettings} />
      
      {page?.pageBuilder ? (
        <BlockRenderer blocks={page.pageBuilder} medusaProducts={products} />
      ) : (
        <div className="flex items-center justify-center h-[50vh] text-gray-500 font-serif">
          Please create a Page in Sanity with slug "/" and add modules to the Page Builder.
        </div>
      )}

      <Footer siteSettings={siteSettings} />
    </main>
  );
}
