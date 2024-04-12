import { Prisma } from '@prisma/client';

export class FileModel implements Prisma.FileCreateInput {
  createdAt?: string | Date;
  mimetype: string;
  name: string;
  size: number;
  url: string;
}
