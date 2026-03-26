import { interestData as defaultInterestData } from '@/mocks/interestData.mock';

type AudienceDatum = {
    label: string;
    value: number;
};

type TiktokTokenResponse = {
    data?: {
        access_token?: string;
        refresh_token?: string;
        scope?: string;
    };
    error?: {
        code?: string;
        message?: string;
    };
};

type TiktokUserInfoResponse = {
    data?: {
        user?: {
            follower_count?: number;
            likes_count?: number;
            video_count?: number;
            display_name?: string;
        };
    };
    error?: {
        code?: string;
        message?: string;
    };
};

const TIKTOK_TOKEN_URL = 'https://open.tiktokapis.com/v2/oauth/token/';
const TIKTOK_USER_INFO_URL = 'https://open.tiktokapis.com/v2/user/info/';

const TIKTOK_FALLBACK_AGE_DATA: AudienceDatum[] = [
    { label: '13-17', value: 30 },
    { label: '18-24', value: 55 },
    { label: '25+', value: 15 },
];

const TIKTOK_FALLBACK_GENDER_DATA: AudienceDatum[] = [
    { label: 'Masculino', value: 75 },
    { label: 'Femenino', value: 20 },
    { label: 'No especificado', value: 5 },
];

const TIKTOK_FALLBACK_LOCATION_DATA: AudienceDatum[] = [
    { label: 'Argentina', value: 65 },
    { label: 'México', value: 20 },
    { label: 'Chile', value: 15 },
];

const TIKTOK_FALLBACK_TRAFFIC_DATA: AudienceDatum[] = [
    { label: 'Para ti', value: 60 },
    { label: 'Siguiendo', value: 25 },
    { label: 'Perfil', value: 15 },
];

const TIKTOK_FALLBACK_PERFORMANCE_DATA: AudienceDatum[] = [
    { label: 'Seguidores', value: 100000 },
    { label: 'Me gusta totales', value: 1000000 },
    { label: 'Videos', value: 500 },
];

async function getTiktokAccessToken(): Promise<string | null> {
    const clientKey = process.env.TIKTOK_CLIENT_KEY;
    const clientSecret = process.env.TIKTOK_CLIENT_SECRET;
    const refreshToken = process.env.TIKTOK_REFRESH_TOKEN;

    if (!clientKey || !clientSecret || !refreshToken) {
        return null;
    }

    const body = new URLSearchParams({
        client_key: clientKey,
        client_secret: clientSecret,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
    });

    const response = await fetch(TIKTOK_TOKEN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to refresh TikTok OAuth token: ${response.status} ${text}`);
    }

    const data = (await response.json()) as TiktokTokenResponse;

    if (data.error?.code && data.error.code !== 'ok') {
        throw new Error(`TikTok token error: ${data.error.code} - ${data.error.message}`);
    }

    return data.data?.access_token ?? null;
}

async function fetchTiktokUserInfo(accessToken: string) {
    const fields = 'follower_count,likes_count,video_count,display_name';
    const response = await fetch(`${TIKTOK_USER_INFO_URL}?fields=${fields}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: 'no-store',
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`TikTok User Info API error: ${response.status} ${text}`);
    }

    const data = (await response.json()) as TiktokUserInfoResponse;

    if (data.error?.code && data.error.code !== 'ok') {
        throw new Error(`TikTok user info error: ${data.error.code} - ${data.error.message}`);
    }

    return data.data?.user ?? null;
}

export async function getTiktokAudienceInsights() {
    const fallbackAgeData = TIKTOK_FALLBACK_AGE_DATA;
    const fallbackGenderData = TIKTOK_FALLBACK_GENDER_DATA;
    const fallbackLocationData = TIKTOK_FALLBACK_LOCATION_DATA;
    const fallbackTrafficData = TIKTOK_FALLBACK_TRAFFIC_DATA;
    const fallbackPerformanceData = TIKTOK_FALLBACK_PERFORMANCE_DATA;
    const interestData = defaultInterestData;

    const ageData = fallbackAgeData;
    const genderData = fallbackGenderData;
    const locationData = fallbackLocationData;
    const trafficSourceData = fallbackTrafficData;
    let performanceData = fallbackPerformanceData;
    let source: 'live' | 'mixed' | 'fallback' = 'fallback';
    let message: string | undefined;

    try {
        const accessToken = await getTiktokAccessToken();

        if (!accessToken) {
            return {
                ageData,
                genderData,
                locationData,
                trafficSourceData,
                performanceData,
                interestData,
                source,
                message:
                    'Faltan credenciales OAuth para TikTok. Mostrando datos estimados. Configura TIKTOK_CLIENT_KEY, TIKTOK_CLIENT_SECRET y TIKTOK_REFRESH_TOKEN.',
            };
        }

        const userInfo = await fetchTiktokUserInfo(accessToken);

        if (userInfo) {
            const followerCount = Math.max(0, Math.round(userInfo.follower_count ?? 0));
            const likesCount = Math.max(0, Math.round(userInfo.likes_count ?? 0));
            const videoCount = Math.max(0, Math.round(userInfo.video_count ?? 0));

            performanceData = [
                { label: 'Seguidores', value: followerCount },
                { label: 'Me gusta totales', value: likesCount },
                { label: 'Videos', value: videoCount },
            ];

            source = 'mixed';
            message =
                'Estadísticas de cuenta obtenidas en vivo. Demografías (edad, sexo, país, tráfico) requieren TikTok Analytics API con acceso extendido.';
        }

        return {
            ageData,
            genderData,
            locationData,
            trafficSourceData,
            performanceData,
            interestData,
            source,
            message,
        };
    } catch (error) {
        return {
            ageData,
            genderData,
            locationData,
            trafficSourceData,
            performanceData,
            interestData,
            source,
            message: error instanceof Error ? error.message : 'No se pudo obtener información de TikTok.',
        };
    }
}
