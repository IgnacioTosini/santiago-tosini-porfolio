import { NextResponse } from 'next/server';
import { getCachedYoutubeData, getYoutubeChannelData } from '@/lib/youtube.service';

/**
 * GET /api/youtube/insights
 * Returns cached YouTube data or fetches fresh data if cache is outdated.
 */
export async function GET() {
    try {
        let cachedData = await getCachedYoutubeData();

        if (!cachedData) {
            try {
                cachedData = await getYoutubeChannelData();
            } catch (error) {
                console.error('Failed to fetch fresh YouTube data:', error);
                return NextResponse.json(
                    {
                        error: 'YouTube data unavailable',
                        details: 'Configure YOUTUBE_API_KEY and YOUTUBE_CHANNEL_ID to fetch live data',
                        fallback: true,
                    },
                    { status: 503 }
                );
            }
        } else {
            const lastUpdated = new Date(cachedData.lastSyncedAt);
            const hourAgo = new Date(Date.now() - 60 * 60 * 1000);

            if (lastUpdated < hourAgo) {
                // Refresh in background without blocking response
                getYoutubeChannelData()
                    .then(async (freshData) => {
                        const { cacheYoutubeData } = await import('@/lib/youtube.service');
                        await cacheYoutubeData(freshData);
                    })
                    .catch((error: Error) => console.error('Background YouTube sync failed:', error));
            }
        }

        return NextResponse.json(
            {
                success: true,
                data: cachedData,
                cached: true,
                lastSyncedAt: cachedData.lastSyncedAt,
            },
            {
                headers: {
                    'Cache-Control': 'public, s-maxage=3600',
                },
            }
        );
    } catch (error) {
        console.error('Error fetching YouTube insights:', error);
        return NextResponse.json(
            {
                error: 'Failed to fetch YouTube insights',
                details: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
