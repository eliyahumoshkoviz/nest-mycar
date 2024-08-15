import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {

  //need isOptional because validation does not work with Partial<DTO>

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;
}
