import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Conversation } from '@prisma/client';
import { ConversationService } from './conversation.service';
import { CreateConversationDTO } from './dtos/create.dto';

@Controller('conversations')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Get()
  async findAll(): Promise<Conversation[]> {
    return this.conversationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Conversation> {
    return this.conversationService.findOne({ id });
  }

  @Get('byUser/:id')
  async findByUser(@Param('id') userId: number): Promise<Conversation[]> {
    return this.conversationService.findByUser(userId);
  }

  @Post()
  async create(
    @Body() conversation: CreateConversationDTO
  ): Promise<Conversation> {
    return this.conversationService.createConversation(conversation);
  }

  // @Put(':id')
  // async update(
  //   @Param('id') id: number,
  //   @Body() conversation: UpdateConversationDTO
  // ): Promise<Conversation> {
  //   return this.conversationService.updateConversation({ where: { id }, data: conversation });
  // }

  @Delete(':id')
  async deleteConversation(@Param('id') id: number): Promise<Conversation> {
    return this.conversationService.deleteConversation({ id });
  }
}
