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
    console.log(loginuserdto.email);
    const user = await this.UsersModel.findOne({email : loginuserdto.email}).exec();
    console.log(user);
    if (!user) {
      console.log(1);
      throw new UnauthorizedException('Invalid email');
    }
    const isPasswordMatching = (loginuserdto.password === user.password);
    if (!isPasswordMatching) {
      console.log(2);
      throw new UnauthorizedException('Invalid email or password');
    }
    console.log(3);
    return user;    
  }

  async createUser(createUserDto: LoginUserDto): Promise<IUsers> {

    const { email, password } = createUserDto;
    const newUser = new this.UsersModel({ email, password });
    return await newUser.save(); // This saves the user to the database
  }

}
