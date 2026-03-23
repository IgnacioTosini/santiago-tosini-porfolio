import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ease = 'power3.out';

export function animateTitleEntrance(container: HTMLElement): void {
    gsap.registerPlugin(ScrollTrigger);
    const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const intro     = container.querySelector<HTMLElement>('.intro');
    const subtitles = Array.from(container.querySelectorAll<HTMLElement>('.subtitle, .subtitle2'));

    const all = [intro, ...subtitles].filter((el): el is HTMLElement => !!el);

    if (pref) {
        gsap.set(all, { opacity: 1, x: 0, y: 0 });
        return;
    }

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none none',
        },
    });

    if (intro) tl.from(intro, { opacity: 0, x: -18, y: 18, duration: 0.62, ease });

    subtitles.forEach((subtitle, i) => {
        tl.from(subtitle, { opacity: 0, y: 34, duration: 0.72, ease }, i === 0 ? '-=0.36' : '-=0.45');
    });
}
