import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogCategory } from './blog-category.entity';
import { CategoryController } from './category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BlogCategory])],
  providers: [CategoryService],
  controllers: [CategoryController],
  exports: [CategoryService],
})
export class CategoryModule {}
