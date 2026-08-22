"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { medusaClient } from "@/lib/medusa";

interface CustomerContextType {
  customer: any;
  setCustomer: (customer: any) => void;
  isLoading: boolean;
  logout: () => Promise<void>;
  authModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const CustomerProvider = ({ children }: { children: React.ReactNode }) => {
  const [customer, setCustomer] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const pubKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "pk_31ef620b03ceacafe92a3feade773e4c69edaa1495c7fde4ffc721291f070603";
        // Note: For persistent sessions across reloads without setting cookies manually, 
        // this requires cookies to be set. Since we are storing token in memory, 
        // page reloads will log user out unless we store token in localStorage.
        const token = localStorage.getItem("_medusa_token");
        if (!token) throw new Error("No token");
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"}/store/customers/me`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "x-publishable-api-key": pubKey
          }
        });
        if (!res.ok) throw new Error("Failed to fetch customer profile");
        const { customer } = await res.json();
        
        setCustomer(customer);
      } catch (e) {
        setCustomer(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCustomer();
  }, []);

  const logout = async () => {
    try {
      await medusaClient.auth.logout();
      setCustomer(null);
    } catch (e) {
      console.error("Logout error", e);
    }
  };

  const openAuthModal = () => setAuthModalOpen(true);
  const closeAuthModal = () => setAuthModalOpen(false);

  return (
    <CustomerContext.Provider value={{
      customer,
      setCustomer,
      isLoading,
      logout,
      authModalOpen,
      openAuthModal,
      closeAuthModal
    }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error("useCustomer must be used within a CustomerProvider");
  }
  return context;
};
