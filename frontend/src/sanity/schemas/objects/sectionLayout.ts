import { defineType, defineField } from 'sanity'

export const sectionLayout = defineType({
  name: 'sectionLayout',
  title: 'Layout Settings',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    defineField({
      name: 'columns',
      title: 'Columns per Row (Desktop)',
      type: 'number',
      options: { 
        list: [2, 3, 4, 5, 6]
      },
      initialValue: 4,
      description: 'Only applies to grids (Categories, Products, Value Props)'
    }),
    defineField({
      name: 'textAlign',
      title: 'Text Alignment',
      type: 'string',
      options: { 
        list: [
          {title: 'Left', value: 'text-left'},
          {title: 'Center', value: 'text-center'},
          {title: 'Right', value: 'text-right'}
        ]
      },
      initialValue: 'text-left'
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: { 
        list: [
          {title: 'White', value: 'bg-white'},
          {title: 'Off-White', value: 'bg-[#fafafa]'},
          {title: 'Light Gray', value: 'bg-gray-100'},
          {title: 'Dark Green (Text becomes white)', value: 'bg-[#29463b] text-white'},
        ]
      },
      initialValue: 'bg-white'
    })
  ]
})
