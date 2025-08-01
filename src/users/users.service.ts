import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import {
  users,
  profiles,
  type User,
  type NewUser,
  type Profile,
} from '../database/schema';
import { Database } from '../database/connection';

@Injectable()
export class UsersService {
  constructor(@Inject('DATABASE') private db: Database) {}

  async createUser(userData: NewUser): Promise<User> {
    const [user] = await this.db.insert(users).values(userData).returning();
    return user;
  }

  async findUserById(id: string): Promise<User | null> {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
    return user || null;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    return user || null;
  }

  async updateUser(
    id: string,
    userData: Partial<NewUser>,
  ): Promise<User | null> {
    const [user] = await this.db
      .update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning();
    return user || null;
  }

  async findProfileByUserId(userId: string): Promise<Profile | null> {
    const [profile] = await this.db
      .select()
      .from(profiles)
      .where(eq(profiles.userId, userId))
      .limit(1);
    return profile || null;
  }

  async updateProfile(
    userId: string,
    profileData: Partial<Profile>,
  ): Promise<Profile | null> {
    const [profile] = await this.db
      .update(profiles)
      .set({ ...profileData, updatedAt: new Date() })
      .where(eq(profiles.userId, userId))
      .returning();
    return profile || null;
  }

  async getUserWithProfile(userId: string) {
    const user = await this.findUserById(userId);
    const profile = await this.findProfileByUserId(userId);
    return { user, profile };
  }
}
