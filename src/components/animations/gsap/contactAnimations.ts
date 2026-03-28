import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ease = 'power4.out';

export function animateContact(container: HTMLElement): void {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const trigger = container.querySelector<HTMLElement>('#sym\\:Contact') ?? container;

    const card = container.querySelector<HTMLElement>('#sym\\:Contact');
    const title = container.querySelector<HTMLElement>('#sym\\:Contact .title h1');
    const description = container.querySelector<HTMLElement>('#sym\\:Contact .contactDescription');
    const buttons = Array.from(container.querySelectorAll<HTMLElement>('#sym\\:Contact .contactButton'));
    const icons = Array.from(container.querySelectorAll<HTMLElement>('#sym\\:Contact .contactButton svg'));
    const labels = Array.from(container.querySelectorAll<HTMLElement>('#sym\\:Contact .contactButton span'));

    const all = [card, title, description, ...buttons, ...icons, ...labels].filter((el): el is HTMLElement => !!el);

    if (prefersReducedMotion) {
        gsap.set(all, { clearProps: 'all' });
        return;
    }

    gsap.set(container, { perspective: 1200 });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
        },
        defaults: { ease },
    });

    if (card) {
        tl.from(card, {
            autoAlpha: 0,
            y: 30,
            scale: 0.98,
            duration: 0.72,
        });
    }

    if (title) {
        tl.from(
            title,
            {
                autoAlpha: 0,
                y: 28,
                scale: 0.96,
                transformOrigin: 'center center',
                duration: 0.72,
            },
            '-=0.42',
        );
    }

    if (description) {
        tl.from(
            description,
            {
                autoAlpha: 0,
                y: 18,
                duration: 0.5,
            },
            '-=0.42',
        );
    }

    if (buttons.length > 0) {
        tl.from(
            buttons,
            {
                autoAlpha: 0,
                y: 20,
                scale: 0.94,
                duration: 0.48,
                stagger: 0.1,
            },
            '-=0.24',
        );
    }

    if (icons.length > 0) {
        tl.from(
            icons,
            {
                autoAlpha: 0,
                scale: 0.7,
                rotate: -14,
                transformOrigin: 'center center',
                duration: 0.4,
                ease: 'back.out(1.8)',
                stagger: 0.07,
            },
            '-=0.5',
        );
    }

    if (labels.length > 0) {
        tl.from(
            labels,
            {
                autoAlpha: 0,
                x: 8,
                duration: 0.34,
                stagger: 0.06,
            },
            '-=0.36',
        );
    }
}
