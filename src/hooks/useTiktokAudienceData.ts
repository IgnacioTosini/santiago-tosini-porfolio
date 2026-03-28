'use client';

import { useQuery } from '@tanstack/react-query';

type AudienceDatum = {
    label: string;
    value: number;
};

type TiktokPerformanceResponse = {
    success: boolean;
    performanceData: AudienceDatum[];
    source: 'live' | 'fallback';
    message?: string;
};

type TiktokAudienceState = {
    performanceData: AudienceDatum[];
    source: 'live' | 'fallback';
    error: string | null;
};

const defaultPerformanceData: AudienceDatum[] = [
    { label: 'Seguidores', value: 197233 },
    { label: 'Me gusta totales', value: 6319226 },
    { label: 'Videos', value: 783 },
];

const defaultTiktokAudienceState: TiktokAudienceState = {
    performanceData: defaultPerformanceData,
    source: 'fallback',
    error: null,
};

async function fetchTiktokAudienceData(): Promise<TiktokAudienceState> {
    try {
        const response = await fetch('/api/tiktok/analytics/insights', {
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch TikTok data: ${response.statusText}`);
        }

        const data = (await response.json()) as TiktokPerformanceResponse;

        return {
            performanceData: data.performanceData ?? defaultPerformanceData,
            source: data.source ?? 'fallback',
            error: null,
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
    });

    const audienceData = data ?? defaultTiktokAudienceState;

    return {
        performanceData: audienceData.performanceData,
        source: audienceData.source,
        loading: isLoading,
        error: audienceData.error,
    };
}
