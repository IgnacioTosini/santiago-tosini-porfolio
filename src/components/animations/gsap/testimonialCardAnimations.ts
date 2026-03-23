import gsap from 'gsap';

const ease = 'power3.out';

export function animateTestimonialCard(container: HTMLElement, index: number): void {
    const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const icon        = container.querySelector<HTMLElement>('.icon');
    const text        = container.querySelector<HTMLElement>('p');
    const author      = container.querySelector<HTMLElement>('h4');
    const projectName = container.querySelector<HTMLElement>('span');

    if (pref) {
        gsap.set([container, icon, text, author, projectName].filter(Boolean), { x: 0, y: 0, scale: 1 });
        return;
    }

    const direction = index % 2 === 0 ? -1 : 1;

    const tl = gsap.timeline({ delay: index * 0.07 });

    tl.from(container,   { x: direction * 32, y: 18, scale: 0.94, duration: 0.62, ease });
    if (icon)        tl.from(icon,        { y: 16, duration: 0.46, ease }, '-=0.28');
    if (text)        tl.from(text,        { y: 18, duration: 0.56, ease }, '-=0.26');
    if (author)      tl.from(author,      { y: 16, duration: 0.52, ease }, '-=0.3');
    if (projectName) tl.from(projectName, { y: 12, duration: 0.48, ease }, '-=0.28');
}
