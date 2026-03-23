"use client";

import { useEffect, useRef } from 'react';
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

    // Run animation when the menu div actually mounts (isOpen becomes true)
    useEffect(() => {
        if (!isOpen || !menuRef.current) return;
        const ctx = gsap.context(() => {
            animateMenuOpen(menuRef.current!);
        }, menuRef.current);
        return () => ctx.revert();
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div ref={menuRef} id={id} className="hamburgerNavbar">
            {navigationItems.map(({ id: sectionId, label }) => (
                <Link
                    key={sectionId}
                    href={`/#${sectionId}`}
                    className={activeSection === sectionId ? 'active' : ''}
                    aria-current={activeSection === sectionId ? 'page' : undefined}
                    onClick={(event) => onSectionClick(event, sectionId)}
                >
                    {label}
                </Link>
            ))}
        </div>
    );
};
