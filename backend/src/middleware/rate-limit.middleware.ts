import { Context, Next } from 'hono';

interface RateLimitConfig {
    windowMs: number;
    max: number;
    message: string;
}

const counters = new Map<string, { count: number; resetTime: number }>();

export const rateLimiter = (config: RateLimitConfig) => {
    return async (c: Context, next: Next) => {
        const ip = c.req.header('x-forwarded-for') || 'unknown';
        const key = `${ip}:${c.req.path}`;
        const now = Date.now();

        let record = counters.get(key);

        if (!record || now > record.resetTime) {
            record = { count: 0, resetTime: now + config.windowMs };
        }

        record.count++;
        counters.set(key, record);

        if (record.count > config.max) {
            return c.json({ error: config.message }, 429);
        }

        await next();
    };
};

// Clean up old entries periodically to prevent memory leaks
setInterval(() => {
    const now = Date.now();
    for (const [key, record] of counters.entries()) {
        if (now > record.resetTime) {
            counters.delete(key);
        }
    }
}, 60000); // Run every minute
