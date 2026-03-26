'use client';

import { useEffect, useState } from 'react';

type AudienceDatum = {
    label: string;
    value: number;
};

type AudienceResponse = {
    success: boolean;
    ageData: AudienceDatum[];
    genderData: AudienceDatum[];
    locationData: AudienceDatum[];
    trafficSourceData: AudienceDatum[];
    performance28dData: AudienceDatum[];
    interestData: AudienceDatum[];
    source: 'live' | 'mixed' | 'fallback';
    message?: string;
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
    { label: 'Visualizaciones', value: 100 },
    { label: 'Suscriptores', value: 100 },
    { label: 'Tiempo de visualizacion', value: 100 },
];

export function useYoutubeAudienceData() {
    const [ageData, setAgeData] = useState<AudienceDatum[]>(defaultAgeData);
    const [genderData, setGenderData] = useState<AudienceDatum[]>(defaultGenderData);
    const [locationData, setLocationData] = useState<AudienceDatum[]>(defaultLocationData);
    const [trafficSourceData, setTrafficSourceData] = useState<AudienceDatum[]>(defaultTrafficSourceData);
    const [performance28dData, setPerformance28dData] = useState<AudienceDatum[]>(defaultPerformance28dData);
    const [source, setSource] = useState<'live' | 'mixed' | 'fallback'>('fallback');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchInsights = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/youtube/analytics/insights', {
                    cache: 'no-store',
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch YouTube audience: ${response.statusText}`);
                }

                const data = (await response.json()) as AudienceResponse;
                setAgeData(data.ageData ?? defaultAgeData);
                setGenderData(data.genderData ?? defaultGenderData);
                setLocationData(data.locationData ?? defaultLocationData);
                setTrafficSourceData(data.trafficSourceData ?? defaultTrafficSourceData);
                setPerformance28dData(data.performance28dData ?? defaultPerformance28dData);
                setSource(data.source ?? 'fallback');
                setMessage(data.message ?? null);
                setError(data.source === 'fallback' ? (data.message ?? 'No se pudieron cargar métricas en vivo.') : null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
                setMessage(null);
                setAgeData(defaultAgeData);
                setGenderData(defaultGenderData);
                setLocationData(defaultLocationData);
                setTrafficSourceData(defaultTrafficSourceData);
                setPerformance28dData(defaultPerformance28dData);
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
        performance28dData,
        source,
        loading,
        error,
        message,
    };
}
