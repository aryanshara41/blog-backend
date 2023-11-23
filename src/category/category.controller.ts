import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { BlogCategory } from './blog-category.entity';
import { CreateCategoryDto } from './create-category.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/roles.guard';
import { Roles } from 'src/roles.decorator';
import { UserRole } from 'src/user/user.entity';

@Controller('category')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Roles([UserRole.ADMIN])
  async createCategory(
    @Body() category: CreateCategoryDto,
  ): Promise<BlogCategory> {
    const IsCategoryExists = await this.categoryService.getCategoryByName(
      category.category,
    );
    if (IsCategoryExists) {
      throw new HttpException('Category already exists', HttpStatus.FOUND);
    }

    return this.categoryService.createCategory(category);
  }
}
