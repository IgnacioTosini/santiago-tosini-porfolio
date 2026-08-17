const APIFY_API_BASE_URL = 'https://api.apify.com/v2';
const DEFAULT_TIKTOK_ACTOR_ID = 'clockworks~tiktok-profile-scraper';
const DEFAULT_TIKTOK_USERNAME = 'santiagotosini';

type JsonRecord = Record<string, unknown>;

type ApifyRunResponse = {
    data?: {
        id?: string;
        status?: string;
        startedAt?: string;
        finishedAt?: string;
    };
};

export type ApifyTiktokItem = {
    id: string;
    text: string;
    webVideoUrl: string;
    coverUrl: string | null;
    playCount: number;
    diggCount: number;
    followers: number;
    likes: number;
    videos: number;
};

export type ApifyTiktokSyncResult = {
    runId: string;
    status: string;
    startedAt: string | null;
};

export type ApifyTiktokStatus = {
    configured: boolean;
    dataAvailable: boolean;
    latestRun: {
        status: string;
        startedAt: string | null;
        finishedAt: string | null;
    } | null;
};

function getApifyConfig() {
    const token = process.env.APIFY_API_TOKEN?.trim();
    const actorId = process.env.APIFY_TIKTOK_ACTOR_ID?.trim() || DEFAULT_TIKTOK_ACTOR_ID;
    const username = (process.env.APIFY_TIKTOK_USERNAME?.trim() || DEFAULT_TIKTOK_USERNAME)
        .replace(/^@/, '');

    return { token, actorId, username };
}

function isRecord(value: unknown): value is JsonRecord {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readRecord(value: unknown, key: string): JsonRecord | null {
    if (!isRecord(value)) {
        return null;
    }

    const nestedValue = value[key];
    return isRecord(nestedValue) ? nestedValue : null;
}

function readString(value: unknown, keys: string[]): string | null {
    if (!isRecord(value)) {
        return null;
    }

    for (const key of keys) {
        const candidate = value[key];
        if (typeof candidate === 'string' && candidate.trim()) {
            return candidate.trim();
        }
    }

    return null;
}

function readNumber(value: unknown, keys: string[]): number | null {
    if (!isRecord(value)) {
        return null;
    }

    for (const key of keys) {
        const candidate = value[key];
        const parsed = typeof candidate === 'number'
            ? candidate
            : typeof candidate === 'string' && candidate.trim()
                ? Number(candidate)
                : Number.NaN;

        if (Number.isFinite(parsed) && parsed >= 0) {
            return Math.round(parsed);
        }
    }

    return null;
}

function parseApifyTiktokItem(value: unknown): ApifyTiktokItem | null {
    if (!isRecord(value) || readString(value, ['errorCode'])) {
        return null;
    }

    const author = readRecord(value, 'authorMeta') ?? readRecord(value, 'author') ?? value;
    const video = readRecord(value, 'videoMeta');
    const followers = readNumber(author, ['fans', 'followerCount', 'followers']);
    const likes = readNumber(author, ['heart', 'heartCount', 'likesCount', 'likes']);
    const videos = readNumber(author, ['video', 'videoCount', 'videos']);

    if (followers === null || likes === null || videos === null) {
        return null;
    }

    return {
        id: readString(value, ['id', 'videoId']) ?? '',
        text: readString(value, ['text', 'description', 'title']) ?? 'TikTok destacado',
        webVideoUrl: readString(value, ['webVideoUrl', 'url', 'shareUrl']) ?? '',
        coverUrl: readString(video, ['coverUrl', 'originalCoverUrl'])
            ?? readString(value, ['coverUrl', 'cover']),
        playCount: readNumber(value, ['playCount', 'viewCount', 'views']) ?? 0,
        diggCount: readNumber(value, ['diggCount', 'likeCount', 'likes']) ?? 0,
        followers,
        likes,
        videos,
    };
}

function getAuthorizationHeaders(token: string) {
    return {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
}

export function isApifyTiktokConfigured() {
    return Boolean(getApifyConfig().token);
}

export async function startApifyTiktokSync(): Promise<ApifyTiktokSyncResult> {
    const { token, actorId, username } = getApifyConfig();

    if (!token) {
        throw new Error('Falta APIFY_API_TOKEN.');
    }

    const query = new URLSearchParams({
        maxItems: '1',
        restartOnError: 'false',
    });
    const response = await fetch(
        `${APIFY_API_BASE_URL}/actors/${encodeURIComponent(actorId)}/runs?${query}`,
        {
            method: 'POST',
            headers: getAuthorizationHeaders(token),
            body: JSON.stringify({
                profiles: [username],
                profileScrapeSections: ['videos'],
                profileSorting: 'popular',
                resultsPerPage: 1,
                maxFollowersPerProfile: 0,
                maxFollowingPerProfile: 0,
                excludePinnedPosts: false,
                shouldDownloadVideos: false,
                shouldDownloadCovers: false,
                shouldDownloadSlideshowImages: false,
                shouldDownloadAvatars: false,
                downloadSubtitlesOptions: 'NEVER_DOWNLOAD_SUBTITLES',
                commentsPerPost: 0,
                topLevelCommentsPerPost: 0,
                maxRepliesPerComment: 0,
            }),
            cache: 'no-store',
        }
    );

    if (!response.ok) {
        const details = await response.text();
        throw new Error(`Apify no pudo iniciar la sincronización (${response.status}): ${details}`);
    }

    const payload = (await response.json()) as ApifyRunResponse;
    const runId = payload.data?.id;

    if (!runId) {
        throw new Error('Apify inició la solicitud pero no devolvió un identificador de ejecución.');
    }

    return {
        runId,
        status: payload.data?.status ?? 'READY',
        startedAt: payload.data?.startedAt ?? null,
    };
}

export async function getLatestApifyTiktokItem(): Promise<ApifyTiktokItem | null> {
    const { token, actorId } = getApifyConfig();

    if (!token) {
        return null;
    }

    const query = new URLSearchParams({
        status: 'SUCCEEDED',
        origin: 'API',
        clean: 'true',
        limit: '1',
        fields: [
            'id',
            'text',
            'webVideoUrl',
            'videoMeta',
            'playCount',
            'diggCount',
            'authorMeta',
            'errorCode',
        ].join(','),
    });
    const response = await fetch(
        `${APIFY_API_BASE_URL}/actors/${encodeURIComponent(actorId)}/runs/last/dataset/items?${query}`,
        {
            headers: getAuthorizationHeaders(token),
            cache: 'no-store',
        }
    );

    if (response.status === 404) {
        return null;
    }

    if (!response.ok) {
        const details = await response.text();
        throw new Error(`Apify no pudo devolver el último resultado (${response.status}): ${details}`);
    }

    const payload = (await response.json()) as unknown;
    const item = Array.isArray(payload) ? payload[0] : null;

    return parseApifyTiktokItem(item);
}

export async function getApifyTiktokStatus(): Promise<ApifyTiktokStatus> {
    const { token, actorId } = getApifyConfig();

    if (!token) {
        return {
            configured: false,
            dataAvailable: false,
            latestRun: null,
        };
    }

    const query = new URLSearchParams({ origin: 'API' });
    const response = await fetch(
        `${APIFY_API_BASE_URL}/actors/${encodeURIComponent(actorId)}/runs/last?${query}`,
        {
            headers: getAuthorizationHeaders(token),
            cache: 'no-store',
        }
    );

    if (response.status === 404) {
        return {
            configured: true,
            dataAvailable: false,
            latestRun: null,
        };
    }

    if (!response.ok) {
        const details = await response.text();
        throw new Error(`Apify no pudo devolver el estado (${response.status}): ${details}`);
    }

    const payload = (await response.json()) as ApifyRunResponse;
    const run = payload.data;
    const dataAvailable = Boolean(await getLatestApifyTiktokItem());

    return {
        configured: true,
        dataAvailable,
        latestRun: run
            ? {
                status: run.status ?? 'UNKNOWN',
                startedAt: run.startedAt ?? null,
                finishedAt: run.finishedAt ?? null,
            }
            : null,
    };
}
