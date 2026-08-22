const pubKey = "pk_31ef620b03ceacafe92a3feade773e4c69edaa1495c7fde4ffc721291f070603";

async function testOrders2() {
  try {
    let res = await fetch("http://localhost:9000/auth/customer/emailpass/register", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-publishable-api-key": pubKey },
      body: JSON.stringify({ email: "testorders2@example.com", password: "password123" })
    });
    let data = await res.json();
    const token = data.token;

    await fetch("http://localhost:9000/store/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-publishable-api-key": pubKey, "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ email: "testorders2@example.com", first_name: "Deepak", last_name: "Nishad" })
    });

    res = await fetch("http://localhost:9000/store/orders", {
      headers: { "Authorization": `Bearer ${token}`, "x-publishable-api-key": pubKey }
    });
    data = await res.json();
    console.log("Orders Res:", res.status, data);
  } catch(e) {
    console.error(e);
  }
}

testOrders2();
