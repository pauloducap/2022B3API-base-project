import { Injectable, UnauthorizedException,NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/services/user.service';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    let passwordValid = false;
    const user = await this.usersService.findUser(email);
    if (!user) return null;
    if (password === user.password) {
      passwordValid = true;
    }
    if (!user) {
        throw new NotAcceptableException('utilisateur inconnu');
    }
    if (user && !passwordValid) {
        throw new UnauthorizedException('mauvais mot de passe');
    }
    return user;

}

async login(email:string, password:string) {
    const validatedUser = await this.validateUser(email, password)
    const payload = { 
      email: validatedUser.email,
      sub: validatedUser.id
    };
    return {
      access_token: this.jwtService.sign(payload, { secret : process.env.JWT_KEY }),    };
  }
}
