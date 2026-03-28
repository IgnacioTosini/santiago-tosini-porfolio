import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ease = 'power4.out';

export function animateService(container: HTMLElement): void {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const trigger = container.querySelector<HTMLElement>('#sym\\:Service') ?? container;

    const title = container.querySelector<HTMLElement>('#sym\\:Service .title h1');
    const cards = Array.from(container.querySelectorAll<HTMLElement>('#sym\\:Service .serviceCard'));
    const icons = Array.from(container.querySelectorAll<HTMLElement>('#sym\\:Service .serviceCard svg'));
    const cardTitles = Array.from(container.querySelectorAll<HTMLElement>('#sym\\:Service .serviceCardTitle'));
    const cardDescriptions = Array.from(container.querySelectorAll<HTMLElement>('#sym\\:Service .serviceCardDescription'));
    const description = container.querySelector<HTMLElement>('#sym\\:Service .serviceDescription');

    const all = [title, description, ...cards, ...icons, ...cardTitles, ...cardDescriptions].filter(
        (el): el is HTMLElement => !!el,
    );

    if (prefersReducedMotion) {
        gsap.set(all, { clearProps: 'all' });
        return;
    }

    gsap.set(container, { perspective: 1200 });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
        },
        defaults: { ease },
    });

    if (title) {
        tl.from(title, {
            autoAlpha: 0,
            y: 34,
            scale: 0.96,
            transformOrigin: 'left center',
            duration: 0.8,
        });
    }

    if (cards.length > 0) {
        tl.from(
            cards,
            {
                autoAlpha: 0,
                y: 36,
                rotateX: -10,
                scale: 0.96,
                transformOrigin: 'center bottom',
                duration: 0.72,
                stagger: 0.12,
            },
            '-=0.4',
        );
    }

    if (icons.length > 0) {
        tl.from(
            icons,
            {
                autoAlpha: 0,
                scale: 0.68,
                rotate: -14,
                transformOrigin: 'center center',
                duration: 0.46,
                ease: 'back.out(1.8)',
                stagger: 0.08,
            },
            '-=0.54',
        );
    }

    if (cardTitles.length > 0) {
        tl.from(
            cardTitles,
            {
                autoAlpha: 0,
                y: 12,
                duration: 0.4,
                stagger: 0.08,
            },
            '-=0.38',
        );
    }

    if (cardDescriptions.length > 0) {
        tl.from(
            cardDescriptions,
            {
                autoAlpha: 0,
                y: 10,
                duration: 0.38,
                stagger: 0.08,
            },
            '-=0.3',
        );
    }

    if (description) {
        tl.from(
            description,
            {
                autoAlpha: 0,
                y: 18,
                duration: 0.52,
            },
            '-=0.14',
        );
    }

    const cardsGrid = container.querySelector<HTMLElement>('#sym\\:Service .serviceCards');
    if (cardsGrid) {
        gsap.to(cardsGrid, {
            y: 24,
            ease: 'none',
            scrollTrigger: {
                trigger,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            },
        });
    }
}
