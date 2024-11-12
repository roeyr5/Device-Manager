import { Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/loginuser.dto';

@Injectable()
export class UsersService {


  findOne(email: string) {
    return this.collection.find(user => user.email === email);
  }

  signin(loginuserdto:LoginUserDto) {

  }

}
