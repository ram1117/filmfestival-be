import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  findOne(id: number) {}

  create(userData: any) {}

  update() {}

  remove(id:number){}
}
