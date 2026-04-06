import { NextResponse } from 'next/server';
import { TWELVE_HOURS_MS, YOUTUBE_AUDIENCE_CACHE_HEADERS } from '@/lib/cache';
import {
    cacheYoutubeAudienceInsights,
    getCachedYoutubeAudienceInsights,
    getYoutubeAudienceInsights,
} from '@/lib/youtube-analytics.service';

function formatLastSyncedLabel(lastSyncedAt?: string) {
    if (!lastSyncedAt) {
        return 'reciente';
    }

    const parsedDate = new Date(lastSyncedAt);

    if (Number.isNaN(parsedDate.getTime())) {
        return 'reciente';
    }

    return parsedDate.toLocaleString('es-AR', {
        dateStyle: 'short',
        timeStyle: 'short',
    });
}

export async function GET() {
    try {
        const cachedInsights = await getCachedYoutubeAudienceInsights();

        if (cachedInsights?.lastSyncedAt) {
            const isFreshCache = new Date(cachedInsights.lastSyncedAt).getTime() > Date.now() - TWELVE_HOURS_MS;

            if (isFreshCache) {
                return NextResponse.json(
                    {
                        success: true,
                        ...cachedInsights,
                        cached: true,
                    },
                    {
                        headers: YOUTUBE_AUDIENCE_CACHE_HEADERS,
                    }
                );
            }
        }

        const freshInsights = await getYoutubeAudienceInsights();

        if (freshInsights.source !== 'fallback') {
            await cacheYoutubeAudienceInsights(freshInsights);

            return NextResponse.json(
                {
                    success: true,
                    ...freshInsights,
                    cached: false,
                },
                {
                    headers: YOUTUBE_AUDIENCE_CACHE_HEADERS,
                }
            );
        }

        if (cachedInsights) {
            return NextResponse.json(
                {
                    success: true,
                    ...cachedInsights,
                    source: cachedInsights.source === 'fallback' ? 'mixed' : cachedInsights.source,
                    cached: true,
                    message: `No se pudieron actualizar las métricas en vivo. Mostrando la última sincronización disponible (${formatLastSyncedLabel(cachedInsights.lastSyncedAt)}).`,
                },
                {
                    headers: YOUTUBE_AUDIENCE_CACHE_HEADERS,
                }
            );
        }

        return NextResponse.json(
            {
                success: true,
                ...freshInsights,
                cached: false,
            },
            {
                headers: YOUTUBE_AUDIENCE_CACHE_HEADERS,
            }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Unexpected error',
            },
            { status: 500 }
        );
    }
}