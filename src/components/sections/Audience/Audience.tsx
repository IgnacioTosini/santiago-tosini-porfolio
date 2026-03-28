"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { PlatformAudienceSection } from '@/components/sections/Audience/PlatformAudienceSection';
import { tiktokAgeData, tiktokGenderData, tiktokLocationData, tiktokTrafficData } from '@/mocks/tiktokData.mock';
import { instagramInterestData } from '@/mocks/instagramData.mock';
import { useYoutubeAudienceData } from '@/hooks/useYoutubeAudienceData';
import { useTiktokAudienceData } from '@/hooks/useTiktokAudienceData';
import { useInstagramAudienceData } from '@/hooks/useInstagramAudienceData';
import { animateAudience } from '@/components/animations/gsap/audienceAnimations';
import type { AudienceDatum } from '@/types/audience.types';
import './_audience.scss';

type AudienceCardConfig = {
    title: string;
    subtitle: string;
    data: AudienceDatum[];
    valueType?: 'percentage' | 'number';
};

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
        loading: youtubeLoading,
        error: youtubeError,
        message: youtubeMessage,
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
        Number(youtubeLoading),
        Number(Boolean(instagramError)),
        Number(Boolean(tiktokError)),
        Number(Boolean(youtubeError)),
        Number(Boolean(youtubeMessage)),
    ].join('|');

    const instagramCards: AudienceCardConfig[] = [
        {
            title: 'Distribución por Edad',
            subtitle: instagramSource === 'live' ? 'Instagram, últimos 90 días' : 'Instagram, estimado',
            data: instagramAgeData,
        },
        {
            title: 'Porcentaje por Sexo',
            subtitle: instagramSource === 'live' ? 'Audiencia Instagram, últimos 90 días' : 'Audiencia Instagram, estimado',
            data: instagramGenderData,
        },
        {
            title: 'Desde Dónde me ven (País)',
            subtitle: instagramSource === 'live' ? 'Top países, últimos 90 días' : 'Top países, estimado',
            data: instagramLocationData,
        },
        {
            title: 'Intereses',
            subtitle: 'Temáticas principales, estimado',
            data: instagramInterestData,
        },
        {
            title: 'Estado de la Cuenta',
            subtitle: 'Estadísticas totales en vivo',
            data: instagramPerformanceData,
            valueType: 'number',
        },
    ];

    const tiktokCards: AudienceCardConfig[] = [
        {
            title: 'Distribución por Edad',
            subtitle: 'TikTok, estimado',
            data: tiktokAgeData,
        },
        {
            title: 'Porcentaje por Sexo',
            subtitle: 'Audiencia TikTok, estimado',
            data: tiktokGenderData,
        },
        {
            title: 'Desde Dónde me ven (País)',
            subtitle: 'Top países, estimado',
            data: tiktokLocationData,
        },
        {
            title: 'Desde Dónde me ven (Tráfico)',
            subtitle: 'Fuentes de tráfico, estimado',
            data: tiktokTrafficData,
        },
        {
            title: 'Estado de la Cuenta',
            subtitle: 'Estadísticas totales en vivo',
            data: tiktokPerformanceData,
            valueType: 'number',
        },
    ];

    const youtubeCards: AudienceCardConfig[] = [
        {
            title: 'Distribución por Edad',
            subtitle: 'YouTube, 365 días',
            data: youtubeAgeData,
        },
        {
            title: 'Porcentaje por Sexo',
            subtitle: 'Audiencia YouTube',
            data: youtubeGenderData,
        },
        {
            title: 'Desde Dónde me ven (País)',
            subtitle: 'Top países por visualizaciones',
            data: youtubeLocationData,
        },
        {
            title: 'Desde Dónde me ven (Tráfico)',
            subtitle: 'Fuentes de tráfico principales',
            data: youtubeTrafficSourceData,
        },
        {
            title: 'Rendimiento Últimos 28 Días',
            subtitle: 'Valores reales de los últimos 28 días',
            data: youtubePerformance28dData,
            valueType: 'number',
        },
    ];

    useEffect(() => {
        if (!audienceRef.current) return;

        const ctx = gsap.context(() => {
            animateAudience(audienceRef.current!);
        }, audienceRef.current);

        return () => ctx.revert();
    }, [audienceAnimationSeed]);

    return (
        <section ref={audienceRef} className="audience" id='social'>
            <PlatformAudienceSection
                id='instagram'
                title='Ins'
                span='tagram'
                isLoading={instagramLoading}
                error={instagramError}
                loadingMessage='Cargando métricas reales de Instagram...'
                errorMessage='No se pudieron cargar métricas en vivo. Mostrando el último estado disponible.'
                cards={instagramCards}
            />
            <PlatformAudienceSection
                id='tiktok'
                title='Tik'
                span='Tok'
                isLoading={tiktokLoading}
                error={tiktokError}
                loadingMessage='Cargando métricas reales de TikTok...'
                errorMessage='No se pudieron cargar métricas en vivo. Mostrando el último estado disponible.'
                cards={tiktokCards}
            />
            <PlatformAudienceSection
                id='youtube'
                title='You'
                span='Tube'
                isLoading={youtubeLoading}
                error={youtubeError}
                infoMessage={youtubeMessage}
                loadingMessage='Cargando métricas reales de YouTube...'
                errorMessage='No se pudieron cargar métricas en vivo. Mostrando el último estado disponible.'
                cards={youtubeCards}
            />
        </section>
    );
};
