"use client";

import { useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { animateMenuOpen } from '@/components/animations/gsap/hamburgerNavbarAnimations';
import './_hamburgerNavbar.scss';

type HamburgerNavbarProps = {
    id: string;
    isOpen: boolean;
    onSectionClick: (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => void;
    activeSection: string;
};

const navigationItems = [
    { id: 'content', label: 'Contenido' },
    { id: 'about', label: 'Sobre mí' },
    { id: 'services', label: 'Servicios' },
    { id: 'contact', label: 'Contacto' },
] as const;

export const HamburgerNavbar = ({ id, isOpen, onSectionClick, activeSection }: HamburgerNavbarProps) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const [menuActiveSection, setMenuActiveSection] = useState(activeSection);

    useEffect(() => {
        setMenuActiveSection(activeSection);
    }, [activeSection]);

    // Run animation when the menu div actually mounts (isOpen becomes true)
    useEffect(() => {
        if (!isOpen || !menuRef.current) return;
        const ctx = gsap.context(() => {
            animateMenuOpen(menuRef.current!);
        }, menuRef.current);
        return () => ctx.revert();
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;

        const sections = navigationItems
            .map(({ id: sectionId }) => document.getElementById(sectionId))
            .filter((section): section is HTMLElement => section !== null);

        if (sections.length === 0) return;

        const updateMenuActiveSection = () => {
            const menuBottom = menuRef.current?.getBoundingClientRect().bottom ?? 0;
            const markerViewportY = menuBottom + 12;
            const markerDocumentY = window.scrollY + markerViewportY;
            const sectionTops = sections.map((section) => section.getBoundingClientRect().top + window.scrollY);

            if (markerDocumentY < sectionTops[0]) {
                setMenuActiveSection('');
                return;
            }

            const currentIndex = sectionTops.reduce((activeIndex, top, index) => {
                if (markerDocumentY >= top) return index;
                return activeIndex;
            }, 0);

            setMenuActiveSection(sections[currentIndex]?.id ?? '');
        };

        updateMenuActiveSection();
        window.addEventListener('scroll', updateMenuActiveSection, { passive: true });
        window.addEventListener('resize', updateMenuActiveSection);

        return () => {
            window.removeEventListener('scroll', updateMenuActiveSection);
            window.removeEventListener('resize', updateMenuActiveSection);
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div ref={menuRef} id={id} className="hamburgerNavbar">
            {navigationItems.map(({ id: sectionId, label }) => (
                <Link
                    key={sectionId}
                    href={`/#${sectionId}`}
                    className={menuActiveSection === sectionId ? 'active' : ''}
                    aria-current={menuActiveSection === sectionId ? 'page' : undefined}
                    onClick={(event) => onSectionClick(event, sectionId)}
                >
                    {label}
                </Link>
            ))}
        </div>
    );
};
