import { Injectable } from '@nestjs/common';
import { UserServices } from 'src/user/user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt/dist';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private userServices: UserServices,
    private jwtService: JwtService,
  ) {}

  async checkForUser(email: string): Promise<User> {
    return await this.userServices.getUserByEmail(email);
  }

  async createUser(user: RegisterUserDto): Promise<User> {
    return await this.userServices.createUser(user);
  }

  async generateToken(user: any): Promise<Object> {
    const payload = { id: user.id };

    return this.jwtService.sign(payload);
  }
}
