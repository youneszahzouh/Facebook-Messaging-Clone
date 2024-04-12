import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { FileUploader } from 'src/nestjs/decorators/file-uploader';
import { FileDataMapper } from 'src/nestjs/mappers/file-mapper';
import { CreateUserDTO } from './dtos/create.dto';
import { UserService } from './user.service';
import { UpdateUserDTO } from './dtos/update.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<Partial<User>[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne({ id });
  }

  @Post()
  @UseInterceptors(
    FileUploader({
      uploadFields: [{ name: 'profilePicture' }],
      acceptedTypes: ['image/png', 'image/jpg', 'image/jpeg']
    })
  )
  async create(
    @Body() user: CreateUserDTO,
    @UploadedFiles() files: { profilePicture?: Express.Multer.File }
  ): Promise<User> {
    if (files?.profilePicture) {
      user.profilePicture = FileDataMapper.fromExpressToDomain(
        files?.profilePicture[0]
      ) as Prisma.FileCreateNestedOneWithoutUserInput;
    }

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
