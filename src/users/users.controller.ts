import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';

@Controller('users')
export class UsersController {

  @Get('/:id')
  getUser(){}

  @Post()
  createUser(){

  }

  @Delete()
  deleteUser(){}
}
