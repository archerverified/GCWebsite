import { Helmet } from 'react-helmet-async';
import { SITE_NAME, SITE_URL, DEFAULT_TITLE, DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE } from '../../seo/site';
import { buildBreadcrumbList } from '../../seo/schemas';

interface SeoProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogImage?: string;
  noindex?: boolean;
  schema?: object | object[];
  /** Optional breadcrumbs - if provided, auto-generates BreadcrumbList schema */
  breadcrumbs?: { name: string; path: string }[];
}

export function Seo({ 
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  canonicalPath = '',
  ogImage = DEFAULT_OG_IMAGE,
  noindex = false,
  schema,
  breadcrumbs
}: SeoProps) {
  const fullTitle = title === DEFAULT_TITLE ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`;

  // Build combined schema array
  const buildSchemaArray = (): object[] => {
    const schemas: object[] = [];
    
    // Add provided schema(s)
    if (schema) {
      if (Array.isArray(schema)) {
        schemas.push(...schema);
      } else {
        schemas.push(schema);
      }
    }
    
    // Add breadcrumb schema if breadcrumbs provided
    if (breadcrumbs && breadcrumbs.length > 0) {
      schemas.push(buildBreadcrumbList(breadcrumbs));
    }
    
    return schemas;
  };

  const allSchemas = buildSchemaArray();

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
      
      {/* Additional SEO tags */}
      <meta name="author" content={SITE_NAME} />
      <meta name="generator" content="React" />
      
      {/* JSON-LD Structured Data */}
      {allSchemas.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(allSchemas.length === 1 ? allSchemas[0] : allSchemas)}
        </script>
      )}
    </Helmet>
  );
}
