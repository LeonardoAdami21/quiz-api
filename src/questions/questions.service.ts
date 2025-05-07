import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionRepository } from './prisma/question.repository';

@Injectable()
export class QuestionsService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async create(dto: CreateQuestionDto) {
    try {
      const { correctIndex, ...rest } = dto;
      const correctIndexNumber = Number(correctIndex);

      const question = await this.questionRepository.create({
        ...rest,
        correctIndex: correctIndexNumber,
      });
      return question;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    return this.questionRepository.findAll();
  }

  async findOne(id: string) {
    return this.questionRepository.findById(id);
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    return this.questionRepository.update(id, updateQuestionDto);
  }

  async remove(id: string) {
    return this.questionRepository.delete(id);
  }
}
