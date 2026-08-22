const Medusa = require("@medusajs/js-sdk").default;
const medusaClient = new Medusa({ baseUrl: "http://localhost:9000", publishableKey: "pk_31ef620b03ceacafe92a3feade773e4c69edaa1495c7fde4ffc721291f070603" });

console.log("Client properties:", Object.keys(medusaClient.client));
console.log("Client proto:", Object.getOwnPropertyNames(Object.getPrototypeOf(medusaClient.client)));
