import type { Metadata } from 'next';
import { Locale } from '@/data/content';
export const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
export function metadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
  image = '/images/projects/halwana/hero.webp',
): Metadata {
  const route = `/${locale}${path}`;
  return {
    metadataBase: new URL(siteUrl),
    title: `${title} — Hajar Salmi`,
    description,
    alternates: {
      canonical: route,
      languages: { en: `/en${path}`, fr: `/fr${path}`, 'x-default': `/en${path}` },
    },
    openGraph: {
      title: `${title} — Hajar Salmi`,
      description,
      url: route,
      siteName: 'Hajar Salmi',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      alternateLocale: locale === 'fr' ? 'en_US' : 'fr_FR',
      type: 'website',
      images: [{ url: image, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}
