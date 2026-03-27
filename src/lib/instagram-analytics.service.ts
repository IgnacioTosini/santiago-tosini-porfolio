type AudienceDatum = {
    label: string;
    value: number;
};

type InstagramUserResponse = {
    id?: string;
    followers_count?: number;
    media_count?: number;
    error?: {
        message?: string;
        code?: number;
    };
};

type InstagramMediaItem = {
    id: string;
    caption?: string;
    media_type?: string;
    media_product_type?: string;
    media_url?: string;
    thumbnail_url?: string;
    permalink?: string;
    like_count?: number;
    comments_count?: number;
};

type InstagramMediaListResponse = {
    data?: InstagramMediaItem[];
    error?: {
        message?: string;
        code?: number;
        type?: string;
    };
};

type InstagramMediaInsightsResponse = {
    data?: Array<{
        name?: string;
        values?: Array<{
            value?: number | string;
        }>;
        value?: number | string;
    }>;
    error?: {
        message?: string;
        code?: number;
        type?: string;
    };
};

type InsightsDemographicsResponse = {
    data?: Array<{
        name?: string;
        total_value?: {
            breakdowns?: Array<{
                dimension_keys: string[];
                results: Array<{
                    dimension_values: string[];
                    value: number;
                }>;
            }>;
        };
    }>;
    error?: {
        message?: string;
        code?: number;
        type?: string;
    };
};

const INSTAGRAM_GRAPH_URL = 'https://graph.instagram.com';
const INSTAGRAM_MEDIA_LIMIT = 12;

const INSTAGRAM_FALLBACK_PERFORMANCE_DATA: AudienceDatum[] = [
    { label: 'Seguidores', value: 0 },
    { label: 'Publicaciones', value: 0 },
];

const INSTAGRAM_FALLBACK_AGE_DATA: AudienceDatum[] = [
    { label: '18-24', value: 50 },
    { label: '25-34', value: 35 },
    { label: '35+', value: 15 },
];

const INSTAGRAM_FALLBACK_GENDER_DATA: AudienceDatum[] = [
    { label: 'Masculino', value: 72 },
    { label: 'Femenino', value: 23 },
    { label: 'No especificado', value: 5 },
];

const INSTAGRAM_FALLBACK_LOCATION_DATA: AudienceDatum[] = [
    { label: 'Argentina', value: 68 },
    { label: 'México', value: 18 },
    { label: 'Chile', value: 14 },
];

function mapGenderLabel(gender: string): string {
    switch (gender.toUpperCase()) {
        case 'M': return 'Masculino';
        case 'F': return 'Femenino';
        default: return 'No especificado';
    }
}

function mapCountryLabel(countryCode: string): string {
    try {
        return new Intl.DisplayNames(['es'], { type: 'region' }).of(countryCode.toUpperCase()) ?? countryCode;
    } catch {
        return countryCode;
    }
}

function truncateCaption(caption?: string): string {
    if (!caption) return 'Instagram destacado';

    const cleanCaption = caption.replace(/\s+/g, ' ').trim();
    if (cleanCaption.length <= 60) return cleanCaption;

    return `${cleanCaption.slice(0, 57).trimEnd()}...`;
}

async function fetchInstagramMedia(accessToken: string): Promise<InstagramMediaItem[]> {
    const fields = [
        'id',
        'caption',
        'media_type',
        'media_product_type',
        'media_url',
        'thumbnail_url',
        'permalink',
        'like_count',
        'comments_count',
    ].join(',');

    const response = await fetch(
        `${INSTAGRAM_GRAPH_URL}/me/media?fields=${fields}&limit=${INSTAGRAM_MEDIA_LIMIT}&access_token=${accessToken}`,
        { cache: 'no-store' },
    );

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Instagram media API error: ${response.status} ${text}`);
    }

    const data = (await response.json()) as InstagramMediaListResponse;

    if (data.error) {
        throw new Error(`Instagram media error ${data.error.code}: ${data.error.message}`);
    }

    return data.data ?? [];
}

function extractInstagramInsightValue(data: InstagramMediaInsightsResponse): number | null {
    for (const item of data.data ?? []) {
        const directValue = Number(item.value);
        if (Number.isFinite(directValue) && directValue > 0) {
            return directValue;
        }

        const nestedValue = Number(item.values?.[0]?.value);
        if (Number.isFinite(nestedValue) && nestedValue > 0) {
            return nestedValue;
        }
    }

    return null;
}

async function fetchInstagramMediaViewCount(accessToken: string, mediaId: string): Promise<number | null> {
    const metrics = ['views', 'plays', 'impressions', 'reach'];

    for (const metric of metrics) {
        const response = await fetch(
            `${INSTAGRAM_GRAPH_URL}/${mediaId}/insights?metric=${metric}&access_token=${accessToken}`,
            { cache: 'no-store' },
        );

        if (!response.ok) {
            continue;
        }

        const data = (await response.json()) as InstagramMediaInsightsResponse;
        if (data.error) {
            continue;
        }

        const insightValue = extractInstagramInsightValue(data);
        if (insightValue !== null) {
            return Math.max(0, Math.round(insightValue));
        }
    }

    return null;
}

export async function getInstagramTopMediaCard() {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

    if (!accessToken) {
        return null;
    }

    try {
        let token = accessToken;

        if (process.env.INSTAGRAM_AUTO_REFRESH === 'true') {
            token = await refreshInstagramToken(accessToken);
        }

        const mediaItems = await fetchInstagramMedia(token);
        const videoItems = mediaItems.filter((item) => {
            return item.media_type === 'VIDEO' || item.media_product_type === 'REELS';
        });

        const candidateItems = videoItems.length > 0 ? videoItems : mediaItems;

        if (candidateItems.length === 0) {
            return null;
        }

        const mediaWithViews = await Promise.all(
            candidateItems.map(async (item) => ({
                item,
                views: await fetchInstagramMediaViewCount(token, item.id),
            })),
        );

        const topMedia = mediaWithViews
            .sort((left, right) => (right.views ?? 0) - (left.views ?? 0))[0];

        if (!topMedia) {
            return null;
        }

        return {
            platform: 'instagram' as const,
            id: topMedia.item.id,
            title: truncateCaption(topMedia.item.caption),
            coverUrl: topMedia.item.thumbnail_url ?? topMedia.item.media_url ?? '/fotoPerfilSantiTosini.jpeg',
            reelUrl: topMedia.item.permalink,
            metrics: {
                views: topMedia.views ?? 0,
                likes: Math.max(0, Math.round(topMedia.item.like_count ?? 0)),
            },
            isLive: true,
        };
    } catch {
        return null;
    }
}

async function refreshInstagramToken(accessToken: string): Promise<string> {
    const response = await fetch(
        `${INSTAGRAM_GRAPH_URL}/refresh_access_token?grant_type=ig_refresh_token&access_token=${accessToken}`,
        { cache: 'no-store' },
    );

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to refresh Instagram token: ${response.status} ${text}`);
    }

    const data = (await response.json()) as { access_token?: string };
    return data.access_token ?? accessToken;
}

async function fetchInstagramUserInfo(accessToken: string): Promise<InstagramUserResponse> {
    const fields = 'id,followers_count,media_count';
    const response = await fetch(
        `${INSTAGRAM_GRAPH_URL}/me?fields=${fields}&access_token=${accessToken}`,
        { cache: 'no-store' },
    );

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Instagram Graph API error: ${response.status} ${text}`);
    }

    return (await response.json()) as InstagramUserResponse;
}

async function fetchInstagramDemographics(
    accessToken: string,
    userId: string,
    breakdown: 'age' | 'gender' | 'country',
): Promise<AudienceDatum[] | null> {
    const params = new URLSearchParams({
        metric: 'follower_demographics',
        period: 'lifetime',
        timeframe: 'last_90_days',
        breakdowns: breakdown,
        metric_type: 'total_value',
        access_token: accessToken,
    });

    const response = await fetch(
        `${INSTAGRAM_GRAPH_URL}/${userId}/insights?${params}`,
        { cache: 'no-store' },
    );

    if (!response.ok) return null;

    const data = (await response.json()) as InsightsDemographicsResponse;
    if (data.error) return null;

    const breakdownEntry = data.data?.[0]?.total_value?.breakdowns?.[0];
    if (!breakdownEntry) return null;

    const breakdownIndex = breakdownEntry.dimension_keys.indexOf(breakdown);
    if (breakdownIndex === -1) return null;

    const total = breakdownEntry.results.reduce((sum, r) => sum + r.value, 0);
    if (total <= 0) return null;

    return breakdownEntry.results
        .map((r) => {
            const rawLabel = r.dimension_values[breakdownIndex] ?? '';
            const label =
                breakdown === 'gender'
                    ? mapGenderLabel(rawLabel)
                    : breakdown === 'country'
                        ? mapCountryLabel(rawLabel)
                        : rawLabel;
            return { label, value: Math.round((r.value / total) * 100) };
        })
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);
}

export async function getInstagramAudienceInsights(): Promise<{
    ageData: AudienceDatum[];
    genderData: AudienceDatum[];
    locationData: AudienceDatum[];
    performanceData: AudienceDatum[];
    source: 'live' | 'mixed' | 'fallback';
    message?: string;
}> {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

    if (!accessToken) {
        return {
            ageData: INSTAGRAM_FALLBACK_AGE_DATA,
            genderData: INSTAGRAM_FALLBACK_GENDER_DATA,
            locationData: INSTAGRAM_FALLBACK_LOCATION_DATA,
            performanceData: INSTAGRAM_FALLBACK_PERFORMANCE_DATA,
            source: 'fallback',
            message: 'Falta INSTAGRAM_ACCESS_TOKEN en las variables de entorno.',
        };
    }

    try {
        let token = accessToken;

        if (process.env.INSTAGRAM_AUTO_REFRESH === 'true') {
            token = await refreshInstagramToken(accessToken);
        }

        const user = await fetchInstagramUserInfo(token);

        if (user.error) {
            throw new Error(`Instagram API error ${user.error.code}: ${user.error.message}`);
        }

        const performanceData: AudienceDatum[] = [
            { label: 'Seguidores', value: user.followers_count ?? 0 },
            { label: 'Publicaciones', value: user.media_count ?? 0 },
        ];

        const userId = user.id;

        if (!userId) {
            return {
                ageData: INSTAGRAM_FALLBACK_AGE_DATA,
                genderData: INSTAGRAM_FALLBACK_GENDER_DATA,
                locationData: INSTAGRAM_FALLBACK_LOCATION_DATA,
                performanceData,
                source: 'mixed',
                message: 'No se pudo obtener el ID de usuario para métricas demográficas.',
            };
        }

        const [ageResult, genderResult, locationResult] = await Promise.allSettled([
            fetchInstagramDemographics(token, userId, 'age'),
            fetchInstagramDemographics(token, userId, 'gender'),
            fetchInstagramDemographics(token, userId, 'country'),
        ]);

        const ageData =
            ageResult.status === 'fulfilled' && ageResult.value ? ageResult.value : INSTAGRAM_FALLBACK_AGE_DATA;
        const genderData =
            genderResult.status === 'fulfilled' && genderResult.value ? genderResult.value : INSTAGRAM_FALLBACK_GENDER_DATA;
        const locationData =
            locationResult.status === 'fulfilled' && locationResult.value ? locationResult.value : INSTAGRAM_FALLBACK_LOCATION_DATA;

        const allLive =
            ageResult.status === 'fulfilled' && ageResult.value !== null &&
            genderResult.status === 'fulfilled' && genderResult.value !== null &&
            locationResult.status === 'fulfilled' && locationResult.value !== null;

        const anyLive =
            (ageResult.status === 'fulfilled' && ageResult.value !== null) ||
            (genderResult.status === 'fulfilled' && genderResult.value !== null) ||
            (locationResult.status === 'fulfilled' && locationResult.value !== null);

        const source: 'live' | 'mixed' | 'fallback' = allLive ? 'live' : anyLive ? 'mixed' : 'fallback';

        return { ageData, genderData, locationData, performanceData, source };
    } catch {
        return {
            ageData: INSTAGRAM_FALLBACK_AGE_DATA,
            genderData: INSTAGRAM_FALLBACK_GENDER_DATA,
            locationData: INSTAGRAM_FALLBACK_LOCATION_DATA,
            performanceData: INSTAGRAM_FALLBACK_PERFORMANCE_DATA,
            source: 'fallback',
        };
    }
}
