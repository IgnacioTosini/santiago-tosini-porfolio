import { Title } from '@/components/ui/Title/Title';
import { MediaCard } from '@/components/ui/Content/MediaCard/MediaCard';
import { getFeaturedMediaCards } from '@/lib/featured-media.service';
import { mediaCardsMock } from '@/mocks/mediaCards.mock';
import './_content.scss';

export const Content = async () => {
    let contentCards = mediaCardsMock();

    try {
        contentCards = mediaCardsMock(await getFeaturedMediaCards());
    } catch (error) {
        console.error('Failed to load YouTube cards for content section:', error);
    }

    return (
        <div className="content" id="content">
            <div className="contentContainer">
                <Title title="Contenido" span="destacado" />
                <p>Una selección de mis videos con mejor rendimiento y mayor interacción.</p>
                <div className="mediaCardsContainer">
                    {
                        contentCards.map(item => (
                            <MediaCard key={item.id} item={item} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
