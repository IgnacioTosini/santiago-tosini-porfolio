import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ease = 'power4.out';

export function animateAbout(container: HTMLElement): void {
    gsap.registerPlugin(ScrollTrigger);
    const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const trigger = container.querySelector<HTMLElement>('#sym\\:About') ?? container;

    const title = container.querySelector<HTMLElement>('#sym\\:About .title h1');
    const paragraphs = Array.from(container.querySelectorAll<HTMLElement>('#sym\\:About p'));
    const cards = Array.from(container.querySelectorAll<HTMLElement>('.aboutCards .aboutCard'));
    const icons = Array.from(container.querySelectorAll<HTMLElement>('.aboutCards .aboutCard svg'));

    const all = [title, ...paragraphs, ...cards, ...icons].filter((el): el is HTMLElement => !!el);

    if (pref) {
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

    paragraphs.forEach((p, i) => {
        tl.from(
            p,
            {
                autoAlpha: 0,
                x: 20 + i * 5,
                y: 18,
                duration: 0.56 + i * 0.05,
            },
            i === 0 ? '-=0.46' : '-=0.36',
        );
    });

    if (cards.length > 0) {
        tl.from(
            cards,
            {
                autoAlpha: 0,
                y: 30,
                rotateX: -10,
                scale: 0.96,
                transformOrigin: 'center bottom',
                duration: 0.62,
                stagger: 0.12,
            },
            '-=0.26',
        );
    }

    if (icons.length > 0) {
        tl.from(
            icons,
            {
                autoAlpha: 0,
                scale: 0.7,
                rotate: -12,
                transformOrigin: 'center center',
                duration: 0.45,
                ease: 'back.out(1.8)',
                stagger: 0.08,
            },
            '-=0.45',
        );
    }
}
