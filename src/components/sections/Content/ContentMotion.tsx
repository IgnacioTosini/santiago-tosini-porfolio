'use client';

import { ReactNode, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { animateContent } from '@/components/animations/gsap/contentAnimations';

type ContentMotionProps = {
    children: ReactNode;
};

export const ContentMotion = ({ children }: ContentMotionProps) => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            animateContent(sectionRef.current!);
        }, sectionRef.current);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={sectionRef} className="content" id="content">
            {children}
        </div>
    );
};
