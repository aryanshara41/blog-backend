import { Module } from '@nestjs/common';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserServices } from './user.service';
import { UserController } from './user.controller';
import { NestCloudinaryModule } from 'src/NestCloudinary/NestCloudinary.module';

@Module({
  imports: [NestCloudinaryModule,TypeOrmModule.forFeature([User])],
  providers: [UserServices],
  controllers: [UserController],
  exports: [UserServices, TypeOrmModule],
})
export class UserModule {}
