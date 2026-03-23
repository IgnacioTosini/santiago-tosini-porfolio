import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ease = 'power3.out';

export function animateContact(container: HTMLElement): void {
    gsap.registerPlugin(ScrollTrigger);
    const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const eyebrow = container.querySelector<HTMLElement>('.contactEyebrow');
    const title   = container.querySelector<HTMLElement>('.contactTitle');
    const info    = container.querySelector<HTMLElement>('.contactInfo');
    const button  = container.querySelector<HTMLElement>('.contactButtonWrapper');

    const all = [eyebrow, title, info, button].filter((el): el is HTMLElement => !!el);

    if (pref) {
        gsap.set(all, { opacity: 1, y: 0 });
        return;
    }

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none none',
        },
    });

    if (eyebrow) tl.from(eyebrow, { opacity: 0, y: 22, duration: 0.62, ease });
    if (title)   tl.from(title,   { opacity: 0, y: 26, duration: 0.65, ease }, '-=0.38');
    if (info)    tl.from(info,    { opacity: 0, y: 24, duration: 0.66, ease }, '-=0.36');
    if (button)  tl.from(button,  { opacity: 0, y: 16, duration: 0.5,  ease }, '-=0.34');
}
