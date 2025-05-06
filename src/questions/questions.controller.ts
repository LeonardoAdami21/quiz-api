import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { RolesGuard } from 'src/auth/jwt/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('v2/questions')
@ApiBearerAuth()
@ApiTags('Questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['ADMIN'])
  @ApiOperation({ summary: 'Create question' })
  @ApiCreatedResponse({ description: 'Question created successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Invalid data provided' })
  @ApiInternalServerErrorResponse({
    description: 'An error occurred while creating the question',
  })
  @Post()
  async create(@Body() dto: CreateQuestionDto) {
    return this.questionsService.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['ADMIN'])
  @ApiOperation({ summary: 'Get all questions' })
  @ApiOkResponse({ description: 'Questions found successfully' })
  @ApiInternalServerErrorResponse({
    description: 'An error occurred while finding questions',
  })
  @Get()
  findAll() {
    return this.questionsService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['ADMIN'])
  @ApiOperation({ summary: 'Get question by id' })
  @ApiOkResponse({ description: 'Question found successfully' })
  @ApiNotFoundResponse({ description: 'Question not found' })
  @ApiInternalServerErrorResponse({
    description: 'An error occurred while finding the question',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['ADMIN'])
  @ApiOperation({ summary: 'Update question by id' })
  @ApiOkResponse({ description: 'Question updated successfully' })
  @ApiNotFoundResponse({ description: 'Question not found' })
  @ApiInternalServerErrorResponse({
    description: 'An error occurred while updating the question',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.update(id, updateQuestionDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['ADMIN'])
  @ApiOperation({ summary: 'Delete question by id' })
  @ApiOkResponse({ description: 'Question deleted successfully' })
  @ApiNotFoundResponse({ description: 'Question not found' })
  @ApiInternalServerErrorResponse({
    description: 'An error occurred while deleting the question',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(id);
  }
}
