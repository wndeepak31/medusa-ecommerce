import { defineType, defineField, defineArrayMember } from 'sanity'

export const categoryGridBlock = defineType({
  name: 'categoryGridBlock',
  title: 'Category Grid',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Section Title', type: 'string' }),
    defineField({ name: 'description', title: 'Section Description', type: 'text' }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Category Title' },
            { name: 'image', type: 'image', title: 'Image', options: { hotspot: true } },
            { name: 'link', type: 'string', title: 'Link URL' },
          ]
        })
      ]
    }),
    defineField({
      name: 'layout',
      title: 'Layout Settings',
      type: 'sectionLayout'
    })
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) { return { title: title || 'Category Grid', subtitle: 'Grid Module' } }
  }
})
