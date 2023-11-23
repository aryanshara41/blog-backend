import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  profilePicture: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
