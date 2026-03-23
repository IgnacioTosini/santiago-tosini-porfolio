import { Title } from '@/components/ui/Title/Title';
import { mediaCardsMock } from '@/mocks/mediaCards.mock';
import { MediaCard } from '@/components/ui/Content/MediaCard/MediaCard';
import './_content.scss';

export const Content = () => {
    return (
        <div className="content" id="content">
            <div className="contentContainer">

                <Title title="Contenido" span="destacado" />
                <p>Una selección de mis videos con mejor rendimiento y mayor interacción.</p>
                <div className="mediaCardsContainer">
                    {
                        mediaCardsMock.map(item => (
                            <MediaCard key={item.id} item={item} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
