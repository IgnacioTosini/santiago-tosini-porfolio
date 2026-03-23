type MediaMetric = {
    views: number;
    likes: number;
};

export type MediaCardData = {
    id: string;
    title: string;
    coverUrl: string;
    reelUrl?: string;
    metrics: MediaMetric;
    isLive?: boolean; // hoy false/hardcoded, mañana true con API
};