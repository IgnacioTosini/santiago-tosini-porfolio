import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ease = 'power4.out';

export function animateContent(container: HTMLElement): void {
    gsap.registerPlugin(ScrollTrigger);

    const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const sectionStart = isMobile ? 'top 68%' : 'top 80%';
    const parallaxStart = isMobile ? 'top 90%' : 'top bottom';

    const title = container.querySelector<HTMLElement>('.title h1');
    const description = container.querySelector<HTMLElement>('.contentContainer > p');
    const cards = Array.from(container.querySelectorAll<HTMLElement>('.mediaCardsContainer .mediaCard'));
    const plays = Array.from(container.querySelectorAll<HTMLElement>('.mediaCardPlay'));
    const metrics = Array.from(container.querySelectorAll<HTMLElement>('.mediaCardMetrics .metric'));

    const targets = [title, description, ...cards, ...plays, ...metrics].filter(
        (el): el is HTMLElement => !!el,
    );

    if (pref) {
        gsap.set(targets, { clearProps: 'all' });
        return;
    }

    gsap.set(container, { perspective: 1200 });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            start: sectionStart,
            toggleActions: 'play none none none',
        },
        defaults: { ease },
    });

    if (title) {
        tl.from(title, {
            autoAlpha: 0,
            y: 36,
            scale: 0.96,
            transformOrigin: 'left center',
            duration: 0.82,
        });
    }

    if (description) {
        tl.from(
            description,
            {
                autoAlpha: 0,
                y: 28,
                duration: 0.62,
            },
            '-=0.5',
        );
    }

    if (cards.length > 0) {
        tl.from(
            cards,
            {
                autoAlpha: 0,
                y: 44,
                rotateX: -10,
                scale: 0.95,
                transformOrigin: 'center bottom',
                duration: 0.8,
                stagger: 0.12,
            },
            '-=0.36',
        );
    }

    if (plays.length > 0) {
        tl.from(
            plays,
            {
                autoAlpha: 0,
                scale: 0.72,
                duration: 0.42,
                ease: 'back.out(1.6)',
                stagger: 0.08,
            },
            '-=0.48',
        );
    }

    if (metrics.length > 0) {
        tl.from(
            metrics,
            {
                autoAlpha: 0,
                y: 10,
                duration: 0.42,
                stagger: 0.05,
            },
            '-=0.35',
        );
    }

    const cardsGrid = container.querySelector<HTMLElement>('.mediaCardsContainer');
    if (cardsGrid) {
        gsap.to(cardsGrid, {
            y: 28,
            ease: 'none',
            scrollTrigger: {
                trigger: container,
                start: parallaxStart,
                end: 'bottom top',
                scrub: true,
            },
        });
    }
}
