const Medusa = require("@medusajs/js-sdk").default;
const medusaClient = new Medusa({ baseUrl: "http://localhost:9000" });
console.log(Object.keys(medusaClient.store.cart));
if (medusaClient.store.cart.lineItems) console.log("lineItems:", Object.keys(medusaClient.store.cart.lineItems));
if (medusaClient.store.cart.lineItem) console.log("lineItem:", Object.keys(medusaClient.store.cart.lineItem));
