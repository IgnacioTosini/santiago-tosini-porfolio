'use client';

import { useEffect, type DependencyList, type RefObject } from 'react';

type AnimationRunner<T extends HTMLElement> = (container: T) => void;
type AnimationLoader<T extends HTMLElement> = () => Promise<AnimationRunner<T>>;

export function useGsapAnimation<T extends HTMLElement>(
    ref: RefObject<T | null>,
    loadAnimation: AnimationLoader<T>,
    deps: DependencyList = []
) {
    useEffect(() => {
        if (!ref.current) return;

        let cancelled = false;
        let cleanup: (() => void) | undefined;

        void Promise.all([import('gsap'), loadAnimation()]).then(([gsapModule, runAnimation]) => {
            if (cancelled || !ref.current) return;

            const container = ref.current;
            const ctx = gsapModule.default.context(() => {
                runAnimation(container);
            }, container);

            cleanup = () => ctx.revert();
        });

        return () => {
            cancelled = true;
            cleanup?.();
        };
        // The caller owns the animation lifecycle dependencies for this shared hook.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}
