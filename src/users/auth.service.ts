import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from './dtos/create-user.dto';
import { SinginUserDto } from './dtos/signin-user.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}
  async signup(userData: CreateUserDto) {
    const users = await this.userService.findByEmail(userData.email);
    if (users.length)
      throw new BadRequestException('Email already exists, please sign in');
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(userData.password, salt, 32)) as Buffer;
    const encryptedPwd = `${hash.toString('hex')}.${salt}`;

    const newUser = await this.userService.create({
      ...userData,
      password: encryptedPwd,
    });
    return newUser;
  }
  async signin(userData: SinginUserDto) {
    const [user] = await this.userService.findByEmail(userData.email);
    if (!user) throw new NotFoundException('User not found');
    const storedPwd = user.password;
    const [storedHash, salt] = storedPwd.split('.');
    const hash = (await scrypt(userData.password, salt, 32)) as Buffer;
    if (hash.toString('hex') !== storedHash) {
      throw new BadRequestException('Invalid password');
    }

    return user;
  }
}
