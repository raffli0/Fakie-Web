import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './src/db/schema.ts',
    out: './drizzle',
    driver: 'mysql2', // 'mysql2' | 'better-sqlite' | 'libsql' | 'turso' | 'pg'
    dbCredentials: {
        uri: process.env.DATABASE_URL || 'mysql://root:password@localhost:3306/fakie_db',
    },
    verbose: true,
    strict: true,
});
