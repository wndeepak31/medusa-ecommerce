"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { CheckCircle2, Package, Truck, ArrowRight } from "lucide-react";

export default function OrderConfirmedPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
        const pubKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "pk_31ef620b03ceacafe92a3feade773e4c69edaa1495c7fde4ffc721291f070603";
        const token = localStorage.getItem("_medusa_token");
        
        const headers = {
          "x-publishable-api-key": pubKey,
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        };

        const res = await fetch(`${backendUrl}/store/orders/${resolvedParams.id}?fields=*shipping_address,*items`, { headers });
        const data = await res.json();
        setOrder(data.order);
      } catch (e) {
        console.error("Failed to fetch order", e);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrder();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#18342b] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-serif mb-4">Order Not Found</h1>
        <p className="text-gray-600 mb-8">We couldn't find the order you're looking for.</p>
        <Link href="/" className="bg-[#18342b] text-white px-8 py-3 tracking-widest uppercase text-sm">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 font-sans">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-8 md:p-12 shadow-sm rounded-sm">
          
          <div className="text-center mb-12">
            <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-serif text-gray-900 mb-2">Thank you for your purchase!</h1>
            <p className="text-gray-500">Your order <span className="font-semibold text-gray-900">{order.display_id}</span> has been confirmed.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center"><Package className="w-5 h-5 mr-2" /> Order Details</h3>
              <div className="bg-gray-50 p-4 rounded-sm text-sm text-gray-600 space-y-2">
                <div className="flex justify-between"><span>Email</span> <span className="font-medium">{order.email}</span></div>
                <div className="flex justify-between"><span>Date</span> <span className="font-medium">{new Date(order.created_at).toLocaleDateString()}</span></div>
                <div className="flex justify-between"><span>Payment</span> <span className="font-medium">Test Payment</span></div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center"><Truck className="w-5 h-5 mr-2" /> Shipping Address</h3>
              <div className="bg-gray-50 p-4 rounded-sm text-sm text-gray-600">
                <p className="font-medium mb-1">{order.shipping_address?.first_name} {order.shipping_address?.last_name}</p>
                <p>{order.shipping_address?.address_1}</p>
                {order.shipping_address?.address_2 && <p>{order.shipping_address?.address_2}</p>}
                <p>{order.shipping_address?.city}, {order.shipping_address?.province} {order.shipping_address?.postal_code}</p>
                <p className="mt-2">{order.shipping_address?.phone}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 mb-12">
            <h3 className="font-serif text-xl mb-6">Order Summary</h3>
            <ul className="divide-y divide-gray-100">
              {order.items?.map((item: any) => (
                <li key={item.id} className="py-4 flex">
                  <div className="w-16 h-16 bg-gray-100 rounded-sm overflow-hidden flex-shrink-0">
                    {item.thumbnail && <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />}
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="font-medium text-gray-900">{item.title}</p>
                    <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                  </div>
                  <div className="font-medium">₹{item.total}</div>
                </li>
              ))}
            </ul>
            
            <div className="border-t border-gray-200 mt-6 pt-6 space-y-3 text-sm">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span> <span>₹{order.subtotal}</span></div>
              <div className="flex justify-between text-gray-600"><span>Shipping</span> <span>₹{order.shipping_total}</span></div>
              <div className="flex justify-between text-gray-900 font-semibold text-lg pt-3 border-t border-gray-100">
                <span>Total</span> <span>₹{order.total}</span>
              </div>
            </div>
          </div>

          <div className="text-center flex justify-center space-x-4">
            <Link href="/" className="inline-flex items-center text-[#18342b] font-medium hover:underline">
              Continue Shopping <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
            <Link href="/account" className="inline-flex items-center text-gray-500 font-medium hover:underline">
              View Dashboard
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
