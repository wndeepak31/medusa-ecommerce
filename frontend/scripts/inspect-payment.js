const Medusa = require("@medusajs/js-sdk").default;
const medusaClient = new Medusa({ baseUrl: "http://localhost:9000" });
console.log(medusaClient.store.payment.initiatePaymentSession.toString());
