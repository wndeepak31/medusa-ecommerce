const Medusa = require("@medusajs/js-sdk").default;
const medusaClient = new Medusa({ baseUrl: "http://localhost:9000", publishableKey: "pk_31ef620b03ceacafe92a3feade773e4c69edaa1495c7fde4ffc721291f070603" });

async function testReg3() {
  try {
    const token = await medusaClient.auth.register("customer", "emailpass", {
      email: "dnishad034@gmail.com",
      password: "password123"
    });
    console.log("Token:", token);
    
    // In SDK, second argument might not be config. It's usually query, then config.
    // Let's pass token in headers
    const res = await medusaClient.store.customer.create({
      email: "dnishad034@gmail.com",
      first_name: "Deepak",
      last_name: "Nishad"
    }, undefined, { headers: { Authorization: `Bearer ${token}` } });
    console.log(res);
  } catch (e) {
    console.error("Error:", e.message, e.response?.data);
  }
}
testReg3();
