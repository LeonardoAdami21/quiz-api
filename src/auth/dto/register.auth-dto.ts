import { ApiProperty } from '@nestjs/swagger';

export class RegisterAuthDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'User name',
    required: true,
    type: String,
  })
  name: string;

  @ApiProperty({
    example: 'john.doe@gmail.com',
    description: 'User email',
    required: true,
    type: String,
  })
  email: string;

  @ApiProperty({
    example: '123456789@Leo',
    description: 'User password',
    required: true,
    type: String,
  })
  password: string;
}
