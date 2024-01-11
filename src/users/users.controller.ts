import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { SinginUserDto } from './dtos/signin-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('/users')
@Serialize(UserDto)
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
