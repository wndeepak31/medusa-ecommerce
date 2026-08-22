const pubKey = "pk_31ef620b03ceacafe92a3feade773e4c69edaa1495c7fde4ffc721291f070603";

async function testCheckout() {
  const headers = { "Content-Type": "application/json", "x-publishable-api-key": pubKey };
  
  // 1. Create a cart
  console.log("Creating cart...");
  let res = await fetch("http://localhost:9000/store/carts", {
    method: "POST", headers, body: JSON.stringify({ currency_code: "inr" })
  });
  let data = await res.json();
  const cartId = data.cart.id;
  console.log("Cart created:", cartId);

  // 2. Fetch products to get a variant
  res = await fetch("http://localhost:9000/store/products", { headers });
  data = await res.json();
  const variantId = data.products[0].variants[0].id;

  // 3. Add to cart
  res = await fetch(`http://localhost:9000/store/carts/${cartId}/line-items`, {
    method: "POST", headers, body: JSON.stringify({ variant_id: variantId, quantity: 1 })
  });
  data = await res.json();
  console.log("Added item.");

  // 4. Update cart address
  res = await fetch(`http://localhost:9000/store/carts/${cartId}`, {
    method: "POST", headers, body: JSON.stringify({
      email: "test@example.com",
      shipping_address: { first_name: "John", last_name: "Doe", address_1: "123 Test St", city: "NYC", country_code: "in", postal_code: "10001" }
    })
  });
  data = await res.json();
  console.log("Address updated.");

  // 5. Get shipping options
  // In v2, the endpoint to list shipping options for a cart is GET /store/shipping-options?cart_id=...
  res = await fetch(`http://localhost:9000/store/shipping-options?cart_id=${cartId}`, { headers });
  data = await res.json();
  console.log("Shipping options:", data);
  const optionId = data.shipping_options?.[0]?.id;

  if (optionId) {
    // 6. Add shipping method
    res = await fetch(`http://localhost:9000/store/carts/${cartId}/shipping-methods`, {
      method: "POST", headers, body: JSON.stringify({ option_id: optionId })
    });
    console.log("Shipping method added.");
  }

  // 7. Init Payment Session
  res = await fetch(`http://localhost:9000/store/carts/${cartId}/payment-sessions`, {
    method: "POST", headers
  });
  data = await res.json();
  console.log("Payment sessions:", data);
  
  // 8. Complete cart
  res = await fetch(`http://localhost:9000/store/carts/${cartId}/complete`, {
    method: "POST", headers
  });
  data = await res.json();
  console.log("Complete result:", data);
}

testCheckout().catch(console.error);
