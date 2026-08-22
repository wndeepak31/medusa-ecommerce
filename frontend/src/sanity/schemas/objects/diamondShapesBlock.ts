import { defineType, defineField, defineArrayMember } from 'sanity'

export const diamondShapesBlock = defineType({
  name: 'diamondShapesBlock',
  title: 'Diamond Shapes Grid',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Section Title', type: 'string' }),
    defineField({
      name: 'shapes',
      title: 'Shapes',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Shape Name' },
            { name: 'image', type: 'image', title: 'Icon (Optional)' },
            { name: 'link', type: 'string', title: 'Link URL' },
          ]
        })
      ]
    })
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) { return { title: title || 'Diamond Shapes', subtitle: 'Grid Module' } }
  }
})
