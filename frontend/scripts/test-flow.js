const email = "dnishad047@gmail.com";
const password = "password123";
const pubKey = "pk_31ef620b03ceacafe92a3feade773e4c69edaa1495c7fde4ffc721291f070603";

async function testFlow() {
  try {
    // 1. Register
    let res = await fetch("http://localhost:9000/auth/customer/emailpass/register", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-publishable-api-key": pubKey },
      body: JSON.stringify({ email, password })
    });
    let data = await res.json();
    console.log("Register Res:", res.status, data);
    const token = data.token;

    // 2. Retrieve customer
    res = await fetch("http://localhost:9000/store/customers/me", {
      headers: { "Authorization": `Bearer ${token}`, "x-publishable-api-key": pubKey }
    });
    data = await res.json();
    console.log("Retrieve Res:", res.status, data);
    
    // 3. If retrieve failed, try to CREATE customer
    if (res.status !== 200) {
      console.log("Trying to create customer...");
      res = await fetch("http://localhost:9000/store/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-publishable-api-key": pubKey, "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ email, first_name: "Deepak", last_name: "Nishad" })
      });
      data = await res.json();
      console.log("Create Res:", res.status, data);
    }
  } catch(e) {
    console.error(e);
  }
}

testFlow();
