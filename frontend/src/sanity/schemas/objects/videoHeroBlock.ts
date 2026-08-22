import { defineType, defineField } from 'sanity'

export const videoHeroBlock = defineType({
  name: 'videoHeroBlock',
  title: 'Background Video Hero',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'string' }),
    defineField({ name: 'videoUrl', title: 'Video URL (MP4 link)', type: 'url', description: 'Link to a hosted .mp4 file' }),
    defineField({ name: 'buttonText', title: 'Button Text', type: 'string' }),
    defineField({ name: 'buttonLink', title: 'Button Link', type: 'string' }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) { return { title: title || 'Video Hero', subtitle: 'Video Module' } }
  }
})
