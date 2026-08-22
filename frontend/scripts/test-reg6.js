const Medusa = require("@medusajs/js-sdk").default;
const medusaClient = new Medusa({ baseUrl: "http://localhost:9000", publishableKey: "pk_31ef620b03ceacafe92a3feade773e4c69edaa1495c7fde4ffc721291f070603" });

async function testReg6() {
  try {
    const token = await medusaClient.auth.register("customer", "emailpass", {
      email: "dnishad041@gmail.com",
      password: "password123"
    });
    console.log("Token", token);
    
    // Now try to retrieve the customer
    const res = await medusaClient.store.customer.retrieve(undefined, { 
      headers: { 
        Authorization: `Bearer ${token}`,
        "x-publishable-api-key": "pk_31ef620b03ceacafe92a3feade773e4c69edaa1495c7fde4ffc721291f070603"
      } 
    });
    console.log("Customer retrieved:", res.customer);
  } catch (e) {
    console.error("Error:", e.message, e.response?.data);
  }
}
testReg6();
