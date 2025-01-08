import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ParametersService } from './parameters.service';
import { ParametersController } from './parameters.controller';
import { ParameterSchema , Parameter} from './schemas/parameters.schema';
import { UavSchema } from './schemas/uavs.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'ParametersUp', schema: ParameterSchema }]),
    MongooseModule.forFeature([{ name: 'ParametersDown', schema: ParameterSchema }]),
    MongooseModule.forFeature([{ name: 'Uavs', schema: UavSchema }]),

  ],
  controllers: [ParametersController],
  providers: [ParametersService],
})
export class ParametersModule {}