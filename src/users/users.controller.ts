import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, Session, UserSession } from '@thallesp/nestjs-better-auth';
import { UsersService } from './users.service';
import { NewUser, Profile } from '../database/schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @UseGuards(AuthGuard)
  async getUserProfile(@Session() session: UserSession) {
    return this.usersService.getUserWithProfile(session.user.id);
  }

  @Post()
  async createUser(@Body() userData: NewUser) {
    return this.usersService.createUser(userData);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.findUserById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateUser(
    @Param('id') id: string,
    @Body() userData: Partial<NewUser>,
  ) {
    return this.usersService.updateUser(id, userData);
  }

  @Put('profile/:userId')
  @UseGuards(AuthGuard)
  async updateProfile(
    @Param('userId') userId: string,
    @Body() profileData: Partial<Profile>,
  ) {
    return this.usersService.updateProfile(userId, profileData);
  }
}
