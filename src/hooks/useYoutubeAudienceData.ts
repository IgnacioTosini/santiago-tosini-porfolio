'use client';

import { SOCIAL_QUERY_GC_TIME_MS, YOUTUBE_AUDIENCE_QUERY_STALE_TIME_MS } from '@/lib/cache';
import type { AudienceDatum, AudienceSource } from '@/types/audience.types';
import { useQuery } from '@tanstack/react-query';

type AudienceResponse = {
    success: boolean;
    ageData: AudienceDatum[];
    genderData: AudienceDatum[];
    locationData: AudienceDatum[];
    trafficSourceData: AudienceDatum[];
    performance28dData: AudienceDatum[];
    interestData: AudienceDatum[];
    source: AudienceSource;
    message?: string;
    lastSyncedAt?: string;
    cached?: boolean;
};

type YoutubeAudienceState = {
    ageData: AudienceDatum[];
    genderData: AudienceDatum[];
    locationData: AudienceDatum[];
    trafficSourceData: AudienceDatum[];
    performance28dData: AudienceDatum[];
    source: AudienceSource;
    error: string | null;
    message: string | null;
};

const defaultAgeData: AudienceDatum[] = [
    { label: '13-17', value: 25 },
    { label: '18-24', value: 45 },
    { label: '25+', value: 30 },
];

const defaultGenderData: AudienceDatum[] = [
    { label: 'Masculino', value: 70 },
    { label: 'Femenino', value: 25 },
    { label: 'No especificado', value: 5 },
];

const defaultLocationData: AudienceDatum[] = [
    { label: 'Argentina', value: 60 },
    { label: 'Mexico', value: 25 },
    { label: 'Chile', value: 15 },
];

const defaultTrafficSourceData: AudienceDatum[] = [
    { label: 'Sugeridos', value: 50 },
    { label: 'Busqueda', value: 30 },
    { label: 'Explorar', value: 20 },
];

const defaultPerformance28dData: AudienceDatum[] = [
    { label: 'Visualizaciones', value: 0 },
    { label: 'Suscriptores', value: 0 },
    { label: 'Tiempo de visualizacion', value: 0 },
];

const defaultYoutubeAudienceState: YoutubeAudienceState = {
    ageData: defaultAgeData,
    genderData: defaultGenderData,
    locationData: defaultLocationData,
    trafficSourceData: defaultTrafficSourceData,
    performance28dData: defaultPerformance28dData,
    source: 'fallback',
    error: null,
    message: null,
};

async function fetchYoutubeAudienceData(): Promise<YoutubeAudienceState> {
    try {
        const response = await fetch('/api/youtube/audience');

        if (!response.ok) {
            throw new Error(`Failed to fetch YouTube audience: ${response.statusText}`);
        }

        const data = (await response.json()) as AudienceResponse;

        return {
            ageData: data.ageData ?? defaultAgeData,
            genderData: data.genderData ?? defaultGenderData,
            locationData: data.locationData ?? defaultLocationData,
            trafficSourceData: data.trafficSourceData ?? defaultTrafficSourceData,
            performance28dData: data.performance28dData ?? defaultPerformance28dData,
            source: data.source ?? 'fallback',
            message: data.message ?? null,
            error: null,
        };
    } catch (err) {
        return {
            ...defaultYoutubeAudienceState,
            error: err instanceof Error ? err.message : 'Unknown error',
        };
    }
}

export function useYoutubeAudienceData() {
    const { data, isLoading } = useQuery({
        queryKey: ['audience', 'youtube'],
        queryFn: fetchYoutubeAudienceData,
        staleTime: YOUTUBE_AUDIENCE_QUERY_STALE_TIME_MS,
        gcTime: SOCIAL_QUERY_GC_TIME_MS,
    });

    const audienceData = data ?? defaultYoutubeAudienceState;

    return {
        ageData: audienceData.ageData,
        genderData: audienceData.genderData,
        locationData: audienceData.locationData,
        trafficSourceData: audienceData.trafficSourceData,
        performance28dData: audienceData.performance28dData,
        source: audienceData.source,
        loading: isLoading,
        error: audienceData.error,
        message: audienceData.message,
    };
}
