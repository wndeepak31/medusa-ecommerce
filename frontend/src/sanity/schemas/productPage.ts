import { defineType, defineField, defineArrayMember } from 'sanity'

export const productPage = defineType({
  name: 'productPage',
  title: 'Product Page Template',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title (Internal)',
      type: 'string',
      description: 'Internal reference name (e.g. "Medusa T-Shirt Override")',
    }),
    defineField({
      name: 'handle',
      title: 'Product Handle',
      type: 'string',
      description: 'The URL handle of the Medusa product (e.g. "medusa-t-shirt"). Leave blank to use as a global fallback template for all products.',
    }),
    defineField({
      name: 'pageBuilderBottom',
      title: 'Bottom Page Builder (Below Product Details)',
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
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: title || 'Global Product Template',
        subtitle: subtitle || 'Applies to all products',
      }
    }
  },
})
