import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const fallbackColumns = [
  {
    _key: 'col-1',
    title: 'About',
    links: [
      { _key: 'link-1-1', label: 'Our Story', url: '/story' },
      { _key: 'link-1-2', label: 'Our Mission', url: '/mission' },
      { _key: 'link-1-3', label: 'Responsible Sourcing', url: '/sourcing' },
      { _key: 'link-1-4', label: 'Sustainability Goals', url: '/sustainability' },
      { _key: 'link-1-5', label: 'How We Give Back', url: '/give-back' },
      { _key: 'link-1-6', label: 'Our People', url: '/people' },
      { _key: 'link-1-7', label: 'Brilliant Earth Reviews', url: '/reviews' },
    ]
  },
  {
    _key: 'col-2',
    title: 'Orders',
    links: [
      { _key: 'link-2-1', label: 'Track Your Order', url: '/track' },
      { _key: 'link-2-2', label: 'Free 30 Day Returns', url: '/returns' },
      { _key: 'link-2-3', label: 'Free Shipping Both Ways', url: '/shipping' },
      { _key: 'link-2-4', label: 'Free Lifetime Warranty', url: '/warranty' },
    ]
  },
  {
    _key: 'col-3',
    title: 'Contact Us',
    links: [
      { _key: 'link-3-1', label: 'Live Chat', url: '#' },
      { _key: 'link-3-2', label: 'Book Appointment', url: '/appointment' },
      { _key: 'link-3-3', label: 'Stores', url: '/stores' },
      { _key: 'link-3-4', label: 'Email Us', url: 'mailto:email@example.com' },
      { _key: 'link-3-5', label: '800.691.0952', url: 'tel:8006910952' },
      { _key: 'link-3-6', label: 'Affiliates', url: '/affiliates' },
    ]
  },
  {
    _key: 'col-4',
    title: 'Education',
    links: [
      { _key: 'link-4-1', label: 'Blog', url: '/blog' },
      { _key: 'link-4-2', label: '4 C\'s of Diamond Guide', url: '/diamond-guide' },
      { _key: 'link-4-3', label: 'Lab Grown vs. Natural Diamond', url: '/lab-vs-natural' },
      { _key: 'link-4-4', label: 'Moissanite vs. Diamond Guide', url: '/moissanite-guide' },
      { _key: 'link-4-5', label: 'Free Ring Sizer + Ring Size Chart', url: '/ring-sizer' },
      { _key: 'link-4-6', label: 'Careers', url: '/careers' },
      { _key: 'link-4-7', label: 'Investor Relations', url: '/investors' },
    ]
  },
  {
    _key: 'col-5',
    title: 'Customer Service',
    links: [
      { _key: 'link-5-1', label: 'We\'ve Got You Covered', url: '/covered' },
      { _key: 'link-5-2', label: 'FAQs', url: '/faqs' },
      { _key: 'link-5-3', label: 'Jewelry Financing', url: '/financing' },
      { _key: 'link-5-4', label: 'Lifetime Diamond Upgrade', url: '/upgrade' },
      { _key: 'link-5-5', label: 'Promo Codes & Offers', url: '/promo' },
      { _key: 'link-5-6', label: 'Refer a Friend', url: '/refer' },
      { _key: 'link-5-7', label: 'Accessibility', url: '/accessibility' },
      { _key: 'link-5-8', label: 'Accessibility Info', url: '/accessibility-info' },
    ]
  }
];

async function seed() {
  try {
    console.log('Seeding footer...');
    
    await client
      .patch('siteSettings')
      .set({ footerColumns: fallbackColumns })
      .commit();
      
    console.log('Footer columns seeded successfully!');
  } catch (error: any) {
    if (error.statusCode === 404) {
      await client.create({
        _id: 'siteSettings',
        _type: 'siteSettings',
        footerColumns: fallbackColumns
      });
      console.log('Created siteSettings and seeded footer successfully!');
    } else {
      console.error('Error seeding footer:', error);
    }
  }
}

seed();
