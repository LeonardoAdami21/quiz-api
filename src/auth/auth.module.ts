import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';

import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { RolesGuard } from './jwt/roles.guard';
import { jwtExpiresIn, jwtSecret } from 'src/env/envoriment';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: jwtExpiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, JwtService, RolesGuard],
  exports: [AuthService, JwtService, JwtAuthGuard, RolesGuard],
})
export class AuthModule {}
