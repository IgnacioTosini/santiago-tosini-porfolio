'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEvent, useEffect, useRef, useState } from "react";
import gsap from 'gsap';
import { RxHamburgerMenu } from "react-icons/rx";
import { animateNavbarEntrance } from '@/components/animations/gsap/navbarAnimations';
import { HamburgerNavbar } from "../HamburgerNavbar/HamburgerNavbar";
import { IoMdClose } from "react-icons/io";
import { scrollSection } from '@/utils/scrollSection';
import "./_navbar.scss";

const navigationItems = [
    { id: 'content', label: 'Contenido' },
    { id: 'about', label: 'Sobre mí' },
    { id: 'services', label: 'Servicios' },
    { id: 'contact', label: 'Contacto' },
] as const;

export default function Navbar() {
    const pathname = usePathname()
    const navbarRef = useRef<HTMLElement>(null)
    const iconRef = useRef<HTMLSpanElement>(null)
    const [isMobile, setIsMobile] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState<string>('')
    const currentSection = pathname === '/' ? activeSection : ''

    useEffect(() => {
        if (!navbarRef.current) return;
        const ctx = gsap.context(() => {
            animateNavbarEntrance(navbarRef.current!);
        }, navbarRef.current);
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (!iconRef.current) return;
        gsap.to(iconRef.current, {
            rotate: isMenuOpen ? 90 : 0,
            duration: 0.24,
            ease: 'power2.inOut',
        });
    }, [isMenuOpen]);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768
            setIsMobile(mobile)
            if (!mobile) setIsMenuOpen(false)
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const closeMobileMenu = () => {
        if (isMobile) setIsMenuOpen(false)
    }

    const handleBrandClick = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()
        closeMobileMenu()
        window.scrollTo({ top: 0, behavior: 'smooth' })
        window.history.replaceState(null, '', '/')
    }

    const handleSectionNavigation = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        closeMobileMenu()
        if (pathname === '/') {
            event.preventDefault()
            scrollSection(sectionId)
        }
    }

    useEffect(() => {
        const hashSection = window.location.hash.replace('#', '')
        if (!hashSection) return
        requestAnimationFrame(() => scrollSection(hashSection))
    }, [pathname])

    useEffect(() => {
        if (pathname !== '/') return

        const sectionElements = navigationItems
            .map(({ id }) => document.getElementById(id))
            .filter((section): section is HTMLElement => section !== null)

        if (sectionElements.length === 0) return

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleSections = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))
                if (visibleSections.length > 0) setActiveSection(visibleSections[0].target.id)
            },
            { root: null, threshold: [0.2, 0.35, 0.5, 0.7], rootMargin: '-18% 0px -48% 0px' }
        )

        sectionElements.forEach((section) => observer.observe(section))
        return () => observer.disconnect()
    }, [pathname])

    return (
        <nav ref={navbarRef} className="navbar">
            <Link href="/" className="navbarBrand" onClick={handleBrandClick}>Santiago<span>Tosini</span></Link>
            {isMobile ? (
                <>
                    <button
                        type="button"
                        className="hamburgerButton"
                        aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-navigation"
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                    >
                        <span ref={iconRef}>
                            {isMenuOpen ? <IoMdClose size={26} /> : <RxHamburgerMenu size={26} />}
                        </span>
                    </button>

                    <HamburgerNavbar
                        id="mobile-navigation"
                        isOpen={isMenuOpen}
                        onSectionClick={handleSectionNavigation}
                        activeSection={currentSection}
                    />
                </>
            ) : (
                <div className="navbarLinks">
                    {navigationItems.map(({ id, label }) => (
                        <Link
                            key={id}
                            href={`#${id}`}
                            className={`navbarLink ${currentSection === id ? 'active' : ''}`}
                            aria-current={currentSection === id ? 'page' : undefined}
                            onClick={(event) => handleSectionNavigation(event, id)}
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    )
}
