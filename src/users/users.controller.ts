import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { SinginUserDto } from './dtos/signin-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('/users')
@UseInterceptors(ClassSerializerInterceptor)
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
  async createUser(@Body() body: CreateUserDto) {
    return this.authService.signup(body);
  }

  @Post('/signin')
  signInUser(@Body() body:SinginUserDto) {
    return this.authService.signin(body)
  }

  @Delete('/user/:id')
  deleteUser(@Param('id') id: string) {
    this.userService.remove(parseInt(id, 10));
  }
}
