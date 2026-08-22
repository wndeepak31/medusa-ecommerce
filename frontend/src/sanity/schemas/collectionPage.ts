import { defineType, defineField, defineArrayMember } from 'sanity'

export const collectionPage = defineType({
  name: 'collectionPage',
  title: 'Collection Page Template',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title (Internal)',
      type: 'string',
      description: 'Internal reference name (e.g. "Engagement Rings Collection")',
    }),
    defineField({
      name: 'handle',
      title: 'Collection Handle',
      type: 'string',
      description: 'The URL handle of the Medusa collection (e.g. "engagement-rings")',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'pageBuilderTop',
      title: 'Top Page Builder (Above Product Grid)',
      type: 'array',
      of: [
        defineArrayMember({ type: 'heroBlock' }),
        defineArrayMember({ type: 'videoHeroBlock' }),
        defineArrayMember({ type: 'categoryGridBlock' }),
        defineArrayMember({ type: 'diamondShapesBlock' }),
        defineArrayMember({ type: 'liveProductCarouselBlock' }),
        defineArrayMember({ type: 'valuePropsBlock' }),
        defineArrayMember({ type: 'testimonialSliderBlock' }),
        defineArrayMember({ type: 'accordionBlock' }),
        defineArrayMember({ type: 'newsletterBlock' }),
        defineArrayMember({ type: 'richTextBlock' }),
      ],
    }),
    defineField({
      name: 'pageBuilderBottom',
      title: 'Bottom Page Builder (Below Product Grid)',
      type: 'array',
      of: [
        defineArrayMember({ type: 'heroBlock' }),
        defineArrayMember({ type: 'videoHeroBlock' }),
        defineArrayMember({ type: 'categoryGridBlock' }),
        defineArrayMember({ type: 'diamondShapesBlock' }),
        defineArrayMember({ type: 'liveProductCarouselBlock' }),
        defineArrayMember({ type: 'valuePropsBlock' }),
        defineArrayMember({ type: 'testimonialSliderBlock' }),
        defineArrayMember({ type: 'accordionBlock' }),
        defineArrayMember({ type: 'newsletterBlock' }),
        defineArrayMember({ type: 'richTextBlock' }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'handle',
    },
  },
})
