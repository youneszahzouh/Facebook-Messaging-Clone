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
      senderId: true,
      files: true,
      id: true,
      createdAt: true,
      updatedAt: true
    }
  },
  isGroup: true,
  createdAt: true,
  updatedAt: true
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
    select: {
      content: true,
      senderId: true,
      files: true,
      id: true,
      createdAt: true,
      updatedAt: true
    },
    orderBy: {
      id: 'desc'
    },
    take: 1
  },
  isGroup: true,

  createdAt: true,
  updatedAt: true
} as Prisma.ConversationSelect<DefaultArgs>;
