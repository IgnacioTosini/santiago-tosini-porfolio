'use client';

import { useEffect, useState } from 'react';

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

const defaultPerformanceData: AudienceDatum[] = [
    { label: 'Seguidores', value: 197233 },
    { label: 'Me gusta totales', value: 6319226 },
    { label: 'Videos', value: 783 },
];

export function useTiktokAudienceData() {
    const [performanceData, setPerformanceData] = useState<AudienceDatum[]>(defaultPerformanceData);
    const [source, setSource] = useState<'live' | 'fallback'>('fallback');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInsights = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/tiktok/analytics/insights', {
                    cache: 'no-store',
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch TikTok data: ${response.statusText}`);
                }

                const data = (await response.json()) as TiktokPerformanceResponse;
                setPerformanceData(data.performanceData ?? defaultPerformanceData);
                setSource(data.source ?? 'fallback');
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
                setPerformanceData(defaultPerformanceData);
                setSource('fallback');
            } finally {
                setLoading(false);
            }
        };

        fetchInsights();
    }, []);

    return {
        performanceData,
        source,
        loading,
        error,
    };
}
