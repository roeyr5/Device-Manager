import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { UsersSchema } from './users/schemas/users.schema';
import { UsersModule } from './users/users.module';
import { ParametersModule } from './Parameters/parameters/parameters.module';
import { SimulatorController } from './simulator/simulator.controller';
import { SimulatorService } from './simulator/simulator.service';
import { SimulatorModule } from './simulator/simulator.module';

@Module({
  imports: [
    UsersModule,
    ParametersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/Simulator'),
    SimulatorModule],
  controllers: [AppController, SimulatorController],
  providers: [AppService, SimulatorService],
})
export class AppModule {}
