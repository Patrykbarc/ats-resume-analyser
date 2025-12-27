import { Helmet } from 'react-helmet-async'

type MetaTagsProps = {
  title?: string
  description?: string
  image?: string
}

const metaTags = {
  title: 'ATS Resume Analyzer',
  description:
    'Boost your job search with ATS Resume Analyzer - Optimize your resume for Applicant Tracking Systems and land more interviews!',
  ogImage: '../../../public/og_image.webp',
  ogImageTwitter: '../../../public/og_image_twitter.webp',
  favicon: '../../../public/favicon.svg'
}

export function MetaTags({
  title = metaTags.title,
  description = metaTags.description,
  image = metaTags.ogImage
}: MetaTagsProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content={metaTags.ogImageTwitter} />
      <link rel="icon" href={metaTags.favicon} />
    </Helmet>
  )
}
