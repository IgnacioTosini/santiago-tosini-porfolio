'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MouseEvent } from 'react';
import { scrollSection } from '@/utils/scrollSection';
import './_numbersCard.scss';

interface Props {
    icon: React.ReactNode;
    value: string;
    title: string;
    label: string;
    href?: string;
}

export const NumbersCard = ({ icon, value, title, label, href }: Props) => {
    const pathname = usePathname();

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        if (!href?.startsWith('/#')) return;
        if (pathname !== '/') return;

        const sectionId = href.replace('/#', '');
        const didScroll = scrollSection(sectionId, { desktopBlock: 'start' });

        if (didScroll) event.preventDefault();
    };

    return (
        <Link href={href || '#'} className="numbersCard" onClick={handleClick}>
            {icon}
            <h3>{value}</h3>
            <h4>{title}</h4>
            <p>{label}</p>
        </Link>
    )
}
