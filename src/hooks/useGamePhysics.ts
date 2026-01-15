import { useRef, useEffect, useState, useCallback } from 'react';

// Types
export type PlayerState = {
    x: number;
    y: number; // Y is distance down the mountain
    speedX: number;
    speedY: number;
    isTucking: boolean;
    isCrashed: boolean;
};

// Physics Constants
const GRAVITY = 0.5;
const FRICTION = 0.96;
const STEERING_SPEED = 0.8;
const MAX_SPEED = 15;
const TUCK_MAX_SPEED = 22;
const TUCK_ACCEL = 0.2;

export function useGamePhysics() {
    const [player, setPlayer] = useState<PlayerState>({
        x: 50, // Percent width (0-100)
        y: 0,
        speedX: 0,
        speedY: 0,
        isTucking: false,
        isCrashed: false,
    });

    const keys = useRef<Set<string>>(new Set());

    // Input Handlers
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => keys.current.add(e.key);
        const handleKeyUp = (e: KeyboardEvent) => keys.current.delete(e.key);

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    // Main Physics Loop Tick
    const updatePhysics = useCallback(() => {
        setPlayer(prev => {
            if (prev.isCrashed) return prev;

            const isTucking = keys.current.has('ArrowDown');

            // Calculate speeds
            let newSpeedY = prev.speedY;
            const targetMaxSpeed = isTucking ? TUCK_MAX_SPEED : MAX_SPEED;

            // Accelerate downhill
            if (newSpeedY < targetMaxSpeed) {
                newSpeedY += isTucking ? TUCK_ACCEL : 0.1;
            }

            // Steering
            let newSpeedX = prev.speedX;
            const steerFactor = isTucking ? 0.3 : 1.0; // Harder to steer while tucking

            if (keys.current.has('ArrowLeft')) newSpeedX -= STEERING_SPEED * steerFactor;
            if (keys.current.has('ArrowRight')) newSpeedX += STEERING_SPEED * steerFactor;

            // Friction / Drag
            newSpeedX *= FRICTION;

            // Update Position
            let newX = prev.x + newSpeedX;
            const newY = prev.y + newSpeedY;

            // Bounds Checking (Walls)
            if (newX < 0) { newX = 0; newSpeedX = 0; }
            if (newX > 100) { newX = 100; newSpeedX = 0; }

            return {
                x: newX,
                y: newY,
                speedX: newSpeedX,
                speedY: newSpeedY,
                isTucking,
                isCrashed: false,
            };
        });
    }, []);

    return { player, updatePhysics };
}
