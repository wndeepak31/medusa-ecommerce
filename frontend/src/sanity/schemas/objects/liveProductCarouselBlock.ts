import { defineType, defineField } from 'sanity'

export const liveProductCarouselBlock = defineType({
  name: 'liveProductCarouselBlock',
  title: 'Live Product Carousel',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Section Title', type: 'string' }),
    defineField({ name: 'description', title: 'Section Description', type: 'text' }),
    defineField({ 
      name: 'collectionHandle', 
      title: 'Medusa Collection Handle', 
      type: 'string',
      description: 'Leave blank to fetch all recent products, or enter a collection handle (e.g., "engagement-rings") to filter.'
    }),
    defineField({ name: 'limit', title: 'Number of Products', type: 'number', initialValue: 5 }),
    defineField({
      name: 'layout',
      title: 'Layout Settings',
      type: 'sectionLayout'
    })
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) { return { title: title || 'Live Products', subtitle: 'Product Module' } }
  }
})
