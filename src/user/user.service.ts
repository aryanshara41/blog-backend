import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DeleteResult, InsertResult, Repository } from 'typeorm';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class UserServices {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(user: RegisterUserDto): Promise<User> {
    const newUser = this.userRepository.create(user);
    await newUser.hashPassword();
    return await this.userRepository.save(newUser);
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async getUserById(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        blog: true,
      },
    });
  }

  async updateUser(id: number, userData: UpdateUserDto): Promise<User> {
    const user = await this.getUserById(id);
    if (!user) {
      throw new HttpException('Invalid id', HttpStatus.NOT_FOUND);
    }

    if (userData.name) user.name = userData.name;
    if (userData.profilePicture) user.profilePicture = userData.profilePicture;
    if (userData.password) {
      user.password = userData.password;
      await user.hashPassword();
    }

    return await this.userRepository.save(user);
  }

  async uploadProfilePicture(
    user: User,
    profilePictureUrl: string,
  ): Promise<User> {
    user.profilePicture = profilePictureUrl;
    return await this.userRepository.save(user);
  }

  async deleteUserById(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}
