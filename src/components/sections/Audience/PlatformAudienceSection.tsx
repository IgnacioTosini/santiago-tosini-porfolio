import { AudienceCard } from '@/components/ui/Audience/AudienceCard/AudienceCard';
import { Title } from '@/components/ui/Title/Title';
import type { AudienceDatum } from '@/types/audience.types';

type AudienceCardConfig = {
    title: string;
    subtitle: string;
    data: AudienceDatum[];
    valueType?: 'percentage' | 'number';
};

type PlatformAudienceSectionProps = {
    id: string;
    title: string;
    span: string;
    loadingMessage?: string;
    errorMessage?: string;
    infoMessage?: string | null;
    isLoading?: boolean;
    error?: string | null;
    cards: AudienceCardConfig[];
};

export function PlatformAudienceSection({
    id,
    title,
    span,
    loadingMessage,
    errorMessage,
    infoMessage,
    isLoading = false,
    error = null,
    cards,
}: PlatformAudienceSectionProps) {
    return (
        <section className="audienceContainer" id={id}>
            <Title title={title} span={span} />
            <p>Quiénes miran e interactúan con mi contenido.</p>
            {isLoading && loadingMessage && <p>{loadingMessage}</p>}
            {error && errorMessage && <p>{errorMessage}</p>}
            {!error && infoMessage && <p>{infoMessage}</p>}
            <div className="audienceCards">
                {cards.map((card) => (
                    <AudienceCard
                        key={`${id}-${card.title}`}
                        title={card.title}
                        subtitle={card.subtitle}
                        data={card.data}
                        valueType={card.valueType}
                    />
                ))}
            </div>
        </section>
    );
}