"use client";

import React, { useState } from 'react';
import { useCustomer } from '@/lib/context/CustomerContext';
import { X, Loader2 } from 'lucide-react';
import { medusaClient } from '@/lib/medusa';
import { useRouter } from 'next/navigation';

export default function AuthModal() {
  const { authModalOpen, closeAuthModal, setCustomer } = useCustomer();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  if (!authModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const pubKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "pk_31ef620b03ceacafe92a3feade773e4c69edaa1495c7fde4ffc721291f070603";

      if (isLogin) {
        // Login
        const token = await medusaClient.auth.login("customer", "emailpass", {
          email,
          password
        });
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"}/store/customers/me`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "x-publishable-api-key": pubKey
          }
        });
        if (!res.ok) throw new Error("Failed to fetch customer profile");
        const { customer } = await res.json();

        localStorage.setItem("_medusa_token", token);
        setCustomer(customer);
        closeAuthModal();
        router.push('/account');
      } else {
        // Sign Up
        const token = await medusaClient.auth.register("customer", "emailpass", {
          email,
          password
        });
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"}/store/customers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "x-publishable-api-key": pubKey
          },
          body: JSON.stringify({ email, first_name: firstName, last_name: lastName })
        });
        if (!res.ok) throw new Error("Failed to create customer");
        const { customer } = await res.json();

        localStorage.setItem("_medusa_token", token);
        setCustomer(customer);
        closeAuthModal();
        router.push('/account');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-50">
      <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={closeAuthModal} />
      
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
        <div className="w-full max-w-md bg-white shadow-xl flex flex-col font-sans animate-in zoom-in-95 duration-200">
          
          <div className="flex justify-end p-4">
            <button onClick={closeAuthModal} className="text-gray-400 hover:text-black transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="px-8 pb-10">
            <h2 className="text-2xl font-serif text-center mb-2">
              {isLogin ? "Welcome Back" : "Create an Account"}
            </h2>
            <p className="text-sm text-gray-500 text-center mb-8">
              {isLogin 
                ? "Sign in to access your wishlist, saved addresses, and order history."
                : "Join Antigravity for a seamless shopping experience."}
            </p>

            {error && (
              <div className="bg-red-50 text-red-600 text-xs p-3 mb-6 border border-red-200 rounded-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="First Name" 
                    required
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    className="w-full border border-gray-300 p-3 text-sm focus:border-black outline-none transition-colors" 
                  />
                  <input 
                    type="text" 
                    placeholder="Last Name" 
                    required
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    className="w-full border border-gray-300 p-3 text-sm focus:border-black outline-none transition-colors" 
                  />
                </div>
              )}
              <input 
                type="email" 
                placeholder="Email Address" 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border border-gray-300 p-3 text-sm focus:border-black outline-none transition-colors" 
              />
              <input 
                type="password" 
                placeholder="Password" 
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full border border-gray-300 p-3 text-sm focus:border-black outline-none transition-colors" 
              />
              
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#18342b] text-white py-4 font-semibold tracking-widest uppercase text-xs hover:bg-black transition-colors flex justify-center mt-6 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : (isLogin ? "Sign In" : "Create Account")}
              </button>
            </form>

            <div className="mt-8 text-center text-sm">
              <span className="text-gray-500">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
              </span>
              <button 
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }} 
                className="text-black font-medium underline hover:text-gray-600"
              >
                {isLogin ? "Sign Up" : "Log In"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
