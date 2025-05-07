import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { PrismaConfigModule } from 'src/config/prisma.config.module';
import { questionsProvider } from './provider/question.provider';
import { QuestionRepository } from './prisma/question.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaConfigModule],
  controllers: [QuestionsController],
  providers: [QuestionsService, ...questionsProvider, QuestionRepository],
})
export class QuestionsModule {}
