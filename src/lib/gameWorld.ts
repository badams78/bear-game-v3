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

export function generateCourse(totalDistance: number = 5000): WorldObject[] {
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

    // SECTOR 1: THE DROP (Wide, few trees)
    for (let y = 200; y < SECTOR_LENGTH; y += 150) {
        // Random trees on edges
        if (Math.random() > 0.3) add('TREE', Math.random() * 15, y); // Left wall
        if (Math.random() > 0.3) add('TREE', 85 + Math.random() * 15, y); // Right wall

        // Gates
        if (y % 400 < 50) {
            add('GATE_LEFT', 30, y);
            add('GATE_RIGHT', 70, y);
        }
    }

    // LANDMARK: THE ROCK
    objects.push({
        id: 'L_ROCK',
        type: 'LANDMARK_ROCK',
        x: 80,
        y: SECTOR_LENGTH,
        width: 120,
        height: 100
    });

    // SECTOR 2: THE WOODS (Narrow)
    for (let y = SECTOR_LENGTH + 100; y < SECTOR_LENGTH * 2; y += 100) {
        add('TREE', Math.random() * 25, y);
        add('TREE', 75 + Math.random() * 25, y);

        // Occasional obstacle in middle
        if (Math.random() > 0.8) add('TREE', 30 + Math.random() * 40, y);
    }

    // SECTOR 3: ICY FLATS
    for (let y = SECTOR_LENGTH * 2; y < SECTOR_LENGTH * 3; y += 200) {
        add('ICE_PATCH', 20 + Math.random() * 60, y);
    }

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
