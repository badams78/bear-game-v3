import { useRef, useEffect, useState, useCallback } from 'react';
import { generateCourse, WorldObject } from '../lib/gameWorld';

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
    // Generate world once on mount
    const [worldObjects] = useState<WorldObject[]>(() => generateCourse());

    const [player, setPlayer] = useState<PlayerState>({
        x: 50,
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

            // Collision Detection
            let crashed = false;
            // Only check objects near player (optimization)
            const nearbyObjects = worldObjects.filter(obj =>
                obj.y > newY - 100 && obj.y < newY + 100
            );

            for (const obj of nearbyObjects) {
                // Simple box collision
                // Player Width ~ 30px (mapped to % approx 4%)
                const playerWidthPercent = 3;
                const playerHeight = 20;

                // Map object width to percent approx (assuming 800px screen width for logic)
                const objWidthPercent = (obj.width / 800) * 100;

                // Check Overlap
                // Y-axis overlap (Player is at newY)
                // Object is at obj.y
                if (Math.abs(newY - obj.y) < (obj.height / 2)) {
                    // X-axis overlap
                    if (Math.abs(newX - obj.x) < (objWidthPercent / 2 + playerWidthPercent / 2)) {
                        if (obj.type === 'TREE' || obj.type === 'LANDMARK_ROCK') {
                            crashed = true;
                            newSpeedY = 0;
                            newSpeedX = 0;
                        }
                    }
                }
            }

            return {
                x: newX,
                y: newY,
                speedX: newSpeedX,
                speedY: newSpeedY,
                isTucking,
                isCrashed: crashed,
            };
        });
    }, []);

    return { player, worldObjects, updatePhysics };
}
