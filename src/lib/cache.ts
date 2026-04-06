export const ONE_HOUR_MS = 60 * 60 * 1000;
export const ONE_DAY_MS = 24 * ONE_HOUR_MS;
export const FIFTEEN_MINUTES_MS = 15 * 60 * 1000;
export const TWELVE_HOURS_MS = 12 * ONE_HOUR_MS;

export const YOUTUBE_INSIGHTS_QUERY_STALE_TIME_MS = ONE_HOUR_MS;
export const AUDIENCE_QUERY_STALE_TIME_MS = FIFTEEN_MINUTES_MS;
export const YOUTUBE_AUDIENCE_QUERY_STALE_TIME_MS = TWELVE_HOURS_MS;
export const SOCIAL_QUERY_GC_TIME_MS = ONE_DAY_MS;

export const YOUTUBE_INSIGHTS_CACHE_HEADERS = {
    'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
};

export const AUDIENCE_CACHE_HEADERS = {
    'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=3600',
};

export const YOUTUBE_AUDIENCE_CACHE_HEADERS = {
    'Cache-Control': 'public, s-maxage=43200, stale-while-revalidate=86400',
};