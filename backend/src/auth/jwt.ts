import { sign, verify } from 'hono/jwt';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-change-me';

export const createToken = async (payload: { user_id: number; role: string }) => {
    // 30 minutes expiration
    const exp = Math.floor(Date.now() / 1000) + 60 * 30;
    return await sign({ ...payload, exp }, JWT_SECRET);
};

export const verifyToken = async (token: string) => {
    try {
        return await verify(token, JWT_SECRET);
    } catch (e) {
        return null;
    }
};
