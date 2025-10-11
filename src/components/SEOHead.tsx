import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string;
  author?: string;
}

const defaultSEO = {
  title: 'Mohamed Khair - Full-Stack Developer & Content Creator',
  description: 'Syrian-born, Sudanese developer in Istanbul crafting lightning-fast web applications and viral content. Expert in React, Next.js, and modern web technologies.',
  image: 'https://example.com/og-image.jpg', // Replace with actual image URL
  url: 'https://mohamedkhair.dev', // Replace with actual domain
  type: 'website',
  keywords: 'Full-stack developer, React developer, Next.js, Content creator, Instagram reels, Web development Istanbul, Qobouli, Turkish universities, Syrian developer',
  author: 'Mohamed Khair'
};

export function SEOHead({ 
  title, 
  description, 
  image, 
  url, 
  type = 'website',
  keywords,
  author = defaultSEO.author
}: SEOProps) {
  const seo = {
    title: title ? `${title} | Mohamed Khair` : defaultSEO.title,
    description: description || defaultSEO.description,
    image: image || defaultSEO.image,
    url: url || defaultSEO.url,
    keywords: keywords || defaultSEO.keywords,
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={seo.url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:site_name" content="Mohamed Khair Portfolio" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content="@mohamedkhair" />

      {/* Additional SEO Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#00ABAB" />
      <meta name="msapplication-TileColor" content="#00ABAB" />

      {/* Language and Geographic Targeting */}
      <meta name="language" content="English" />
      <meta name="geo.region" content="TR-34" />
      <meta name="geo.placename" content="Istanbul" />
      <meta name="geo.position" content="41.0082;28.9784" />
      <meta name="ICBM" content="41.0082, 28.9784" />

      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Mohamed Khair",
          "url": seo.url,
          "image": seo.image,
          "jobTitle": "Full-Stack Developer & Content Creator",
          "worksFor": {
            "@type": "Organization",
            "name": "Freelance"
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Istanbul",
            "addressCountry": "Turkey"
          },
          "nationality": "Sudanese",
          "birthPlace": "Syria",
          "description": seo.description,
          "knowsAbout": [
            "React", "Next.js", "TypeScript", "Full-Stack Development", 
            "Content Creation", "Instagram Marketing", "Web Performance"
          ],
          "sameAs": [
            "https://instagram.com/mohamedkhair",
            "https://linkedin.com/in/mohamedkhair",
            "https://github.com/mohamedkhair"
          ]
        })}
      </script>
    </Helmet>
  );
}