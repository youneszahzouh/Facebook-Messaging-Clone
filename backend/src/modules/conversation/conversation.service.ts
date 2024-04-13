import { Injectable } from '@nestjs/common';
import { Conversation, Prisma } from '@prisma/client';
import { createPaginator } from 'prisma-pagination';
import { PaginatedOutputDto } from 'src/nestjs/decorators/api-paginated-response';
import { PrismaService } from 'src/prisma.service';
import { userSelect } from '../user/user.model';
import { CreateConversationDTO } from './dtos/create.dto';
import {
  selectConversation,
  selectConversationWithLatestMessageOnly
} from './dtos/get.dto';

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    conversationWhereUniqueInput: Prisma.ConversationWhereUniqueInput
  ): Promise<Conversation | null> {
    return this.prisma.conversation.findUnique({
      where: conversationWhereUniqueInput,

      select: {
        id: true,
        users: {
          select: {
            user: {
              select: userSelect
            }
          }
        },
        messages: true
      }
    });
  }

  async findAll(
    userId: number,
    queryParams: {
      page: number;
      limit: number;
    }
  ): Promise<PaginatedOutputDto<Conversation>> {
    const paginate = createPaginator({ perPage: queryParams.limit });

    return paginate<Conversation, Prisma.ConversationFindManyArgs>(
      this.prisma.conversation,
      {
        where: {
          users: { some: { userId } }
        },

        select: selectConversationWithLatestMessageOnly
      },
      { page: queryParams.page }
    );
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
        },
        messages: {
          create: {
            content: conversation.message
          }
        }
      },
      select: selectConversation
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
