import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ease = 'power4.out';

export function animateAudience(container: HTMLElement): void {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const sectionStart = isMobile ? 'top 68%' : 'top 80%';

    const sections = Array.from(container.querySelectorAll<HTMLElement>('.audienceContainer'));
    const bars = Array.from(container.querySelectorAll<HTMLElement>('#sym\\:AudienceCard .audienceBarFill'));

    if (prefersReducedMotion) {
        gsap.set(sections, { clearProps: 'all' });
        gsap.set(bars, { clearProps: 'all' });
        return;
    }

    sections.forEach((section) => {
        const title = section.querySelector<HTMLElement>('.title h1');
        const paragraphs = Array.from(section.querySelectorAll<HTMLElement>(':scope > p'));
        const cards = Array.from(section.querySelectorAll<HTMLElement>('#sym\\:AudienceCard'));
        const subtitles = Array.from(section.querySelectorAll<HTMLElement>('#sym\\:AudienceCard .audienceCardSubtitle'));

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: sectionStart,
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
                duration: 0.78,
            });
        }

        if (paragraphs.length > 0) {
            tl.from(
                paragraphs,
                {
                    autoAlpha: 0,
                    y: 18,
                    duration: 0.46,
                    stagger: 0.08,
                },
                '-=0.42',
            );
        }

        if (cards.length > 0) {
            tl.from(
                cards,
                {
                    autoAlpha: 0,
                    y: 34,
                    rotateX: -10,
                    scale: 0.96,
                    transformOrigin: 'center bottom',
                    duration: 0.72,
                    stagger: 0.1,
                },
                '-=0.22',
            );
        }

        if (subtitles.length > 0) {
            tl.from(
                subtitles,
                {
                    autoAlpha: 0,
                    y: 10,
                    duration: 0.36,
                    stagger: 0.06,
                },
                '-=0.52',
            );
        }

        const sectionBars = Array.from(section.querySelectorAll<HTMLElement>('#sym\\:AudienceCard .audienceBarFill'));
        if (sectionBars.length > 0) {
            gsap.set(sectionBars, { scaleX: 0, transformOrigin: 'left center' });
            tl.to(
                sectionBars,
                {
                    scaleX: 1,
                    duration: 0.72,
                    ease: 'power2.out',
                    stagger: 0.03,
                    clearProps: 'transform',
                },
                '-=0.46',
            );
        }
    });
}
