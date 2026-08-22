import { defineType, defineField } from 'sanity'

export const heroBlock = defineType({
  name: 'heroBlock',
  title: 'Split Hero',
  type: 'object',
  fields: [
    defineField({ name: 'leftHeading', title: 'Left Heading', type: 'string' }),
    defineField({ name: 'leftImage', title: 'Left Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'leftButtonText', title: 'Left Button Text', type: 'string' }),
    defineField({ name: 'leftButtonLink', title: 'Left Button Link', type: 'string' }),
    
    defineField({ name: 'rightHeading', title: 'Right Heading', type: 'string' }),
    defineField({ name: 'rightImage', title: 'Right Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'rightButtonText', title: 'Right Button Text', type: 'string' }),
    defineField({ name: 'rightButtonLink', title: 'Right Button Link', type: 'string' }),
  ],
  preview: {
    select: { title: 'leftHeading' },
    prepare({ title }) { return { title: title || 'Split Hero', subtitle: 'Hero Module' } }
  }
})
