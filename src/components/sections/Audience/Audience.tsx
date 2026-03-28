"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { AudienceCard } from '@/components/ui/Audience/AudienceCard/AudienceCard';
import { tiktokAgeData, tiktokGenderData, tiktokLocationData, tiktokTrafficData } from '@/mocks/tiktokData.mock';
import { instagramInterestData } from '@/mocks/instagramData.mock';
import { Title } from '@/components/ui/Title/Title';
import { useYoutubeAudienceData } from '@/hooks/useYoutubeAudienceData';
import { useTiktokAudienceData } from '@/hooks/useTiktokAudienceData';
import { useInstagramAudienceData } from '@/hooks/useInstagramAudienceData';
import { animateAudience } from '@/components/animations/gsap/audienceAnimations';
import './_audience.scss';

export const Audience = () => {
    const audienceRef = useRef<HTMLElement>(null);

    const {
        ageData: instagramAgeData,
        genderData: instagramGenderData,
        locationData: instagramLocationData,
        performanceData: instagramPerformanceData,
        source: instagramSource,
        loading: instagramLoading,
        error: instagramError,
    } = useInstagramAudienceData();

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
        performanceData: tiktokPerformanceData,
        loading: tiktokLoading,
        error: tiktokError,
    } = useTiktokAudienceData();

    const audienceAnimationSeed = [
        instagramAgeData.length,
        instagramGenderData.length,
        instagramLocationData.length,
        instagramPerformanceData.length,
        youtubeAgeData.length,
        youtubeGenderData.length,
        youtubeLocationData.length,
        youtubeTrafficSourceData.length,
        youtubePerformance28dData.length,
        tiktokPerformanceData.length,
        Number(instagramLoading),
        Number(tiktokLoading),
        Number(loading),
        Number(Boolean(instagramError)),
        Number(Boolean(tiktokError)),
        Number(Boolean(error)),
        Number(Boolean(message)),
    ].join('|');

    useEffect(() => {
        if (!audienceRef.current) return;

        const ctx = gsap.context(() => {
            animateAudience(audienceRef.current!);
        }, audienceRef.current);

        return () => ctx.revert();
    }, [audienceAnimationSeed]);

    return (
        <section ref={audienceRef} className="audience" id='sym:Audience'>
            <section className="audienceContainer" id='instagram'>
                <Title title={'Ins'} span={'tagram'} />
                <p>Quiénes miran e interactúan con mi contenido.</p>
                {instagramLoading && <p>Cargando métricas reales de Instagram...</p>}
                {instagramError && <p>No se pudieron cargar métricas en vivo. Mostrando el último estado disponible.</p>}
                <div className="audienceCards">
                    <AudienceCard title={'Distribución por Edad'} subtitle={instagramSource === 'live' ? 'Instagram, últimos 90 días' : 'Instagram, estimado'} data={instagramAgeData} />
                    <AudienceCard title={'Porcentaje por Sexo'} subtitle={instagramSource === 'live' ? 'Audiencia Instagram, últimos 90 días' : 'Audiencia Instagram, estimado'} data={instagramGenderData} />
                    <AudienceCard title={'Desde Dónde me ven (País)'} subtitle={instagramSource === 'live' ? 'Top países, últimos 90 días' : 'Top países, estimado'} data={instagramLocationData} />
                    <AudienceCard title={'Intereses'} subtitle={'Temáticas principales, estimado'} data={instagramInterestData} />
                    <AudienceCard title={'Estado de la Cuenta'} subtitle={'Estadísticas totales en vivo'} data={instagramPerformanceData} valueType={'number'} />
                </div>
            </section>
            <section className="audienceContainer" id='tiktok'>
                <Title title={'Tik'} span={'Tok'} />
                <p>Quiénes miran e interactúan con mi contenido.</p>
                {tiktokLoading && <p>Cargando métricas reales de TikTok...</p>}
                {tiktokError && <p>No se pudieron cargar métricas en vivo. Mostrando el último estado disponible.</p>}
                <div className="audienceCards">
                    <AudienceCard title={'Distribución por Edad'} subtitle={'TikTok, estimado'} data={tiktokAgeData} />
                    <AudienceCard title={'Porcentaje por Sexo'} subtitle={'Audiencia TikTok, estimado'} data={tiktokGenderData} />
                    <AudienceCard title={'Desde Dónde me ven (País)'} subtitle={'Top países, estimado'} data={tiktokLocationData} />
                    <AudienceCard title={'Desde Dónde me ven (Tráfico)'} subtitle={'Fuentes de tráfico, estimado'} data={tiktokTrafficData} />
                    <AudienceCard title={'Estado de la Cuenta'} subtitle={'Estadísticas totales en vivo'} data={tiktokPerformanceData} valueType={'number'} />
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
        </section>
    );
};
