"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Title } from '@/components/ui/Title/Title';
import { sponsorsData } from '@/mocks/sponsorsData.mock';
import { SponsorCard } from '@/components/ui/Sponsor/SponsorCard/SponsorCard';
import { animateSponsors } from '@/components/animations/gsap/sponsorsAnimations';
import './_sponsors.scss';

export const Sponsors = () => {
    const sponsorsRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sponsorsRef.current) return;

        const ctx = gsap.context(() => {
            animateSponsors(sponsorsRef.current!);
        }, sponsorsRef.current);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sponsorsRef} className="sponsors" id="sponsors">
            <Title title="Spon" span={'sors'} />
            <div className="sponsorsContainer">
                {
                    sponsorsData.map((sponsor, index) => (
                        <SponsorCard key={`${sponsor.name}-${index}`} sponsor={sponsor} />
                    ))
                }
            </div>
        </section>
    )
}
