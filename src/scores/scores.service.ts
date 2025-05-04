import {
  BadRequestException,
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { ScoreRepository } from './prisma/score.repository';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ScoresService {
  constructor(
    private readonly scoreRepository: ScoreRepository,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
  ) {}
  async create(dto: CreateScoreDto, userId: string) {
    try {
      const user = await this.usersService.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const score = await this.scoreRepository.create(dto, userId);
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
      const questions = await this.scoreRepository.findAll();
      return questions;
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while retrieving questions',
      );
    }
  }

  async findAllToScoreByUser(userId: string) {
    try {
      const questions = await this.scoreRepository.findAllToScoreByUser(
        userId,
      );
      return questions;
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while retrieving questions',
      );
    }
  }

  async getTopScores(limit: number = 10) {
    try {
      const scores = await this.scoreRepository.getTopScores(limit);
      return scores;
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while retrieving questions',
      );
    }
  }
}
