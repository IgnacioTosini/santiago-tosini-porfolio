import { NextResponse } from 'next/server';
import { AUDIENCE_CACHE_HEADERS } from '@/lib/cache';
import { getYoutubeAudienceInsights } from '@/lib/youtube-analytics.service';

export async function GET() {
    try {
        const insights = await getYoutubeAudienceInsights();

        return NextResponse.json(
            {
                success: true,
                ...insights,
            },
            {
                headers: AUDIENCE_CACHE_HEADERS,
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