import { ArrayMinSize, IsNotEmpty } from 'class-validator';

export class CreateConversationDTO {
  @ArrayMinSize(2)
  users: number[];

  @IsNotEmpty()
  message: string;
}
