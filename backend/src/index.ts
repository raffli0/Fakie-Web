import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { secureHeaders } from 'hono/secure-headers';
import { cors } from 'hono/cors';
import authController from './auth/auth.controller';
import spotsController from './spots/spots.controller';
import gearController from './gear/gear.controller';

const app = new Hono();
// Global Middleware
app.use('*', logger());
app.use('*', secureHeaders());
app.use('*', cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Allow both localhost and IP
    credentials: true,
}));

// Routes
app.route('/api/auth', authController);
app.route('/api/spots', spotsController);
app.route('/api/gear', gearController);

app.get('/', (c) => {
    return c.json({ message: 'Fakie Backend is running' });
});

import { serve } from '@hono/node-server';

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
    fetch: app.fetch,
    port
});
