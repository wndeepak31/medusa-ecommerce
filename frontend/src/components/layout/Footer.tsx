import React from 'react';
import Link from 'next/link';

export default function Footer({ siteSettings }: { siteSettings?: any }) {
  const fallbackColumns = [
    {
      title: "About",
      links: [
        { label: "Our Story", url: "/story" },
        { label: "Our Mission", url: "/mission" },
        { label: "Responsible Sourcing", url: "/sourcing" },
        { label: "Sustainability Goals", url: "/sustainability" },
        { label: "How We Give Back", url: "/give-back" },
        { label: "Our People", url: "/people" },
        { label: "Brilliant Earth Reviews", url: "/reviews" },
      ]
    },
    {
      title: "Orders",
      links: [
        { label: "Track Your Order", url: "/track" },
        { label: "Free 30 Day Returns", url: "/returns" },
        { label: "Free Shipping Both Ways", url: "/shipping" },
        { label: "Free Lifetime Warranty", url: "/warranty" },
      ]
    },
    {
      title: "Contact Us",
      links: [
        { label: "Live Chat", url: "#" },
        { label: "Book Appointment", url: "/appointment" },
        { label: "Stores", url: "/stores" },
        { label: "Email Us", url: "mailto:email@example.com" },
        { label: "800.691.0952", url: "tel:8006910952" },
        { label: "Affiliates", url: "/affiliates" },
      ]
    },
    {
      title: "Education",
      links: [
        { label: "Blog", url: "/blog" },
        { label: "4 C's of Diamond Guide", url: "/diamond-guide" },
        { label: "Lab Grown vs. Natural Diamond", url: "/lab-vs-natural" },
        { label: "Moissanite vs. Diamond Guide", url: "/moissanite-guide" },
        { label: "Free Ring Sizer + Ring Size Chart", url: "/ring-sizer" },
        { label: "Careers", url: "/careers" },
        { label: "Investor Relations", url: "/investors" },
      ]
    },
    {
      title: "Customer Service",
      links: [
        { label: "We've Got You Covered", url: "/covered" },
        { label: "FAQs", url: "/faqs" },
        { label: "Jewelry Financing", url: "/financing" },
        { label: "Lifetime Diamond Upgrade", url: "/upgrade" },
        { label: "Promo Codes & Offers", url: "/promo" },
        { label: "Refer a Friend", url: "/refer" },
        { label: "Accessibility", url: "/accessibility" },
        { label: "Accessibility Info", url: "/accessibility-info" },
      ]
    }
  ];

  const columns = siteSettings?.footerColumns?.length > 0 ? siteSettings.footerColumns : fallbackColumns;

  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8 font-sans">
      <div className="max-w-[1264px] mx-auto px-4 lg:px-0">
        
        {/* Main Footer Links - 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-12 mb-16">
          
          {columns.map((col: any, idx: number) => (
            <div key={idx}>
              <h4 className="text-xs text-gray-800 uppercase tracking-widest mb-6 font-medium">{col.title}</h4>
              <ul className="space-y-3 text-[13px] text-gray-500">
                {col.links?.map((link: any, linkIdx: number) => (
                  <li key={linkIdx}>
                    <Link href={link.url || "#"} className="hover:text-black transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Sign Up / Newsletter (Always shown as last item in grid) */}
          <div>
            <h4 className="text-xs text-gray-800 uppercase tracking-widest mb-6 font-medium">Sign Up</h4>
            <div className="flex items-center space-x-2 text-[13px] text-gray-500 mb-4">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              <span>Email me updates and offers</span>
            </div>
            <div className="flex border border-gray-300 h-10 w-full max-w-[280px] focus-within:border-gray-900 transition-colors mb-6">
              <input type="email" placeholder="Your Email Address" className="flex-1 px-3 text-[13px] text-gray-800 focus:outline-none" />
              <button className="bg-[#18342b] text-white px-4 hover:bg-black transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
            
            {/* Social Icons Placeholder */}
            <div className="flex items-center space-x-5 text-gray-800">
                <a href="#" className="hover:text-gray-500"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 0H1.46C.65 0 0 .65 0 1.46v21.08c0 .81.65 1.46 1.46 1.46h21.08c.81 0 1.46-.65 1.46-1.46V1.46C24 .65 23.35 0 22.54 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zm15.11 13.02h-3.56v-5.56c0-1.32-.02-3.02-1.84-3.02-1.84 0-2.12 1.44-2.12 2.92v5.66h-3.56V9h3.42v1.56h.05c.48-.9 1.63-1.84 3.36-1.84 3.59 0 4.25 2.36 4.25 5.43v6.3z"/></svg></a>
                <a href="#" className="hover:text-gray-500"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
103:                 <a href="#" className="hover:text-gray-500"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
                <a href="#" className="hover:text-gray-500"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
                <a href="#" className="hover:text-gray-500"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/></svg></a>
              </div>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 pb-12 flex flex-col items-center space-y-4 text-[10px] text-gray-500 font-sans">
          <div className="flex flex-wrap justify-center text-center max-w-4xl mx-auto space-x-2">
            <span>©2026 Brilliant Earth, LLC</span>
            <span>|</span>
            <Link href="/terms" className="hover:text-gray-900">Terms & Conditions</Link>
            <span>|</span>
            <Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link>
            <span>|</span>
            <Link href="/ads" className="hover:text-gray-900">Interest-Based Ads</Link>
            <span>|</span>
            <Link href="/donotsell" className="hover:text-gray-900">Do Not Sell or Share My Personal Information</Link>
            <span>|</span>
            <Link href="/ca" className="hover:text-gray-900">CA Transparency Act</Link>
            <span>|</span>
            <Link href="/cpra" className="hover:text-gray-900">CPRA</Link>
            <span>|</span>
            <Link href="/sitemap" className="hover:text-gray-900">Site Map</Link>
          </div>
          
          <div className="flex space-x-3 tracking-widest uppercase">
            <span className="hover:text-gray-900 cursor-pointer">AUD</span>
            <span>|</span>
            <span className="hover:text-gray-900 cursor-pointer">CAD</span>
            <span>|</span>
            <span className="hover:text-gray-900 cursor-pointer">GBP</span>
            <span>|</span>
            <span className="hover:text-gray-900 cursor-pointer">USD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
