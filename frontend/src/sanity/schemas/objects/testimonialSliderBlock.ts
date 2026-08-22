import { defineType, defineField, defineArrayMember } from 'sanity'

export const testimonialSliderBlock = defineType({
  name: 'testimonialSliderBlock',
  title: 'Testimonial Slider',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Section Title', type: 'string' }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'quote', type: 'text', title: 'Quote' },
            { name: 'author', type: 'string', title: 'Author Name' },
            { name: 'rating', type: 'number', title: 'Star Rating (1-5)', initialValue: 5, validation: Rule => Rule.min(1).max(5) },
          ]
        })
      ]
    })
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) { return { title: title || 'Testimonials', subtitle: 'Slider Module' } }
  }
})
