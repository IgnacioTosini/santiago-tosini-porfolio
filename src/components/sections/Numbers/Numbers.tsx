import { Title } from '@/components/ui/Title/Title';
import { NumbersCard } from '@/components/ui/Numbers/NumbersCard/NumbersCard';
import { IoPeople } from 'react-icons/io5';
import { FaEye } from 'react-icons/fa';
import { FaArrowTrendUp } from 'react-icons/fa6';
import { ImStatsBars } from 'react-icons/im';
import './_numbers.scss';

export const Numbers = () => {
    return (
        <div className='numbers'>
            <Title title="En" span="números" />
            <div className="numbersCards">
                <NumbersCard icon={<IoPeople />} value="100K+" title="Seguidores" label="Comunidad en crecimiento en Instagram" />
                <NumbersCard icon={<FaEye />} value="50K–300K" title="Views / Reel" label="Rendimiento viral constante" />
                <NumbersCard icon={<FaArrowTrendUp />} value="Alto" title="Engagement" label="Formatos interactivos que generan conversación" />
                <NumbersCard icon={<ImStatsBars />} value="500K+" title="Alcance Mensual" label="Alcance orgánico en todo el contenido" />
            </div>
        </div>
    )
}
