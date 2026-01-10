import { Hono } from 'hono';
import { db } from '../db';
import { skateSpots } from '../db/schema';
import { eq, desc } from 'drizzle-orm';
import { authMiddleware } from '../middleware/auth.middleware';
import { createSpotSchema, updateSpotSchema } from '../utils/validation';

const spots = new Hono();

// List Spots (Public)
spots.get('/', async (c) => {
    try {
        const result = await db.select().from(skateSpots).orderBy(desc(skateSpots.created_at)).execute();
        return c.json({ success: true, data: result });
    } catch (e) {
        return c.json({ success: false, message: 'Failed to fetch spots' }, 500);
    }
});

// Get Spot Detail (Public)
spots.get('/:id', async (c) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.json({ success: false, message: 'Invalid ID' }, 400);

    try {
        const [spot] = await db.select().from(skateSpots).where(eq(skateSpots.id, id)).execute();
        if (!spot) return c.json({ success: false, message: 'Spot not found' }, 404);
        return c.json({ success: true, data: spot });
    } catch (e) {
        return c.json({ success: false, message: 'Failed to fetch spot' }, 500);
    }
});

// Create Spot (Auth Required)
spots.post('/', authMiddleware, async (c) => {
    const user = c.get('user');
    const body = await c.req.json();
    const validation = createSpotSchema.safeParse(body);

    if (!validation.success) {
        return c.json({ success: false, message: validation.error.flatten() }, 400);
    }

    try {
        await db.insert(skateSpots).values({
            ...validation.data,
            created_by: user.user_id,
        });
        return c.json({ success: true, message: 'Spot created successfully' }, 201);
    } catch (e) {
        console.error(e);
        return c.json({ success: false, message: 'Failed to create spot' }, 500);
    }
});

// Update Spot (Owner Required)
spots.put('/:id', authMiddleware, async (c) => {
    const id = parseInt(c.req.param('id'));
    const user = c.get('user');
    if (isNaN(id)) return c.json({ success: false, message: 'Invalid ID' }, 400);

    const body = await c.req.json();
    const validation = updateSpotSchema.safeParse(body);

    if (!validation.success) {
        return c.json({ success: false, message: validation.error.flatten() }, 400);
    }

    try {
        const [existing] = await db.select().from(skateSpots).where(eq(skateSpots.id, id)).execute();
        if (!existing) return c.json({ success: false, message: 'Spot not found' }, 404);

        if (existing.created_by !== user.user_id && user.role !== 'admin') {
            return c.json({ success: false, message: 'Unauthorized' }, 403);
        }

        await db.update(skateSpots).set(validation.data).where(eq(skateSpots.id, id)).execute();
        return c.json({ success: true, message: 'Spot updated successfully' });
    } catch (e) {
        return c.json({ success: false, message: 'Failed to update spot' }, 500);
    }
});

// Delete Spot (Admin Required)
spots.delete('/:id', authMiddleware, async (c) => {
    const id = parseInt(c.req.param('id'));
    const user = c.get('user');
    if (isNaN(id)) return c.json({ success: false, message: 'Invalid ID' }, 400);

    if (user.role !== 'admin') {
        return c.json({ success: false, message: 'Unauthorized: Admin only' }, 403);
    }

    try {
        const result = await db.delete(skateSpots).where(eq(skateSpots.id, id)).execute();
        // @ts-ignore: Check affectedRows for mysql2 driver results
        if (result[0].affectedRows === 0) {
            return c.json({ success: false, message: 'Spot not found' }, 404);
        }
        return c.json({ success: true, message: 'Spot deleted successfully' });
    } catch (e) {
        return c.json({ success: false, message: 'Failed to delete spot' }, 500);
    }
});

export default spots;
