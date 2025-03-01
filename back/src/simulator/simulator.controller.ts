import { Controller, Get, Post, Res, Body, HttpStatus } from '@nestjs/common';
import { SimulatorService } from './simulator.service';
import { SimulatorDto } from './dto/simulator.dto';
import { Response } from 'express';
import { UavNumber } from 'src/Parameters/parameters/schemas/uavsNumbera.schema';
import { delay } from 'rxjs';

@Controller('simulator')
export class SimulatorController {
  constructor(private readonly simulatorservice: SimulatorService) {}

  @Post('Pause')
  public async Pause(
    @Res() res: Response,
    @Body() dto: { port: number; address: string },
  ) {
    try {
      const result = await this.simulatorservice.PauseIcd(dto);
      return res.status(200).json({ message: 'Pause executed', data: result });
    } catch (error) {
      console.error('error : ', error.message);
      return res.status(500).json({ message: 'failed' });
    }
  }

  @Post('Continue')
  public async Continue(
    @Res() res: Response,
    @Body() dto: { port: number; address: string },
  ) {
    try {
      const result = await this.simulatorservice.ContinueIcd(dto);
      return res
        .status(200)
        .json({ message: 'Continue icd executed', data: result });
    } catch (error) {
      console.error('error : ', error.message);
      return res.status(500).json({ message: 'error continue data' });
    }
  }

  @Post('Stop')
  public async Stop(
    @Res() res: Response,
    @Body() dto: { port: number; address: string; pcap: boolean },
  ) {
    try {
      const result = await this.simulatorservice.stopIcd(dto);
      return res.status(200).json({ message: 'pcap stopped ', data: result });
    } catch (error) {
      console.error('error : ', error.message);
      return res.status(500).json({ message: 'not work stop icd' });
    }
  }

  @Post('StartIcd')
  public async StartIcd(@Res() res: Response, @Body() dto: SimulatorDto) {
    try {
      const result = await this.simulatorservice.startIcd(dto);

      if (result == '1')
        return res.status(409).json({ message: 'Uav already stream data' });
      if (result == '2')
        return res.status(409).json({ message: 'Address in use' });
      if (result == '3') return res.status(500).json({ message: 'error' });

      await this.simulatorservice.startstreamIcd(dto); //after the check of telemtry it will fetch data in simualtor
      this.simulatorservice.startKafkaConsumers(dto); // now we can fetch the data using kafka consumers

      return res.status(200).json({ message: 'StartIcd executed - lts and monitor starting consuming ' });
    } 
    catch (error) {
      console.error('error in controller', error);
      return res
        .status(500)
        .json({ message: 'Failed to fetch data', error: error.message });
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
  public async StartPcap( @Res() res: Response, @Body() dto: { filename: string; uavNumber: number; channel: string; type: string },) {
    //pcaps are automatic - 6000 - fiberdown 6001 - fiberup
    try {
      const result = await this.simulatorservice.startPcap(dto);

      const successCount = result.successCount;
      const totalAttempts = result.totalAttempts;

      return res
        .status(200)
        .json({ message: 'StartPcap executed', successCount, totalAttempts });
    } catch (error) {
      console.error('error in controller', error);
      return res
        .status(500)
        .json({ message: 'Failed to fetch data', error: error.message });
    }
  }

  @Get('PrimaryCommunications')
  public async PraimeriesCommuincations(@Res() res: Response) {
    try {
      const data = await this.simulatorservice.getPrimariesComm();
      return res.status(200).json(Object.fromEntries(data));
    } catch (error) {
      console.error('Error in controller:', error);
      return res
        .status(500)
        .json({ message: 'Failed to fetch data', error: error.message });
    }
  }

  @Get('TimeCommunications')
  public async TimeCommuincations(@Res() res: Response) {
    try {
      const data = await this.simulatorservice.getTimeCommunications();
      return res.status(200).json(Object.fromEntries(data));
    } catch (error) {
      console.error('Error in controller:', error);
      return res.status(500).json({ message: 'Failed to fetch data', error: error.message });
    }
  }

  @Post('ChangeSimulateTime')
  public async ChangeSimulateTime(@Res() res: Response ,@Body() dto: { uavNumber : number , time : number} ) {
    try {
      const data = await this.simulatorservice.changeSimulateTime(dto);
      return res.status(200).json('message Changed Simulate Time to ' + data);
    } catch (error) {
      console.error('Error in controller:', error);
      return res
        .status(500)
        .json({ message: 'Failed to fetch data', error: error.message });
    }
  }


  @Post('ChangePrimaryCommunications')
  public async changePrimaryCommunication(
    @Res() res: Response,
    @Body() dto: { uavNumber: number },
  ) {
    try {
      await this.simulatorservice.changePrimaryCommunicate(dto.uavNumber);
      return res.status(200).json({ message: 'Success' });
    } catch (error) {
      console.error('Error changing primary communication:', error);
      return res
        .status(500)
        .json({
          message: 'Failed to change primary communication',
          error: error.message,
        });
    }
  }

  @Get('GetChannels')
  public async GetTelemetryChannels(@Res() res: Response) {
    try {
      const data = await this.simulatorservice.getTelemetryChannels();
      return res.status(200).json(data);
    } catch (error) {
      console.error('Error in controller:', error);
      return res
        .status(500)
        .json({ message: 'Failed to fetch data', error: error.message });
    }
  }
}
