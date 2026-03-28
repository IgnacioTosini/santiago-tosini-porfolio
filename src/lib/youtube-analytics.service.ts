import { interestData as defaultInterestData } from '@/mocks/interestData.mock';
import { getCachedYoutubeData, getYoutubeChannelData } from '@/lib/youtube.service';
import type { AudienceDatum } from '@/types/audience.types';

type AnalyticsResponse = {
    columnHeaders?: Array<{ name: string }>;
    rows?: Array<Array<string | number>>;
};

const OAUTH_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const YT_ANALYTICS_URL = 'https://youtubeanalytics.googleapis.com/v2/reports';
const DEFAULT_ANALYTICS_DAYS = 365;
const MIN_ANALYTICS_DAYS = 30;
const MAX_ANALYTICS_DAYS = 3650;

const YOUTUBE_FALLBACK_AGE_DATA: AudienceDatum[] = [
    { label: '13-17', value: 25 },
    { label: '18-24', value: 45 },
    { label: '25+', value: 30 },
];

const YOUTUBE_FALLBACK_GENDER_DATA: AudienceDatum[] = [
    { label: 'Masculino', value: 70 },
    { label: 'Femenino', value: 25 },
    { label: 'No especificado', value: 5 },
];

const YOUTUBE_FALLBACK_LOCATION_DATA: AudienceDatum[] = [
    { label: 'Argentina', value: 60 },
    { label: 'Mexico', value: 25 },
    { label: 'Chile', value: 15 },
];

const YOUTUBE_FALLBACK_TRAFFIC_DATA: AudienceDatum[] = [
    { label: 'Sugeridos', value: 50 },
    { label: 'Busqueda', value: 30 },
    { label: 'Explorar', value: 20 },
];

const YOUTUBE_FALLBACK_PERFORMANCE_28D: AudienceDatum[] = [
    { label: 'Visualizaciones', value: 0 },
    { label: 'Suscriptores', value: 0 },
    { label: 'Tiempo de visualizacion', value: 0 },
];

async function getAnalyticsAccessToken(): Promise<string | null> {
    const clientId = process.env.YOUTUBE_OAUTH_CLIENT_ID;
    const clientSecret = process.env.YOUTUBE_OAUTH_CLIENT_SECRET;
    const refreshToken = process.env.YOUTUBE_OAUTH_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !refreshToken) {
        return null;
    }

    const body = new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
    });

    const response = await fetch(OAUTH_TOKEN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to refresh OAuth token: ${response.status} ${text}`);
    }

    const data = await response.json() as { access_token?: string };
    return data.access_token ?? null;
}

function getAnalyticsRange() {
    const envDays = Number(process.env.YOUTUBE_ANALYTICS_DAYS ?? DEFAULT_ANALYTICS_DAYS);
    const safeDays = Number.isFinite(envDays)
        ? Math.min(Math.max(Math.round(envDays), MIN_ANALYTICS_DAYS), MAX_ANALYTICS_DAYS)
        : DEFAULT_ANALYTICS_DAYS;

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - safeDays);

    const fmt = (d: Date) => d.toISOString().slice(0, 10);
    return { startDate: fmt(start), endDate: fmt(end), days: safeDays };
}

function getLastNDaysRange(days: number) {
    const safeDays = Math.max(1, Math.round(days));
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - safeDays);
    const fmt = (d: Date) => d.toISOString().slice(0, 10);
    return { startDate: fmt(start), endDate: fmt(end), days: safeDays };
}

async function fetchAnalyticsReport(accessToken: string, params: URLSearchParams) {
    const response = await fetch(`${YT_ANALYTICS_URL}?${params.toString()}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: 'no-store',
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`YouTube Analytics API error: ${response.status} ${text}`);
    }

    return (await response.json()) as AnalyticsResponse;
}

function buildPercentDataFromMap(values: Map<string, number>, fallback: AudienceDatum[], topN: number) {
    const total = Array.from(values.values()).reduce((acc, value) => acc + value, 0);
    if (total <= 0) {
        return fallback;
    }

    return Array.from(values.entries())
        .map(([label, value]) => ({ label, value: Math.round((value / total) * 100) }))
        .sort((a, b) => b.value - a.value)
        .slice(0, topN);
}

function mapGenderLabel(gender: string) {
    switch (gender) {
        case 'male':
            return 'Masculino';
        case 'female':
            return 'Femenino';
        case 'user_specified':
            return 'No binario';
        default:
            return 'No especificado';
    }
}

function mapTrafficSourceLabel(source: string) {
    const labels: Record<string, string> = {
        YT_SEARCH: 'Busqueda',
        SUGGESTED_VIDEO: 'Sugeridos',
        BROWSE: 'Explorar',
        PLAYLIST: 'Playlist',
        EXT_URL: 'Sitios externos',
        CHANNEL_PAGE: 'Pagina del canal',
        YT_CHANNEL: 'Canal de YouTube',
        NOTIFICATION: 'Notificaciones',
        SHORTS: 'Shorts',
    };

    return labels[source] ?? source;
}

function mapCountryLabel(countryCode: string) {
    try {
        const regionName = new Intl.DisplayNames(['es'], { type: 'region' }).of(countryCode.toUpperCase());
        return regionName ?? countryCode;
    } catch {
        return countryCode;
    }
}

function mapYoutubeAgeGroup(ageGroup: string): string | null {
    if (ageGroup === 'age13-17') return '13-17';
    if (ageGroup === 'age18-24') return '18-24';
    if (['age25-34', 'age35-44', 'age45-54', 'age55-64', 'age65-'].includes(ageGroup)) {
        return '25+';
    }

    return null;
}

function normalizeYoutubeAgeData(rows: Array<Array<string | number>>, fallback: AudienceDatum[]): AudienceDatum[] {
    const ageAccumulator = new Map<string, number>([
        ['13-17', 0],
        ['18-24', 0],
        ['25+', 0],
    ]);

    for (const row of rows) {
        const rawAgeGroup = String(row[0] ?? '');
        const viewerPercentage = Number(row[2] ?? 0);
        const mappedAgeGroup = mapYoutubeAgeGroup(rawAgeGroup);

        if (!mappedAgeGroup || Number.isNaN(viewerPercentage)) {
            continue;
        }

        ageAccumulator.set(mappedAgeGroup, (ageAccumulator.get(mappedAgeGroup) ?? 0) + viewerPercentage);
    }

    const orderedAgeData = ['13-17', '18-24', '25+'].map((label) => ({
        label,
        value: ageAccumulator.get(label) ?? 0,
    }));

    const total = orderedAgeData.reduce((sum, item) => sum + item.value, 0);
    if (total <= 0) {
        return fallback;
    }

    return orderedAgeData.map((item) => ({
        label: item.label,
        value: Math.round((item.value / total) * 100),
    }));
}

export async function getYoutubeAudienceInsights() {
    const fallbackAgeData: AudienceDatum[] = YOUTUBE_FALLBACK_AGE_DATA;
    const fallbackGenderData: AudienceDatum[] = YOUTUBE_FALLBACK_GENDER_DATA;
    const fallbackLocationData: AudienceDatum[] = YOUTUBE_FALLBACK_LOCATION_DATA;
    const fallbackTrafficData: AudienceDatum[] = YOUTUBE_FALLBACK_TRAFFIC_DATA;
    const fallbackPerformance28dData: AudienceDatum[] = YOUTUBE_FALLBACK_PERFORMANCE_28D;
    const fallbackInterestData: AudienceDatum[] = defaultInterestData;

    let ageData = fallbackAgeData;
    let genderData = fallbackGenderData;
    let locationData = fallbackLocationData;
    let trafficSourceData = fallbackTrafficData;
    let performance28dData = fallbackPerformance28dData;
    const interestData = fallbackInterestData;
    let source: 'live' | 'mixed' | 'fallback' = 'fallback';
    let message: string | undefined;

    try {
        const accessToken = await getAnalyticsAccessToken();
        if (!accessToken) {
            return {
                ageData,
                genderData,
                locationData,
                trafficSourceData,
                performance28dData,
                interestData,
                source,
                message:
                    'Faltan credenciales OAuth para YouTube Analytics. Edad usa fallback y los intereses mantienen tus categorías definidas manualmente.',
            };
        }

        const { startDate, endDate } = getAnalyticsRange();
        const ageGenderParams = new URLSearchParams({
            ids: 'channel==MINE',
            startDate,
            endDate,
            metrics: 'viewerPercentage',
            dimensions: 'ageGroup,gender',
            sort: '-viewerPercentage',
            maxResults: '200',
        });

        const countryParams = new URLSearchParams({
            ids: 'channel==MINE',
            startDate,
            endDate,
            metrics: 'views',
            dimensions: 'country',
            sort: '-views',
            maxResults: '50',
        });

        const trafficParams = new URLSearchParams({
            ids: 'channel==MINE',
            startDate,
            endDate,
            metrics: 'views',
            dimensions: 'insightTrafficSourceType',
            sort: '-views',
            maxResults: '50',
        });

        const last28 = getLastNDaysRange(28);
        const currentPerformanceParams = new URLSearchParams({
            ids: 'channel==MINE',
            startDate: last28.startDate,
            endDate: last28.endDate,
            metrics: 'views,estimatedMinutesWatched',
        });

        const [ageGenderResponse, countryResponse, trafficResponse, currentPerformanceResponse, channelData] = await Promise.all([
            fetchAnalyticsReport(accessToken, ageGenderParams),
            fetchAnalyticsReport(accessToken, countryParams),
            fetchAnalyticsReport(accessToken, trafficParams),
            fetchAnalyticsReport(accessToken, currentPerformanceParams),
            getCachedYoutubeData().then((cached) => cached ?? getYoutubeChannelData()),
        ]);

        const rows = ageGenderResponse.rows ?? [];

        // Debug: age groups exactly as returned by YouTube Analytics (no grouping/filtering).
        const rawAgeAccumulator = new Map<string, number>();
        const genderAccumulator = new Map<string, number>();
        for (const row of rows) {
            const rawAgeGroup = String(row[0] ?? 'unknown');
            const rawGender = String(row[1] ?? 'unknown');
            const viewerPercentage = Number(row[2] ?? 0);
            if (Number.isNaN(viewerPercentage)) {
                continue;
            }

            rawAgeAccumulator.set(
                rawAgeGroup,
                (rawAgeAccumulator.get(rawAgeGroup) ?? 0) + viewerPercentage
            );

            const mappedGender = mapGenderLabel(rawGender);
            genderAccumulator.set(
                mappedGender,
                (genderAccumulator.get(mappedGender) ?? 0) + viewerPercentage
            );
        }

        const normalizedAge = normalizeYoutubeAgeData(rows, fallbackAgeData);
        const normalizedGender = buildPercentDataFromMap(genderAccumulator, fallbackGenderData, 3);

        const countryRows = countryResponse.rows ?? [];
        const countryAccumulator = new Map<string, number>();
        for (const row of countryRows) {
            const countryCode = String(row[0] ?? '');
            const views = Number(row[1] ?? 0);
            if (!countryCode || Number.isNaN(views) || views <= 0) {
                continue;
            }

            const countryLabel = mapCountryLabel(countryCode);
            countryAccumulator.set(countryLabel, (countryAccumulator.get(countryLabel) ?? 0) + views);
        }

        const normalizedLocation = buildPercentDataFromMap(countryAccumulator, fallbackLocationData, 3);

        const trafficRows = trafficResponse.rows ?? [];
        const trafficAccumulator = new Map<string, number>();
        for (const row of trafficRows) {
            const sourceType = String(row[0] ?? '');
            const views = Number(row[1] ?? 0);
            if (!sourceType || Number.isNaN(views) || views <= 0) {
                continue;
            }

            const sourceLabel = mapTrafficSourceLabel(sourceType);
            trafficAccumulator.set(sourceLabel, (trafficAccumulator.get(sourceLabel) ?? 0) + views);
        }

        const normalizedTraffic = buildPercentDataFromMap(trafficAccumulator, fallbackTrafficData, 3);

        const currentPerformance = currentPerformanceResponse.rows?.[0] ?? [];

        const currentViews = Number(currentPerformance[0] ?? 0);
        const currentWatchTime = Number(currentPerformance[1] ?? 0);
        const totalSubscribers = channelData.metrics.subscriberCount;

        const literalPerformance28d: AudienceDatum[] = [
            { label: 'Visualizaciones', value: Math.max(0, Math.round(currentViews)) },
            { label: 'Suscriptores', value: totalSubscribers },
            { label: 'Tiempo de visualizacion', value: Math.max(0, Math.round(currentWatchTime)) },
        ];

        ageData = normalizedAge;
        genderData = normalizedGender;
        locationData = normalizedLocation;
        trafficSourceData = normalizedTraffic;
        performance28dData = literalPerformance28d;
        source = 'mixed';

        return { ageData, genderData, locationData, trafficSourceData, performance28dData, interestData, source, message };
    } catch (error) {
        return {
            ageData,
            genderData,
            locationData,
            trafficSourceData,
            performance28dData,
            interestData,
            source,
            message: error instanceof Error ? error.message : 'No se pudo obtener YouTube Analytics en vivo.',
        };
    }
}
