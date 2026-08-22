import React from 'react';
import Link from 'next/link';
import { urlForImage } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';

export default function BlockRenderer({ blocks, medusaProducts }: { blocks: any[], medusaProducts: any[] }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block, index) => {
        switch (block._type) {
          case 'heroBlock': return <HeroBlock key={index} data={block} />;
          case 'categoryGridBlock': return <CategoryGridBlock key={index} data={block} />;
          case 'diamondShapesBlock': return <DiamondShapesBlock key={index} data={block} />;
          case 'liveProductCarouselBlock': return <LiveProductCarouselBlock key={index} data={block} products={medusaProducts} />;
          case 'valuePropsBlock': return <ValuePropsBlock key={index} data={block} />;
          case 'videoHeroBlock': return <VideoHeroBlock key={index} data={block} />;
          case 'testimonialSliderBlock': return <TestimonialSliderBlock key={index} data={block} />;
          case 'accordionBlock': return <AccordionBlock key={index} data={block} />;
          case 'newsletterBlock': return <NewsletterBlock key={index} data={block} />;
          case 'richTextBlock': return <RichTextBlock key={index} data={block} />;
          default: return <div key={index} className="py-10 text-center text-red-500">Unknown block type: {block._type}</div>;
        }
      })}
    </>
  );
}

function HeroBlock({ data }: { data: any }) {
  const leftBg = data.leftImage ? urlForImage(data.leftImage)?.url() : "https://images.unsplash.com/photo-1605100804763-247f66127279?auto=format&fit=crop&q=80";
  const rightBg = data.rightImage ? urlForImage(data.rightImage)?.url() : "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80";

  return (
    <section className="flex flex-col md:flex-row h-[90vh]">
      <div className="flex-1 relative group cursor-pointer overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: `url('${leftBg}')` }} />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-12 left-0 w-full text-center text-white z-10 px-6">
          <h2 className="text-4xl md:text-5xl font-serif mb-4 drop-shadow-md">{data.leftHeading || "Find Your Forever"}</h2>
          <div className="flex justify-center space-x-6 uppercase tracking-widest text-xs font-bold font-sans">
            <Link href={data.leftButtonLink || "#"} className="border-b-2 border-white pb-1 hover:text-gray-200 hover:border-gray-200 transition-colors">
              {data.leftButtonText || "Shop Engagement Rings"}
            </Link>
          </div>
        </div>
      </div>
      <div className="flex-1 relative group cursor-pointer overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: `url('${rightBg}')` }} />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute bottom-12 left-0 w-full text-center text-white z-10 px-6">
          <h2 className="text-4xl md:text-5xl font-serif mb-4 drop-shadow-md">{data.rightHeading || "Stacking Season"}</h2>
          <div className="flex justify-center space-x-6 uppercase tracking-widest text-xs font-bold font-sans">
            <Link href={data.rightButtonLink || "#"} className="border-b-2 border-white pb-1 hover:text-gray-200 hover:border-gray-200 transition-colors">
              {data.rightButtonText || "Shop Women's Rings"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryGridBlock({ data }: { data: any }) {
  const cats = data.categories || [];
  const layout = data.layout || {};
  const bgClass = layout.backgroundColor || 'bg-white';
  const alignClass = layout.textAlign || 'text-left';
  const cols = layout.columns || 4;
  
  const gridColClass = cols === 2 ? 'lg:grid-cols-2' : cols === 3 ? 'lg:grid-cols-3' : cols === 4 ? 'lg:grid-cols-4' : cols === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-6';

  return (
    <section className={`py-20 ${bgClass}`}>
      <div className={`container mx-auto px-6 ${alignClass}`}>
        {data.title && <h2 className="text-3xl font-serif mb-2">{data.title}</h2>}
        {data.description && <p className="opacity-60 text-sm mb-10">{data.description}</p>}
        <div className={`grid grid-cols-2 md:grid-cols-3 ${gridColClass} gap-4 text-left`}>
          {cats.map((cat: any, idx: number) => {
            const imgSrc = cat.image ? urlForImage(cat.image)?.url() : "";
            return (
              <Link href={cat.link || "#"} key={idx} className="group cursor-pointer">
                <div className="aspect-square overflow-hidden mb-3 bg-gray-100">
                  {imgSrc && <img src={imgSrc} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />}
                </div>
                <p className="text-xs font-medium text-inherit opacity-90">{cat.title}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  );
}

function DiamondShapesBlock({ data }: { data: any }) {
  const shapes = data.shapes || [];
  return (
    <section className="bg-[#fafafa] py-16 text-black">
      <div className="container mx-auto px-6 text-center">
        {data.title && <h2 className="text-3xl font-serif mb-12">{data.title}</h2>}
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-10">
          {shapes.map((shape: any, idx: number) => {
            const imgSrc = shape.image ? urlForImage(shape.image)?.url() : null;
            return (
              <Link href={shape.link || "#"} key={idx} className="flex flex-col items-center cursor-pointer group">
                {imgSrc ? (
                  <img src={imgSrc} alt={shape.name} className="w-12 h-12 mb-3 object-contain group-hover:scale-110 transition-transform" />
                ) : (
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-400 group-hover:text-black transition-colors mb-3">
                    <polygon points="12 2 22 8.5 12 22 2 8.5 12 2" />
                  </svg>
                )}
                <span className="text-[11px] uppercase tracking-wider text-gray-500 group-hover:text-black">{shape.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  );
}

function LiveProductCarouselBlock({ data, products }: { data: any, products: any[] }) {
  const layout = data.layout || {};
  const bgClass = layout.backgroundColor || 'bg-white';
  const alignClass = layout.textAlign || 'text-left';
  const cols = layout.columns || 5;
  const gridColClass = cols === 2 ? 'lg:grid-cols-2' : cols === 3 ? 'lg:grid-cols-3' : cols === 4 ? 'lg:grid-cols-4' : cols === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-6';

  const limit = data.limit || 5;
  const displayProducts = products.slice(0, limit);
  return (
    <section className={`py-20 ${bgClass}`}>
      <div className={`container mx-auto px-6 ${alignClass}`}>
        {data.title && <h2 className="text-3xl font-serif mb-2">{data.title}</h2>}
        {data.description && <p className="opacity-60 text-sm mb-10">{data.description}</p>}
        <div className={`grid grid-cols-2 ${gridColClass} gap-2 text-left`}>
          {displayProducts.length > 0 ? displayProducts.map((product) => {
            const price = product.variants?.[0]?.calculated_price?.calculated_amount 
              ? `₹${product.variants[0].calculated_price.calculated_amount}` : "";
            return (
              <Link href={`/products/${product.handle}`} key={product.id} className="group cursor-pointer block">
                <div className="aspect-[4/5] overflow-hidden mb-3 bg-gray-100 relative">
                  {product.thumbnail && <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
                <h3 className="text-xs font-medium text-inherit mb-1">{product.title}</h3>
                <p className="text-xs opacity-60">{price}</p>
              </Link>
            );
          }) : (
            [...Array(limit)].map((_, i) => <div key={i} className="aspect-[4/5] bg-gray-100 animate-pulse" />)
          )}
        </div>
      </div>
    </section>
  );
}

function ValuePropsBlock({ data }: { data: any }) {
  const layout = data.layout || {};
  const bgClass = layout.backgroundColor || 'bg-[#f7f7f7] text-black';
  const alignClass = layout.textAlign || 'text-center';
  const cols = layout.columns || 4;
  const gridColClass = cols === 2 ? 'lg:grid-cols-2' : cols === 3 ? 'lg:grid-cols-3' : cols === 4 ? 'lg:grid-cols-4' : cols === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-6';
  const props = data.props || [];

  return (
    <section className={`py-20 ${bgClass}`}>
      <div className={`container mx-auto px-6 ${alignClass}`}>
        {data.title && <h2 className="text-2xl font-serif mb-16 tracking-widest uppercase">{data.title}</h2>}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${gridColClass} gap-12`}>
          {props.map((prop: any, idx: number) => {
            const imgSrc = prop.image ? urlForImage(prop.image)?.url() : null;
            return (
              <div key={idx} className={`flex flex-col ${alignClass === 'text-left' ? 'items-start' : alignClass === 'text-right' ? 'items-end' : 'items-center'} text-inherit`}>
                {imgSrc ? (
                  <img src={imgSrc} alt={prop.title} className="w-12 h-12 mb-6 object-contain" />
                ) : (
                  <div className={`w-12 h-12 mb-6 flex items-center justify-center border-b ${bgClass.includes('text-white') ? 'border-white' : 'border-black'}`}><span className="font-bold text-lg">!</span></div>
                )}
                <h3 className="text-sm font-bold uppercase tracking-wider mb-4">{prop.title}</h3>
                <p className="text-sm opacity-80 mb-6 text-left md:text-inherit" dangerouslySetInnerHTML={{ __html: prop.description || '' }} />
                <Link href={prop.linkUrl || "#"} className={`text-xs font-bold uppercase tracking-widest border-b pb-1 hover:opacity-50 ${bgClass.includes('text-white') ? 'border-white' : 'border-black'}`}>
                  {prop.linkText || 'Learn More'}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}

function VideoHeroBlock({ data }: { data: any }) {
  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
      {data.videoUrl ? (
        <video autoPlay loop muted playsInline className="absolute w-full h-full object-cover z-0">
          <source src={data.videoUrl} type="video/mp4" />
        </video>
      ) : (
        <div className="absolute w-full h-full bg-[#29463b] z-0" />
      )}
      <div className="absolute inset-0 bg-black/30 z-10" />
      <div className="relative z-20 text-center text-white px-6">
        {data.heading && <h2 className="text-4xl md:text-6xl font-serif mb-4 drop-shadow-lg">{data.heading}</h2>}
        {data.subheading && <p className="text-sm md:text-base tracking-widest uppercase mb-8 drop-shadow-md">{data.subheading}</p>}
        {data.buttonText && (
          <Link href={data.buttonLink || "#"} className="bg-white text-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
            {data.buttonText}
          </Link>
        )}
      </div>
    </section>
  );
}

function TestimonialSliderBlock({ data }: { data: any }) {
  const testimonials = data.testimonials || [];
  if (testimonials.length === 0) return null;
  return (
    <section className="bg-white py-24 text-black">
      <div className="container mx-auto px-6 text-center">
        {data.title && <h2 className="text-3xl font-serif mb-12">{data.title}</h2>}
        <div className="flex overflow-x-auto space-x-8 pb-8 snap-x">
          {testimonials.map((t: any, idx: number) => (
            <div key={idx} className="min-w-[300px] md:min-w-[400px] flex-shrink-0 snap-center p-8 border border-gray-100 bg-[#fafafa]">
              <div className="flex justify-center space-x-1 mb-4 text-black">
                {[...Array(t.rating || 5)].map((_, i) => <span key={i}>★</span>)}
              </div>
              <p className="text-gray-700 italic mb-6">"{t.quote}"</p>
              <p className="text-xs font-bold uppercase tracking-widest">{t.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AccordionBlock({ data }: { data: any }) {
  const items = data.items || [];
  const layout = data.layout || {};
  const bgClass = layout.backgroundColor || 'bg-white text-black';
  const alignClass = layout.textAlign || 'text-center';

  return (
    <section className={`py-20 ${bgClass}`}>
      <div className={`container mx-auto px-6 max-w-3xl ${alignClass}`}>
        {data.title && <h2 className="text-3xl font-serif mb-10">{data.title}</h2>}
        <div className="space-y-4 text-left">
          {items.map((item: any, idx: number) => (
            <details key={idx} className="group border-b border-gray-200 pb-4">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-sm uppercase tracking-wider">
                <span>{item.question}</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="opacity-70 mt-4 text-sm leading-relaxed">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterBlock({ data }: { data: any }) {
  return (
    <section className="bg-[#29463b] text-white py-24">
      <div className="container mx-auto px-6 max-w-xl text-center">
        {data.heading && <h2 className="text-3xl font-serif mb-4">{data.heading}</h2>}
        {data.subtext && <p className="text-sm text-gray-300 mb-8">{data.subtext}</p>}
        <form className="flex border-b border-white pb-2">
          <input type="email" placeholder="Email Address" className="bg-transparent border-none outline-none flex-1 text-white placeholder-gray-400 text-sm" />
          <button type="button" className="text-xs font-bold uppercase tracking-widest hover:text-gray-300 transition-colors">
            {data.buttonText || "Subscribe"}
          </button>
        </form>
      </div>
    </section>
  );
}

function RichTextBlock({ data }: { data: any }) {
  if (!data.content) return null;
  return (
    <section className="container mx-auto px-6 py-20 max-w-3xl prose prose-gray lg:prose-lg text-center font-serif">
      <PortableText value={data.content} />
    </section>
  );
}
