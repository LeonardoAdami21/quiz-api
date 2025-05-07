import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class CreateScoreDto {
  @ApiProperty({
    example: 100,
    description: 'User score',
    required: true,
    type: Number,
  })
  @IsNumber()
  value: number;
}
