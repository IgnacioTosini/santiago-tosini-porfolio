'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { IoPlayOutline } from 'react-icons/io5';
import Image from 'next/image';
import { IoLogoInstagram } from 'react-icons/io';
import { animateHeroEntrance, animateHeroParallax } from '@/components/animations/gsap/heroAnimations';
import { FootballDecor } from '@/components/decor/FootballDecor';
import './_hero.scss';

export const Hero = () => {
    const heroRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!heroRef.current) return;

        const ctx = gsap.context(() => {
            animateHeroEntrance(heroRef.current!);
            animateHeroParallax(heroRef.current!);
        }, heroRef.current);

        return () => ctx.revert();
    }, []);

    const smoothScroll = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href')?.substring(1);
        const targetElement = document.getElementById(targetId!);
        const isMobileViewport = window.innerWidth <= 768;
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: isMobileViewport ? 'start' : 'center' });
        }
    };
    return (
        <section ref={heroRef} className="hero" id="hero">
            <div className="heroContent">
                {<div className="footballDecorWrapper">
                    <FootballDecor />
                </div>}
                <div className="heroContentHeader">
                    <div className='heroTitleContainer'>
                        <span>—</span> <h1 className="heroTitle"> Creador de Contenido</h1>
                    </div>
                    <div className='heroSubtitleContainer'>
                        <p className="heroSubtitle">Santi Tosini — <span>Contenido de fútbol</span> que conecta con miles</p>
                    </div>
                    <p className='heroLead'>+100K seguidores • Reels virales • Contenido real en la calle</p>
                    <p className='heroDescription'>Creo contenido de fútbol que combina entretenimiento, espontaneidad e interacción con la audiencia.</p>
                    <div className='heroButtons'>
                        <Link href="#contact" className='heroButtonPrimary' onClick={smoothScroll}>
                            Trabajá conmigo
                        </Link>
                        <Link href="#content" className='heroButtonSecondary' onClick={smoothScroll}>
                            <IoPlayOutline /> Ver mi contenido
                        </Link>
                    </div>
                    <div className='numbersDetails'>
                        <div className='numberDetail'>
                            <h2 className='number heroStatValue'>+100K</h2>
                            <p className='label heroStatLabel'>Seguidores</p>
                        </div>
                        <div className='numberDetail'>
                            <h2 className='number heroStatValue'>+500K</h2>
                            <p className='label heroStatLabel'>Vistas mensuales</p>
                        </div>
                        <div className='numberDetail'>
                            <h2 className='number heroStatValue'>50K–300K</h2>
                            <p className='label heroStatLabel'>Views Promedio</p>
                        </div>
                    </div>
                </div>
                <div className="heroContentFooter">
                    <div className='imageContainer'>
                        <Image src="/fotoPerfilSantiTosini.jpeg" alt="Santi Tosini" width={400} height={650} className='heroImage' />
                        <div id='sym:instagramOverlay' className='instagramOverlay'>
                            <IoLogoInstagram className='icon' />
                            <div className='instagramDetails'>
                                <p className='username'>@santi.tosini</p>
                                <p className='followers'>+100K seguidores</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
