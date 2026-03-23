import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ease = 'power3.out';

export function animateFooter(container: HTMLElement): void {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const title = container.querySelector<HTMLElement>('.footerContentInfo h1');
    const links = Array.from(container.querySelectorAll<HTMLElement>('.footerContentInfoLinks a'));
    const legalLines = Array.from(container.querySelectorAll<HTMLElement>('.footerContentFooter p'));

    const targets = [title, ...links, ...legalLines].filter((el): el is HTMLElement => Boolean(el));
    if (targets.length === 0) return;

    if (prefersReducedMotion) {
        gsap.set(targets, { clearProps: 'all' });
        return;
    }

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            start: 'top 88%',
            once: true,
        },
    });

    if (title) {
        tl.from(title, {
            autoAlpha: 0,
            y: 20,
            duration: 0.56,
            ease,
            clearProps: 'opacity,visibility,transform',
        });
    }

    if (links.length > 0) {
        tl.from(
            links,
            {
                autoAlpha: 0,
                y: 16,
                duration: 0.48,
                stagger: 0.08,
                ease,
                clearProps: 'opacity,visibility,transform',
            },
            '-=0.28'
        );
    }

    if (legalLines.length > 0) {
        tl.from(
            legalLines,
            {
                autoAlpha: 0,
                y: 12,
                duration: 0.46,
                stagger: 0.08,
                ease,
                clearProps: 'opacity,visibility,transform',
            },
            '-=0.18'
        );
    }
}
