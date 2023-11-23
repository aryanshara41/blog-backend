import { IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  profilePicture: string;

  @IsString()
  @IsOptional()
  password: string;
}
