import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ease = 'power4.out';

export function animateTimeline(container: HTMLElement): void {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const sectionStart = isMobile ? 'top 72%' : 'top 82%';

    const trigger = container.querySelector<HTMLElement>('.timelineList') ?? container;
    const title = container.querySelector<HTMLElement>('.timelineIntro .title h1');
    const introText = container.querySelector<HTMLElement>('.timelineIntro p');
    const hint = container.querySelector<HTMLElement>('.timelineHint');
    const track = container.querySelector<HTMLElement>('.timelineTrack');
    const items = Array.from(container.querySelectorAll<HTMLElement>('.timelineItem'));
    const markers = Array.from(container.querySelectorAll<HTMLElement>('.timelineMarker'));

    const all = [title, introText, hint, track, ...items, ...markers].filter((el): el is HTMLElement => !!el);

    if (prefersReducedMotion) {
        gsap.set(all, { clearProps: 'all' });
        return;
    }

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger,
            start: sectionStart,
            toggleActions: 'play none none reverse',
        },
        defaults: { ease },
    });

    if (title) {
        tl.from(title, {
            autoAlpha: 0,
            y: 28,
            scale: 0.97,
            transformOrigin: 'center center',
            duration: 0.72,
        });
    }

    if (introText) {
        tl.from(
            introText,
            {
                autoAlpha: 0,
                y: 14,
                duration: 0.42,
            },
            '-=0.34',
        );
    }

    if (hint) {
        tl.from(
            hint,
            {
                autoAlpha: 0,
                y: 10,
                duration: 0.32,
            },
            '-=0.22',
        );
    }

    if (track) {
        tl.from(
            track,
            {
                scaleX: 0,
                transformOrigin: 'left center',
                duration: 0.64,
                ease: 'power2.out',
            },
            '-=0.08',
        );
    }

    if (items.length > 0) {
        tl.from(
            items,
            {
                autoAlpha: 0,
                y: isMobile ? 18 : 26,
                x: isMobile ? 12 : 0,
                rotateX: -8,
                scale: 0.96,
                transformOrigin: 'center bottom',
                duration: 0.56,
                stagger: 0.1,
            },
            '-=0.22',
        );
    }

    if (markers.length > 0) {
        tl.from(
            markers,
            {
                autoAlpha: 0,
                scale: 0,
                duration: 0.34,
                ease: 'back.out(1.8)',
                stagger: 0.06,
            },
            '-=0.5',
        );
    }
}
