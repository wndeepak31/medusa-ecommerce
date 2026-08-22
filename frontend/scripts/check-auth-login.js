const Medusa = require("@medusajs/js-sdk").default;
const medusaClient = new Medusa({ baseUrl: "http://localhost:9000", publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "pk_31ef620b03ceacafe92a3feade773e4c69edaa1495c7fde4ffc721291f070603" });

async function testAuthLogin() {
  try {
    const res = await medusaClient.auth.login("customer", "emailpass", {
      email: "test555@example.com",
      password: "password123"
    });
    console.log("Login success", res);
    
    // Set token for subsequent requests
    medusaClient.client.setHeaders({ Authorization: `Bearer ${res.token}` });
    
    const custRes = await medusaClient.store.customer.retrieve();
    console.log("Customer Retrieve success", custRes);
  } catch (e) {
    console.error("Login error:", e.message || e);
  }
}

testAuthLogin();
