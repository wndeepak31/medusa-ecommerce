import { defineType, defineField, defineArrayMember } from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  preview: {
    prepare() {
      return { title: 'Homepage Content' }
    }
  },
  fields: [
    defineField({
      name: 'promotionalBanner',
      title: 'Promotional Banner Text',
      type: 'string',
      description: 'The text in the dark green banner at the top of the page',
    }),
    
    // HERO SECTION
    defineField({
      name: 'heroLeftHeading',
      title: 'Left Hero Heading',
      type: 'string',
    }),
    defineField({
      name: 'heroLeftImage',
      title: 'Left Hero Background Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroRightHeading',
      title: 'Right Hero Heading',
      type: 'string',
    }),
    defineField({
      name: 'heroRightImage',
      title: 'Right Hero Background Image',
      type: 'image',
      options: { hotspot: true },
    }),

    // CATEGORIES GRID
    defineField({
      name: 'categoriesSectionTitle',
      title: 'Categories Section Title',
      type: 'string',
    }),
    defineField({
      name: 'categoriesSectionDescription',
      title: 'Categories Section Description',
      type: 'text',
    }),
    defineField({
      name: 'categories',
      title: 'Jewelry Categories Grid',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Category Title' },
            { name: 'image', type: 'image', title: 'Category Image', options: { hotspot: true } },
            { name: 'link', type: 'string', title: 'Link URL (e.g. /collections/rings)' },
          ],
        }),
      ],
    }),

    // DIAMOND SHAPES
    defineField({
      name: 'diamondShapesSectionTitle',
      title: 'Diamond Shapes Section Title',
      type: 'string',
    }),
    defineField({
      name: 'diamondShapes',
      title: 'Diamond Shapes Grid',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Shape Name' },
            { name: 'image', type: 'image', title: 'Shape Icon/Image' },
            { name: 'link', type: 'string', title: 'Link URL' },
          ],
        }),
      ],
    }),

    // OBSESSION-WORTHY RINGS
    defineField({
      name: 'obsessionSectionTitle',
      title: 'Engagement Rings Section Title',
      type: 'string',
    }),
    defineField({
      name: 'obsessionSectionDescription',
      title: 'Engagement Rings Section Description',
      type: 'text',
    }),

    // VALUE PROPS
    defineField({
      name: 'valueProps',
      title: 'Bottom Value Propositions',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description' },
            { name: 'image', type: 'image', title: 'Icon/Image' },
            { name: 'linkText', type: 'string', title: 'Link Text' },
            { name: 'linkUrl', type: 'string', title: 'Link URL' },
          ],
        }),
      ],
    }),
  ],
})
