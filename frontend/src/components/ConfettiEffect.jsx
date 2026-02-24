import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

/**
 * ConfettiEffect — triggers a realistic confetti burst on mount.
 * Usage: Render conditionally, confetti fires immediately on mount.
 */
const ConfettiEffect = ({ type = 'donate' }) => {
    const fired = useRef(false);

    useEffect(() => {
        if (fired.current) return;
        fired.current = true;

        if (type === 'donate') {
            // Big celebration burst
            const burst = (origin) => {
                confetti({
                    particleCount: 120,
                    spread: 90,
                    origin,
                    colors: ['#3B82F6', '#6366F1', '#EC4899', '#F59E0B', '#10B981', '#FFFFFF'],
                    gravity: 0.9,
                    scalar: 1.1,
                    ticks: 300,
                });
            };
            burst({ x: 0.3, y: 0.5 });
            setTimeout(() => burst({ x: 0.7, y: 0.5 }), 150);
            setTimeout(() => burst({ x: 0.5, y: 0.3 }), 300);

            // Emoji shapes
            const emoji = confetti.shapeFromText({ text: '💙', scalar: 2 });
            const heart = confetti.shapeFromText({ text: '❤️', scalar: 2 });
            setTimeout(() => {
                confetti({
                    shapes: [emoji, heart],
                    particleCount: 20,
                    spread: 80,
                    origin: { x: 0.5, y: 0.45 },
                    scalar: 2,
                    ticks: 250,
                    gravity: 0.8,
                });
            }, 400);

        } else if (type === 'lead') {
            // Softer burst for lead form
            confetti({
                particleCount: 80,
                spread: 70,
                origin: { x: 0.5, y: 0.6 },
                colors: ['#3B82F6', '#10B981', '#F59E0B', '#FFFFFF'],
                gravity: 1,
                ticks: 200,
            });
        }
    }, [type]);

    return null;
};

/**
 * fireConfetti — imperative trigger for use outside React render.
 */
export const fireConfetti = (type = 'donate') => {
    if (type === 'donate') {
        confetti({ particleCount: 120, spread: 100, origin: { x: 0.3, y: 0.5 }, colors: ['#3B82F6', '#6366F1', '#EC4899', '#F59E0B', '#10B981'] });
        setTimeout(() => confetti({ particleCount: 100, spread: 90, origin: { x: 0.7, y: 0.5 }, colors: ['#3B82F6', '#6366F1', '#EC4899', '#F59E0B'] }), 180);
    } else {
        confetti({ particleCount: 60, spread: 60, origin: { x: 0.5, y: 0.6 }, colors: ['#3B82F6', '#10B981', '#F59E0B'] });
    }
};

export default ConfettiEffect;
