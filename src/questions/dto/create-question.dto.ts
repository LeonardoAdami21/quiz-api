import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiProperty({
    example: 'What is your name?',
    description: 'Question title',
    required: true,
    type: String,
  })
  text: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Question correct answer',
    required: true,
    type: String,
  })
  correctAnswer: string;

  @ApiProperty({
    example: ['A', 'B', 'C', 'D'],
    description: 'Question answers',
    required: true,
    type: [String],
  })
  options: string[];

  @ApiProperty({
    example: 'General Knowledge',
    description: 'Question category',
    required: false,
    type: String,
  })
  category?: string;
}
