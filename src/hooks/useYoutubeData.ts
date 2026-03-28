'use client';

import { SOCIAL_QUERY_GC_TIME_MS, YOUTUBE_INSIGHTS_QUERY_STALE_TIME_MS } from '@/lib/cache';
import { useQuery } from '@tanstack/react-query';
import { YoutubeChannelData } from '@/types/youtube.types';

type YoutubeInsightsResponse = {
    success?: boolean;
    data?: YoutubeChannelData;
    lastSyncedAt?: string;
};

type YoutubeDataState = {
    data: YoutubeChannelData | null;
    error: string | null;
    lastSynced: string | null;
};

const defaultYoutubeDataState: YoutubeDataState = {
    data: null,
    error: null,
    lastSynced: null,
};

async function fetchYoutubeData(): Promise<YoutubeDataState> {
    try {
        const response = await fetch('/api/youtube/insights');

        if (!response.ok) {
            throw new Error(`Failed to fetch YouTube data: ${response.statusText}`);
        }

        const result = (await response.json()) as YoutubeInsightsResponse;

        if (!result.data) {
            return {
                ...defaultYoutubeDataState,
                error: 'No YouTube data available',
            };
        }

        return {
            data: result.data,
            lastSynced: result.lastSyncedAt ?? result.data.lastSyncedAt,
            error: null,
        };
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        console.error('Failed to fetch YouTube data:', err);
        return {
            ...defaultYoutubeDataState,
            error: errorMessage,
        };
    }
}

export function useYoutubeData() {
    const { data: queryData, isLoading } = useQuery({
        queryKey: ['youtube', 'insights'],
        queryFn: fetchYoutubeData,
        staleTime: YOUTUBE_INSIGHTS_QUERY_STALE_TIME_MS,
        gcTime: SOCIAL_QUERY_GC_TIME_MS,
    });

    const state = queryData ?? defaultYoutubeDataState;
    const data = state.data;

    return {
        data,
        loading: isLoading,
        error: state.error,
        lastSynced: state.lastSynced,
        subscriberCount: data?.metrics.subscriberCount ?? 0,
        totalViews: data?.metrics.viewCount ?? 0,
        videoCount: data?.metrics.videoCount ?? 0,
        recentVideos: data?.recentVideos ?? [],
    };
}
