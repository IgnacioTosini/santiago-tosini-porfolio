"use client";

import { AudienceCard } from '@/components/ui/Audience/AudienceCard/AudienceCard';
import { ageData } from '@/mocks/ageData.mock';
import { interestData } from '@/mocks/interestData.mock';
import { Title } from '@/components/ui/Title/Title';
import { useYoutubeAudienceData } from '@/hooks/useYoutubeAudienceData';
import { useTiktokAudienceData } from '@/hooks/useTiktokAudienceData';
import './_audience.scss';

export const Audience = () => {
    const {
        ageData: youtubeAgeData,
        genderData: youtubeGenderData,
        locationData: youtubeLocationData,
        trafficSourceData: youtubeTrafficSourceData,
        performance28dData: youtubePerformance28dData,
        loading,
        error,
        message,
    } = useYoutubeAudienceData();

    const {
        ageData: tiktokAgeData,
        genderData: tiktokGenderData,
        locationData: tiktokLocationData,
        trafficSourceData: tiktokTrafficSourceData,
        performanceData: tiktokPerformanceData,
        loading: tiktokLoading,
        error: tiktokError,
        message: tiktokMessage,
    } = useTiktokAudienceData();

    return (
        <div className="audience">
            <section className="audienceContainer" id='instagram'>
                <Title title={'Ins'} span={'tagram'} />
                <p>Quiénes miran e interactúan con mi contenido.</p>
                <div className="audienceCards">
                    <AudienceCard title={'Distribución por Edad'} subtitle={'Principalmente Argentina'} data={ageData} />
                    <AudienceCard title={'Intereses'} subtitle={'Qué les interesa'} data={interestData} />
                </div>
            </section>
            <section className="audienceContainer" id='tiktok'>
                <Title title={'Tik'} span={'Tok'} />
                <p>Quiénes miran e interactúan con mi contenido.</p>
                {tiktokLoading && <p>Cargando métricas reales de TikTok...</p>}
                {tiktokError && <p>No se pudieron cargar métricas en vivo. Mostrando el último estado disponible.</p>}
                {!tiktokError && tiktokMessage && <p>{tiktokMessage}</p>}
                <div className="audienceCards">
                    <AudienceCard title={'Distribución por Edad'} subtitle={'TikTok, estimado'} data={tiktokAgeData} />
                    <AudienceCard title={'Porcentaje por Sexo'} subtitle={'Audiencia TikTok'} data={tiktokGenderData} />
                    <AudienceCard title={'Desde Dónde me ven (País)'} subtitle={'Top países por visualizaciones'} data={tiktokLocationData} />
                    <AudienceCard title={'Desde Dónde me ven (Tráfico)'} subtitle={'Fuentes de tráfico principales'} data={tiktokTrafficSourceData} />
                    <AudienceCard title={'Estado de la Cuenta'} subtitle={'Estadísticas totales de la cuenta'} data={tiktokPerformanceData} valueType={'number'} />
                </div>
            </section>
            <section className="audienceContainer" id='youtube'>
                <Title title={'You'} span={'Tube'} />
                <p>Quiénes miran e interactúan con mi contenido.</p>
                {loading && <p>Cargando métricas reales de YouTube...</p>}
                {error && <p>No se pudieron cargar métricas en vivo. Mostrando el último estado disponible.</p>}
                {!error && message && <p>{message}</p>}
                <div className="audienceCards">
                    <AudienceCard title={'Distribución por Edad'} subtitle={'YouTube, 365 días'} data={youtubeAgeData} />
                    <AudienceCard title={'Porcentaje por Sexo'} subtitle={'Audiencia YouTube'} data={youtubeGenderData} />
                    <AudienceCard title={'Desde Dónde me ven (País)'} subtitle={'Top países por visualizaciones'} data={youtubeLocationData} />
                    <AudienceCard title={'Desde Dónde me ven (Tráfico)'} subtitle={'Fuentes de tráfico principales'} data={youtubeTrafficSourceData} />
                    <AudienceCard title={'Rendimiento Últimos 28 Días'} subtitle={'Valores reales de los últimos 28 días'} data={youtubePerformance28dData} valueType={'number'} />
                </div>
            </section>
        </div>
    );
};
