import { Body, Controller ,Get , Post , Res ,Req, HttpStatus} from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/loginuser.dto';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService:UsersService){}


  @Post('test')
  public async sign(@Body() dto: LoginUserDto, @Req() req: Request) {
    console.log(dto);
    return "ok";
  }

  @Post('login')
  public async signin(@Res() response , @Body() loginuserdto : LoginUserDto)
  {
    console.log(loginuserdto.email , loginuserdto.password);
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

  @Post('create')
  public async createUser(@Body() createUserDto: LoginUserDto) {
    const user = await this.usersService.createUser(createUserDto);
    return { message: 'User created successfully', user };
  }

  

}
