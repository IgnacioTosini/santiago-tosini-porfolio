import { MediaCardData } from "@/types/media.types";
import Image from "next/image";
import "./_mediaCard.scss";

type Props = {
    item: MediaCardData;
};

export function MediaCard({ item }: Props) {
    const cardContent = (
        <>
            <div className="mediaCardVisual">
                <Image src={item.coverUrl} width={360} height={560} alt={item.title} className="mediaCardImage" />
                <div className="mediaCardOverlay" />

                <span className="mediaCardPlay" aria-hidden="true">
                    ▶
                </span>

                <div className="mediaCardMetrics">
                    <span className="metric">👁 {formatCompact(item.metrics.views)}</span>
                    <span className="metric">♡ {formatCompact(item.metrics.likes)}</span>
                </div>
            </div>

            <div className="mediaCardFooter">
                <h3>{item.title}</h3>
            </div>
        </>
    );

    return (
        <article className="mediaCard">
            {item.reelUrl ? (
                <a
                    className="mediaCardLink"
                    href={item.reelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Abrir reel: ${item.title}`}
                >
                    {cardContent}
                </a>
            ) : (
                cardContent
            )}
        </article>
    );
}

function formatCompact(value: number) {
    return new Intl.NumberFormat("es-AR", { notation: "compact" }).format(value);
}