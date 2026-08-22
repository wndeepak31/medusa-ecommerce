const pubKey = "pk_31ef620b03ceacafe92a3feade773e4c69edaa1495c7fde4ffc721291f070603";
const email = "dnishad031@gmail.com";

async function checkErr() {
  const headers = { "Content-Type": "application/json", "x-publishable-api-key": pubKey };
  
  // 1. Create a cart
  let res = await fetch("http://localhost:9000/store/carts", {
    method: "POST", headers, body: JSON.stringify({ currency_code: "inr" })
  });
  let data = await res.json();
  const cartId = data.cart.id;

  // 2. Fetch products to get a variant
  res = await fetch("http://localhost:9000/store/products", { headers });
  data = await res.json();
  const variantId = data.products[0].variants[0].id;

  // 3. Add to cart
  await fetch(`http://localhost:9000/store/carts/${cartId}/line-items`, {
    method: "POST", headers, body: JSON.stringify({ variant_id: variantId, quantity: 1 })
  });

  // 4. Update cart address
  await fetch(`http://localhost:9000/store/carts/${cartId}`, {
    method: "POST", headers, body: JSON.stringify({
      email,
      shipping_address: { first_name: "John", last_name: "Doe", address_1: "123 Test St", city: "NYC", country_code: "in", postal_code: "10001" }
    })
  });

  // 5. Get shipping options
  res = await fetch(`http://localhost:9000/store/shipping-options?cart_id=${cartId}`, { headers });
  data = await res.json();
  const optionId = data.shipping_options?.[0]?.id;
  console.log("Option:", optionId);

  if (optionId) {
    // 6. Add shipping method
    res = await fetch(`http://localhost:9000/store/carts/${cartId}/shipping-methods`, {
      method: "POST", headers, body: JSON.stringify({ option_id: optionId })
    });
    console.log("Add Shipping Method Res:", res.status);
    console.log("Body:", await res.text());
  }
}

checkErr().catch(console.error);
