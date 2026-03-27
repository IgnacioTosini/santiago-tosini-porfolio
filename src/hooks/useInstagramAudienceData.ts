'use client';

import { useEffect, useState } from 'react';

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

export function useInstagramAudienceData() {
    const [ageData, setAgeData] = useState<AudienceDatum[]>(defaultAgeData);
    const [genderData, setGenderData] = useState<AudienceDatum[]>(defaultGenderData);
    const [locationData, setLocationData] = useState<AudienceDatum[]>(defaultLocationData);
    const [performanceData, setPerformanceData] = useState<AudienceDatum[]>(defaultPerformanceData);
    const [source, setSource] = useState<'live' | 'mixed' | 'fallback'>('fallback');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInsights = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/instagram/insights', {
                    cache: 'no-store',
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch Instagram data: ${response.statusText}`);
                }

                const data = (await response.json()) as InstagramInsightsResponse;
                setAgeData(data.ageData ?? defaultAgeData);
                setGenderData(data.genderData ?? defaultGenderData);
                setLocationData(data.locationData ?? defaultLocationData);
                setPerformanceData(data.performanceData ?? defaultPerformanceData);
                setSource(data.source ?? 'fallback');
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
                setAgeData(defaultAgeData);
                setGenderData(defaultGenderData);
                setLocationData(defaultLocationData);
                setPerformanceData(defaultPerformanceData);
                setSource('fallback');
            } finally {
                setLoading(false);
            }
        };

        fetchInsights();
    }, []);

    return {
        ageData,
        genderData,
        locationData,
        performanceData,
        source,
        loading,
        error,
    };
}
