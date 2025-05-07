import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { ScoresService } from './scores.service';
import { Request } from 'express';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { RolesGuard } from 'src/auth/jwt/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('v2/scores')
@ApiBearerAuth()
@ApiTags('Scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Set user score' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post()
  create(@Body() createScoreDto: CreateScoreDto, @Req() req: Request) {
    const formattedValue = +createScoreDto.value;
    return this.scoresService.create({ value: formattedValue }, req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get top scores' })
  @ApiOkResponse({ description: 'Return all top scores' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get()
  findAll() {
    return this.scoresService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get top scores by user id' })
  @ApiOkResponse({ description: 'Return all top scores' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get('/user')
  findAllToScoreByUser(@Req() req: Request) {
    return this.scoresService.findAllToScoreByUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
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
