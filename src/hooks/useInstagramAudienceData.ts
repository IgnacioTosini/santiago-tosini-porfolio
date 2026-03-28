'use client';

import { useQuery } from '@tanstack/react-query';

type AudienceDatum = {
    label: string;
    value: number;
};

type InstagramInsightsResponse = {
    success: boolean;
    ageData: AudienceDatum[];
    genderData: AudienceDatum[];
    locationData: AudienceDatum[];
    performanceData: AudienceDatum[];
    source: 'live' | 'mixed' | 'fallback';
    message?: string;
};

type InstagramAudienceState = {
    ageData: AudienceDatum[];
    genderData: AudienceDatum[];
    locationData: AudienceDatum[];
    performanceData: AudienceDatum[];
    source: 'live' | 'mixed' | 'fallback';
    error: string | null;
};

const defaultAgeData: AudienceDatum[] = [
    { label: '18-24', value: 50 },
    { label: '25-34', value: 35 },
    { label: '35+', value: 15 },
];

const defaultGenderData: AudienceDatum[] = [
    { label: 'Masculino', value: 72 },
    { label: 'Femenino', value: 23 },
    { label: 'No especificado', value: 5 },
];

const defaultLocationData: AudienceDatum[] = [
    { label: 'Argentina', value: 68 },
    { label: 'México', value: 18 },
    { label: 'Chile', value: 14 },
];

const defaultPerformanceData: AudienceDatum[] = [
    { label: 'Seguidores', value: 0 },
    { label: 'Publicaciones', value: 0 },
];

const defaultInstagramAudienceState: InstagramAudienceState = {
    ageData: defaultAgeData,
    genderData: defaultGenderData,
    locationData: defaultLocationData,
    performanceData: defaultPerformanceData,
    source: 'fallback',
    error: null,
};

async function fetchInstagramAudienceData(): Promise<InstagramAudienceState> {
    try {
        const response = await fetch('/api/instagram/insights', {
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch Instagram data: ${response.statusText}`);
        }

        const data = (await response.json()) as InstagramInsightsResponse;

        return {
            ageData: data.ageData ?? defaultAgeData,
            genderData: data.genderData ?? defaultGenderData,
            locationData: data.locationData ?? defaultLocationData,
            performanceData: data.performanceData ?? defaultPerformanceData,
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
