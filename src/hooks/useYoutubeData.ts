'use client';

import { useEffect, useState } from 'react';
import { YoutubeChannelData } from '@/types/youtube.types';

export function useYoutubeData() {
    const [data, setData] = useState<YoutubeChannelData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastSynced, setLastSynced] = useState<string | null>(null);

    useEffect(() => {
        const fetchYoutubeData = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/youtube/insights');

                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch YouTube data: ${response.statusText}`
                    );
                }

                const result = await response.json();

                if (result.data) {
                    setData(result.data);
                    setLastSynced(result.lastSyncedAt);
                    setError(null);
                } else {
                    setError('No YouTube data available');
                }
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Unknown error';
                setError(errorMessage);
                console.error('Failed to fetch YouTube data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchYoutubeData();

        // Refresh every 30 minutes
        const interval = setInterval(fetchYoutubeData, 30 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    return {
        data,
        loading,
        error,
        lastSynced,
        subscriberCount: data?.metrics.subscriberCount ?? 0,
        totalViews: data?.metrics.viewCount ?? 0,
        videoCount: data?.metrics.videoCount ?? 0,
        recentVideos: data?.recentVideos ?? [],
    };
}
