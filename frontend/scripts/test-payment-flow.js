const pubKey = "pk_31ef620b03ceacafe92a3feade773e4c69edaa1495c7fde4ffc721291f070603";
const email = "dnishad031@gmail.com";

async function testPaymentFlow() {
  const headers = { "Content-Type": "application/json", "x-publishable-api-key": pubKey };
  
  // 1. Create a cart
  let res = await fetch("http://localhost:9000/store/carts", {
    method: "POST", headers, body: JSON.stringify({ currency_code: "inr" })
  });
  let data = await res.json();
  const cartId = data.cart.id;

  // 2. Add product
  res = await fetch("http://localhost:9000/store/products", { headers });
  data = await res.json();
  const variantId = data.products[0].variants[0].id;

  await fetch(`http://localhost:9000/store/carts/${cartId}/line-items`, {
    method: "POST", headers, body: JSON.stringify({ variant_id: variantId, quantity: 1 })
  });

  // 3. Update cart address
  await fetch(`http://localhost:9000/store/carts/${cartId}`, {
    method: "POST", headers, body: JSON.stringify({
      email,
      shipping_address: { first_name: "John", last_name: "Doe", address_1: "123 Test St", city: "NYC", country_code: "in", postal_code: "10001" }
    })
  });

  // 4. Get shipping options and add
  res = await fetch(`http://localhost:9000/store/shipping-options?cart_id=${cartId}`, { headers });
  data = await res.json();
  const optionId = data.shipping_options?.[0]?.id;
  await fetch(`http://localhost:9000/store/carts/${cartId}/shipping-methods`, {
    method: "POST", headers, body: JSON.stringify({ option_id: optionId })
  });

  // 5. Payment Flow!
  console.log("Creating Payment Collection...");
  res = await fetch(`http://localhost:9000/store/payment-collections`, {
    method: "POST", headers, body: JSON.stringify({ cart_id: cartId })
  });
  const pcData = await res.json();
  console.log("Payment Collection:", pcData);
  const pcId = pcData.payment_collection?.id;
  
  if (!pcId) {
    console.error("Failed to get payment collection ID!");
    return;
  }

  console.log("Initializing Session with manual provider...");
  res = await fetch(`http://localhost:9000/store/payment-collections/${pcId}/payment-sessions`, {
    method: "POST", headers, body: JSON.stringify({ provider_id: "pp_manual_manual" })
  });
  console.log("Session res status:", res.status);
  console.log("Session response:", await res.text());

  console.log("Completing Cart...");
  res = await fetch(`http://localhost:9000/store/carts/${cartId}/complete`, {
    method: "POST", headers
  });
  console.log("Complete res status:", res.status);
  console.log("Complete response:", await res.text());
}

testPaymentFlow().catch(console.error);
