import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaClient } from '@prisma/client';
import { QUESTION__REPOSITORY } from '../provider/question.provider';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';

@Injectable()
export class QuestionRepository {
  constructor(
    @Inject(QUESTION__REPOSITORY)
    private readonly questionRepository: PrismaClient['question'],
  ) {}

  async create(dto: CreateQuestionDto) {
    try {
      const { text, correctAnswer, options, category } = dto;
      if (!text || !correctAnswer || !options) {
        throw new BadRequestException('Invalid data provided');
      }
      const question = await this.questionRepository.create({
        data: {
          text,
          correctAnswer,
          options,
          category,
        },
      });
      return question;
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while creating the question',
        error,
      );
    }
  }

  async findAll() {
    try {
      const questions = await this.questionRepository.findMany();
      return questions;
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while retrieving questions',
      );
    }
  }

  async findById(id: string) {
    try {
      const question = await this.questionRepository.findUnique({
        where: { id },
      });
      if (!question) {
        throw new NotFoundException('Question not found');
      }
      return question;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Question not found');
      } else {
        throw new InternalServerErrorException(
          'An error occurred while retrieving the question',
        );
      }
    }
  }

  async findByText(text: string) {
    try {
      const question = await this.questionRepository.findFirst({
        where: { text },
      });
      if (!question) {
        throw new NotFoundException('Question not found');
      }
      return question;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Question not found');
      } else {
        throw new InternalServerErrorException(
          'An error occurred while retrieving the question',
        );
      }
    }
  }

  async update(id: string, dto: UpdateQuestionDto) {
    try {
      const question = await this.questionRepository.findUnique({
        where: { id },
      });
      if (!question) {
        throw new NotFoundException('Question not found');
      }
      await this.questionRepository.update({
        where: { id },
        data: dto,
      });
      return {
        message: 'Question updated successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while updating the question',
      );
    }
  }

  async delete(id: string) {
    try {
      const question = await this.questionRepository.findUnique({
        where: { id },
      });
      if (!question) {
        throw new NotFoundException('Question not found');
      }
      await this.questionRepository.delete({
        where: { id },
      });
      return {
        message: 'Question deleted successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while deleting the question',
      );
    }
  }
}
