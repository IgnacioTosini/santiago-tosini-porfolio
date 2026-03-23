import gsap from 'gsap';

const ease = 'power3.out';

export function animateServiceCard(container: HTMLElement, index: number): void {
    const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const icon = container.querySelector<HTMLElement>('.serviceIcon');
    const h3   = container.querySelector<HTMLElement>('h3');
    const p    = container.querySelector<HTMLElement>('p');

    if (pref) {
        gsap.set([container, icon, h3, p].filter(Boolean), { x: 0, y: 0, scale: 1 });
        return;
    }

    const direction = index % 2 === 0 ? -1 : 1;

    const tl = gsap.timeline({ delay: index * 0.07 });

    tl.from(container, { x: direction * 32, y: 18, scale: 0.94, duration: 0.62, ease });
    if (icon) tl.from(icon, { y: 18, duration: 0.48, ease }, '-=0.3');
    if (h3)   tl.from(h3,   { y: 18, duration: 0.54, ease }, '-=0.28');
    if (p)    tl.from(p,    { y: 20, duration: 0.58, ease }, '-=0.28');
}
