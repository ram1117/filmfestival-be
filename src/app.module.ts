import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entity/user.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      entities: [User],
      database: 'filmfestival.sqlite',
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
