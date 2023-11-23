import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsOptional()
  poster: string;

  @IsArray()
  categories: string[];

  @IsString()
  title: string;

  @IsString()
  content: string;
}
