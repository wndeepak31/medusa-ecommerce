"use client";

import React, { useEffect, useState } from 'react';
import { useCustomer } from '@/lib/context/CustomerContext';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { LogOut, Package, User, MapPin } from 'lucide-react';
import { medusaClient } from '@/lib/medusa';
import { client } from '@/sanity/lib/client';

export default function AccountPage() {
  const { customer, isLoading, logout } = useCustomer();
  const router = useRouter();
  const [siteSettings, setSiteSettings] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (!isLoading && !customer) {
      router.push('/');
    }
  }, [customer, isLoading, router]);

  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses'>('orders');

  useEffect(() => {
    // Fetch site settings for header/footer
    client.fetch(`*[_type == "siteSettings" && _id == "siteSettings"][0]`).then(setSiteSettings);
    
    // Fetch orders if customer exists
    if (customer) {
      const token = localStorage.getItem("_medusa_token");
      const pubKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "pk_31ef620b03ceacafe92a3feade773e4c69edaa1495c7fde4ffc721291f070603";
      
      fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"}/store/orders`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "x-publishable-api-key": pubKey
        }
      })
      .then(res => res.json())
      .then(data => {
        setOrders(data.orders || []);
      })
      .catch(console.error);
    }
  }, [customer]);

  if (isLoading || !customer) {
    return <div className="min-h-screen flex justify-center items-center font-sans text-gray-500">Loading your account...</div>;
  }

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header siteSettings={siteSettings} />
      
      <div className="flex-1 max-w-[1264px] mx-auto w-full px-4 lg:px-0 py-12 md:py-24">
        
        <div className="flex justify-between items-end mb-12 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-3xl font-serif text-gray-900 mb-2">My Account</h1>
            <p className="text-sm text-gray-500">Welcome back, {customer.first_name || customer.email}!</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center text-sm font-semibold uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
          >
            <LogOut size={16} className="mr-2" /> Log out
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Sidebar Navigation */}
          <div className="w-full md:w-1/4 space-y-2">
            <button 
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center p-4 text-sm font-semibold tracking-widest uppercase transition-colors ${activeTab === 'orders' ? 'bg-white border border-black shadow-sm' : 'bg-transparent border border-transparent hover:bg-gray-100 text-gray-600'}`}
            >
              <Package size={16} className="mr-3" /> Order History
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center p-4 text-sm font-semibold tracking-widest uppercase transition-colors ${activeTab === 'profile' ? 'bg-white border border-black shadow-sm' : 'bg-transparent border border-transparent hover:bg-gray-100 text-gray-600'}`}
            >
              <User size={16} className="mr-3" /> Profile Details
            </button>
            <button 
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center p-4 text-sm font-semibold tracking-widest uppercase transition-colors ${activeTab === 'addresses' ? 'bg-white border border-black shadow-sm' : 'bg-transparent border border-transparent hover:bg-gray-100 text-gray-600'}`}
            >
              <MapPin size={16} className="mr-3" /> Addresses
            </button>
          </div>

          {/* Main Content Area */}
          <div className="w-full md:w-3/4">
            
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-xl font-serif text-gray-900 mb-6">Order History</h2>
                {orders.length === 0 ? (
                  <div className="bg-white p-12 text-center border border-gray-200 shadow-sm">
                    <Package size={32} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">You haven't placed any orders yet.</h3>
                    <p className="text-sm text-gray-500 mb-6">When you do, they will show up here so you can track them.</p>
                    <button 
                      onClick={() => router.push('/')}
                      className="bg-[#18342b] text-white px-8 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-black transition-colors"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map(order => (
                      <div key={order.id} className="bg-white p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-1">Order #{order.display_id}</p>
                          <p className="text-xs text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="mt-4 md:mt-0 text-right">
                          <p className="text-sm font-medium text-gray-900 mb-1">₹{order.total}</p>
                          <p className="text-xs capitalize px-2 py-1 bg-gray-100 rounded-sm inline-block">{order.status}</p>
                        </div>
                        <div className="mt-4 md:mt-0">
                          <button onClick={() => router.push(`/order/confirmed/${order.id}`)} className="text-sm font-medium text-[#18342b] underline">View Details</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white p-8 border border-gray-200 shadow-sm">
                <h2 className="text-xl font-serif text-gray-900 mb-6 border-b border-gray-100 pb-4">Profile Details</h2>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="font-medium text-gray-900">{customer.email}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">First Name</p>
                      <p className="font-medium text-gray-900">{customer.first_name || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Last Name</p>
                      <p className="font-medium text-gray-900">{customer.last_name || '-'}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone</p>
                    <p className="font-medium text-gray-900">{customer.phone || '-'}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="bg-white p-8 border border-gray-200 shadow-sm">
                <h2 className="text-xl font-serif text-gray-900 mb-6 border-b border-gray-100 pb-4">Saved Addresses</h2>
                {(!customer.addresses || customer.addresses.length === 0) ? (
                  <p className="text-sm text-gray-500">You don't have any saved addresses yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {customer.addresses.map((address: any) => (
                      <div key={address.id} className="p-4 border border-gray-100 rounded-sm bg-gray-50">
                        <p className="font-medium text-gray-900 mb-2">{address.first_name} {address.last_name}</p>
                        <p className="text-sm text-gray-600">{address.address_1}</p>
                        {address.address_2 && <p className="text-sm text-gray-600">{address.address_2}</p>}
                        <p className="text-sm text-gray-600">{address.city}, {address.province} {address.postal_code}</p>
                        <p className="text-sm text-gray-600 mt-2">{address.phone}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>

      <Footer siteSettings={siteSettings} />
    </main>
  );
}
