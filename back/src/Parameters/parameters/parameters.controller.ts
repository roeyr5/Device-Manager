import { Controller, Get } from '@nestjs/common';
import { ParametersService } from './parameters.service';
import { promises } from 'node:readline';

@Controller('parameters')
export class ParametersController {

  constructor(private readonly paraservice: ParametersService) {}

  @Get('/all')
  async getAllParameters(): Promise<{ [key: string]: string[] }> {
    return {
      FBDown: await this.paraservice.getParameters('FBDown'),
      FBUp: await this.paraservice.getParameters('FBUp'),
      MissionDown: await this.paraservice.getParameters('MissionDown'),
      MissionUp: await this.paraservice.getParameters('MissionUp'),
    };
  }

  @Get('uavs')
  getuavs():Promise<{ identifier: string; type: string }[]> {
    return this.paraservice.getUavs();
  }
  
  @Get('uavslist')
  getUavsNumbers():Promise<string[]> {
    return this.paraservice.getUavsNumbers();

  }
}
