import { NextResponse } from 'next/server';
import { getTiktokPerformanceData } from '@/lib/tiktok-analytics.service';

export async function GET() {
    try {
        const data = await getTiktokPerformanceData();
        return NextResponse.json({
            success: true,
            ...data,
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
