import { Controller, Get } from '@nestjs/common';
import { ParametersService } from './parameters.service';
import { promises } from 'node:readline';

@Controller('parameters')
export class ParametersController {

  constructor(private readonly paraservice: ParametersService) {}

  @Get('all')
  getall():Promise<string[]> {
    return this.paraservice.getAllIdentifiers();
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
