import { defineType, defineField, defineArrayMember } from 'sanity'

export const accordionBlock = defineType({
  name: 'accordionBlock',
  title: 'FAQ / Accordion',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Section Title', type: 'string' }),
    defineField({
      name: 'items',
      title: 'Accordion Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'question', type: 'string', title: 'Question / Header' },
            { name: 'answer', type: 'text', title: 'Answer / Content' },
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
    prepare({ title }) { return { title: title || 'FAQ Accordion', subtitle: 'Accordion Module' } }
  }
})
