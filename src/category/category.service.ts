import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogCategory } from './blog-category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(BlogCategory)
    private blogCategory: Repository<BlogCategory>,
  ) {}

  async getCategoryByName(category: string): Promise<BlogCategory> {
    return await this.blogCategory.findOne({
      where: {
        category: category,
      },
    });
  }

  async createCategory(category: CreateCategoryDto): Promise<BlogCategory> {
    const newCategory = this.blogCategory.create(category);

    return await this.blogCategory.save(newCategory);
  }
}
