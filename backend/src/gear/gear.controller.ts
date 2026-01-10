import { Hono } from 'hono';
import { db } from '../db';
import { skateGear } from '../db/schema';
import { eq, desc } from 'drizzle-orm';
import { authMiddleware } from '../middleware/auth.middleware';
import { createGearSchema, updateGearSchema } from '../utils/validation';

const gear = new Hono();

// List Gear (Public)
gear.get('/', async (c) => {
    try {
        const result = await db.select().from(skateGear).orderBy(desc(skateGear.created_at)).execute();
        return c.json({ success: true, data: result });
    } catch (e) {
        return c.json({ success: false, message: 'Failed to fetch gear' }, 500);
    }
});

// Get Gear Detail (Public)
gear.get('/:id', async (c) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.json({ success: false, message: 'Invalid ID' }, 400);

    try {
        const [item] = await db.select().from(skateGear).where(eq(skateGear.id, id)).execute();
        if (!item) return c.json({ success: false, message: 'Gear not found' }, 404);
        return c.json({ success: true, data: item });
    } catch (e) {
        return c.json({ success: false, message: 'Failed to fetch gear' }, 500);
    }
});

// Create Gear (Auth Required)
gear.post('/', authMiddleware, async (c) => {
    const user = c.get('user');
    const body = await c.req.json();
    const validation = createGearSchema.safeParse(body);

    if (!validation.success) {
        return c.json({ success: false, message: validation.error.flatten() }, 400);
    }

    try {
        await db.insert(skateGear).values({
            ...validation.data,
            created_by: user.user_id,
        });
        return c.json({ success: true, message: 'Gear review created successfully' }, 201);
    } catch (e) {
        console.error(e);
        return c.json({ success: false, message: 'Failed to create gear review' }, 500);
    }
});

// Update Gear (Owner Required)
gear.put('/:id', authMiddleware, async (c) => {
    const id = parseInt(c.req.param('id'));
    const user = c.get('user');
    if (isNaN(id)) return c.json({ success: false, message: 'Invalid ID' }, 400);

    const body = await c.req.json();
    const validation = updateGearSchema.safeParse(body);

    if (!validation.success) {
        return c.json({ success: false, message: validation.error.flatten() }, 400);
    }

    try {
        const [existing] = await db.select().from(skateGear).where(eq(skateGear.id, id)).execute();
        if (!existing) return c.json({ success: false, message: 'Gear not found' }, 404);

        if (existing.created_by !== user.user_id && user.role !== 'admin') {
            return c.json({ success: false, message: 'Unauthorized' }, 403);
        }

        await db.update(skateGear).set(validation.data).where(eq(skateGear.id, id)).execute();
        return c.json({ success: true, message: 'Gear updated successfully' });
    } catch (e) {
        return c.json({ success: false, message: 'Failed to update gear' }, 500);
    }
});

// Delete Gear (Admin Required)
gear.delete('/:id', authMiddleware, async (c) => {
    const id = parseInt(c.req.param('id'));
    const user = c.get('user');
    if (isNaN(id)) return c.json({ success: false, message: 'Invalid ID' }, 400);

    if (user.role !== 'admin') {
        return c.json({ success: false, message: 'Unauthorized: Admin only' }, 403);
    }

    try {
        const result = await db.delete(skateGear).where(eq(skateGear.id, id)).execute();
        // @ts-ignore: Check affectedRows for mysql2 driver results
        if (result[0].affectedRows === 0) {
            return c.json({ success: false, message: 'Gear not found' }, 404);
        }
        return c.json({ success: true, message: 'Gear deleted successfully' });
    } catch (e) {
        return c.json({ success: false, message: 'Failed to delete gear' }, 500);
    }
});

export default gear;
