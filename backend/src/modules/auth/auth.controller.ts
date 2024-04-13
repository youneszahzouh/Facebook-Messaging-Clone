import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { SETTINGS } from 'src/nestjs/utils/app.utils';
import { RegisterDto, RegisterResponseDto } from './dtos/register.dto';
import { LocalAuthGuard } from 'src/nestjs/guards/local-auth..guard';
import { LoginResponseDto } from './dtos/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body(SETTINGS.VALIDATION_PIPE)
    registerDto: RegisterDto
  ): Promise<RegisterResponseDto> {
    return await this.authService.register(registerDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): LoginResponseDto {
    console.log('login');
    const returned = this.authService.generateToken(req.user);

    return returned;
  }
}
