import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}
  signup(userData: any) {
    this.userService.create(userData);
  }
  signin() {}
}
