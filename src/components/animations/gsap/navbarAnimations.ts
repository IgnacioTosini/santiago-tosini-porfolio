import gsap from 'gsap';

const ease = 'power3.out';

export function animateNavbarEntrance(nav: HTMLElement): void {
    const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (pref) return;

    const brand     = nav.querySelector<HTMLElement>('.navbarBrand');
    const links     = nav.querySelectorAll<HTMLElement>('.navbarLink');
    const hamburger = nav.querySelector<HTMLElement>('.hamburgerButton');

    const tl = gsap.timeline({ delay: 0.04 });

    if (brand) tl.from(brand, { opacity: 0, y: 14, duration: 0.45, ease });

    if (links.length > 0) {
        tl.from(links, { opacity: 0, y: 12, duration: 0.42, ease, stagger: 0.07 }, '-=0.2');
    }

    if (hamburger) {
        tl.from(hamburger, { opacity: 0, scale: 0.9, duration: 0.4, ease }, '-=0.2');
    }
}
