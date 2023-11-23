import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { EmailService } from 'src/email/email.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authServices: AuthService,
    private readonly emailService: EmailService,
  ) {}

  @Post('register')
  async register(@Body() user: RegisterUserDto): Promise<User> {
    const IsUserExits = await this.authServices.checkForUser(user.email);
    if (IsUserExits) {
      throw new HttpException(
        'Email already exists',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const newuser = await this.authServices.createUser(user);
    const token = Math.floor(1000 + Math.random() * 9000).toString();
    await this.emailService.sendUserWelcome(newuser, token);
    return newuser;
  }

  @Post('login')
  async login(
    @Body() user: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<object> {
    const IsUserExits = await this.authServices.checkForUser(user.email);
    if (!IsUserExits) {
      throw new HttpException("User doesn't exists", HttpStatus.NOT_FOUND);
    }
    if (!(await IsUserExits.comparePassword(user.password))) {
      throw new HttpException('Wrong password', HttpStatus.CONFLICT);
    }
    const result = await this.authServices.generateToken(IsUserExits);
    response.cookie('token', result);
    response.cookie('user', JSON.stringify(IsUserExits));
    return {
      success: true,
    };
  }
}
