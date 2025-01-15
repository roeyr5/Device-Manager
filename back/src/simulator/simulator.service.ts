import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { SimulatorDto } from './dto/simulator.dto';
import { firstValueFrom } from 'rxjs';
import { InjectModel } from '@nestjs/mongoose';
import { Uav } from './schema/uavs.schema';
import { Model } from 'mongoose';
import { link } from 'fs';

@Injectable()
export class SimulatorService {
  constructor(private readonly httpService: HttpService ,@InjectModel('Uavs') private UavsModel: Model<Uav>,) {}

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



  public async StartPcap(dto: {uavnNumber:number, channel:string, type:string }): Promise<string> 
  {
    try 
    {
      const uav = await this.UavsModel.findOne({ identifier: dto.channel, type: dto.type }).select('address port').lean().exec();
      if (!uav) {
        throw new Error('not found uav for channel and type.');
      }
      console.log(uav);

      const address = uav.address;
      const port = uav.port;
      const uavnum = dto.uavnNumber;
      const channel = dto.channel;
      const type = dto.type;

      const telemtryUrl = `${this.telemetryApi}Start`;
      const response = await firstValueFrom(this.httpService.post(telemtryUrl, {uavnum,address,channel,type,port}));
      
      return response.data;
    } 
    catch (error) 
    {
      console.error('error :', error.message);
    }
  }

  public async StartStreamPcap(dto:{channel,type}):Promise<void>
  {
    try
    {
      const simulatorUrl = `${this.simulatorApi}StartPcap`
      const response = await firstValueFrom(this.httpService.get(simulatorUrl, {params: {link: dto.channel + dto.type +".pcap"}}));
      console.log('started ICD fetching :', response.data);
    }
    catch(error)
    {
      console.error('error : ',error.message);
    }
  }

}

