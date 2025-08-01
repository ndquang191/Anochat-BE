import {
  pgTable,
  uuid,
  text,
  boolean,
  timestamp,
  integer,
  pgEnum,
} from 'drizzle-orm/pg-core';

// Enums
export const categoryEnum = pgEnum('category', ['polite']);

// Users table - with Better Auth fields
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email'),
  name: text('name'), // From Better Auth
  image: text('image'), // From Better Auth (avatar URL)
  isActive: boolean('is_active').default(true),
  isDeleted: boolean('is_deleted').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

// Profiles table - anonymous user info
export const profiles = pgTable('profiles', {
  userId: uuid('user_id')
    .primaryKey()
    .references(() => users.id),
  isMale: boolean('is_male'),
  age: integer('age'),
  city: text('city'),
  isHidden: boolean('is_hidden').default(false),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Rooms table
export const rooms = pgTable('rooms', {
  id: uuid('id').primaryKey().defaultRandom(),
  user1Id: uuid('user1_id').references(() => users.id),
  user2Id: uuid('user2_id').references(() => users.id),
  category: categoryEnum('category').default('polite'),
  createdAt: timestamp('created_at').defaultNow(),
  endedAt: timestamp('ended_at'),
  isSensitive: boolean('is_sensitive').default(false),
  user1LastReadMessageId: uuid('user1_last_read_message_id'),
  user2LastReadMessageId: uuid('user2_last_read_message_id'),
  isDeleted: boolean('is_deleted').default(false),
});

// Messages table
export const messages = pgTable('messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  roomId: uuid('room_id').references(() => rooms.id),
  senderId: uuid('sender_id').references(() => users.id),
  content: text('content'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Profile = typeof profiles.$inferSelect;
export type Room = typeof rooms.$inferSelect;
export type NewRoom = typeof rooms.$inferInsert;
export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;
