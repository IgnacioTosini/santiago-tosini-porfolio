type AudienceDatum = {
    label: string;
    value: number;
};

type TiktokTokenResponse = {
    // TikTok v2 returns tokens at root level
    access_token?: string;
    refresh_token?: string;
    scope?: string;
    expires_in?: number;
    refresh_expires_in?: number;
    open_id?: string;
    token_type?: string;
    // Error fields
    error?: string;
    error_description?: string;
    log_id?: string;
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

type TiktokVideoItem = {
    id?: string;
    title?: string;
    video_description?: string;
    cover_image_url?: string;
    share_url?: string;
    view_count?: number;
    like_count?: number;
};

type TiktokVideoListResponse = {
    data?: {
        videos?: TiktokVideoItem[];
    };
    error?: {
        code?: string;
        message?: string;
    };
};

const TIKTOK_TOKEN_URL = 'https://open.tiktokapis.com/v2/oauth/token/';
const TIKTOK_USER_INFO_URL = 'https://open.tiktokapis.com/v2/user/info/';
const TIKTOK_VIDEO_LIST_URL = 'https://open.tiktokapis.com/v2/video/list/';

const TIKTOK_FALLBACK_PERFORMANCE_DATA: AudienceDatum[] = [
    { label: 'Seguidores', value: 197233 },
    { label: 'Me gusta totales', value: 6319226 },
    { label: 'Videos', value: 783 },
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

    if (data.error) {
        throw new Error(`TikTok token error: ${data.error} - ${data.error_description}`);
    }

    return data.access_token ?? null;
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

function truncateTiktokTitle(title?: string, description?: string) {
    const baseText = title?.trim() || description?.trim() || 'TikTok destacado';

    if (baseText.length <= 60) {
        return baseText;
    }

    return `${baseText.slice(0, 57).trimEnd()}...`;
}

async function fetchTiktokVideos(accessToken: string): Promise<TiktokVideoItem[]> {
    const fields = [
        'id',
        'title',
        'video_description',
        'cover_image_url',
        'share_url',
        'view_count',
        'like_count',
    ].join(',');

    const response = await fetch(`${TIKTOK_VIDEO_LIST_URL}?fields=${fields}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            max_count: 20,
        }),
        cache: 'no-store',
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`TikTok video list API error: ${response.status} ${text}`);
    }

    const data = (await response.json()) as TiktokVideoListResponse;

    if (data.error?.code && data.error.code !== 'ok') {
        throw new Error(`TikTok video list error: ${data.error.code} - ${data.error.message}`);
    }

    return data.data?.videos ?? [];
}

export async function getTiktokTopVideoCard() {
    try {
        const accessToken = await getTiktokAccessToken();

        if (!accessToken) {
            return null;
        }

        const videos = await fetchTiktokVideos(accessToken);
        const topVideo = [...videos]
            .filter((video) => video.id)
            .sort((left, right) => (right.view_count ?? 0) - (left.view_count ?? 0))[0];

        if (!topVideo?.id) {
            return null;
        }

        return {
            platform: 'tiktok' as const,
            id: topVideo.id,
            title: truncateTiktokTitle(topVideo.title, topVideo.video_description),
            coverUrl: topVideo.cover_image_url ?? '/fotoPerfilSantiTosini.jpeg',
            reelUrl: topVideo.share_url ?? 'https://www.tiktok.com/@santiagotosini?lang=es-419',
            metrics: {
                views: Math.max(0, Math.round(topVideo.view_count ?? 0)),
                likes: Math.max(0, Math.round(topVideo.like_count ?? 0)),
            },
            isLive: true,
        };
    } catch {
        return null;
    }
}

export async function getTiktokPerformanceData() {
    let performanceData = TIKTOK_FALLBACK_PERFORMANCE_DATA;
    let source: 'live' | 'fallback' = 'fallback';
    let message: string | undefined;

    try {
        const accessToken = await getTiktokAccessToken();

        if (!accessToken) {
            return {
                performanceData,
                source,
                message: 'Faltan credenciales OAuth para TikTok.',
            };
        }

        const userInfo = await fetchTiktokUserInfo(accessToken);

        if (userInfo) {
            performanceData = [
                { label: 'Seguidores', value: Math.max(0, Math.round(userInfo.follower_count ?? 0)) },
                { label: 'Me gusta totales', value: Math.max(0, Math.round(userInfo.likes_count ?? 0)) },
                { label: 'Videos', value: Math.max(0, Math.round(userInfo.video_count ?? 0)) },
            ];
            source = 'live';
        }

        return { performanceData, source, message };
    } catch (error) {
        return {
            performanceData,
            source,
            message: error instanceof Error ? error.message : 'No se pudo obtener información de TikTok.',
        };
    }
}
