import { defineType, defineField, defineArrayMember } from 'sanity'

export const valuePropsBlock = defineType({
  name: 'valuePropsBlock',
  title: 'Value Propositions',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Section Title', type: 'string' }),
    defineField({
      name: 'props',
      title: 'Value Props',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description' },
            { name: 'image', type: 'image', title: 'Icon (Optional)' },
            { name: 'linkText', type: 'string', title: 'Link Text' },
            { name: 'linkUrl', type: 'string', title: 'Link URL' },
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
    prepare({ title }) { return { title: title || 'Value Props', subtitle: 'Features Module' } }
  }
})
