import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { SinginUserDto } from './dtos/signin-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { Session } from '@nestjs/common';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('/users')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/user/:id')
  getUser(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id, 10));
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signInUser(@Body() body: SinginUserDto, @Session() session: any) {
    const user = await this.authService.signin(body);
    session.userId = user.id;
    return user;
  }

  @UseGuards(AuthGuard)
  @Post('/signout')
  signOutUser(@Session() session: any) {
    session.userId = null;
    session.currentUser = null;
  }

  @UseGuards(AuthGuard)
  @Get('/whoami')
  whoami(@CurrentUser() user: any) {
    console.log(user);
    return user;
  }
}
