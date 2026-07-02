'use client'

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { HamburgerNavbar } from "../HamburgerNavbar/HamburgerNavbar";
import { IoMdClose } from "react-icons/io";
import { scrollSection } from '@/utils/scrollSection';
import { navigationItems } from "@/utils/navigationItems";
import { useGsapAnimation } from '@/hooks/useGsapAnimation';
import "./_navbar.scss";

export default function Navbar() {
    const pathname = usePathname()
    const navbarRef = useRef<HTMLElement>(null)
    const [isMobile, setIsMobile] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState<string>('')
    const currentSection = pathname === '/' ? activeSection : ''

    useGsapAnimation(navbarRef, async () => {
        const { animateNavbarEntrance } = await import('@/components/animations/gsap/navbarAnimations');
        return animateNavbarEntrance;
    }, []);

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

        const updateActiveSection = () => {
            const markerRatio = window.innerWidth <= 768 ? 0.2 : 0.35
            const markerViewportY = window.innerHeight * markerRatio
            const markerDocumentY = window.scrollY + markerViewportY
            const sectionTops = sectionElements.map((section) => section.getBoundingClientRect().top + window.scrollY)
            const firstSectionTop = sectionTops[0]

            // While hero is the main visible area, keep every nav label inactive.
            if (markerDocumentY < firstSectionTop) {
                setActiveSection('')
                return
            }

            // Pick the last section whose top is above the marker line.
            const currentIndex = sectionTops.reduce((activeIndex, top, index) => {
                if (markerDocumentY >= top) return index
                return activeIndex
            }, 0)

            const current = sectionElements[currentIndex]

            if (current) {
                setActiveSection(current.id)
                return
            }

            // Fallback for edge cases near section boundaries.
            const nearest = [...sectionElements].sort(
                (a, b) => Math.abs(a.getBoundingClientRect().top - markerViewportY) - Math.abs(b.getBoundingClientRect().top - markerViewportY)
            )[0]

            setActiveSection(nearest?.id ?? '')
        }

        updateActiveSection()
        window.addEventListener('scroll', updateActiveSection, { passive: true })
        window.addEventListener('resize', updateActiveSection)

        return () => {
            window.removeEventListener('scroll', updateActiveSection)
            window.removeEventListener('resize', updateActiveSection)
        }
    }, [pathname])

    return (
        <nav ref={navbarRef} className="navbar">
            <Link href="/" className="navbarBrand" onClick={handleBrandClick}>
                <Image
                    src="/fotoPerfilSantiTosini.jpeg"
                    alt="Icono Santiago Tosini"
                    width={34}
                    height={34}
                    className="navbarBrandIcon"
                    priority
                />
                Santiago<span>Tosini</span>
            </Link>
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
                        <span className={isMenuOpen ? 'hamburgerIcon open' : 'hamburgerIcon'}>
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
