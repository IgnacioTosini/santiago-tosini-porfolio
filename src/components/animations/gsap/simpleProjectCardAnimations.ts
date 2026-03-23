import gsap from 'gsap';

const ease = 'power3.out';

export function animateSimpleProjectCard(container: HTMLElement, index: number): void {
    const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const picture = container.querySelector<HTMLElement>('.projectCardImageContainer');
    const h3      = container.querySelector<HTMLElement>('h3');
    const p       = container.querySelector<HTMLElement>('p');

    if (pref) {
        gsap.set(
            [container, picture, h3, p].filter(Boolean),
            { x: 0, y: 0, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' },
        );
        return;
    }

    const direction = index % 2 === 0 ? -1 : 1;

    const tl = gsap.timeline({ delay: index * 0.07 });

    tl.from(container, { x: direction * 32, y: 44, scale: 0.94, duration: 0.62, ease });

    if (picture) {
        tl.fromTo(
            picture,
            { scale: 1.08, clipPath: 'inset(8% 0% 14% 0%)' },
            { scale: 1,    clipPath: 'inset(0% 0% 0% 0%)', duration: 0.72, ease },
            '-=0.32',
        );
    }

    if (h3) tl.from(h3, { y: 18, duration: 0.52, ease }, '-=0.3');
    if (p)  tl.from(p,  { y: 16, duration: 0.48, ease }, '-=0.28');
}
