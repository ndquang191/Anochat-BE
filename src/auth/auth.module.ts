// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthModule as BetterAuthModule } from '@thallesp/nestjs-better-auth';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { auth } from './auth.config';

@Module({
  imports: [
    BetterAuthModule.forRoot(auth), // Better Auth integration
    UsersModule, // For custom endpoints
  ],
  controllers: [AuthController], // Custom endpoints
})
export class AuthModule {}
