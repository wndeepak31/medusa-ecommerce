"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/lib/context/CartContext";
import { useCustomer } from "@/lib/context/CustomerContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, ChevronRight, CheckCircle2, Loader2 } from "lucide-react";
import { medusaClient } from "@/lib/medusa";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, refreshCart } = useCart();
  const { customer, openAuthModal } = useCustomer();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form State
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [apt, setApt] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");
  const [phone, setPhone] = useState("");

  // Shipping
  const [shippingOptions, setShippingOptions] = useState<any[]>([]);
  const [selectedShipping, setSelectedShipping] = useState<string>("");

  useEffect(() => {
    if (customer) {
      if (!email) setEmail(customer.email);
      if (!firstName) setFirstName(customer.first_name || "");
      if (!lastName) setLastName(customer.last_name || "");
    }
  }, [customer]);

  const getHeaders = () => {
    const pubKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "pk_31ef620b03ceacafe92a3feade773e4c69edaa1495c7fde4ffc721291f070603";
    const token = typeof window !== "undefined" ? localStorage.getItem("_medusa_token") : null;
    return {
      "Content-Type": "application/json",
      "x-publishable-api-key": pubKey,
      ...(token ? { "Authorization": `Bearer ${token}` } : {})
    };
  };

  const handleInformationSubmit = async () => {
    if (!email || !firstName || !lastName || !address || !city || !state || !pin) {
      alert("Please fill in all required fields.");
      return;
    }
    setIsProcessing(true);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
      
      // Update Cart Address
      const addressRes = await fetch(`${backendUrl}/store/carts/${cart?.id}`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          email,
          shipping_address: {
            first_name: firstName,
            last_name: lastName,
            address_1: address,
            address_2: apt,
            city,
            province: state,
            postal_code: pin,
            phone,
            country_code: "gb"
          }
        })
      });

      if (!addressRes.ok) {
        throw new Error("Failed to update address: " + await addressRes.text());
      }

      // Fetch Shipping Options
      const res = await fetch(`${backendUrl}/store/shipping-options?cart_id=${cart?.id}`, {
        headers: getHeaders()
      });
      const data = await res.json();
      setShippingOptions(data.shipping_options || []);
      if (data.shipping_options?.length > 0) {
        setSelectedShipping(data.shipping_options[0].id);
      }
      
      setStep(2);
    } catch (e) {
      console.error(e);
      alert("Error updating information.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleShippingSubmit = async () => {
    if (!selectedShipping) return;
    setIsProcessing(true);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
      
      // Add Shipping Method
      await fetch(`${backendUrl}/store/carts/${cart?.id}/shipping-methods`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ option_id: selectedShipping })
      });

      await refreshCart();
      setStep(3);
    } catch (e) {
      console.error(e);
      alert("Error saving shipping method.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentSubmit = async () => {
    setIsProcessing(true);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
      
      // Init Payment Session (triggers our manual provider)
      const pcRes = await fetch(`${backendUrl}/store/payment-collections`, {
        method: "POST", headers: getHeaders(), body: JSON.stringify({ cart_id: cart?.id })
      });
      const pcData = await pcRes.json();
      const pcId = pcData.payment_collection?.id || cart?.payment_collection?.id;
      
      const sessionRes = await fetch(`${backendUrl}/store/payment-collections/${pcId}/payment-sessions`, {
        method: "POST", headers: getHeaders(), body: JSON.stringify({ provider_id: "pp_manual_manual" })
      });
      
      if (!sessionRes.ok) {
        throw new Error("Failed to create payment session: " + await sessionRes.text());
      }
      
      // Complete Cart
      const completeRes = await fetch(`${backendUrl}/store/carts/${cart?.id}/complete`, {
        method: "POST", headers: getHeaders()
      });
      
      if (!completeRes.ok) {
        throw new Error("Failed to complete cart: " + await completeRes.text());
      }
      
      const completeData = await completeRes.json();
      
      if (completeData.type === "order") {
        router.push(`/order/confirmed/${completeData.order.id}`);
      } else {
        alert("Failed to complete order. Please try again.");
      }
    } catch (e) {
      console.error(e);
      alert("Payment failed.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!cart?.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 font-sans">
        <h2 className="text-2xl font-serif mb-4">Your cart is empty</h2>
        <Link href="/" className="text-[#18342b] underline">Return to shop</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white font-sans text-gray-900">
      <div className="w-full md:w-3/5 lg:w-1/2 md:border-r border-gray-200 pl-4 pr-4 md:pl-12 lg:pl-32 md:pr-12 pt-8 pb-24">
        
        <header className="mb-8">
          <Link href="/" className="text-3xl font-serif tracking-widest block mb-4">
            Global Jewel<sup className="text-xs">®</sup>
          </Link>
          <nav className="flex items-center text-xs text-gray-500 space-x-2 font-medium uppercase tracking-widest">
            <span className={step >= 1 ? "text-black" : ""}>Information</span>
            <ChevronRight size={12} />
            <span className={step >= 2 ? "text-black" : ""}>Shipping</span>
            <ChevronRight size={12} />
            <span className={step >= 3 ? "text-black" : ""}>Payment</span>
          </nav>
        </header>

        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-serif">Contact Information</h2>
              {!customer && (
                <span className="text-xs text-gray-500">
                  Already have an account? <button onClick={openAuthModal} className="text-black underline">Log in</button>
                </span>
              )}
            </div>
            <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full border border-gray-300 p-3 mb-8 text-sm focus:border-black outline-none transition-colors" />

            <h2 className="text-lg font-serif mb-4">Shipping Address</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input type="text" placeholder="First name" value={firstName} onChange={e=>setFirstName(e.target.value)} className="w-full border border-gray-300 p-3 text-sm focus:border-black outline-none transition-colors" />
              <input type="text" placeholder="Last name" value={lastName} onChange={e=>setLastName(e.target.value)} className="w-full border border-gray-300 p-3 text-sm focus:border-black outline-none transition-colors" />
            </div>
            <input type="text" placeholder="Address" value={address} onChange={e=>setAddress(e.target.value)} className="w-full border border-gray-300 p-3 mb-4 text-sm focus:border-black outline-none transition-colors" />
            <input type="text" placeholder="Apartment, suite, etc. (optional)" value={apt} onChange={e=>setApt(e.target.value)} className="w-full border border-gray-300 p-3 mb-4 text-sm focus:border-black outline-none transition-colors" />
            <div className="grid grid-cols-3 gap-4 mb-4">
              <input type="text" placeholder="City" value={city} onChange={e=>setCity(e.target.value)} className="w-full border border-gray-300 p-3 text-sm focus:border-black outline-none transition-colors" />
              <input type="text" placeholder="State" value={state} onChange={e=>setState(e.target.value)} className="w-full border border-gray-300 p-3 text-sm focus:border-black outline-none transition-colors" />
              <input type="text" placeholder="PIN code" value={pin} onChange={e=>setPin(e.target.value)} className="w-full border border-gray-300 p-3 text-sm focus:border-black outline-none transition-colors" />
            </div>
            <input type="tel" placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} className="w-full border border-gray-300 p-3 mb-8 text-sm focus:border-black outline-none transition-colors" />
            
            <div className="flex justify-between items-center mt-8">
              <Link href="/" className="text-sm text-[#18342b] hover:underline flex items-center">
                <ChevronRight size={16} className="rotate-180 mr-1" /> Return to cart
              </Link>
              <button onClick={handleInformationSubmit} disabled={isProcessing} className="bg-[#18342b] text-white px-8 py-4 font-semibold tracking-widest uppercase text-xs hover:bg-black transition-colors disabled:opacity-50">
                {isProcessing ? <Loader2 className="animate-spin" size={16} /> : "Continue to Shipping"}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="border border-gray-300 rounded-sm mb-8 text-sm">
              <div className="flex justify-between p-4 border-b border-gray-200">
                <span className="text-gray-500 w-24">Contact</span>
                <span className="flex-1">{email}</span>
                <span className="text-[#18342b] cursor-pointer text-xs underline" onClick={() => setStep(1)}>Change</span>
              </div>
              <div className="flex justify-between p-4">
                <span className="text-gray-500 w-24">Ship to</span>
                <span className="flex-1">{address}, {city} {state} {pin}</span>
                <span className="text-[#18342b] cursor-pointer text-xs underline" onClick={() => setStep(1)}>Change</span>
              </div>
            </div>

            <h2 className="text-lg font-serif mb-4">Shipping Method</h2>
            {shippingOptions.length === 0 && <p className="text-sm text-gray-500 mb-4">No shipping options available for this address.</p>}
            
            <div className="space-y-3 mb-8">
              {shippingOptions.map((opt: any) => (
                <div 
                  key={opt.id} 
                  onClick={() => setSelectedShipping(opt.id)}
                  className={`border p-4 flex justify-between items-center rounded-sm cursor-pointer transition-colors ${selectedShipping === opt.id ? 'border-[#18342b] bg-[#f8faf9]' : 'border-gray-300 hover:border-gray-400'}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedShipping === opt.id ? 'border-[#18342b]' : 'border-gray-300'}`}>
                      {selectedShipping === opt.id && <div className="w-2 h-2 rounded-full bg-[#18342b]"></div>}
                    </div>
                    <span className="text-sm">{opt.name}</span>
                  </div>
                  <span className="font-medium text-sm">₹{opt.amount}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-8">
              <button onClick={() => setStep(1)} className="text-sm text-[#18342b] hover:underline flex items-center">
                <ChevronRight size={16} className="rotate-180 mr-1" /> Return to information
              </button>
              <button onClick={handleShippingSubmit} disabled={isProcessing || !selectedShipping} className="bg-[#18342b] text-white px-8 py-4 font-semibold tracking-widest uppercase text-xs hover:bg-black transition-colors disabled:opacity-50">
                {isProcessing ? <Loader2 className="animate-spin" size={16} /> : "Continue to Payment"}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-lg font-serif mb-4 flex items-center">
              Payment <Lock size={16} className="ml-2 text-gray-400" />
            </h2>
            <p className="text-xs text-gray-500 mb-6">All transactions are secure and encrypted.</p>

            <div className="border border-[#18342b] bg-[#f8faf9] p-6 text-center text-sm mb-8 rounded-sm">
              <h3 className="font-semibold text-lg mb-2">Test Payment Gateway</h3>
              <p className="text-gray-600 mb-4">This is a simulated payment provider. No real card details are required.</p>
              <div className="bg-white border border-gray-300 p-4 rounded-sm flex items-center justify-center space-x-2">
                <CheckCircle2 className="text-green-600" size={20} />
                <span className="font-medium">Payment will be automatically authorized</span>
              </div>
            </div>

            <div className="flex justify-between items-center mt-8">
              <button onClick={() => setStep(2)} className="text-sm text-[#18342b] hover:underline flex items-center">
                <ChevronRight size={16} className="rotate-180 mr-1" /> Return to shipping
              </button>
              <button onClick={handlePaymentSubmit} disabled={isProcessing} className="bg-[#18342b] text-white px-8 py-4 font-semibold tracking-widest uppercase text-xs hover:bg-black transition-colors flex items-center disabled:opacity-50">
                {isProcessing ? <Loader2 className="animate-spin" size={16} /> : <>Pay Now <Lock size={14} className="ml-2" /></>}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="w-full md:w-2/5 lg:w-1/2 bg-[#fafafa] md:min-h-screen p-4 md:p-12 lg:pr-32">
        <ul className="divide-y divide-gray-200 mb-6">
          {cart.items.map((item: any) => (
            <li key={item.id} className="flex py-4">
              <div className="relative h-16 w-16 bg-white border border-gray-200 rounded-sm overflow-hidden">
                {item.thumbnail && <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />}
                <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                  {item.quantity}
                </span>
              </div>
              <div className="ml-4 flex-1 flex justify-between items-center font-sans">
                <span className="text-sm font-medium text-gray-900">{item.title}</span>
                <span className="text-sm font-medium">₹{item.total}</span>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex space-x-2 mb-6">
          <input type="text" placeholder="Gift card or discount code" className="flex-1 border border-gray-300 p-3 text-sm focus:border-black outline-none transition-colors bg-white rounded-sm" />
          <button className="bg-gray-200 text-gray-500 px-6 font-semibold tracking-widest uppercase text-xs rounded-sm">Apply</button>
        </div>

        <div className="space-y-3 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{cart.subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{cart.shipping_total ? `₹${cart.shipping_total}` : 'Calculated at next step'}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-base text-gray-900">Total</span>
          <span className="text-2xl font-serif text-gray-900 flex items-center">
            <span className="text-xs text-gray-500 font-sans mr-2">INR</span> ₹{cart.total}
          </span>
        </div>
      </div>
    </div>
  );
}
