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

const BALL_COUNT = 20;

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const createRandomBall = (id: number): FootballBall => {
    const viewportTop = window.scrollY;
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const documentHeight = Math.max(document.documentElement.scrollHeight, viewportTop + viewportHeight);
    const preferCurrentViewport = Math.random() < 0.84;

    const top = preferCurrentViewport
        ? clamp(
            randomBetween(viewportTop - viewportHeight * 0.2, viewportTop + viewportHeight * 1.2),
            0,
            Math.max(0, documentHeight - 48)
        )
        : randomBetween(0, Math.max(0, documentHeight - 48));

    return {
        id,
        left: randomBetween(viewportWidth * 0.04, viewportWidth * 0.96),
        top,
        size: Math.random() * 34 + 28,
        duration: Math.random() * 3 + 6,
        delay: Math.random() * 0.8,
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
        setBalls(Array.from({ length: BALL_COUNT }, (_, index) => createRandomBall(index)));

        const interval = window.setInterval(() => {
            setBalls((previousBalls) => {
                if (previousBalls.length === 0) return previousBalls;

                const firstBallToUpdate = Math.floor(Math.random() * previousBalls.length);
                let secondBallToUpdate = Math.floor(Math.random() * previousBalls.length);

                if (previousBalls.length > 1 && secondBallToUpdate === firstBallToUpdate) {
                    secondBallToUpdate = (secondBallToUpdate + 1) % previousBalls.length;
                }

                return previousBalls.map((ball, index) => (
                    index === firstBallToUpdate || index === secondBallToUpdate
                        ? createRandomBall(ball.id)
                        : ball
                ));
            });
        }, 1100);

        return () => window.clearInterval(interval);
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
