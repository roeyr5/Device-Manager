import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { UsersSchema } from './users/schemas/users.schema';
import { UsersModule } from './users/users.module';
import { ParametersModule } from './Parameters/parameters/parameters.module';
import { SimulatorModule } from './simulator/simulator.module';

@Module({
  imports: [
    UsersModule,
    ParametersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/Simulator'),
    SimulatorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
