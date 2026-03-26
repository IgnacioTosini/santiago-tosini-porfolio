'use client';

import { Title } from '@/components/ui/Title/Title';
import { IoLogoTiktok, IoMail } from 'react-icons/io5';
import { IoLogoInstagram, IoLogoYoutube } from 'react-icons/io';
import './_contact.scss';

export const Contact = () => {
    return (
        <div className="contact" id="contact">
            <div className="contactContainer">
                <Title title={'Creemos algo'} span={'juntos'} />
                <p className='contactDescription'>Si tu marca quiere llegar a una audiencia apasionada por el fútbol, hablemos.</p>
                <div className="contactButtons">
                    <button className='contactButton' onClick={() => window.location.href = 'mailto:example@example.com'}><IoMail /> <span>Email</span></button>
                    <button className='contactButton contactInstagram' onClick={() => window.open('https://www.instagram.com/santii_tosini/', '_blank')}>
                        <IoLogoInstagram />
                        Instagram
                    </button>
                    <button className='contactButton contactTiktok' onClick={() => window.open('https://www.tiktok.com/@santiagotosini?lang=es-419', '_blank')}>
                        <IoLogoTiktok />
                        TikTok
                    </button>
                    <button className='contactButton contactYoutube' onClick={() => window.open('https://www.youtube.com/@santiagotosini', '_blank')}>
                        <IoLogoYoutube />
                        YouTube
                    </button>
                </div>
            </div>
        </div>
    )
}
