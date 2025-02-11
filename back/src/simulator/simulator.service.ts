import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { SimulatorDto } from './dto/simulator.dto';
import { first, firstValueFrom } from 'rxjs';
import { InjectModel } from '@nestjs/mongoose';
import { Uav } from './schema/uavs.schema';
import { Model } from 'mongoose';
import { link } from 'fs';

@Injectable()
export class SimulatorService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel('Uavs') private UavsModel: Model<Uav>,
  ) {}

  private telemetryApi = 'http://localhost:5000/';
  private simulatorApi = 'http://localhost:7000/Simulator/';

  public async StartstreamIcd(dto: SimulatorDto): Promise<void> {
    try {
      const simulatorUrl = `${this.simulatorApi}StartIcd`;
      const response = await firstValueFrom(
        this.httpService.post(simulatorUrl, dto),
      );
      console.log('started ICD fetching :', response.data);
    } catch (error) {
      console.error('error : ', error.message);
    }
  }


  public async startIcd(dto: SimulatorDto): Promise<string> {
    try {
      const telemtryUrl = `${this.telemetryApi}Start`;
      const response = await firstValueFrom(
        this.httpService.post(telemtryUrl, dto),
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('error :', error.message);
      throw error;
    }
  }

  public async PauseIcd(dto: { port; address }): Promise<string> {
    const telemtryUrl = `${this.telemetryApi}Pause`;
    console.log(dto);
    const response = await firstValueFrom(
      this.httpService.post(telemtryUrl, dto),
    );
    return response.data;
  }

  public async ContinueIcd(dto: { port; address }): Promise<string> {
    const telemtryUrl = `${this.telemetryApi}Continue`;
    console.log(dto);
    const response = await firstValueFrom(
      this.httpService.post(telemtryUrl, dto),
    );
    return response.data;
  }

  public async stopIcd(dto: { port; address; pcap }): Promise<string> {
    const telemtryUrl = `${this.telemetryApi}Stop`;
    const response = await firstValueFrom(
      this.httpService.post(telemtryUrl, dto),
    );

    if (dto.pcap) {
      console.log('1');
      const simualtorUrl = `${this.simulatorApi}StopPcap`;
      const res = await firstValueFrom(
        this.httpService.get(`${simualtorUrl}?port=${dto.port}`),
      );
    } else {
      console.log('2');
      const simualtorUrl = `${this.simulatorApi}StopIcd`;
      const res = await firstValueFrom(
        this.httpService.get(
          `${simualtorUrl}?channelName=${response.data.uavNumber + response.data.channelNameType}`,
        ),
      );
    }
    return response.data;
  }

  public async changeSimulateTime (dto: { uavNumber : number , time : number}){
      const telemtryUrl = `${this.simulatorApi}ChangeSimulateTime`;
      const response = await firstValueFrom( this.httpService.post(telemtryUrl, dto));
      return response.data;
  }

  public async startPcap(dto: { filename: string; uavNumber: number;}): Promise<any> {
    try {
      const data = await this.startStreamPcap(dto);
      console.log('data : ', data);

      const sortedData = data.sort(
        (a: { destinationPort: number }, b: { destinationPort: number }) =>
          a.destinationPort - b.destinationPort,
      );
      const firstChannel = sortedData[0];

      const channelData: SimulatorDto = {
        uavnumber: dto.uavNumber,
        address: firstChannel.destinationIp,
        port: firstChannel.destinationPort,
        pcap: true,
      };

      const telemtryUrl = `${this.telemetryApi}Start`;

      const response = await firstValueFrom(
        this.httpService.post(telemtryUrl, channelData),
      );
      return response;
    } catch (error) {
      console.error('error :', error.message);
      throw error;
    }
  }

  public async startStreamPcap(dto: { filename: string; uavNumber: number; }): Promise<{ destinationIp: string; destinationPort: number }[]> {
    try {
      const simulatorUrl = `${this.simulatorApi}StartPcap`;
      const response = await firstValueFrom( this.httpService.post(simulatorUrl, dto),);
      console.log('started ICD fetching :', response.data);
      return response.data;
    } catch (error) {
      console.error('error : ', error.message);
      throw error;
    }
  }

  public async getTimeCommunications():Promise<Map<number,number>>{
    const simulatorUrl = `${this.simulatorApi}TimeCommunications`;
    try {
      const response = await firstValueFrom(this.httpService.get(simulatorUrl));
      const result = new Map<number, number>();

      if (typeof response.data === 'object' && response.data !== null) {
        for (const key in response.data) {
          if (response.data.hasOwnProperty(key)) {
            const value = response.data[key];
            result.set(Number(key), Number(value));
          }
        }
      } else {
        throw new Error('No live data');
      }

      return result;
    } 
    catch (error) {
      throw error;
    }  
  }

  public async getPrimariesComm(): Promise<Map<string, string>> {
    const simulatorUrl = `${this.simulatorApi}Primaries`;
    try {
      const response = await firstValueFrom(this.httpService.get(simulatorUrl));
      const result = new Map<string, string>();

      if (typeof response.data === 'object' && response.data !== null) {
        for (const key in response.data) {
          if (response.data.hasOwnProperty(key)) {
            const value = response.data[key];
            result.set(String(key), String(value));
          }
        }
      } else {
        throw new Error('No live data');
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  public async changePrimaryCommunicate(uavNumber: string): Promise<void> {
    try {
      console.log(`Changing communication for UAV number: ${uavNumber}`);
      const simulatorUrl = `${this.simulatorApi}PrimaryCommunication`;

      const response = await firstValueFrom(
        this.httpService.post(simulatorUrl, { uavNumber }),
      );
    } catch (error) {
      console.error('Error in service:', error);
      throw error;
    }
  }

  public async getTelemetryChannels(): Promise<Map<number, SimulatorDto[]>> {
    try {
      const simulatorUrl = `${this.telemetryApi}GetChannels`;
      const response = await firstValueFrom(this.httpService.get(simulatorUrl));
      return response.data;
    } catch (error) {
      console.error('Error in service:', error);
      throw error;
    }
  }
}
