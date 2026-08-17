'use client';

import { AUDIENCE_QUERY_STALE_TIME_MS, SOCIAL_QUERY_GC_TIME_MS } from '@/lib/cache';
import type { AudienceDatum } from '@/types/audience.types';
import { useQuery } from '@tanstack/react-query';

type TiktokPerformanceResponse = {
    success: boolean;
    performanceData: AudienceDatum[];
    source: 'live' | 'fallback';
    provider: 'apify' | 'fallback';
    apifyConfigured: boolean;
    message?: string;
};

type TiktokAudienceState = {
    performanceData: AudienceDatum[];
    source: 'live' | 'fallback';
    error: string | null;
};

const defaultTiktokAudienceState: TiktokAudienceState = {
    performanceData: [],
    source: 'fallback',
    error: null,
};

async function fetchTiktokAudienceData(): Promise<TiktokAudienceState> {
    try {
        const response = await fetch('/api/tiktok/analytics/insights');

        if (!response.ok) {
            throw new Error(`Failed to fetch TikTok data: ${response.statusText}`);
        }

        const data = (await response.json()) as TiktokPerformanceResponse;

        return {
            performanceData: data.performanceData ?? [],
            source: data.source ?? 'fallback',
            error: data.source === 'fallback'
                ? data.message ?? 'No hay métricas actualizadas de TikTok disponibles.'
                : null,
        };
    } catch (err) {
        return {
            ...defaultTiktokAudienceState,
            error: err instanceof Error ? err.message : 'Unknown error',
        };
    }
}

export function useTiktokAudienceData() {
    const { data, isLoading } = useQuery({
        queryKey: ['audience', 'tiktok'],
        queryFn: fetchTiktokAudienceData,
        staleTime: AUDIENCE_QUERY_STALE_TIME_MS,
        gcTime: SOCIAL_QUERY_GC_TIME_MS,
    });

    const audienceData = data ? data : defaultTiktokAudienceState;

    return {
        performanceData: audienceData.performanceData,
        source: audienceData.source,
        loading: isLoading,
        error: audienceData.error,
    };
}
