import { mysqlTable, varchar, int, timestamp, text, mysqlEnum } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

export const users = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  username: varchar('username', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password_hash: varchar('password_hash', { length: 255 }).notNull(),
  role: mysqlEnum('role', ['member', 'admin']).default('member').notNull(),
  created_at: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const skateSpots = mysqlTable('skate_spots', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  location: text('location').notNull(), // text is safer for arbitrary length addresses
  description: text('description'),
  difficulty: mysqlEnum('difficulty', ['easy', 'medium', 'hard']).notNull(),
  image_url: varchar('image_url', { length: 2048 }),
  created_by: int('created_by').notNull().references(() => users.id, { onDelete: 'cascade' }),
  created_at: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const skateGear = mysqlTable('skate_gear', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  category: mysqlEnum('category', ['deck', 'truck', 'wheel']).notNull(),
  brand: varchar('brand', { length: 255 }).notNull(),
  description: text('description'),
  rating: int('rating'), // validation logic should ensure 1-5
  image_url: varchar('image_url', { length: 2048 }),
  created_by: int('created_by').notNull().references(() => users.id, { onDelete: 'cascade' }),
  created_at: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});
