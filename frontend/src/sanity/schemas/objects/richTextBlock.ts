import { defineType, defineField } from 'sanity'

export const richTextBlock = defineType({
  name: 'richTextBlock',
  title: 'Rich Text / Story',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }]
    })
  ],
  preview: {
    prepare() { return { title: 'Rich Text Block', subtitle: 'Text Module' } }
  }
})
