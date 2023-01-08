import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UnauthorizedException, UseInterceptors, UsePipes, ValidationPipe,UseGuards, Request,BadRequestException, HttpStatus, NotFoundException,  } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { LocalAuthGuard } from '../../auth/guards/local-auth-guard';
import { CreateUserDto, LoginDto } from '../dto/user.dto';
import { UserService } from '../services/user.service'
import { User } from '../user.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    ) {}
    
    
  @Post('auth/sign-up')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Post('auth/login')
  @UsePipes(ValidationPipe)
  @UseGuards(LocalAuthGuard)
  login(@Body() loginDto: LoginDto): Promise<{ access_token: string; }> {
    return this.authService.login(loginDto.email,loginDto.password);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return [req.user, req.email];
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(): Promise<any[]>{
    return this.userService.findAllUsers();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User > {
    if (!id){
      throw new BadRequestException('ID de l\'utilisateur manquant')
    }
    try{
      const user = await this.userService.findOneUser(id);
      return user; 
    }
    catch (error){
      throw new NotFoundException('Utilisateur non trouvé');
    }
    //return this.userService.findOneUser(id);
  }


//   @UseGuards(JwtAuthGuard)
//   @Get(':id')
//   getOne(@Param('id')id : string): Promise<User[]>{
//     return this.userService.findOneUser();
// }

}
