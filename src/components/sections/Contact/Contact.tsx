'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Title } from '@/components/ui/Title/Title';
import { IoLogoTiktok, IoMail } from 'react-icons/io5';
import { IoLogoInstagram, IoLogoYoutube } from 'react-icons/io';
import { animateContact } from '@/components/animations/gsap/contactAnimations';
import './_contact.scss';

export const Contact = () => {
    const contactRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!contactRef.current) return;

        const ctx = gsap.context(() => {
            animateContact(contactRef.current!);
        }, contactRef.current);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={contactRef} className="contact" id="contact">
            <div className="contactContainer" id='sym:Contact'>
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
        </section>
    )
}
