import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ease = 'power4.out';

export function animateSponsors(container: HTMLElement): void {
	gsap.registerPlugin(ScrollTrigger);

	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const isMobile = window.matchMedia('(max-width: 768px)').matches;
	const sectionStart = isMobile ? 'top 70%' : 'top 82%';

	const title = container.querySelector<HTMLElement>('.title h1');
	const cards = Array.from(container.querySelectorAll<HTMLElement>('.sponsorCard'));

	const all = [title, ...cards].filter((el): el is HTMLElement => !!el);
	if (all.length === 0) return;

	if (prefersReducedMotion) {
		gsap.set(all, { clearProps: 'all' });
		return;
	}

	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: container,
			start: sectionStart,
			toggleActions: 'play none none none',
			once: true,
		},
		defaults: { ease },
	});

	if (title) {
		tl.from(title, {
			autoAlpha: 0,
			y: 28,
			scale: 0.97,
			transformOrigin: 'left center',
			duration: 0.76,
		});
	}

	if (cards.length > 0) {
		tl.from(
			cards,
			{
				autoAlpha: 0,
				y: 20,
				duration: 0.56,
				stagger: 0.1,
				clearProps: 'opacity,visibility,transform',
			},
			'-=0.44',
		);
	}
}
