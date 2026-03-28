import { NextResponse } from 'next/server';
import { AUDIENCE_CACHE_HEADERS } from '@/lib/cache';
import { getInstagramAudienceInsights } from '@/lib/instagram-analytics.service';

export async function GET() {
    const { ageData, genderData, locationData, performanceData, source, message } =
        await getInstagramAudienceInsights();

    return NextResponse.json(
        {
            success: true,
            ageData,
            genderData,
            locationData,
            performanceData,
            source,
            message,
        },
        {
            headers: AUDIENCE_CACHE_HEADERS,
        }
    );
}
