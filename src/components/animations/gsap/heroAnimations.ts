import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ease = 'power4.out';

export function animateHeroEntrance(container: HTMLElement): void {
    gsap.registerPlugin(ScrollTrigger);

    const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const decor = container.querySelector<HTMLElement>('.footballDecorWrapper');
    const eyebrow = container.querySelector<HTMLElement>('.heroTitleContainer');
    const subtitle = container.querySelector<HTMLElement>('.heroSubtitle');
    const subtitleHighlight = container.querySelector<HTMLElement>('.heroSubtitle span');
    const lead = container.querySelector<HTMLElement>('.heroLead');
    const description = container.querySelector<HTMLElement>('.heroDescription');
    const buttons = Array.from(container.querySelectorAll<HTMLElement>('.heroButtons a'));
    const stats = Array.from(container.querySelectorAll<HTMLElement>('.numbersDetails .numberDetail'));
    const statValues = Array.from(container.querySelectorAll<HTMLElement>('.heroStatValue'));
    const image = container.querySelector<HTMLElement>('.heroImage');
    const overlay = container.querySelector<HTMLElement>('#sym\\:instagramOverlay, .instagramOverlay');

    const all = [
        decor,
        eyebrow,
        subtitle,
        subtitleHighlight,
        lead,
        description,
        image,
        overlay,
        ...buttons,
        ...stats,
        ...statValues,
    ].filter((el): el is HTMLElement => !!el);

    if (pref) {
        gsap.set(all, { clearProps: 'all' });
        return;
    }

    gsap.set(container, { perspective: 1200 });

    const tl = gsap.timeline({ delay: 0.05, defaults: { ease } });

    if (decor) {
        tl.fromTo(
            decor,
            { autoAlpha: 0, x: -70, y: 30, rotate: -9, scale: 0.86 },
            { autoAlpha: 0.2, x: 0, y: 0, rotate: 0, scale: 1, duration: 1.4 },
        );
    }

    if (eyebrow) {
        tl.from(
            eyebrow,
            { autoAlpha: 0, y: 26, skewY: 3, transformOrigin: 'left center', duration: 0.62 },
            '-=1.05',
        );
    }

    if (subtitle) {
        tl.from(
            subtitle,
            { autoAlpha: 0, y: 46, scale: 0.97, transformOrigin: 'left center', duration: 0.92 },
            '-=0.5',
        );
    }

    if (subtitleHighlight) {
        tl.from(
            subtitleHighlight,
            { autoAlpha: 0, y: 12, scale: 0.9, duration: 0.5, ease: 'back.out(1.6)' },
            '-=0.48',
        );
    }

    if (lead) {
        tl.from(lead, { autoAlpha: 0, y: 22, duration: 0.54 }, '-=0.44');
    }

    if (description) {
        tl.from(description, { autoAlpha: 0, y: 22, duration: 0.54 }, '-=0.38');
    }

    if (buttons.length > 0) {
        tl.from(
            buttons,
            {
                autoAlpha: 0,
                y: 16,
                scale: 0.96,
                duration: 0.5,
                stagger: 0.1,
            },
            '-=0.35',
        );
    }

    if (stats.length > 0) {
        tl.from(
            stats,
            {
                autoAlpha: 0,
                y: 28,
                rotateX: -12,
                transformOrigin: 'center bottom',
                duration: 0.58,
                stagger: 0.12,
            },
            '-=0.3',
        );
    }

    if (image) {
        tl.from(
            image,
            {
                autoAlpha: 0,
                x: 42,
                y: 36,
                rotate: 1.8,
                scale: 0.92,
                transformOrigin: 'right center',
                duration: 1.0,
            },
            '-=1.08',
        );
    }

    if (overlay) {
        tl.fromTo(
            overlay,
            {
                opacity: 0,
                y: 18,
                scale: 0.96,
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.56,
                ease: 'back.out(1.4)',
                clearProps: 'opacity,transform',
            },
            '-=0.52',
        );
    }

    if (image) {
        tl.to(
            image,
            {
                y: '-=8',
                rotate: -0.6,
                duration: 2.8,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
            },
            '<',
        );
    }

}

export function animateHeroParallax(container: HTMLElement): void {
    gsap.registerPlugin(ScrollTrigger);
    const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (pref) return;

    const decor = container.querySelector<HTMLElement>('.footballDecorWrapper');
    const header = container.querySelector<HTMLElement>('.heroContentHeader');
    const footer = container.querySelector<HTMLElement>('.heroContentFooter');

    if (decor) {
        gsap.to(decor, {
            y: 90,
            x: 20,
            rotate: 6,
            ease: 'none',
            scrollTrigger: {
                trigger: container,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        });
    }

    if (header) {
        gsap.to(header, {
            y: -28,
            ease: 'none',
            scrollTrigger: {
                trigger: container,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        });
    }

    if (footer) {
        gsap.to(footer, {
            y: 36,
            ease: 'none',
            scrollTrigger: {
                trigger: container,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        });
    }
}
