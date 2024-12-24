import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/loginuser.dto';
import { IUsers } from './interfaces/users.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schemas/users.schema';
import * as bcrypt from 'bcrypt'; 


@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private UsersModel: Model<IUsers>) { }

  public async signin(loginuserdto:LoginUserDto) : Promise<IUsers> {
    const user = await this.UsersModel.findOne({email : loginuserdto.email}).exec();
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }
    const isPasswordMatching = await bcrypt.compare(loginuserdto.password, user.password); 
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return user;    
  }

  public async createUser(createUserDto: LoginUserDto): Promise<IUsers> {
    const { email, password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10); 
    const newUser = new this.UsersModel({ email, password: hashedPassword });
    return await newUser.save();
  }

  public async Checkmail(email:string) :Promise<IUsers>{
    const user = await this.UsersModel.findOne({email : email}).exec();
    return user;
  }

}
