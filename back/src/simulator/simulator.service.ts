import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { SimulatorDto } from './dto/simulator.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SimulatorService {
  constructor(private readonly httpService: HttpService) {}

  private telemetryApi = 'http://localhost:5000/';
  private simulatorApi = 'http://localhost:7000/Simulator/';


  
  public async StartstreamIcd(dto:SimulatorDto):Promise<void>
  {
    try
    {
      const simulatorUrl = `${this.simulatorApi}StartIcd`
      const response = await firstValueFrom(this.httpService.post(simulatorUrl, dto));
      console.log('started ICD fetching :', response.data);
    }
    catch(error)
    {
      console.error('error : ',error.message);
    }
  }

  public async StartIcd(dto: SimulatorDto): Promise<string> 
  {
    try 
    {
      const telemtryUrl = `${this.telemetryApi}Start`;
      const response = await firstValueFrom(this.httpService.post(telemtryUrl, dto));
      
      return response.data;

    } 
    catch (error) 
    {
      console.error('error :', error.message);
    }
  }
  public async PauseIcd(dto : {port,address}):Promise<string>
  {
    const telemtryUrl = `${this.telemetryApi}Pause`
    console.log(dto);
    const response = await firstValueFrom(this.httpService.post(telemtryUrl, dto));
    return response.data;
  }
  public async ContinueIcd(dto : {port,address}):Promise<string>
  {
    const telemtryUrl = `${this.telemetryApi}Continue`
    console.log(dto);
    const response = await firstValueFrom(this.httpService.post(telemtryUrl, dto));
    return response.data;
  }

}

