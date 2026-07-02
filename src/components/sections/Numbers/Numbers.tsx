'use client';

import { useRef } from 'react';
import { Title } from '@/components/ui/Title/Title';
import { NumbersCard } from '@/components/ui/Numbers/NumbersCard/NumbersCard';
import { IoLogoTiktok } from 'react-icons/io5';
import { IoLogoInstagram, IoLogoYoutube } from 'react-icons/io';
import { useYoutubeData } from '@/hooks/useYoutubeData';
import { useTiktokAudienceData } from '@/hooks/useTiktokAudienceData';
import { instagramFollowers } from '@/mocks/instagramData.mock';
import { useGsapAnimation } from '@/hooks/useGsapAnimation';
import './_numbers.scss';

export const Numbers = () => {
    const numbersRef = useRef<HTMLElement>(null);

    useGsapAnimation(numbersRef, async () => {
        const { animateNumbers } = await import('@/components/animations/gsap/numbersAnimations');
        return animateNumbers;
    }, []);

    const { subscriberCount } = useYoutubeData();
    const { performanceData: tiktokPerformanceData } = useTiktokAudienceData();
    const youtubeTitle = subscriberCount > 0
        ? (subscriberCount >= 1000
            ? `+${(subscriberCount / 1000).toFixed(0)}k`
            : `+${subscriberCount}`)
        : '+425k';
    const tiktokFollowers = tiktokPerformanceData && tiktokPerformanceData.length > 0
        ? `+${(tiktokPerformanceData[0].value / 1000).toFixed(0)}k`
        : '+200k'; // Valor por defecto si no se pueden cargar los datos de TikTok

    return (
        <section ref={numbersRef} className='numbers' id='social'>
            <Title title="Mis redes" span="sociales" />
            <div className="numbersCards">
                <NumbersCard icon={<IoLogoInstagram />} value="Instagram" title={instagramFollowers} label="Seguidores" href='/#instagram' />
                <NumbersCard icon={<IoLogoTiktok />} value="TikTok" title={tiktokFollowers} label="Seguidores" href='/#tiktok' />
                <NumbersCard
                    icon={<IoLogoYoutube />}
                    value="YouTube"
                    title={youtubeTitle}
                    label="Suscriptores"
                    href='/#youtube'
                />
            </div>
            <p className='numbersLegal'>*Todos los datos son aproximados y pueden variar. El valor de la edad de la audiencia es estimado, el mínimo de edad es 13 años. Por favor, verifica los datos directamente en las plataformas correspondientes.*</p>
        </section>
    )
}
