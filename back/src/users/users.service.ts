import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/loginuser.dto';
import { IUsers } from './interfaces/users.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private UsersModel: Model<IUsers>) { }


  async signin(loginuserdto:LoginUserDto) : Promise<IUsers> {
    const user = await this.UsersModel.findOne({email : loginuserdto.email}).exec();
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const isPasswordMatching = (loginuserdto.password === user.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid email or password');
    }
    
    return user;    
  }

}
