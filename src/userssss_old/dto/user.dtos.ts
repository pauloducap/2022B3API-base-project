import { Exclude } from "class-transformer";
import { IsNotEmpty, MinLength, IsEmail, IsOptional, } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  username: string;
  @IsNotEmpty()
  @MinLength(8)
  @Exclude()
  password: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  role: 'Employee' | 'Admin' | 'ProjectManager';
}
