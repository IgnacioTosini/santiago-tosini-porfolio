import { NextRequest, NextResponse } from 'next/server';
import { getYoutubeChannelData, cacheYoutubeData } from '@/lib/youtube.service';

/**
 * GET /api/youtube/sync
 * Manually trigger a YouTube data sync.
 */
export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization');
        const secretKey = process.env.YOUTUBE_SYNC_SECRET;

        if (secretKey && authHeader !== `Bearer ${secretKey}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const youtubeData = await getYoutubeChannelData();
        await cacheYoutubeData(youtubeData);

        return NextResponse.json({
            success: true,
            data: youtubeData,
            message: 'YouTube data synced successfully',
        });
    } catch (error) {
        console.error('YouTube sync error:', error);
        return NextResponse.json(
            {
                error: 'Failed to sync YouTube data',
                details: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    return GET(request);
}
