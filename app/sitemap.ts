import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = [
    '',
    '#platform',
    '#portals',
    '#ai-modules',
    '#pricing',
    '#resources',
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}/${route}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));
}
