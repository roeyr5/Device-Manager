import { Module } from '@nestjs/common';
import { SimulatorController } from './simulator.controller';
import { SimulatorService } from './simulator.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { UavSchema } from './schema/uavs.schema';

@Module({
  imports:[HttpModule , MongooseModule.forFeature([{ name: 'Uavs', schema: UavSchema }])],
  controllers:[SimulatorController],
  providers:[SimulatorService]
})

export class SimulatorModule {}

