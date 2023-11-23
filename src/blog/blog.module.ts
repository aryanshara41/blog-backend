import { Module } from "@nestjs/common";
import { Blog } from "./blog.entity";
import { UserModule } from "src/user/user.module";
import { BlogController } from "./blog.controller";
import { BlogService } from "./blog.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryModule } from "src/category/category.module";

@Module({
    imports: [UserModule, TypeOrmModule.forFeature([Blog]), CategoryModule],
    controllers: [BlogController],
    providers: [Blog, BlogService]
})
export class BlogModule{}