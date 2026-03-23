import { AudienceCard } from '@/components/ui/Audience/AudienceCard/AudienceCard';
import { ageData } from '@/mocks/ageData.mock';
import { interestData } from '@/mocks/interestData.mock';
import { Title } from '@/components/ui/Title/Title';
import './_audience.scss';

export const Audience = () => {
    return (
        <div className="audience">
            <section className="audienceContainer">
                <Title title={'Mi'} span={'audiencia'} />
                <p>Quiénes miran e interactúan con mi contenido.</p>
                <div className="audienceCards">
                    <AudienceCard title={'Distribución por Edad'} subtitle={'Principalmente Argentina'} data={ageData} />
                    <AudienceCard title={'Intereses'} subtitle={'Qué les interesa'} data={interestData} />
                </div>
            </section>
        </div>
    );
};
