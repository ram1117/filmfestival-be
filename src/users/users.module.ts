import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([])],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
})
export class UsersModule {}
