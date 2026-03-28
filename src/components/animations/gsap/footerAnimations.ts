import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ease = 'power4.out';

export function animateFooter(container: HTMLElement): void {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const contactSection = document.getElementById('contact');

    const title = container.querySelector<HTMLElement>('.footerContentInfo h1');
    const links = Array.from(container.querySelectorAll<HTMLElement>('.footerContentInfoLinks a'));
    const legalLines = Array.from(container.querySelectorAll<HTMLElement>('.footerContentFooter p'));

    const targets = [title, ...links, ...legalLines].filter((el): el is HTMLElement => Boolean(el));
    if (targets.length === 0) return;

    if (prefersReducedMotion) {
        gsap.set(targets, { clearProps: 'all' });
        return;
    }

    gsap.set(targets, { autoAlpha: 0, willChange: 'transform, opacity' });

    const tl = gsap.timeline({ paused: true });

    if (title) {
        tl.fromTo(
            title,
            {
                autoAlpha: 0,
                y: 26,
                scale: 0.985,
                transformOrigin: 'left center',
            },
            {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.7,
                ease,
                clearProps: 'opacity,visibility,transform,will-change',
            },
        );
    }

    if (links.length > 0) {
        tl.fromTo(
            links,
            {
                autoAlpha: 0,
                y: 18,
                scale: 0.92,
            },
            {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.58,
                stagger: 0.08,
                ease: 'back.out(1.35)',
                clearProps: 'opacity,visibility,transform,will-change',
            },
            '-=0.42'
        );
    }

    if (legalLines.length > 0) {
        tl.fromTo(
            legalLines,
            {
                autoAlpha: 0,
                y: 14,
            },
            {
                autoAlpha: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: 'sine.out',
                clearProps: 'opacity,visibility,transform,will-change',
            },
            '-=0.3'
        );
    }

    let hasPlayed = false;

    const playAnimation = () => {
        if (hasPlayed) return;
        hasPlayed = true;
        tl.play(0);
    };

    const footerTop = container.getBoundingClientRect().top;
    const contactBottom = contactSection?.getBoundingClientRect().bottom;
    const footerVisible = footerTop <= window.innerHeight * 0.99;
    const contactCompleted = typeof contactBottom === 'number' && contactBottom <= window.innerHeight * 0.96;

    if (footerVisible || contactCompleted) {
        playAnimation();
        return;
    }

    if (contactSection) {
        ScrollTrigger.create({
            trigger: contactSection,
            start: 'bottom 96%',
            invalidateOnRefresh: true,
            once: true,
            onEnter: playAnimation,
            onEnterBack: playAnimation,
        });
    }

    ScrollTrigger.create({
        trigger: container,
        start: 'top 99%',
        invalidateOnRefresh: true,
        once: true,
        onEnter: playAnimation,
        onEnterBack: playAnimation,
    });
}
