import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Message } from '@prisma/client';
import { CreateMessageDTO } from './dtos/create.dto';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  async findAll(): Promise<Message[]> {
    return this.messageService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Message> {
    return this.messageService.findOne({ id });
  }

  @Post()
  async create(@Body() message: CreateMessageDTO): Promise<Message> {
    console.log(
      '%csrcmodulesmessagemessage.controller.ts:25 message',
      'color: #26bfa5;',
      message
    );
    return this.messageService.createMessage(message);
  }

  // @Put(':id')
  // async update(
  //   @Param('id') id: number,
  //   @Body() message: UpdateMessageDTO
  // ): Promise<Message> {
  //   return this.messageService.updateMessage({ where: { id }, data: message });
  // }

  @Delete(':id')
  async deleteMessage(@Param('id') id: number): Promise<Message> {
    return this.messageService.deleteMessage({ id });
  }
}
