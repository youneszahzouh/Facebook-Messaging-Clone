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
import { ConversationService } from './conversation.service';
import { CreateConversationDTO } from './dtos/create.dto';
import {
  ApiPaginatedResponse,
  PaginatedOutputDto
} from 'src/nestjs/decorators/api-paginated-response';
import { GetConversationDTO } from './dtos/get.dto';
import { JwtAuthGuard } from 'src/nestjs/guards/jwt-auth..guard';

@Controller('conversations')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<Conversation[]> {
    return this.conversationService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: number): Promise<Conversation> {
    return this.conversationService.findOne({ id });
  }

  @Get('byUser/:id')
  @UseGuards(JwtAuthGuard)
  @ApiPaginatedResponse(GetConversationDTO) // Substitua CategoryDto pelo seu DTO de saída
  async findByUser(
    @Param('id') userId: number,

    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ): Promise<PaginatedOutputDto<Conversation>> {
    return this.conversationService.findByUser(userId, {
      page: page,
      limit: limit
    });
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
