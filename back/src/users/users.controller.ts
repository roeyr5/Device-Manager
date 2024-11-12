import { Body, Controller ,Get , Post} from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/loginuser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService:UsersService){}


  @Post()
  async signin(@Body() loginuserdto : LoginUserDto)
  {
    return this.usersService.signin(loginuserdto);
  }

  @Get(':email')
  findOne(@Param('email') email: string)
   {
    return this.usersService.findOne(email);
  }

}
