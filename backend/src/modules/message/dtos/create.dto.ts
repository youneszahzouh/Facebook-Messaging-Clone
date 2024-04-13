import { IsNotEmpty } from 'class-validator';

export class CreateMessageDTO {
  @IsNotEmpty()
  conversationId: number;

  @IsNotEmpty()
  content: string;
}
