import { MediaCardData } from "@/types/media.types";

export const mediaCardsMock: MediaCardData[] = [
    {
        id: "1",
        title: "Mejores goles - Reacciones de hinchas",
        coverUrl: "/heroImage.jpg",
        reelUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        metrics: {
            views: 150000,
            likes: 7200,
        },
        isLive: true,
    },
    {
        id: "2",
        title: "Desafios en la calle - Pases imposibles",
        coverUrl: "/heroImage.jpg",
        reelUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        metrics: {
            views: 98400,
            likes: 5100,
        },
    },
    {
        id: "3",
        title: "Canios y gambetas - Especial fin de semana",
        coverUrl: "/heroImage.jpg",
        reelUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        metrics: {
            views: 207000,
            likes: 12400,
        },
    },
];
