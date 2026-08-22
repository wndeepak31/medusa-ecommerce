const Medusa = require("@medusajs/js-sdk").default;
const medusaClient = new Medusa({ baseUrl: "http://localhost:9000" });

async function testCustomer() {
  try {
    const res = await medusaClient.store.customer.create({
      email: "test556@example.com",
      first_name: "Test",
      last_name: "User"
    });
    console.log("Customer Create success", res);
  } catch (e) {
    console.error("Customer Create error:", e.message || e);
  }
}

testCustomer();
