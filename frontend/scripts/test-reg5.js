const Medusa = require("@medusajs/js-sdk").default;
const medusaClient = new Medusa({ baseUrl: "http://localhost:9000", publishableKey: "pk_31ef620b03ceacafe92a3feade773e4c69edaa1495c7fde4ffc721291f070603" });

async function testReg5() {
  try {
    const token = await medusaClient.auth.register("customer", "emailpass", {
      email: "dnishad040@gmail.com",
      password: "password123"
    });
    
    const res = await medusaClient.store.customer.create({
      email: "dnishad040@gmail.com",
      first_name: "Deepak",
      last_name: "Nishad"
    }, undefined, { 
      headers: { 
        Authorization: `Bearer ${token}`,
        "x-publishable-api-key": "pk_31ef620b03ceacafe92a3feade773e4c69edaa1495c7fde4ffc721291f070603"
      } 
    });
    console.log("Success", res.customer.id);
  } catch (e) {
    console.error("Error:", e.message, e.response?.data);
  }
}
testReg5();
