import { Controller, Get, Post, Res, Body, HttpStatus } from '@nestjs/common';
import { SimulatorService } from './simulator.service';
import { SimulatorDto } from './dto/simulator.dto';
import { Response } from 'express';

@Controller('simulator')
export class SimulatorController {
  
  constructor(private readonly simulatorservice:SimulatorService){}
  
  
  @Post('Pause')
  public async Pause( @Res() res: Response , @Body()dto :{port:number,address:string}) 
  {
    try
    {
      const result = await this.simulatorservice.PauseIcd(dto);
      return res.status(200).json({ message: 'Pause executed', data: result });

    }
    catch(error)
    {
      console.error("error : " , error.message)
      return res.status(500).json({ message: 'failed' });    
    }
  }

  @Post('Continue')
  public async Continue( @Res() res: Response , @Body()dto :{port:number,address:string}) 
  {
    try
    {
      const result = await this.simulatorservice.ContinueIcd(dto);
      return res.status(200).json({ message: 'Continue icd executed', data: result });

    }
    catch(error)
    {
      console.error("error : " , error.message)
      return res.status(500).json({ message: 'Paused data' });    
    }
  }

  @Post('StartIcd')
  public async StartIcd(@Res() res : Response, @Body() dto: SimulatorDto ) 
  {
    try 
    {
      const result = await this.simulatorservice.StartIcd(dto);

      if(result == '1')
        return res.status(409).json({message : 'Uav already stream data'});
      if(result == '2')
        return res.status(409).json({message : 'Address in use'});
      if(result == '3')
        return res.status(500).json({message : 'error'});

      await this.simulatorservice.StartstreamIcd(dto); //after the check of telemtry it will fetch data in simualtor
      
      return res.status(200).json({ message: 'StartIcd executed' });
    } 
    catch (error) 
    {
      console.error('error in controller', error);
      return res.status(500).json({ message: 'Failed to fetch data', error: error.message });    
    }
  }

  // //public enum OperationResult
// {
//   Success, = 0
//   AlreadyRequested, = 1
//   AlreadyRequestedAddress, = 2
//   Failed = 3
// }
  
  @Post('StartPcap')
  public async StartPcap( @Res() res: Request, @Body() dto: SimulatorDto) 
  {
    
  }

  @Get('Stop')
  public async Stop(@Res() res: Request) 
  {
  }
}

