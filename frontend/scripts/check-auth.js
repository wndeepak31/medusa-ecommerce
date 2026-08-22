const Medusa = require("@medusajs/js-sdk").default;
const medusaClient = new Medusa({ baseUrl: "http://localhost:9000" });

console.log("auth:");
console.log(Object.keys(medusaClient.auth));

console.log("\ncustomers:");
console.log(Object.keys(medusaClient.customers));
