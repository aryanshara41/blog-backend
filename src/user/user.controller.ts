import {
  Controller,
  Get,
  UseGuards,
  Delete,
  Param,
  Put,
  Body,
  HttpException,
  HttpStatus,
  UploadedFile,
  Post,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { UserServices } from './user.service';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DeleteResult } from 'typeorm';
import { UpdateUserDto } from './update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'nestjs-cloudinary';
import Request from 'express';
import { ResourceAcessGuard } from 'src/resource-access.guard';

@Controller('user')
@UseGuards(JwtAuthGuard, ResourceAcessGuard)
export class UserController {
  constructor(
    private userServices: UserServices,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Post('profile-picture/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfilePicture(
    @Param('id') id: number,
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const user = await this.userServices.getUserById(id);

    if (!user) {
      throw new HttpException('No such user found', HttpStatus.NOT_FOUND);
    }

    const uploadedPic = await this.cloudinaryService.uploadFile(file);

    return await this.userServices.uploadProfilePicture(user, uploadedPic.url);
  }

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<User> {
    const user = await this.userServices.getUserById(id);

    if (!user) throw new HttpException('Invalid id', HttpStatus.NOT_FOUND);

    return user;
  }

  @Get('profile')
  async getProfileInfo(@Req() req): Promise<User> {
    const user = await this.userServices.getUserById(req.user.id);
    if (!user) {
      throw new HttpException("User doesn't exists", HttpStatus.NOT_FOUND);
    }

    return user;
  }

  @Delete(':id')
  async deleteUserByid(@Param('id') id): Promise<DeleteResult> {
    return this.userServices.deleteUserById(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    return await this.userServices.updateUser(id, user);
  }
}
