import { Body, Controller, Get, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import { User } from '../user.entity';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/user.dtos';
@Controller('users')
export class UsersController{
  constructor(
    private userService: UserService,
  ) {}
  
  @Post('auth/sign-up')
  @UsePipes( ValidationPipe)
  signUp(@Body() CreateUserDto: CreateUserDto) {
    return this.userService.createUser(CreateUserDto);
  }
}
 /* @Get()
  hello(): string {
    return 'TESSSSSSSSSST'
  }
  */

