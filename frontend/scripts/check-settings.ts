import { getCliClient } from 'sanity/cli'
const client = getCliClient()
async function run() {
  const docs = await client.fetch('*[_type == "siteSettings"]{_id, logoText}')
  console.log(JSON.stringify(docs, null, 2))
}
run()
