import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './blog.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { User } from 'src/user/user.entity';
import { CategoryService } from 'src/category/category.service';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog) private blogRepository: Repository<Blog>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly categoryService: CategoryService,
  ) {}

  async createBlog(user: User, blog: CreateBlogDto): Promise<Blog> {
    const newBlog = this.blogRepository.create({
      title: blog.title,
      content: blog.content,
      poster: blog.poster ? blog.poster : '',
    });

    var categories = await Promise.all(
      blog.categories.map(async (category) => {
        const result = await this.categoryService.getCategoryByName(category);

        if (!result) {
          throw new HttpException('Invalid category', HttpStatus.NOT_FOUND);
        }

        return result;
      }),
    );

    newBlog.categories = categories;

    const createdBlog = await this.blogRepository.save(newBlog);
    user.blog.push(createdBlog);
    await this.userRepository.save(user);
    return createdBlog;
  }

  async getBlogById(id: number): Promise<Blog> {
    const blog = await this.blogRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!blog) throw new HttpException('Invalid id', HttpStatus.NOT_FOUND);

    return blog;
  }

  async deleteBlogById(id: number): Promise<DeleteResult> {
    const blog = await this.blogRepository.delete(id);
    return blog;
  }
}
