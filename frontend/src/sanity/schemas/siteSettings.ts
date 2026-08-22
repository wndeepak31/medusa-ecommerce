import { defineType, defineField, defineArrayMember } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  preview: {
    prepare() {
      return { title: 'Global Site Settings' }
    }
  },
  fields: [
    defineField({
      name: 'promotionalBannerText',
      title: 'Top Promotional Banner Text',
      type: 'string',
      description: 'The text displayed in the dark green banner at the very top of the site.',
    }),
    defineField({
      name: 'supportPhoneNumber',
      title: 'Support Phone Number',
      type: 'string',
    }),
    
    // LOGO CONFIGURATION
    defineField({
      name: 'logoType',
      title: 'Logo Type',
      type: 'string',
      options: {
        list: [
          { title: 'Text Based', value: 'text' },
          { title: 'Image Upload', value: 'image' },
        ],
        layout: 'radio',
      },
      initialValue: 'text',
    }),
    defineField({
      name: 'logoText',
      title: 'Logo Text (if Text Based)',
      type: 'string',
      hidden: ({ document }) => document?.logoType !== 'text',
    }),
    defineField({
      name: 'logoImage',
      title: 'Logo Image (if Image Upload)',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ document }) => document?.logoType !== 'image',
    }),

    // NAVIGATION
    defineField({
      name: 'mainNav',
      title: 'Main Navigation Menu',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Menu Label (e.g. ENGAGEMENT RINGS)' },
            { name: 'url', type: 'string', title: 'Link URL (e.g. /collections/engagement-rings)' },
          ],
        }),
      ],
    }),
    defineField({
      name: 'footerColumns',
      title: 'Footer Columns',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Column Title' },
            {
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    { name: 'label', type: 'string', title: 'Label' },
                    { name: 'url', type: 'string', title: 'URL' },
                  ]
                })
              ]
            }
          ]
        })
      ]
    })
  ],
})
