import { Module } from '@nestjs/common';
import { SimulatorController } from './simulator.controller';
import { SimulatorService } from './simulator.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { Uav,UavSchema } from './schema/uavs.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports:[HttpModule ,MongooseModule.forFeature([{ name: 'Uav', schema: UavSchema }]),
  ClientsModule.register([
    {
      name: 'KAFKA_SERVICE', 
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'simulator-consumer', 
        },
      },
    },
  ]),
  ],
  controllers:[SimulatorController],
  providers:[SimulatorService]
})

export class SimulatorModule {}

