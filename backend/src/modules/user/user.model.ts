import { Prisma } from '@prisma/client';

export class User implements Prisma.UserCreateInput {
  id: number;
  firstName: string;
  lastName: string;
  profilePicture?: Prisma.FileCreateNestedOneWithoutUserInput;
}
