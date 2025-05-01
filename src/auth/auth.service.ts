import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { RegisterAuthDto } from './dto/register.auth-dto';
import { LoginAuthDto } from './dto/login.auth-dto';
@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    const isMatch = await argon2.verify(user.password, pass);
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(dto: RegisterAuthDto) {
    try {
      const { name, email, password } = dto;
      if (!name || !email || !password) {
        throw new BadRequestException('Invalid data provided');
      }
      const hashPassword = await argon2.hash(password);
      const user = await this.usersService.create({
        name,
        email,
        password: hashPassword,
      });
      return {
        message: 'User created successfully',
        user,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while creating the user',
        error,
      );
    }
  }

  async login(dto: LoginAuthDto) {
    try {
      const user = await this.validateUser(dto.email, dto.password);
      if (!user) {
        throw new BadRequestException('Invalid credentials');
      }
      const payload = { email: user.email, sub: user.id, id: user.id };
      const token = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1h',
      });
      return {
        message: 'User login successfully',
        access_token: token,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while login the user',
        error,
      );
    }
  }
}
