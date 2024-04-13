import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { userSelect } from 'src/modules/user/user.model';

export class GetConversationDTO {
  id: string;

  users: number[];
  messages: number[];
}

export const selectConversation = {
  id: true,
  users: {
    select: {
      user: {
        select: userSelect
      }
    }
  },
  messages: {
    select: {
      content: true,
      id: true
    }
  }
};

export const selectConversationWithLatestMessageOnly = {
  id: true,
  users: {
    select: {
      user: {
        select: userSelect
      }
    }
  },
  messages: {
    orderBy: {
      id: 'desc'
    },
    take: 1
  }
} as Prisma.ConversationSelect<DefaultArgs>;
