"use client";

import { useRef } from 'react';
import { Title } from '@/components/ui/Title/Title';
import { sponsorsData } from '@/mocks/sponsorsData.mock';
import { SponsorCard } from '@/components/ui/Sponsor/SponsorCard/SponsorCard';
import { useGsapAnimation } from '@/hooks/useGsapAnimation';
import './_sponsors.scss';

export const Sponsors = () => {
    const sponsorsRef = useRef<HTMLElement>(null);

    useGsapAnimation(sponsorsRef, async () => {
        const { animateSponsors } = await import('@/components/animations/gsap/sponsorsAnimations');
        return animateSponsors;
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
