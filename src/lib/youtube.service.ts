import { YoutubeChannelData, YoutubeVideo } from '@/types/youtube.types';

type YoutubePlaylistItem = {
    contentDetails: {
        videoId: string;
    };
};

type YoutubeVideoItem = {
    id: string;
    snippet: {
        title: string;
        description: string;
        publishedAt: string;
        thumbnails: {
            high?: { url: string };
            medium?: { url: string };
            default?: { url: string };
        };
    };
    contentDetails: {
        duration: string;
    };
    statistics: {
        viewCount?: string;
        likeCount?: string;
        commentCount?: string;
    };
};

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';
const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

if (!API_KEY || !CHANNEL_ID) {
    console.warn(
        'YouTube API configuration missing. Set YOUTUBE_API_KEY and YOUTUBE_CHANNEL_ID in .env.local'
    );
}

/**
 * Get channel statistics and basic info
 */
async function getChannelStats() {
    try {
        const response = await fetch(
            `${YOUTUBE_API_BASE}/channels?part=statistics,snippet&id=${CHANNEL_ID}&key=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error(`YouTube API error: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            throw new Error('Channel not found');
        }

        const channel = data.items[0];

        return {
            channelId: channel.id,
            channelTitle: channel.snippet.title,
            customUrl: channel.snippet.customUrl || undefined,
            description: channel.snippet.description,
            profileImageUrl: channel.snippet.thumbnails.high.url,
            metrics: {
                subscriberCount: parseInt(channel.statistics.subscriberCount || '0'),
                viewCount: parseInt(channel.statistics.viewCount || '0'),
                videoCount: parseInt(channel.statistics.videoCount || '0'),
                lastUpdated: new Date().toISOString(),
            },
        };
    } catch (error) {
        console.error('Error fetching YouTube channel stats:', error);
        throw error;
    }
}

/**
 * Get recent videos from the channel
 */
async function getRecentVideos(maxResults: number = 5): Promise<YoutubeVideo[]> {
    try {
        // First, get the uploads playlist ID
        const channelResponse = await fetch(
            `${YOUTUBE_API_BASE}/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`
        );

        if (!channelResponse.ok) {
            throw new Error(`YouTube API error: ${channelResponse.statusText}`);
        }

        const channelData = await channelResponse.json();
        const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

        // Get videos from uploads playlist
        const playlistResponse = await fetch(
            `${YOUTUBE_API_BASE}/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=${maxResults}&key=${API_KEY}`
        );

        if (!playlistResponse.ok) {
            throw new Error(`YouTube API error: ${playlistResponse.statusText}`);
        }

        const playlistData = (await playlistResponse.json()) as {
            items?: YoutubePlaylistItem[];
        };
        const videoIds = (playlistData.items ?? [])
            .map((item) => item.contentDetails.videoId)
            .join(',');

        if (!videoIds) {
            return [];
        }

        // Get video statistics
        const statsResponse = await fetch(
            `${YOUTUBE_API_BASE}/videos?part=statistics,contentDetails,snippet&id=${videoIds}&key=${API_KEY}`
        );

        if (!statsResponse.ok) {
            throw new Error(`YouTube API error: ${statsResponse.statusText}`);
        }

        const statsData = (await statsResponse.json()) as {
            items?: YoutubeVideoItem[];
        };

        const videos: YoutubeVideo[] = (statsData.items ?? []).map((video) => ({
            videoId: video.id,
            title: video.snippet.title,
            description: video.snippet.description,
            thumbnail:
                video.snippet.thumbnails.high?.url ??
                video.snippet.thumbnails.medium?.url ??
                video.snippet.thumbnails.default?.url ??
                '',
            publishedAt: video.snippet.publishedAt,
            duration: video.contentDetails.duration,
            viewCount: parseInt(video.statistics.viewCount || '0'),
            likeCount: parseInt(video.statistics.likeCount || '0'),
            commentCount: parseInt(video.statistics.commentCount || '0'),
        }));

        return videos;
    } catch (error) {
        console.error('Error fetching YouTube videos:', error);
        throw error;
    }
}

/**
 * Get complete channel data including stats and recent videos
 */
export async function getYoutubeChannelData(): Promise<YoutubeChannelData> {
    const channelInfo = await getChannelStats();
    const recentVideos = await getRecentVideos(5);

    return {
        ...channelInfo,
        recentVideos,
        lastSyncedAt: new Date().toISOString(),
    };
}

/**
 * Get cached YouTube data from file
 */
export async function getCachedYoutubeData(): Promise<YoutubeChannelData | null> {
    try {
        const fs = await import('fs/promises');
        const path = await import('path');
        const cacheDir = path.join(process.cwd(), '.cache');
        const cachePath = path.join(cacheDir, 'youtube-data.json');

        const data = await fs.readFile(cachePath, 'utf-8');
        return JSON.parse(data);
    } catch {
        return null;
    }
}

/**
 * Save YouTube data to cache file
 */
export async function cacheYoutubeData(data: YoutubeChannelData): Promise<void> {
    try {
        const fs = await import('fs/promises');
        const path = await import('path');
        const cacheDir = path.join(process.cwd(), '.cache');

        // Create cache directory if it doesn't exist
        await fs.mkdir(cacheDir, { recursive: true });

        const cachePath = path.join(cacheDir, 'youtube-data.json');
        await fs.writeFile(cachePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error caching YouTube data:', error);
    }
}
