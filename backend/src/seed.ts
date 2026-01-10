import { db } from './db';
import { users, skateSpots, skateGear } from './db/schema';
import bcrypt from 'bcryptjs';

async function seed() {
    console.log('🌱 Starting database seed...');

    try {
        // Create demo users
        const passwordHash = await bcrypt.hash('password123', 10);

        await db.insert(users).values([
            {
                username: 'admin',
                email: 'admin@fakie.com',
                password_hash: passwordHash,
                role: 'admin'
            },
            {
                username: 'skater_mike',
                email: 'mike@example.com',
                password_hash: passwordHash,
                role: 'member'
            },
            {
                username: 'tony_grind',
                email: 'tony@example.com',
                password_hash: passwordHash,
                role: 'member'
            }
        ]);

        console.log('✅ Users created');

        // Get user IDs (assuming auto-increment starts at 1)
        const adminId = 1;
        const mikeId = 2;
        const tonyId = 3;

        // Create skate spots
        await db.insert(skateSpots).values([
            {
                name: 'Riverside DIY',
                location: 'East Side, Downtown',
                description: '[Type: DIY / Street] Handbuilt quarter pipes and rails. Chill vibe, good lighting till 9pm. Perfect for evening sessions.',
                difficulty: 'medium',
                image_url: 'https://images.unsplash.com/photo-1593950404789-b4f0c865fb68?auto=format&fit=crop&q=80&w=1080',
                created_by: mikeId
            },
            {
                name: 'Lincoln Skatepark',
                location: 'Downtown Central',
                description: '[Type: Park] All concrete, bowl and street sections. Gets crowded on weekends but worth it. Pro-level features.',
                difficulty: 'hard',
                image_url: 'https://images.unsplash.com/photo-1547447134-cd3f5c716030?auto=format&fit=crop&q=80&w=1080',
                created_by: adminId
            },
            {
                name: '3rd Ave Plaza',
                location: 'North District',
                description: '[Type: Street Spot] Smooth ground, ledges, and stairs. Watch out for security after 6pm. Classic street spot.',
                difficulty: 'medium',
                image_url: 'https://images.unsplash.com/photo-1564982752979-d8f69c6e34f3?auto=format&fit=crop&q=80&w=1080',
                created_by: tonyId
            },
            {
                name: 'Sunset Ramps',
                location: 'West End Beach',
                description: '[Type: Park] Best transitions in town. Sunset sessions are magical here. Bring your camera!',
                difficulty: 'hard',
                image_url: 'https://images.unsplash.com/photo-1593950404788-b7c9c72e589b?auto=format&fit=crop&q=80&w=1080',
                created_by: mikeId
            },
            {
                name: 'Market Street Banks',
                location: 'Central Business District',
                description: '[Type: Street Spot] Classic marble banks and gaps. Historic spot, respect the legacy. Legendary status.',
                difficulty: 'hard',
                image_url: 'https://images.unsplash.com/photo-1564982750957-f5e943146ea5?auto=format&fit=crop&q=80&w=1080',
                created_by: adminId
            },
            {
                name: 'Grove Community Park',
                location: 'South Side Residential',
                description: '[Type: Beginner Friendly] Perfect for learning. Flat ground and small obstacles. Great for kids and beginners.',
                difficulty: 'easy',
                image_url: 'https://images.unsplash.com/photo-1547447134-cd3f5c716030?auto=format&fit=crop&q=80&w=1080',
                created_by: tonyId
            }
        ]);

        console.log('✅ Skate spots created');

        // Create gear reviews
        await db.insert(skateGear).values([
            {
                name: 'Street Classic 8.0"',
                category: 'deck',
                brand: 'Independent Skate Co.',
                description: 'Perfect street deck with medium concave. Durable 7-ply maple construction. Ideal for technical skating and consistent pop.',
                rating: 5,
                image_url: 'https://images.unsplash.com/photo-1547447134-cd3f5c716030?auto=format&fit=crop&q=80&w=1080',
                created_by: mikeId
            },
            {
                name: 'Stage 11 Standard',
                category: 'truck',
                brand: 'Independent',
                description: 'Legendary trucks that have stood the test of time. Smooth turning, durable, and perfect for street and park. Industry standard for good reason.',
                rating: 5,
                image_url: 'https://images.unsplash.com/photo-1564982750957-f5e943146ea5?auto=format&fit=crop&q=80&w=1080',
                created_by: adminId
            },
            {
                name: 'Spitfire Formula Four 52mm',
                category: 'wheel',
                brand: 'Spitfire',
                description: 'Fast, smooth, and flatspot-resistant. These wheels maintain speed while providing excellent grip. Perfect size for street and park.',
                rating: 5,
                image_url: 'https://images.unsplash.com/photo-1593950404788-b7c9c72e589b?auto=format&fit=crop&q=80&w=1080',
                created_by: tonyId
            },
            {
                name: 'Welcome Moontrimmer 8.25"',
                category: 'deck',
                brand: 'Welcome Skateboards',
                description: 'Unique shape with excellent concave. Great for bowls and transitions. Artwork is fire and construction is top-tier.',
                rating: 4,
                image_url: 'https://images.unsplash.com/photo-1593950404789-b4f0c865fb68?auto=format&fit=crop&q=80&w=1080',
                created_by: mikeId
            },
            {
                name: 'Venture V-Light 5.2',
                category: 'truck',
                brand: 'Venture',
                description: 'Lightweight without sacrificing durability. Quick turning and responsive. Great for technical street skating.',
                rating: 4,
                image_url: 'https://images.unsplash.com/photo-1547447134-cd3f5c716030?auto=format&fit=crop&q=80&w=1080',
                created_by: tonyId
            },
            {
                name: 'Bones STF 53mm V5',
                category: 'wheel',
                brand: 'Bones',
                description: 'Street Tech Formula wheels are unmatched. Fast, slide-friendly, and virtually flatspot-proof. Essential for street skating.',
                rating: 5,
                image_url: 'https://images.unsplash.com/photo-1564982752979-d8f69c6e34f3?auto=format&fit=crop&q=80&w=1080',
                created_by: adminId
            }
        ]);

        console.log('✅ Gear reviews created');
        console.log('');
        console.log('🎉 Seed completed successfully!');
        console.log('');
        console.log('📝 Demo accounts:');
        console.log('   Admin: admin@fakie.com / password123');
        console.log('   User1: mike@example.com / password123');
        console.log('   User2: tony@example.com / password123');

    } catch (error) {
        console.error('❌ Seed failed:', error);
        throw error;
    }

    process.exit(0);
}

seed();
