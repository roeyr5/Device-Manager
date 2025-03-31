import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { UsersSchema } from './users/schemas/users.schema';
import { UsersModule } from './users/users.module';
import { ParametersModule } from './Parameters/parameters/parameters.module';
import { SimulatorModule } from './simulator/simulator.module';
import { ArchiveController } from './archive/archive.controller';
import { ArchiveService } from './archive/archive.service';
import { ArchiveModule } from './archive/archive.module';
import { PresetsService } from './presets/presets.service';
import { PresetsController } from './presets/presets.controller';
import { PresetsModule } from './presets/presets.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Simulator'),
    UsersModule,
    ParametersModule,
    SimulatorModule,
    ArchiveModule,
    PresetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
