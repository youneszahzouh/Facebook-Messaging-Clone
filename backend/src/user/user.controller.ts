import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { CreateUserDTO } from './dtos/create.dto';
import { UpdateUserDTO } from './dtos/update.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne({ id });
  }

  @Post()
  async create(@Body() user: CreateUserDTO): Promise<User> {
    return this.userService.createUser(user);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() user: UpdateUserDTO
  ): Promise<User> {
    return this.userService.updateUser({ where: { id }, data: user });
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<User> {
    return this.userService.deleteUser({ id });
  }
}
