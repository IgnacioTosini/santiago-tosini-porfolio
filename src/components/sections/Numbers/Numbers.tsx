'use client';

import { Title } from '@/components/ui/Title/Title';
import { NumbersCard } from '@/components/ui/Numbers/NumbersCard/NumbersCard';
import { IoLogoTiktok } from 'react-icons/io5';
import { IoLogoInstagram, IoLogoYoutube } from 'react-icons/io';
import { useYoutubeData } from '@/hooks/useYoutubeData';
import { useTiktokAudienceData } from '@/hooks/useTiktokAudienceData';
import { useInstagramAudienceData } from '@/hooks/useInstagramAudienceData';
import './_numbers.scss';

export const Numbers = () => {
    const { subscriberCount } = useYoutubeData();
    const { performanceData: tiktokPerformanceData } = useTiktokAudienceData();
    const { performanceData: instagramPerformanceData } = useInstagramAudienceData();
    const youtubeTitle = subscriberCount > 0
        ? (subscriberCount >= 1000
            ? `+${(subscriberCount / 1000).toFixed(0)}k`
            : `+${subscriberCount}`)
        : '+425k';
    const tiktokFollowers = tiktokPerformanceData && tiktokPerformanceData.length > 0
        ? `${(tiktokPerformanceData[0].value / 1000).toFixed(0)}k`
        : '200k'; // Valor por defecto si no se pueden cargar los datos de TikTok

    const instagramFollowers = instagramPerformanceData && instagramPerformanceData.length > 0
        ? `${(instagramPerformanceData[0].value / 1000).toFixed(0)}k`
        : '105k'; // Valor por defecto si no se pueden cargar los datos de Instagram

    return (
        <div className='numbers'>
            <Title title="Mis redes" span="sociales" />
            <div className="numbersCards">
                <NumbersCard icon={<IoLogoInstagram />} value="Instagram" title={instagramFollowers ? `+${instagramFollowers}` : '+105k'} label="Seguidores" href='/#instagram' />
                <NumbersCard icon={<IoLogoTiktok />} value="TikTok" title={tiktokFollowers ? `+${tiktokFollowers}` : '+200k'} label="Seguidores" href='/#tiktok' />
                <NumbersCard
                    icon={<IoLogoYoutube />}
                    value="YouTube"
                    title={youtubeTitle}
                    label="Suscriptores"
                    href='/#youtube'
                />
            </div>
            <p>Todos los datos son aproximados y pueden variar. El valor de la edad de la audiencia es estimado. Y el mínimo de edad es 13 años. Por favor, verifica los datos directamente en las plataformas correspondientes.</p>
        </div>
    )
}
