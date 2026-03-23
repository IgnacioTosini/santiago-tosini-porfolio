import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ease = 'power3.out';

export function animateWorks(container: HTMLElement): void {
    gsap.registerPlugin(ScrollTrigger);
    const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const title = container.querySelector<HTMLElement>('.titleContainer');
    const lead = container.querySelector<HTMLElement>('.worksLead');
    const cards = Array.from(container.querySelectorAll<HTMLElement>('.projectCard'));
    const targets = [title, lead, ...cards].filter((el): el is HTMLElement => Boolean(el));

    if (targets.length === 0) return;

    if (pref) {
        gsap.set(targets, { clearProps: 'all' });
        return;
    }

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            start: 'top 76%',
            once: true,
        },
    });

    if (title) {
        tl.from(title, { autoAlpha: 0, y: 24, duration: 0.58, ease, clearProps: 'opacity,visibility,transform' });
    }

    if (lead) {
        tl.from(lead, { autoAlpha: 0, y: 22, duration: 0.56, ease, clearProps: 'opacity,visibility,transform' }, '-=0.32');
    }

    if (cards.length > 0) {
        tl.from(
            cards,
            {
                autoAlpha: 0,
                y: 40,
                scale: 0.98,
                duration: 0.64,
                stagger: 0.11,
                ease,
                clearProps: 'opacity,visibility,transform',
            },
            '-=0.24'
        );
    }
}
