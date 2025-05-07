import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateQuestionDto {
  @ApiProperty({
    example: 'What is your name?',
    description: 'Question title',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({
    example: 1,
    description: 'Correct answer index',
    required: true,
    type: Number,
  })
  @IsInt()
  @IsNumber()
  @Min(0)
  @Max(3)
  correctIndex: number;

  @ApiProperty({
    example: ['A', 'B', 'C', 'D'],
    description: 'Question answers',
    required: true,
    type: Array,
  })
  options: string[];

  @ApiProperty({
    example: 'Math',
    description: 'Question category',
    required: false,
    type: String,
  })
  category?: string;
}
