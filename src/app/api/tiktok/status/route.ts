import { NextResponse } from 'next/server';
import { getApifyTiktokStatus } from '@/lib/apify-tiktok.service';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const status = await getApifyTiktokStatus();

        return NextResponse.json(
            {
                success: true,
                provider: 'apify',
                ...status,
            },
            {
                headers: {
                    'Cache-Control': 'no-store',
                },
            }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                provider: 'apify',
                configured: true,
                dataAvailable: false,
                error: error instanceof Error ? error.message : 'No se pudo consultar el estado de Apify.',
            },
            { status: 502 }
        );
    }
}
