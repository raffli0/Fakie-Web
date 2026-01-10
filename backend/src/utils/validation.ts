import { z } from 'zod';

export const registerSchema = z.object({
    username: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(8).max(100),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const createSpotSchema = z.object({
    name: z.string().min(3).max(255),
    location: z.string().min(3),
    description: z.string().optional(),
    difficulty: z.enum(['easy', 'medium', 'hard']),
    image_url: z.string().url().optional().or(z.literal('')),
});

export const updateSpotSchema = createSpotSchema.partial();

export const createGearSchema = z.object({
    name: z.string().min(3).max(255),
    category: z.enum(['deck', 'truck', 'wheel']),
    brand: z.string().min(2).max(255),
    description: z.string().optional(),
    rating: z.number().int().min(1).max(5).optional(),
    image_url: z.string().url().optional().or(z.literal('')),
});

export const updateGearSchema = createGearSchema.partial();
