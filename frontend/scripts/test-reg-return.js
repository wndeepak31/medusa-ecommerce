const Medusa = require("@medusajs/js-sdk").default;
const medusaClient = new Medusa({ baseUrl: "http://localhost:9000", publishableKey: "pk_31ef620b03ceacafe92a3feade773e4c69edaa1495c7fde4ffc721291f070603" });

async function testReg() {
  const res = await medusaClient.auth.register("customer", "emailpass", {
    email: "dnishad050@gmail.com",
    password: "password123"
  });
  console.log("res is string?", typeof res === "string");
  console.log("res keys?", Object.keys(res || {}));
  console.log("res.token?", res.token);
}
testReg();
