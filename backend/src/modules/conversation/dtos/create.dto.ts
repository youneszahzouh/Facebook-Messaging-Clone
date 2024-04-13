import {
  ArrayMinSize,
  IsObject
} from 'class-validator';
import { CreateMessageDTO } from 'src/modules/message/dtos/create.dto';

export class CreateConversationDTO {
  @ArrayMinSize(1)
  users: number[];

  @IsObject()
  message: Omit<CreateMessageDTO, 'conversationId'>;
}
