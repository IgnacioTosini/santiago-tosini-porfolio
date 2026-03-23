import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ease = 'power3.out';

export function animateHeroEntrance(container: HTMLElement): void {
    const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const bg       = container.querySelector<HTMLElement>('.heroBackground');
    const title    = container.querySelector<HTMLElement>('.heroTitle');
    const subtitle = container.querySelector<HTMLElement>('.heroSubtitle');
    const bold     = container.querySelector<HTMLElement>('.heroSubtitleBold');
    const button   = container.querySelector<HTMLElement>('.heroButtonWrapper');

    const all = [bg, title, subtitle, bold, button].filter((el): el is HTMLElement => !!el);

    if (pref) {
        gsap.set(all, { opacity: 1, y: 0 });
        return;
    }

    const tl = gsap.timeline({ delay: 0.06 });

    if (bg)       tl.from(bg,       { opacity: 0, duration: 0.9, ease });
    if (title)    tl.from(title,    { opacity: 0, y: 28, duration: 0.7,  ease }, '-=0.5');
    if (subtitle) tl.from(subtitle, { opacity: 0, y: 18, duration: 0.56, ease }, '-=0.38');
    if (bold)     tl.from(bold,     { opacity: 0, y: 18, duration: 0.56, ease }, '-=0.3');
    if (button)   tl.from(button,   { opacity: 0, y: 14, duration: 0.5,  ease }, '-=0.28');
}

export function animateHeroParallax(container: HTMLElement): void {
    gsap.registerPlugin(ScrollTrigger);
    const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (pref) return;

    const bg = container.querySelector<HTMLElement>('.heroBackground');
    if (!bg) return;

    gsap.to(bg, {
        y: 90,
        ease: 'none',
        scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
        },
    });
}
