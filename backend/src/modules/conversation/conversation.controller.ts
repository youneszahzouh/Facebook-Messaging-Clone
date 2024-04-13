import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';
import { Conversation } from '@prisma/client';
import {
  PaginatedOutputDto
} from 'src/nestjs/decorators/api-paginated-response';
import { GetUser } from 'src/nestjs/decorators/get-user.decorator';
import { JwtAuthGuard } from 'src/nestjs/guards/jwt-auth..guard';
import { User } from '../user/user.model';
import { ConversationService } from './conversation.service';
import { CreateConversationDTO } from './dtos/create.dto';

@Controller('conversations')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @GetUser() user: User,

    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ): Promise<PaginatedOutputDto<Conversation>> {
    return this.conversationService.findAll(user.id, {
      page: page,
      limit: limit
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: number): Promise<Conversation> {
    return this.conversationService.findOne({ id });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  async deleteConversation(@Param('id') id: number): Promise<Conversation> {
    return this.conversationService.deleteConversation({ id });
  }
}
