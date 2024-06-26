import { Prisma } from '@prisma/client';

export class User implements Prisma.UserCreateInput {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  profilePicture?: Prisma.FileCreateNestedOneWithoutUserInput;
}

export const userSelect = {
  firstName: true,
  lastName: true,
  id: true,
  email: true,
  profilePictureId: false,
  profilePicture: {
    select: {
      mimetype: true,
      name: true,
      size: true,
      url: true
    }
  }
};
