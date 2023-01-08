import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/user.dto';
import { User } from '../user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    
  ) {}
  
  async createUser(body: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(body)
    return this.usersRepository.save(newUser)
  }
  async findUser(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: {email:email }}); 
}
  async findAllUsers():Promise<User[]>{
    return this.usersRepository.find()
  }
  async findOneUser(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({id:id});
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }
    return user;
  }

  // async findOneUser(id: string): Promise<User> {
  //   return this.usersRepository.findOneBy({id:id} );
  // }


  // findOneUser():Promise<User[]>{
  //   return this.usersRepository.find()
  // }

// async login(loginDto: LoginDto): Promise<User> {
//   const user = await this.usersRepository.findOne({ email: loginDto.email });
// }

}
