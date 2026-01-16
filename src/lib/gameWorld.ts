// Types
export type WorldObject = {
    id: string;
    type: 'TREE' | 'GATE_LEFT' | 'GATE_RIGHT' | 'LANDMARK_ROCK' | 'LANDMARK_LODGE' | 'ICE_PATCH';
    x: number; // 0-100 percent
    y: number; // Absolute Y position on track
    width: number; // Visual width in pixels (reference)
    height: number;
    collided?: boolean;
};

// Course Parameters
const SECTOR_LENGTH = 1250;
const TREE_DENSITY = 0.08; // Chance per unit? No, safer to generate chunks.

export function generateCourse(totalDistance: number = 50000): WorldObject[] {
    const objects: WorldObject[] = [];
    let currentY = 200; // Start a bit down

    // Helper to add object
    const add = (type: WorldObject['type'], x: number, y: number) => {
        objects.push({
            id: `obj_${y}_${Math.random()}`,
            type,
            x,
            y,
            width: type === 'TREE' ? 40 : 60,
            height: type === 'TREE' ? 60 : 60,
        });
    }

    // SECTORS GENERATION
    // We cover 200 -> totalDistance
    const SECTOR_SIZE = 5000;

    for (let y = 200; y < totalDistance; y += 100) {
        // Difficulty ramps up
        const progress = y / totalDistance;

        // TREES - Edges always
        add('TREE', Math.random() * 10, y);
        add('TREE', 90 + Math.random() * 10, y);

        // Random Obstacles in middle
        // Density increases with progress
        if (Math.random() < 0.1 + (progress * 0.2)) {
            add('TREE', 20 + Math.random() * 60, y);
        }

        // Gates every 400ish
        if (y % 400 < 100) {
            const offset = Math.sin(y * 0.01) * 30; // Winding course
            add('GATE_LEFT', 30 + offset, y);
            add('GATE_RIGHT', 70 + offset, y);
        }

        // Ice Patches (Sector 3 equivalent)
        if (progress > 0.6 && Math.random() > 0.9) {
            add('ICE_PATCH', 30 + Math.random() * 40, y);
        }
    }

    // LANDMARKS
    add('LANDMARK_ROCK', 80, totalDistance * 0.3);
    add('LANDMARK_ROCK', 20, totalDistance * 0.7);

    // FINISH LINE
    objects.push({
        id: 'L_LODGE',
        type: 'LANDMARK_LODGE',
        x: 50,
        y: totalDistance,
        width: 300,
        height: 200
    });

    return objects.sort((a, b) => a.y - b.y);
}
