export type YoutubeMetrics = {
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
  lastUpdated: string; // ISO 8601 timestamp
};

export type YoutubeVideo = {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  duration: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
};

export type YoutubeChannelData = {
  channelId: string;
  channelTitle: string;
  customUrl?: string;
  description: string;
  profileImageUrl: string;
  metrics: YoutubeMetrics;
  recentVideos: YoutubeVideo[];
  lastSyncedAt: string; // ISO 8601 timestamp
};
