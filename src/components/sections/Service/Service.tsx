import { Title } from '@/components/ui/Title/Title';
import { ServiceCard } from '@/components/ui/Service/ServiceCard/ServiceCard';
import { FaFilm } from 'react-icons/fa';
import { IoMdPhonePortrait } from 'react-icons/io';
import { IoCameraOutline } from 'react-icons/io5';
import { BsStars } from 'react-icons/bs';
import './_service.scss';

export const Service = () => {
    return (
        <div className="service" id='services'>
            <div className="serviceContainer">
                <Title title={'Trabajá'} span={'conmigo'} />
                <div className="serviceCards">
                    <ServiceCard icon={<FaFilm />} title={'Reels Patrocinados'} description={'Tu marca integrada en contenido de alto rendimiento.'} />
                    <ServiceCard icon={<IoMdPhonePortrait />} title={'Instagram Stories'} description={'Promoción rápida, directa y de alta visibilidad.'} />
                    <ServiceCard icon={<IoCameraOutline />} title={'Cobertura de Eventos'} description={'Creación de contenido en vivo con interacción real.'} />
                    <ServiceCard icon={<BsStars />} title={'Integraciones de Marca'} description={'Product placement creativo y natural.'} />
                </div>

                <p className='serviceDescription'>Estoy abierto a trabajar con marcas que quieran conectar con una audiencia joven y futbolera.</p>
            </div>
        </div>
    )
}
