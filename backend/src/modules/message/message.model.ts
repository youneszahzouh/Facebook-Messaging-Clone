import { Prisma } from '@prisma/client';

export class Conversation implements Prisma.ConversationCreateInput {
  users?: Prisma.UsersOnConversationsCreateNestedManyWithoutConversationInput;
  messages?: Prisma.MessageCreateNestedManyWithoutConversationInput;
}
