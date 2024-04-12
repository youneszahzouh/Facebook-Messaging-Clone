import { Injectable } from '@nestjs/common';
import { Message, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateMessageDTO } from './dtos/create.dto';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    messageWhereUniqueInput: Prisma.MessageWhereUniqueInput
  ): Promise<Message | null> {
    return this.prisma.message.findUnique({
      where: messageWhereUniqueInput
    });
  }

  async findAll(): Promise<any[]> {
    return this.prisma.message.findMany();
  }

  async createMessage(message: CreateMessageDTO): Promise<Message> {
    return this.prisma.message.create({
      data: {
        content: message.content,
        conversation: {
          connect: { id: message.conversationId }
        }
      }
    });
  }

  async updateMessage(params: {
    where: Prisma.MessageWhereUniqueInput;
    data: Prisma.MessageUpdateInput;
  }): Promise<Message> {
    const { where, data } = params;
    return this.prisma.message.update({
      data,
      where
    });
  }

  async deleteMessage(where: Prisma.MessageWhereUniqueInput): Promise<Message> {
    return this.prisma.message.delete({
      where
    });
  }
}
