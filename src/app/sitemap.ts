import type { MetadataRoute } from 'next';
import { locales, projects } from '@/data/content';
import { siteUrl } from '@/lib/metadata';
export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/work', '/about', '/contact', ...projects.map((p) => `/work/${p.slug}`)].flatMap(
    (path) =>
      locales.map((locale) => ({
        url: `${siteUrl}/${locale}${path}`,
        alternates: { languages: { en: `${siteUrl}/en${path}`, fr: `${siteUrl}/fr${path}` } },
      })),
  );
}
