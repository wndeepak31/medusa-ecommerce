

async function fixShippingPrices() {
  const adminEmail = "admin@antigravity.com";
  const adminPass = "admin123";

  console.log("Authenticating...");
  let res = await fetch("http://127.0.0.1:9000/auth/user/emailpass", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: adminEmail, password: adminPass })
  });
  let data = await res.json();
  const token = data.token;
  console.log("Got token.");

  const headers = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  };

  // Get shipping options
  res = await fetch("http://127.0.0.1:9000/admin/shipping-options", { headers });
  data = await res.json();
  
  for (const opt of data.shipping_options) {
    console.log(`Processing ${opt.name} (${opt.id})...`);
    
    // We need to add an INR price. We can get existing prices and just append an INR price.
    // In V2, prices are nested under 'prices' array.
    const newPrices = [
      ...opt.prices.map(p => {
        // Strip out read-only fields when updating
        return {
          id: p.id,
          currency_code: p.currency_code,
          amount: p.amount
        }
      }),
      {
        currency_code: "inr",
        amount: 100 // 100 INR = 100, no wait, 10 in INR
      }
    ];

    res = await fetch(`http://127.0.0.1:9000/admin/shipping-options/${opt.id}`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        prices: newPrices
      })
    });
    
    if (res.ok) {
      console.log(`Updated ${opt.name} with INR price.`);
    } else {
      console.log(`Failed to update ${opt.name}:`, await res.text());
    }
  }
}

fixShippingPrices().catch(console.error);
