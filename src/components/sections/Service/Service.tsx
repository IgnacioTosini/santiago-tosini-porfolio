"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Title } from '@/components/ui/Title/Title';
import { ServiceCard } from '@/components/ui/Service/ServiceCard/ServiceCard';
import { FaFilm } from 'react-icons/fa';
import { IoMdPhonePortrait } from 'react-icons/io';
import { IoCameraOutline } from 'react-icons/io5';
import { BsStars } from 'react-icons/bs';
import { animateService } from '@/components/animations/gsap/serviceAnimations';
import './_service.scss';

export const Service = () => {
    const serviceRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!serviceRef.current) return;

        const ctx = gsap.context(() => {
            animateService(serviceRef.current!);
        }, serviceRef.current);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={serviceRef} className="service" id='services'>
            <div className="serviceContainer" id='sym:Service'>
                <Title title={'Trabajá'} span={'conmigo'} />
                <div className="serviceCards">
                    <ServiceCard icon={<FaFilm />} title={'Reels Patrocinados'} description={'Tu marca integrada en contenido de alto rendimiento.'} />
                    <ServiceCard icon={<IoMdPhonePortrait />} title={'Instagram Stories'} description={'Promoción rápida, directa y de alta visibilidad.'} />
                    <ServiceCard icon={<IoCameraOutline />} title={'Cobertura de Eventos'} description={'Creación de contenido en vivo con interacción real.'} />
                    <ServiceCard icon={<BsStars />} title={'Integraciones de Marca'} description={'Product placement creativo y natural.'} />
                </div>

                <p className='serviceDescription'>Estoy abierto a trabajar con marcas que quieran conectar con una audiencia joven y futbolera.</p>
            </div>
        </section>
    )
}
