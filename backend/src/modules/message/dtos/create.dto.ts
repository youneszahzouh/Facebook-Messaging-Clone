import { IsNotEmpty, ValidateIf } from 'class-validator';

export class CreateMessageDTO {
  @IsNotEmpty()
  conversationId: number;

  @ValidateIf((obj) => obj.type === 'TEXT')
  @IsNotEmpty()
  content: string;

  @ValidateIf((obj) => obj.type !== 'TEXT')
  @IsNotEmpty()
  files?: string[]; // Assuming files is an array of file paths

  @IsNotEmpty()
  type: 'TEXT' | 'IMAGE' | 'VIDEO';

  @IsNotEmpty()
  senderId: number;
}
