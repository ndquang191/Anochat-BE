import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard, Session, UserSession } from '@thallesp/nestjs-better-auth';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  // Custom endpoint to get current user with profile
  @Get('me')
  @UseGuards(AuthGuard)
  async getCurrentUser(@Session() session: UserSession) {
    return this.usersService.getUserWithProfile(session.user.id);
  }
}
