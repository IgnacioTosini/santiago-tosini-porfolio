import { MediaCardData, SocialPlatform } from "@/types/media.types";

const PLATFORM_ORDER: SocialPlatform[] = ["youtube", "tiktok", "instagram"];

const fallbackMediaCards: MediaCardData[] = [
    {
        platform: "youtube",
        id: "youtube-fallback",
        title: "YouTube destacado",
        coverUrl: "/fotoPerfilSantiTosini.jpeg",
        reelUrl: "https://www.youtube.com/@santiagotosini",
        metrics: {
            views: 150000,
            likes: 7200,
        },
        isLive: true,
    },
    {
        platform: "tiktok",
        id: "tiktok-fallback",
        title: "TikTok destacado",
        coverUrl: "/fotoPerfilSantiTosini.jpeg",
        reelUrl: "https://www.tiktok.com/@santiagotosini?lang=es-419",
        metrics: {
            views: 98400,
            likes: 5100,
        },
    },
    {
        platform: "instagram",
        id: "instagram-fallback",
        title: "Instagram destacado",
        coverUrl: "/fotoPerfilSantiTosini.jpeg",
        reelUrl: "https://www.instagram.com/santii_tosini/",
        metrics: {
            views: 207000,
            likes: 12400,
        },
    },
];

export function mediaCardsMock(
    cards: MediaCardData[] = [],
): MediaCardData[] {
    const topCardByPlatform = new Map<SocialPlatform, MediaCardData>();

    for (const card of cards) {
        const currentTopCard = topCardByPlatform.get(card.platform);

        if (!currentTopCard || card.metrics.views > currentTopCard.metrics.views) {
            topCardByPlatform.set(card.platform, card);
        }
    }

    return PLATFORM_ORDER.map((platform) => {
        return topCardByPlatform.get(platform)
            ?? fallbackMediaCards.find((card) => card.platform === platform);
    }).filter((card): card is MediaCardData => Boolean(card));
}
