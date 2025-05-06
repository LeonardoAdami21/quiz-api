import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtExpiresIn, jwtSecret } from './env/envoriment';
import { QuestionsModule } from './questions/questions.module';
import { ScoresModule } from './scores/scores.module';
import { JwtAuthGuard } from './auth/jwt/jwt.guard';
import { RolesGuard } from './auth/jwt/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: jwtExpiresIn },
    }),
    UsersModule,
    AuthModule,
    QuestionsModule,
    ScoresModule,
  ],
  providers: [
    JwtService,
    {
      provide: 'APP_GUARD',
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
