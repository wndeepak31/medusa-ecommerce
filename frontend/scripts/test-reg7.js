const Medusa = require("@medusajs/js-sdk").default;
const medusaClient = new Medusa({ baseUrl: "http://localhost:9000", publishableKey: "pk_31ef620b03ceacafe92a3feade773e4c69edaa1495c7fde4ffc721291f070603" });

async function testReg7() {
  try {
    const res = await medusaClient.store.customer.create({
      email: "dnishad042@gmail.com",
      first_name: "Deepak",
      last_name: "Nishad"
    }, undefined, {
      headers: {
        "x-publishable-api-key": "pk_31ef620b03ceacafe92a3feade773e4c69edaa1495c7fde4ffc721291f070603"
      }
    });
    console.log("Customer created:", res.customer);
  } catch (e) {
    console.error("Error:", e.message, e.response?.data);
  }
}
testReg7();
