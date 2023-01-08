import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @MinLength(8)
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsIn(['Employee','Admin','ProjectManager'])
  role: 'Employee' | 'Admin' | 'ProjectManager'
}

export class LoginDto {
  @MinLength(8)
  @IsEmail()
  email: string;
  @IsString()
  password!: string;
}

