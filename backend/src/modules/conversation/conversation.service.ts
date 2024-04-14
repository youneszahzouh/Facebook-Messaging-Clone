import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Conversation, Prisma } from '@prisma/client';
import { createPaginator } from 'prisma-pagination';
import { PaginatedOutputDto } from 'src/nestjs/decorators/api-paginated-response';
import { PrismaService } from 'src/prisma.service';
import { CreateConversationDTO } from './dtos/create.dto';
import {
  selectConversation,
  selectConversationWithLatestMessageOnly
} from './dtos/get.dto';

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    conversationWhereUniqueInput: Prisma.ConversationWhereUniqueInput,
    userId: number
  ): Promise<Conversation | null> {
    return this.prisma.conversation.findUnique({
      where: conversationWhereUniqueInput,
      select: selectConversation(userId)
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

    const paginated = await paginate<
      Conversation,
      Prisma.ConversationFindManyArgs
    >(
      this.prisma.conversation,
      {
        where: {
          users: { some: { userId } }
        },

        select: selectConversationWithLatestMessageOnly(userId)
      },
      { page: queryParams.page }
    );

    console.log(
      '%csrcmodulesconversationconversation.service.ts:46 paginated',
      'color: #26bfa5;',
      paginated
    );
    return paginated;
  }

  async createConversation(
    conversation: CreateConversationDTO,
    userId: number
  ): Promise<Conversation> {
    const existingConversation = await this.prisma.conversation.findFirst({
      where: {
        AND: [
          { users: { some: { userId: conversation.users[0] } } },
          { users: { some: { userId: conversation.users[1] } } },
          { isGroup: false }
        ]
      }
    });

    const uniqueUsers = new Set([...conversation?.users, userId]);

    const users = Array.from(uniqueUsers);

    if (existingConversation) {
      throw new HttpException(
        'Conversation already exists',
        HttpStatus.CONFLICT
      );
    } else {
      return this.prisma.conversation.create({
        data: {
          users: {
            create: users.map((id) => ({
              user: { connect: { id } }
            }))
          },
          isGroup: users?.length > 2,
          messages: {
            create: {
              type: conversation.message.type,
              senderId: userId,
              content: conversation.message.content
            }
          }
        },
        select: selectConversation(userId)
      });
    }
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
