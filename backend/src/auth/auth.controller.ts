import { Hono } from 'hono';
import { setCookie, deleteCookie } from 'hono/cookie';
import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { createToken } from './jwt';
import { loginSchema, registerSchema } from '../utils/validation';
import { authMiddleware } from '../middleware/auth.middleware';
import { rateLimiter } from '../middleware/rate-limit.middleware';

const auth = new Hono();

// Rate limiter config for auth routes
const authRateLimit = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Limit each IP to 20 requests per windowMs
    message: 'Too many login/register attempts, please try again later.',
});

// Strict rate limiter for login (Relaxed for testing)
const loginRateLimit = rateLimiter({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100, // Max 100 failed attempts per IP (Relaxed for testing)
    message: 'Too many login attempts. Try again later.',
});

// Register
auth.post('/register', authRateLimit, async (c) => {
    const body = await c.req.json();
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
        return c.json({ error: validation.error.flatten() }, 400);
    }

    const { username, email, password } = validation.data;

    // Check existing
    const existingUser = await db.select().from(users).where(eq(users.email, email)).execute();
    if (existingUser.length > 0) {
        return c.json({ error: 'Email already registered' }, 409);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // Insert user
    try {
        await db.insert(users).values({
            username,
            email,
            password_hash: passwordHash,
            role: 'member'
        });

        return c.json({ message: 'User registered successfully' }, 201);
    } catch (e) {
        console.error(e);
        return c.json({ error: 'Failed to register user' }, 500);
    }
});

// Login
auth.post('/login', loginRateLimit, async (c) => {
    const start = Date.now();
    const body = await c.req.json();
    const validation = loginSchema.safeParse(body);

    const handleFailure = async () => {
        // Random delay to prevent timing attacks (300-500ms)
        const delay = Math.floor(Math.random() * 200) + 300;
        await new Promise(resolve => setTimeout(resolve, delay));

        // Log failure internally (never expose to client)
        const ip = c.req.header('x-forwarded-for') || 'unknown';
        const ua = c.req.header('user-agent') || 'unknown';
        console.warn(`[AUTH FAILURE] IP: ${ip}, UA: ${ua}, Timestamp: ${new Date().toISOString()}`);

        deleteCookie(c, 'auth_token');
        return c.json({ success: false, message: 'Invalid credentials' }, 401);
    };

    if (!validation.success) {
        return handleFailure();
    }

    const { email, password } = validation.data;

    try {
        const [user] = await db.select().from(users).where(eq(users.email, email)).execute();

        // Constant-time comparison logic
        let passwordMatch = false;
        if (user) {
            passwordMatch = await bcrypt.compare(password, user.password_hash);
        } else {
            // Dummy comparison to simulate work
            await bcrypt.compare(password, '$2a$10$abcdefghijklmnopqrstuvwxyz123456');
        }

        if (!user || !passwordMatch) {
            return handleFailure();
        }

        const token = await createToken({ user_id: user.id, role: user.role });

        setCookie(c, 'auth_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 60 * 30, // 30 mins
            path: '/',
        });

        return c.json({ message: 'Login successful' });

    } catch (error) {
        console.error('Login error:', error);
        return c.json({ error: 'Internal server error' }, 500);
    }
});

// Logout
auth.post('/logout', (c) => {
    deleteCookie(c, 'auth_token');
    return c.json({ message: 'Logged out' });
});

// Me
auth.get('/me', authMiddleware, async (c) => {
    const userContext = c.get('user');

    // Fetch fresh user data to ensure role/status is up to date, 
    // and to get other profile info if needed (excluding sensitive data)
    const [user] = await db.select({
        id: users.id,
        username: users.username,
        email: users.email,
        role: users.role,
        created_at: users.created_at
    }).from(users).where(eq(users.id, userContext.user_id)).execute();

    if (!user) {
        return c.json({ error: 'User not found' }, 404);
    }

    return c.json({ user });
});

export default auth;
