import { defineType, defineField, defineArrayMember } from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page Builder',
      type: 'array',
      of: [
        defineArrayMember({ type: 'heroBlock' }),
        defineArrayMember({ type: 'categoryGridBlock' }),
        defineArrayMember({ type: 'diamondShapesBlock' }),
        defineArrayMember({ type: 'liveProductCarouselBlock' }),
        defineArrayMember({ type: 'valuePropsBlock' }),
        defineArrayMember({ type: 'videoHeroBlock' }),
        defineArrayMember({ type: 'testimonialSliderBlock' }),
        defineArrayMember({ type: 'accordionBlock' }),
        defineArrayMember({ type: 'newsletterBlock' }),
        defineArrayMember({ type: 'richTextBlock' }),
      ],
      description: 'Drag and drop modules to construct your page layout.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({ title, slug }) {
      return {
        title: title || 'Untitled Page',
        subtitle: slug === '/' ? 'Homepage' : `/${slug || ''}`,
      }
    }
  }
})
