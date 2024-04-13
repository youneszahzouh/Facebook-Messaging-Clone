import { IsNotEmpty, Length, Matches } from 'class-validator';
import { MESSAGES, REGEX } from 'src/nestjs/utils/app.utils';

export class LoginDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @Length(8, 24)
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  password: string;
}

export class LoginResponseDto {
  accessToken: string;
  refreshToken: string;
  userId: number;
}
