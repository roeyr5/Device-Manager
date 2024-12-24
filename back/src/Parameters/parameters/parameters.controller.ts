import { Controller, Get } from '@nestjs/common';
import { ParametersService } from './parameters.service';

@Controller('parameters')
export class ParametersController {

  constructor(private readonly paraservice: ParametersService) {}

  @Get('all')
  getall():Promise<string[]> {
    return this.paraservice.getallID();
  }
}
