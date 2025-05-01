import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { ScoresService } from './scores.service';
import { Request } from 'express';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('v2/scores')
@ApiTags('Scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @ApiOperation({ summary: 'Set user score' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post()
  create(@Body() createScoreDto: CreateScoreDto, @Req() req: Request) {
    return this.scoresService.create(createScoreDto, req.user.id);
  }

  @ApiOperation({ summary: 'Get top scores' })
  @ApiOkResponse({ description: 'Return all top scores' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get()
  findAll() {
    return this.scoresService.findAll();
  }

  @ApiOperation({ summary: 'Get top scores' })
  @ApiOkResponse({ description: 'Return all top scores' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiParam({ name: 'limit', required: false })
  @Get('top')
  getTopScores(@Param('limit') limit: number = 10) {
    return this.scoresService.getTopScores(limit);
  }
}
