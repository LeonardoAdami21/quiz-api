import {
  BadRequestException,
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaClient } from '@prisma/client';
import { SCORE__REPOSITORY } from '../provider/score.provider';
import { CreateScoreDto } from '../dto/create-score.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ScoreRepository {
  constructor(
    @Inject(SCORE__REPOSITORY)
    private readonly scoreRepository: PrismaClient['score'],
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
  ) {}

  async create(dto: CreateScoreDto, userId: string) {
    try {
      const user = await this.usersService.findById(userId);
      const { value } = dto;
      if (!value) {
        throw new BadRequestException('Invalid data provided');
      }
      if (value < 0 || value > 100) {
        throw new ConflictException('Invalid data provided');
      }
      const score = await this.scoreRepository.create({
        data: {
          ...dto,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
      return score;
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while creating the score',
        error,
      );
    }
  }

  async findAll() {
    try {
      const questions = await this.scoreRepository.findMany();
      return questions;
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while retrieving questions',
      );
    }
  }

  async getTopScores(limit: number = 10) {
    try {
      const scores = await this.scoreRepository.findMany({
        orderBy: {
          value: 'desc',
        },
        take: limit,
        include: {
          user: true,
        },
      });
      return scores;
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while retrieving questions',
      );
    }
  }
}
