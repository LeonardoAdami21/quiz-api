import { Module } from '@nestjs/common';
import { PrismaConfigModule } from '../config/prisma.config.module';
import { UserRepository } from './prisma/user.repository';
import { usersProvider } from './provider/user.provider';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [PrismaConfigModule],
  controllers: [UsersController],
  providers: [UsersService, ...usersProvider, UserRepository],
  exports: [UsersService],
})
export class UsersModule {}
