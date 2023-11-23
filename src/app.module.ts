import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { EmailModule } from './email/email.module';
import { CloudinaryModule } from 'nestjs-cloudinary';
import { NestCloudinaryModule } from './NestCloudinary/NestCloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    BlogModule,
    AuthModule,
    CategoryModule,
    EmailModule,
    NestCloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
