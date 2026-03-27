export type MediaMetric = {
    views: number;
    likes: number;
};

export type SocialPlatform = 'youtube' | 'tiktok' | 'instagram';

export type MediaCardData = {
    platform: SocialPlatform;
    id: string;
    title: string;
    coverUrl: string;
    reelUrl?: string;
    metrics: MediaMetric;
    isLive?: boolean; // hoy false/hardcoded, mañana true con API
};