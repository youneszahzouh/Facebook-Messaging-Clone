import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/prisma.service';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { RegisterResponseDto } from './dtos/register.dto';

import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,

    private jwtService: JwtService
  ) {}

  async register(
    registerDto: Prisma.UserCreateInput
  ): Promise<RegisterResponseDto> {
    const user = await this.prisma.user.create({
      data: {
        ...registerDto,
        password: await this.hashPassword(registerDto.password)
      }
    });

    return plainToInstance(RegisterResponseDto, user);
  }

  async validateUserCreds(
    email: string,
    password: string
  ): Promise<User | undefined> {
    const user = await this.userService.findBy({ email });

    if (!user) throw new BadRequestException();

    const isPasswordCorrect = await this.comparePassword(
      password,
      user.password
    );

    console.log(isPasswordCorrect);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException();
    }

    return user;
  }

  generateToken(user: User) {
    return {
      accessToken: this.jwtService.sign({
        email: user.email,
        sub: user.id
      }),
      refreshToken: this.jwtService.sign(
        {
          email: user.email,
          sub: user.id
        },
        {
          expiresIn: '7d'
        }
      ),
      userId: user.id
    };
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt();
    return hash(password, salt);
  }

  async comparePassword(
    providedPass: string,
    storedPass: string
  ): Promise<boolean> {
    return compare(providedPass, storedPass);
  }
}
