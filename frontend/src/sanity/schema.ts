import { type SchemaTypeDefinition } from 'sanity'
import { siteSettings } from './schemas/siteSettings'
import { page } from './schemas/page'
import { heroBlock } from './schemas/objects/heroBlock'
import { categoryGridBlock } from './schemas/objects/categoryGridBlock'
import { diamondShapesBlock } from './schemas/objects/diamondShapesBlock'
import { liveProductCarouselBlock } from './schemas/objects/liveProductCarouselBlock'
import { valuePropsBlock } from './schemas/objects/valuePropsBlock'
import { videoHeroBlock } from './schemas/objects/videoHeroBlock'
import { testimonialSliderBlock } from './schemas/objects/testimonialSliderBlock'
import { accordionBlock } from './schemas/objects/accordionBlock'
import { newsletterBlock } from './schemas/objects/newsletterBlock'
import { richTextBlock } from './schemas/objects/richTextBlock'
import { sectionLayout } from './schemas/objects/sectionLayout'
import { collectionPage } from './schemas/collectionPage'
import { productPage } from './schemas/productPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettings,
    sectionLayout, // Must be registered before blocks that use it
    page,
    collectionPage,
    productPage,
    heroBlock,
    categoryGridBlock,
    diamondShapesBlock,
    liveProductCarouselBlock,
    valuePropsBlock,
    videoHeroBlock,
    testimonialSliderBlock,
    accordionBlock,
    newsletterBlock,
    richTextBlock
  ],
}
