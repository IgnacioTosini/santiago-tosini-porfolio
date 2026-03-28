import type { MetadataRoute } from 'next';

const DEFAULT_SITE_URL = 'https://santiagotosini.com';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = ['', '/privacy', '/terms'];
    const now = new Date();

    return routes.map((route) => ({
        url: `${SITE_URL}${route}`,
        lastModified: now,
        changeFrequency: route === '' ? 'weekly' : 'yearly',
        priority: route === '' ? 1 : 0.4,
    }));
}
