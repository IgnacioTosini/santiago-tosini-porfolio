import { MediaCardData } from '@/types/media.types';
import { getInstagramTopMediaCard } from '@/lib/instagram-analytics.service';
import { getTiktokTopVideoCard } from '@/lib/tiktok-analytics.service';
import { getCachedYoutubeData, getYoutubeChannelData } from '@/lib/youtube.service';

function getYoutubeTopMediaCard(youtubeData: Awaited<ReturnType<typeof getYoutubeChannelData>>): MediaCardData | null {
    const topVideo = [...youtubeData.recentVideos]
        .sort((left, right) => right.viewCount - left.viewCount)[0];

    if (!topVideo) {
        return null;
    }

    return {
        platform: 'youtube',
        id: topVideo.videoId,
        title: topVideo.title,
        coverUrl: topVideo.thumbnail || '/fotoPerfilSantiTosini.jpeg',
        reelUrl: `https://www.youtube.com/watch?v=${topVideo.videoId}`,
        metrics: {
            views: topVideo.viewCount,
            likes: topVideo.likeCount,
        },
        isLive: true,
    };
}

export async function getFeaturedMediaCards(): Promise<MediaCardData[]> {
    const [youtubeResult, instagramResult, tiktokResult] = await Promise.allSettled([
        getCachedYoutubeData().then((cachedData) => cachedData ?? getYoutubeChannelData()),
        getInstagramTopMediaCard(),
        getTiktokTopVideoCard(),
    ]);

    const cards: MediaCardData[] = [];

    if (youtubeResult.status === 'fulfilled') {
        const youtubeCard = getYoutubeTopMediaCard(youtubeResult.value);

        if (youtubeCard) {
            cards.push(youtubeCard);
        }
    }

    if (instagramResult.status === 'fulfilled' && instagramResult.value) {
        cards.push(instagramResult.value);
    }

    if (tiktokResult.status === 'fulfilled' && tiktokResult.value) {
        cards.push(tiktokResult.value);
    }

    return cards;
}