'use client';

import { useRef } from 'react';
import { Title } from '@/components/ui/Title/Title';
import { IoLogoTiktok, IoMail } from 'react-icons/io5';
import { IoLogoInstagram, IoLogoYoutube } from 'react-icons/io';
import { useGsapAnimation } from '@/hooks/useGsapAnimation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './_contact.scss';

export const Contact = () => {
    const contactRef = useRef<HTMLElement>(null);
    const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

    const handleEmailClick = async () => {
        if (!contactEmail) return;

        const subject = 'Consulta comercial - Santiago Tosini';
        const body = `Hola Santiago, Quiero hablar sobre una propuesta de colaboración. ¡Gracias!`;
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contactEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        const mailWindow = window.open(gmailUrl, '_blank', 'noopener,noreferrer');

        if (mailWindow) {
            mailWindow.opener = null;
        }

        try {
            await navigator.clipboard.writeText(contactEmail);
            toast.success('Gmail abierto y email copiado');
        } catch {
            toast.info(`Escribinos a ${contactEmail}`);
        }
    };

    useGsapAnimation(contactRef, async () => {
        const { animateContact } = await import('@/components/animations/gsap/contactAnimations');
        return animateContact;
    }, []);

    return (
        <section ref={contactRef} className="contact" id="contact">
            <div className="contactContainer" id='sym:Contact'>
                <Title title={'Creemos algo'} span={'juntos'} />
                <p className='contactDescription'>Si tu marca quiere llegar a una audiencia apasionada por el fútbol, hablemos.</p>
                <div className="contactButtons">
                    <button
                        className='contactButton'
                        disabled={!contactEmail}
                        onClick={handleEmailClick}
                        title={contactEmail ? `Abrir Gmail con asunto prearmado y copiar ${contactEmail}` : 'Configurá NEXT_PUBLIC_CONTACT_EMAIL para habilitar este botón'}
                    >
                        <IoMail />
                        <span>Email</span>
                    </button>
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
            <ToastContainer position="bottom-center" autoClose={2500} hideProgressBar theme="dark" />
        </section>
    )
}
