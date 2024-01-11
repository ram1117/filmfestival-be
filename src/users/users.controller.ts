import { Controller, Get, Post, Patch, Delete, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Get('/user/:id')
  getUser(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id, 10));
  }

  @Post('/signup')
  async createUser(userData: any) {
    return this.authService.signup(userData);
  }

  @Post('/signin')
  signInUser() {}

  @Delete('/user/:id')
  deleteUser(@Param('id') id: string) {
    this.userService.remove(parseInt(id, 10));
  }
}
