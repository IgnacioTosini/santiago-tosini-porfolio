'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FaYoutube } from 'react-icons/fa';
import { IoArrowForwardOutline } from 'react-icons/io5';
import { Title } from '@/components/ui/Title/Title';
import { animateTimeline } from '@/components/animations/gsap/timelineAnimations';
import './_timeline.scss';

const timelineMoments = [
    {
        year: '2022',
        title: 'El inicio del camino',
        description: 'En marzo de 2022 realicé mi primera reacción de fútbol, viendo Aldosivi - Tigre',
        href: 'https://www.youtube.com/watch?v=5yF4RShEgjo&t=33s',
    },
    {
        year: '2022',
        title: 'Argentina campeona del mundo',
        description: 'A finales de 2022 reaccioné por primera vez a un mundial, siendo este muy especial 🏆 ',
        href: 'https://www.youtube.com/watch?v=44HxbA9kzLY',
    },
    {
        year: '2024',
        title: 'Primer reacción dentro de una cancha',
        description: 'Tuve la posibilidad de traspasar la pantalla y reaccionar en vivo a un partido de Aldosivi',
        href: 'https://youtu.be/JWkiQM4qM_0?si=S26mOSyOI8CR68zu&t=1',
    },
    {
        year: '2024',
        title: 'Argentina campeona Copa América',
        description: 'Argentina volvía a coronarse y volvíamos a estar presentes⚽',
        href: 'https://www.youtube.com/watch?v=mccC0gCS-h8',
    },
    {
        year: '2025',
        title: 'Mi propio stream de fútbol',
        description: '"Gol sin que pique" se hizo realidad, junto a mi colega Luca Nivio, tuvimos nuestro stream de fútbol',
        href: 'https://www.youtube.com/watch?v=iDb41mKhSYU&t=2s',
    },
];

export const Timeline = () => {
    const timelineRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!timelineRef.current) return;

        const ctx = gsap.context(() => {
            animateTimeline(timelineRef.current!);
        }, timelineRef.current);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={timelineRef} className="timeline" id="journey">
            <div className="timelineIntro">
                <Title title={'Mi '} span={'camino'} />
                <p>
                    Un recorrido desde 2022 hasta hoy, con algunos hitos que muestran cómo fue creciendo el proyecto.
                </p>
                <span className="timelineHint">Deslizá para recorrer los años →</span>
            </div>

            <div className="timelineList">
                <span className="timelineTrack" aria-hidden="true" />
                {timelineMoments.map((moment, index) => (
                    <article className="timelineItem" key={index}>
                        <span className="timelineYear">{moment.year}</span>
                        <span className="timelineMarker" aria-hidden="true" />
                        <a
                            className="timelineCard"
                            href={moment.href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Abrir momento ${moment.year}: ${moment.title} en YouTube`}
                        >
                            <span className="timelineBadge">
                                <FaYoutube /> YouTube
                            </span>
                            <h3>{moment.title}</h3>
                            <p>{moment.description}</p>
                            <span className="timelineAction">
                                Ver momento <IoArrowForwardOutline />
                            </span>
                        </a>
                    </article>
                ))}
            </div>
        </section>
    );
};
