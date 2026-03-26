'use client';

import { Title } from '@/components/ui/Title/Title';
import { NumbersCard } from '@/components/ui/Numbers/NumbersCard/NumbersCard';
import { IoLogoTiktok } from 'react-icons/io5';
import { IoLogoInstagram, IoLogoYoutube } from 'react-icons/io';
import { useYoutubeData } from '@/hooks/useYoutubeData';
import './_numbers.scss';

export const Numbers = () => {
    const { subscriberCount } = useYoutubeData();
    const youtubeTitle = subscriberCount > 0
        ? (subscriberCount >= 1000
            ? `+${(subscriberCount / 1000).toFixed(0)}k`
            : `+${subscriberCount}`)
        : '+425k';

    return (
        <div className='numbers'>
            <Title title="Mis redes" span="sociales" />
            <div className="numbersCards">
                <NumbersCard icon={<IoLogoInstagram />} value="Instagram" title="+105K" label="Seguidores" href='/#instagram' />
                <NumbersCard icon={<IoLogoTiktok />} value="TikTok" title="+200k" label="Seguidores" href='/#tiktok' />
                <NumbersCard
                    icon={<IoLogoYoutube />}
                    value="YouTube"
                    title={youtubeTitle}
                    label="Suscriptores"
                    href='/#youtube'
                />
            </div>
        </div>
    )
}
