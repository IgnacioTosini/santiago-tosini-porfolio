'use client';

import { useEffect, useState } from 'react';

type AudienceDatum = {
    label: string;
    value: number;
};

type TiktokAudienceResponse = {
    success: boolean;
    ageData: AudienceDatum[];
    genderData: AudienceDatum[];
    locationData: AudienceDatum[];
    trafficSourceData: AudienceDatum[];
    performanceData: AudienceDatum[];
    interestData: AudienceDatum[];
    source: 'live' | 'mixed' | 'fallback';
    message?: string;
};

const defaultAgeData: AudienceDatum[] = [
    { label: '13-17', value: 30 },
    { label: '18-24', value: 55 },
    { label: '25+', value: 15 },
];

const defaultGenderData: AudienceDatum[] = [
    { label: 'Masculino', value: 75 },
    { label: 'Femenino', value: 20 },
    { label: 'No especificado', value: 5 },
];

const defaultLocationData: AudienceDatum[] = [
    { label: 'Argentina', value: 65 },
    { label: 'México', value: 20 },
    { label: 'Chile', value: 15 },
];

const defaultTrafficSourceData: AudienceDatum[] = [
    { label: 'Para ti', value: 60 },
    { label: 'Siguiendo', value: 25 },
    { label: 'Perfil', value: 15 },
];

const defaultPerformanceData: AudienceDatum[] = [
    { label: 'Seguidores', value: 100000 },
    { label: 'Me gusta totales', value: 1000000 },
    { label: 'Videos', value: 500 },
];

export function useTiktokAudienceData() {
    const [ageData, setAgeData] = useState<AudienceDatum[]>(defaultAgeData);
    const [genderData, setGenderData] = useState<AudienceDatum[]>(defaultGenderData);
    const [locationData, setLocationData] = useState<AudienceDatum[]>(defaultLocationData);
    const [trafficSourceData, setTrafficSourceData] = useState<AudienceDatum[]>(defaultTrafficSourceData);
    const [performanceData, setPerformanceData] = useState<AudienceDatum[]>(defaultPerformanceData);
    const [source, setSource] = useState<'live' | 'mixed' | 'fallback'>('fallback');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchInsights = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/tiktok/analytics/insights', {
                    cache: 'no-store',
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch TikTok audience: ${response.statusText}`);
                }

                const data = (await response.json()) as TiktokAudienceResponse;
                setAgeData(data.ageData ?? defaultAgeData);
                setGenderData(data.genderData ?? defaultGenderData);
                setLocationData(data.locationData ?? defaultLocationData);
                setTrafficSourceData(data.trafficSourceData ?? defaultTrafficSourceData);
                setPerformanceData(data.performanceData ?? defaultPerformanceData);
                setSource(data.source ?? 'fallback');
                setMessage(data.message ?? null);
                setError(
                    data.source === 'fallback'
                        ? (data.message ?? 'No se pudieron cargar métricas en vivo de TikTok.')
                        : null,
                );
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
                setMessage(null);
                setAgeData(defaultAgeData);
                setGenderData(defaultGenderData);
                setLocationData(defaultLocationData);
                setTrafficSourceData(defaultTrafficSourceData);
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
        trafficSourceData,
        performanceData,
        source,
        loading,
        error,
        message,
    };
}
