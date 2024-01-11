import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  create(userData: Partial<User>) {
    const user = this.repo.create(userData);
    return this.repo.save(user);
  }

  async update(id: number, userData: Partial<User>) {
    const savedUser = await this.findOne(id);
    if (!savedUser) {
      throw new NotFoundException('User not found');
    }
    Object.assign(savedUser, userData);
    return this.repo.save(savedUser);
  }

  async remove(id: number) {
    const savedUser = await this.findOne(id);
    if (!savedUser) {
      throw new NotFoundException('User not found');
    }
    return this.repo.remove(savedUser);
  }
}