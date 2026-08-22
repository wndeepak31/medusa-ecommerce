import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './src/sanity/schema'
import { projectId, dataset } from './src/sanity/env'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singleton for Global Site Settings
            S.listItem()
              .title('Global Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings') // This locks it to a single document ID
              ),
            S.divider(),
            // Filter out siteSettings from the standard list of document types
            ...S.documentTypeListItems().filter(
              (listItem) => listItem.getId() !== 'siteSettings'
            ),
          ]),
    }),
  ],
})
