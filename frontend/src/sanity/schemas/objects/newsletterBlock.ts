import { defineType, defineField } from 'sanity'

export const newsletterBlock = defineType({
  name: 'newsletterBlock',
  title: 'Newsletter Signup',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Join the List' }),
    defineField({ name: 'subtext', title: 'Subtext', type: 'text' }),
    defineField({ name: 'buttonText', title: 'Button Text', type: 'string', initialValue: 'Subscribe' }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) { return { title: title || 'Newsletter', subtitle: 'Signup Module' } }
  }
})
