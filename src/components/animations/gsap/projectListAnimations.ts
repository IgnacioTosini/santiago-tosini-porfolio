import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Animates the project list container entrance.
 * Individual cards handle their own animation via animateSimpleProjectCard.
 */
export function animateProjectList(container: HTMLElement): void {
    gsap.registerPlugin(ScrollTrigger);
    const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (pref) return;

    gsap.from(container, {
        y: 18,
        duration: 0.25,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: container,
            start: 'top 88%',
            toggleActions: 'play none none none',
        },
    });
}
