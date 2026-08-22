const fs = require('fs');
const path = require('path');

const paymentPath = path.join(__dirname, 'node_modules', '@medusajs', 'payment', 'dist', 'providers');
if (fs.existsSync(paymentPath)) {
  console.log(fs.readdirSync(paymentPath));
} else {
  console.log("No providers directory found in @medusajs/payment");
}
