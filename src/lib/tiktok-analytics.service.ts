import {
    getLatestApifyTiktokItem,
    isApifyTiktokConfigured,
} from '@/lib/apify-tiktok.service';

type AudienceDatum = {
    label: string;
    value: number;
};

const TIKTOK_FALLBACK_PERFORMANCE_DATA: AudienceDatum[] = [
    { label: 'Seguidores', value: 214000 },
    { label: 'Me gusta totales', value: 7300000 },
    { label: 'Videos', value: 883 },
];

function truncateTiktokTitle(description: string) {
    const text = description.trim() || 'TikTok destacado';

    if (text.length <= 60) {
        return text;
    }

    return `${text.slice(0, 57).trimEnd()}...`;
}

export async function getTiktokTopVideoCard() {
    try {
        const apifyItem = await getLatestApifyTiktokItem();

        if (!apifyItem?.id) {
            return null;
        }

        return {
            platform: 'tiktok' as const,
            id: apifyItem.id,
            title: truncateTiktokTitle(apifyItem.text),
            coverUrl: apifyItem.coverUrl ?? '/fotoPerfilSantiTosini.jpeg',
            reelUrl: apifyItem.webVideoUrl || 'https://www.tiktok.com/@santiagotosini?lang=es-419',
            metrics: {
                views: apifyItem.playCount,
                likes: apifyItem.diggCount,
            },
            isLive: true,
        };
    } catch (error) {
        console.error('Error fetching TikTok top video from Apify:', error);
        return null;
    }
}

export async function getTiktokPerformanceData() {
    const apifyConfigured = isApifyTiktokConfigured();

    if (!apifyConfigured) {
        return {
            performanceData: TIKTOK_FALLBACK_PERFORMANCE_DATA,
            source: 'fallback' as const,
            provider: 'fallback' as const,
            apifyConfigured,
            message: 'Apify no está configurado. Agregá APIFY_API_TOKEN y ejecutá la sincronización inicial.',
        };
    }

    try {
        const apifyItem = await getLatestApifyTiktokItem();

        if (!apifyItem) {
            return {
                performanceData: TIKTOK_FALLBACK_PERFORMANCE_DATA,
                source: 'fallback' as const,
                provider: 'fallback' as const,
                apifyConfigured,
                message: 'Apify está configurado, pero todavía no existe una ejecución exitosa con datos válidos.',
            };
        }

        return {
            performanceData: [
                { label: 'Seguidores', value: apifyItem.followers },
                { label: 'Me gusta totales', value: apifyItem.likes },
                { label: 'Videos', value: apifyItem.videos },
            ],
            source: 'live' as const,
            provider: 'apify' as const,
            apifyConfigured,
        };
    } catch (error) {
        console.error('Error fetching TikTok performance data from Apify:', error);

        return {
            performanceData: TIKTOK_FALLBACK_PERFORMANCE_DATA,
            source: 'fallback' as const,
            provider: 'fallback' as const,
            apifyConfigured,
            message: error instanceof Error ? error.message : 'No se pudo obtener información de Apify.',
        };
    }
}
