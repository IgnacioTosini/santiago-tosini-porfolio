import type { MetadataRoute } from 'next';

const DEFAULT_SITE_URL = 'https://santiagotosini.com';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}
