import { Body, Controller ,Get , Post , Res , HttpStatus} from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/loginuser.dto';



@Controller('users')
export class UsersController {
  constructor(private readonly usersService:UsersService){}


  @Post()
  async signin(@Res() response , @Body() loginuserdto : LoginUserDto)
  {
    try
    {
      const LoginUser = await this.usersService.signin(loginuserdto)
      return response.status(HttpStatus.OK).json({
        message: 'Login success'});
    }
    catch(err)
    {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Login unsuccess',
        error: 'Bad Request'
     });
    }
  }

  

}
