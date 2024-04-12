import { ArrayMinSize } from 'class-validator';

export class CreateConversationDTO {
  @ArrayMinSize(2)
  users: number[];
}
