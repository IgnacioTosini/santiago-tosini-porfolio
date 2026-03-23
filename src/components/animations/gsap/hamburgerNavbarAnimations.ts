import gsap from 'gsap';

const ease = 'power3.out';

export function animateMenuOpen(menu: HTMLElement): void {
    const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const links = menu.querySelectorAll<HTMLElement>('a');

    if (pref) {
        gsap.set(menu, { opacity: 1, y: 0 });
        return;
    }

    const tl = gsap.timeline();
    tl.from(menu, { opacity: 0, y: -10, duration: 0.22, ease: 'power2.out' });

    if (links.length > 0) {
        tl.from(links, { opacity: 0, y: 10, duration: 0.28, ease, stagger: 0.06 }, '-=0.1');
    }
}
