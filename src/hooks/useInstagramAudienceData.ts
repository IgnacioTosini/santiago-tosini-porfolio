'use client';

import { AUDIENCE_QUERY_STALE_TIME_MS, SOCIAL_QUERY_GC_TIME_MS } from '@/lib/cache';
import { instagramAgeData, instagramGenderData, instagramLocationData, instagramPerformanceData } from '@/mocks/instagramData.mock';
import type { AudienceDatum, AudienceSource } from '@/types/audience.types';
import { useQuery } from '@tanstack/react-query';

type InstagramInsightsResponse = {
    success: boolean;
    ageData: AudienceDatum[];
    genderData: AudienceDatum[];
    locationData: AudienceDatum[];
    performanceData: AudienceDatum[];
    source: AudienceSource;
    message?: string;
};

type InstagramAudienceState = {
    ageData: AudienceDatum[];
    genderData: AudienceDatum[];
    locationData: AudienceDatum[];
    performanceData: AudienceDatum[];
    source: AudienceSource;
    error: string | null;
};

const defaultInstagramAudienceState: InstagramAudienceState = {
    ageData: instagramAgeData,
    genderData: instagramGenderData,
    locationData: instagramLocationData,
    performanceData: instagramPerformanceData,
    source: 'fallback',
    error: null,
};

async function fetchInstagramAudienceData(): Promise<InstagramAudienceState> {
    try {
        const response = await fetch('/api/instagram/insights');

        if (!response.ok) {
            throw new Error(`Failed to fetch Instagram data: ${response.statusText}`);
        }

        const data = (await response.json()) as InstagramInsightsResponse;

        return {
            ageData: data.ageData ?? instagramAgeData,
            genderData: data.genderData ?? instagramGenderData,
            locationData: data.locationData ?? instagramLocationData,
            performanceData: data.performanceData ?? instagramPerformanceData,
            source: data.source ?? 'fallback',
            error: null,
        };
    } catch (err) {
        return {
            ...defaultInstagramAudienceState,
            error: err instanceof Error ? err.message : 'Unknown error',
        };
    }
}

export function useInstagramAudienceData() {
    const { data, isLoading } = useQuery({
        queryKey: ['audience', 'instagram'],
        queryFn: fetchInstagramAudienceData,
        staleTime: AUDIENCE_QUERY_STALE_TIME_MS,
        gcTime: SOCIAL_QUERY_GC_TIME_MS,
    });

    const audienceData = data ?? defaultInstagramAudienceState;

    return {
        ageData: audienceData.ageData,
        genderData: audienceData.genderData,
        locationData: audienceData.locationData,
        performanceData: audienceData.performanceData,
        source: audienceData.source,
        loading: isLoading,
        error: audienceData.error,
    };
}
