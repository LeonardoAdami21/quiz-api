import { forwardRef, Module } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { PrismaConfigModule } from 'src/config/prisma.config.module';
import { scoresProvider } from './provider/score.provider';
import { ScoreRepository } from './prisma/score.repository';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [PrismaConfigModule, forwardRef(() => UsersModule)],
  controllers: [ScoresController],
  providers: [ScoresService, ...scoresProvider, ScoreRepository],
})
export class ScoresModule {}
