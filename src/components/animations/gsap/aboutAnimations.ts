import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ease = 'power3.out';

export function animateAbout(container: HTMLElement): void {
    gsap.registerPlugin(ScrollTrigger);
    const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const image      = container.querySelector<HTMLElement>('.aboutSectionImage');
    const paragraphs = Array.from(container.querySelectorAll<HTMLElement>('.aboutSectionText p'));
    const highlights = Array.from(container.querySelectorAll<HTMLElement>('.highlight'));

    if (pref) {
        const all = [image, ...paragraphs, ...highlights].filter((el): el is HTMLElement => !!el);
        gsap.set(all, { opacity: 1, x: 0, y: 0, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' });
        return;
    }

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none none',
        },
    });

    if (image) {
        tl.fromTo(
            image,
            { opacity: 0, scale: 1.08, clipPath: 'inset(8% 0% 14% 0%)' },
            { opacity: 1, scale: 1,    clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease },
        );
    }

    paragraphs.forEach((p, i) => {
        tl.from(p, { opacity: 0, x: 24 + i * 8, y: 24 - i * 2, duration: 0.64 + i * 0.04, ease },
            i === 0 ? '-=0.3' : '-=0.4');
    });

    const xOffsets = [-18, 0, 18];
    highlights.forEach((li, i) => {
        tl.from(li, { opacity: 0, x: xOffsets[i] ?? 0, y: 18, duration: 0.56, ease },
            i === 0 ? '-=0.2' : '-=0.35');
    });
}
