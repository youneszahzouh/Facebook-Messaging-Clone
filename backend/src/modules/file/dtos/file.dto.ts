import { IsNumber, IsOptional, IsString } from 'class-validator';

const ALL = { groups: ['*'] };
export class FileDTO {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional(ALL)
  @IsString(ALL)
  name: string;

  @IsOptional(ALL)
  @IsString(ALL)
  mimetype?: string;

  @IsString(ALL)
  url?: string;

  @IsNumber()
  size?: number;
}
