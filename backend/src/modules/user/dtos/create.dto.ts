import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  @ValidateNested()
  profilePicture: Prisma.FileCreateNestedOneWithoutUserInput;
}
