import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

// Connection URL from environment variables
const connectionString = process.env.DATABASE_URL || 'mysql://root:@localhost:3306/fakie_db';

const connection = await mysql.createConnection(connectionString);

export const db = drizzle(connection, { schema, mode: 'default' });
