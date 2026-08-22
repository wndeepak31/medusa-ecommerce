const pubKey = "pk_31ef620b03ceacafe92a3feade773e4c69edaa1495c7fde4ffc721291f070603";
async function getOptions() {
  const headers = { "Content-Type": "application/json", "x-publishable-api-key": pubKey };
  // get a cart id
  let res = await fetch("http://localhost:9000/store/carts", {
    method: "POST", headers, body: JSON.stringify({ currency_code: "inr" })
  });
  let data = await res.json();
  const cartId = data.cart.id;
  
  res = await fetch(`http://localhost:9000/store/shipping-options?cart_id=${cartId}`, { headers });
  data = await res.json();
  console.log(JSON.stringify(data.shipping_options, null, 2));
}
getOptions().catch(console.error);
