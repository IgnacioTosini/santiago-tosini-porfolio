"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Title } from '@/components/ui/Title/Title';
import { FaFire, FaGraduationCap, FaMapMarkerAlt } from 'react-icons/fa';
import { AboutCard } from '@/components/ui/About/AboutCard/AboutCard';
import { animateAbout } from '@/components/animations/gsap/aboutAnimations';
import './_about.scss';

export const About = () => {
    const aboutRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!aboutRef.current) return;

        const ctx = gsap.context(() => {
            animateAbout(aboutRef.current!);
        }, aboutRef.current);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={aboutRef} className="about" id="about">
            <div className="aboutContent" id="sym:About">
                <Title title={'Sobre'} span={'mí'} />
                <p>Me llamo Santi, tengo 25 años y soy creador de contenido en Argentina, enfocado en fútbol y entretenimiento.</p>
                <p>Disfruto conectar con mi audiencia y sacarles una sonrisa cada día con el contenido que comparto.</p>
            </div>
            <div className="aboutCards">
                <AboutCard icon={<FaMapMarkerAlt />} title="Mar del Plata, Argentina" />
                <AboutCard icon={<FaGraduationCap />} title="Licenciado en Comunicación Social" />
                <AboutCard icon={<FaFire />} title="Fútbol + Entretenimiento" />
            </div>
        </section>
    )
}
