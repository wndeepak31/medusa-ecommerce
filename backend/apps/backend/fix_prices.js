const { Client } = require('pg');
const client = new Client({ connectionString: 'postgresql://neondb_owner:npg_RAzfE0yCqk9u@ep-royal-sunset-ay4ad4mr-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require' });
client.connect().then(async () => {
  const res = await client.query("UPDATE price SET currency_code = 'inr' WHERE currency_code = 'eur'");
  console.log('Updated ' + res.rowCount + ' prices to INR');
  client.end();
}).catch(console.error);
