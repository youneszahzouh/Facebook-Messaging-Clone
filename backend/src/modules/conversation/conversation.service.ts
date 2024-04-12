import { Injectable } from '@nestjs/common';
import { Conversation, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateConversationDTO } from './dtos/create.dto';
import { userSelect } from '../user/user.model';

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    conversationWhereUniqueInput: Prisma.ConversationWhereUniqueInput
  ): Promise<Conversation | null> {
    return this.prisma.conversation.findUnique({
      where: conversationWhereUniqueInput
    });
  }

  async findAll(): Promise<any[]> {
    return this.prisma.conversation.findMany({
      select: {
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
      }
    });
  }

  async findByUser(userId: number): Promise<any[]> {
    return this.prisma.conversation.findMany({
      where: {
        users: { some: { userId } }
      },
      select: {
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
      }
    });
  }

  async createConversation(
    conversation: CreateConversationDTO
  ): Promise<Conversation> {
    return this.prisma.conversation.create({
      data: {
        users: {
          create: conversation.users.map((id) => ({
            user: { connect: { id } }
          }))
        }
      }
    });
  }

  async updateConversation(params: {
    where: Prisma.ConversationWhereUniqueInput;
    data: Prisma.ConversationUpdateInput;
  }): Promise<Conversation> {
    const { where, data } = params;
    return this.prisma.conversation.update({
      data,
      where
    });
  }

  async deleteConversation(
    where: Prisma.ConversationWhereUniqueInput
  ): Promise<Conversation> {
    return this.prisma.conversation.delete({
      where
    });
  }
}
