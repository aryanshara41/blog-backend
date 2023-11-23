import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Blog } from './blog.entity';
import { BlogService } from './blog.service';
import { UserServices } from 'src/user/user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DeleteResult } from 'typeorm';

@Controller('blog')
@UseGuards(JwtAuthGuard)
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    private readonly userService: UserServices,
  ) {}

  @Post(':userId')
  async createBlog(
    @Param('userId') userId: number,
    @Body() blog: CreateBlogDto,
  ): Promise<Blog> {
    const user = await this.userService.getUserById(userId);

    console.log(user, userId);

    if (!user) {
      throw new HttpException('Invalid user id', HttpStatus.NOT_FOUND);
    }

    return this.blogService.createBlog(user, blog);
  }

  @Get(':blogId')
  async getBlog(@Param('blogId') blogId: number): Promise<Blog> {
    return await this.blogService.getBlogById(blogId);
  }

  @Delete(':blogId')
  async deleteBlog(@Param('blogId') blogId: number): Promise<DeleteResult> {
    return this.blogService.deleteBlogById(blogId);
  }
}
