import { Context, Next } from 'hono';
import { getCookie } from 'hono/cookie';
import { verifyToken } from '../auth/jwt';

export interface AuthUser {
    user_id: number;
    role: 'member' | 'admin';
}

declare module 'hono' {
    interface ContextVariableMap {
        user: AuthUser;
    }
}

export const authMiddleware = async (c: Context, next: Next) => {
    const token = getCookie(c, 'auth_token');

    if (!token) {
        return c.json({ error: 'Unauthorized: No token provided' }, 401);
    }

    const payload = await verifyToken(token);

    if (!payload) {
        return c.json({ error: 'Unauthorized: Invalid token' }, 401);
    }

    // Type assertion or detailed validation
    const user = {
        user_id: payload.user_id as number,
        role: payload.role as 'member' | 'admin',
    };

    c.set('user', user);
    await next();
};

export const adminOnly = async (c: Context, next: Next) => {
    const user = c.get('user');
    if (user.role !== 'admin') {
        return c.json({ error: 'Forbidden: Admins only' }, 403);
    }
    await next();
};
