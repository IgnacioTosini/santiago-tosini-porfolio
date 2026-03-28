import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ease = 'power4.out';

export function animateNumbers(container: HTMLElement): void {
    gsap.registerPlugin(ScrollTrigger);

    const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const title = container.querySelector<HTMLElement>('.title h1');
    const cards = Array.from(container.querySelectorAll<HTMLElement>('.numbersCards .numbersCard'));
    const icons = Array.from(container.querySelectorAll<HTMLElement>('.numbersCard svg'));
    const brands = Array.from(container.querySelectorAll<HTMLElement>('.numbersCard h3'));
    const values = Array.from(container.querySelectorAll<HTMLElement>('.numbersCard h4'));
    const labels = Array.from(container.querySelectorAll<HTMLElement>('.numbersCard p'));
    const legal = container.querySelector<HTMLElement>('.numbersLegal');

    const all = [title, legal, ...cards, ...icons, ...brands, ...values, ...labels].filter(
        (el): el is HTMLElement => !!el,
    );

    if (pref) {
        gsap.set(all, { clearProps: 'all' });
        return;
    }

    gsap.set(container, { perspective: 1200 });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            start: 'top 82%',
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
                y: 44,
                rotateX: -10,
                scale: 0.95,
                transformOrigin: 'center bottom',
                duration: 0.74,
                stagger: 0.12,
            },
            '-=0.42',
        );
    }

    if (icons.length > 0) {
        tl.from(
            icons,
            {
                autoAlpha: 0,
                scale: 0.68,
                rotate: -12,
                transformOrigin: 'center center',
                duration: 0.45,
                ease: 'back.out(1.8)',
                stagger: 0.08,
            },
            '-=0.56',
        );
    }

    if (brands.length > 0) {
        tl.from(
            brands,
            {
                autoAlpha: 0,
                y: 16,
                duration: 0.44,
                stagger: 0.08,
            },
            '-=0.38',
        );
    }

    if (values.length > 0) {
        tl.from(
            values,
            {
                autoAlpha: 0,
                y: 14,
                duration: 0.42,
                stagger: 0.08,
            },
            '-=0.34',
        );
    }

    if (labels.length > 0) {
        tl.from(
            labels,
            {
                autoAlpha: 0,
                y: 10,
                duration: 0.4,
                stagger: 0.06,
            },
            '-=0.3',
        );
    }

    if (legal) {
        tl.from(
            legal,
            {
                autoAlpha: 0,
                y: 18,
                duration: 0.54,
            },
            '-=0.18',
        );
    }

    const cardsGrid = container.querySelector<HTMLElement>('.numbersCards');
    if (cardsGrid) {
        gsap.to(cardsGrid, {
            y: 24,
            ease: 'none',
            scrollTrigger: {
                trigger: container,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            },
        });
    }
}
