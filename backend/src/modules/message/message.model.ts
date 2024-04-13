import { $Enums, Prisma } from '@prisma/client';

export class Message implements Prisma.MessageCreateWithoutConversationInput {
  content?: string;
  files?: Prisma.FileCreateNestedManyWithoutMessageInput;
  senderId: number;
  type: $Enums.MessageType;
  conversationId: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
