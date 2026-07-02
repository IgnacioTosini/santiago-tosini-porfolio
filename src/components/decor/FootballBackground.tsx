'use client';

import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { GiSoccerBall } from 'react-icons/gi';

interface FootballBall {
    id: number;
    left: number;
    top: number;
    size: number;
    duration: number;
    delay: number;
    opacity: number;
    driftX: number;
    driftY: number;
    spin: number;
    seed: number;
}

const BALL_COUNT = 19;

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const getDocumentHeight = () => Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight,
    window.innerHeight
);

const createInitialBalls = () => {
    const documentHeight = getDocumentHeight();
    const sectionHeight = documentHeight / BALL_COUNT;

    return Array.from({ length: BALL_COUNT }, (_, index) => {
        const sectionTop = index * sectionHeight;
        const top = randomBetween(sectionTop, sectionTop + sectionHeight);

        return createRandomBall(index, top);
    });
};

const createRandomBall = (id: number, top: number): FootballBall => {
    const viewportWidth = window.innerWidth;
    const documentHeight = getDocumentHeight();

    return {
        id,
        left: randomBetween(viewportWidth * 0.04, viewportWidth * 0.96),
        top: clamp(top, 0, Math.max(0, documentHeight - 48)),
        size: Math.random() * 34 + 28,
        duration: Math.random() * 3 + 6,
        delay: randomBetween(-9, 0),
        opacity: Math.random() * 0.24 + 0.32,
        driftX: (Math.random() - 0.5) * 16,
        driftY: (Math.random() - 0.5) * 14,
        spin: (Math.random() - 0.5) * 220,
        seed: Date.now() + Math.random(),
    };
};

export const FootballBackground = () => {
    const [balls, setBalls] = useState<FootballBall[]>([]);

    useEffect(() => {
        const timeout = window.setTimeout(() => {
            setBalls(createInitialBalls());
        }, 0);

        return () => {
            window.clearTimeout(timeout);
        };
    }, []);

    return (
        <div className="footballBackground" aria-hidden="true">
            {balls.map((ball) => (
                <GiSoccerBall
                    key={`${ball.id}-${ball.seed}`}
                    className="footballBall"
                    style={{
                        '--ball-left': `${ball.left}px`,
                        '--ball-top': `${ball.top}px`,
                        '--ball-size': `${ball.size}px`,
                        '--ball-duration': `${ball.duration}s`,
                        '--ball-delay': `${ball.delay}s`,
                        '--ball-opacity': `${ball.opacity}`,
                        '--ball-drift-x': `${ball.driftX}px`,
                        '--ball-drift-y': `${ball.driftY}px`,
                        '--ball-spin': `${ball.spin}deg`,
                    } as CSSProperties}
                />
            ))}
        </div>
    );
};
