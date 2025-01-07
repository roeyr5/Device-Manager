import { Controller, Get, Post, Res,Body,HttpStatus} from '@nestjs/common';
import { SimulatorService } from './simulator.service';
import { SimulatorDto } from './dto/simulator.dto';

@Controller('simulator')
export class SimulatorController {

  constructor(private readonly simulatorservice:SimulatorService){}

  @Post('StartIcd')
  public async StartIcd(@Res() res: Request, @Body() dto: SimulatorDto ) 
  {
    this.simulatorservice.StartIcd()
  }
  
  @Post('StartPcap')
  public async StartPcap( @Res() res: Request, @Body() dto: SimulatorDto) 
  {
    
  }
  @Get('Pause')
  public async Pause( @Res() res: Request) 
  {
  }
  @Get('Stop')
  public async Stop(@Res() res: Request) 
  {
  }
  @Get('Continue')
  public async Continue(@Res() res: Request) 
  {
  }
}


//   @Post('login')
//   public async signin(@Res() response , @Body() loginuserdto : LoginUserDto)
//   {
//     console.log(loginuserdto.email , loginuserdto.password);
//     try
//     {
//       const LoginUser = await this.usersService.signin(loginuserdto)
//       return response.status(HttpStatus.OK).json({
//         message: 'Login success'});
//     }
//     catch(err)
//     { 
//       return response.status(HttpStatus.BAD_REQUEST).json({
//         statusCode: 400,
//         message: 'Error: Login unsuccess',
//         error: 'Bad Request'
//      });
//     }
//   }

//   @Post('create')
//   public async createUser(@Res() response ,@Body() createUserDto: LoginUserDto) {
//     const existmail = await this.usersService.Checkmail(createUserDto.email);
//     if(existmail)
//       {
//       return response.status(HttpStatus.BAD_REQUEST).json({
//         statusCode: 400,
//         message: 'Signup unsuccess, mail already exists in system',
//         error: 'Bad Request'
//        });
//       } 
//     const user = await this.usersService.createUser(createUserDto);
//     if(user){
//       return response.status(HttpStatus.OK).json({
//         message: 'Created user'});
//     }
//   }

  

// }
