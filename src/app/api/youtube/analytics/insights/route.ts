import { NextResponse } from 'next/server';
import { getYoutubeAudienceInsights } from '@/lib/youtube-analytics.service';

export async function GET() {
    try {
        const insights = await getYoutubeAudienceInsights();
        return NextResponse.json({
            success: true,
            ...insights,
        });
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
