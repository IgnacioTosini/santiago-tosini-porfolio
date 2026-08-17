import { NextRequest, NextResponse } from 'next/server';
import { startApifyTiktokSync } from '@/lib/apify-tiktok.service';

async function syncTiktok(request: NextRequest) {
    const secret = process.env.CRON_SECRET;
    const authHeader = request.headers.get('authorization');

    if (!secret || authHeader !== `Bearer ${secret}`) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const run = await startApifyTiktokSync();

        return NextResponse.json({
            success: true,
            run,
            message: 'Sincronización semanal de TikTok iniciada en Apify.',
        });
    } catch (error) {
        console.error('TikTok Apify sync error:', error);

        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'No se pudo iniciar la sincronización.',
            },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    return syncTiktok(request);
}

export async function POST(request: NextRequest) {
    return syncTiktok(request);
}
