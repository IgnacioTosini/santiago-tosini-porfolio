import { Title } from '@/components/ui/Title/Title';
import { FaFire, FaGraduationCap, FaMapMarkerAlt } from 'react-icons/fa';
import { AboutCard } from '@/components/ui/About/AboutCard/AboutCard';
import './_about.scss';

export const About = () => {
    return (
        <div className="about" id="about">
            <div className="aboutContent">
                <Title title={'Sobre'} span={'mí'} />
                <p>Soy Santi, creador de contenido de Argentina enfocado en fútbol y entretenimiento.</p>
                <p>A través de entrevistas callejeras, desafíos y contenido cercano, conecto con una audiencia joven que vive el fútbol todos los días.</p>
                <p>Mi contenido se basa en autenticidad, humor y reacciones reales.</p>
            </div>
            <div className="aboutCards">
                <AboutCard icon={<FaMapMarkerAlt />} title="Mar del Plata, Argentina" />
                <AboutCard icon={<FaGraduationCap />} title="Estudiante de Comunicación" />
                <AboutCard icon={<FaFire />} title="Fútbol + Entretenimiento" />
            </div>
        </div>
    )
}
