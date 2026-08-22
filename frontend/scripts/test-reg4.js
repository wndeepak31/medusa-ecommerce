const Medusa = require("@medusajs/js-sdk").default;
const medusaClient = new Medusa({ baseUrl: "http://localhost:9000", publishableKey: "pk_31ef620b03ceacafe92a3feade773e4c69edaa1495c7fde4ffc721291f070603" });

async function testAuthToken() {
  try {
    const token = await medusaClient.auth.register("customer", "emailpass", {
      email: "dnishad037@gmail.com",
      password: "password123"
    });
    
    // Set token on the client globally
    medusaClient.client.setToken(token);
    
    // Now create customer
    const res = await medusaClient.store.customer.create({
      email: "dnishad037@gmail.com",
      first_name: "Deepak",
      last_name: "Nishad"
    });
    console.log("Customer created:", res.customer.id);
  } catch (e) {
    console.error("Error:", e.message, e.response?.data);
  }
}
testAuthToken();
