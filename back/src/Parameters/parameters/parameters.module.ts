import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ParametersService } from './parameters.service';
import { ParametersController } from './parameters.controller';
import { ParameterSchema , Parameter} from './schemas/parameters.schema';
import { UavSchema } from './schemas/uavs.schema';
import { UavNumberSchema } from './schemas/uavsNumbera.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'ParametersUp', schema: ParameterSchema }]),
    MongooseModule.forFeature([{ name: 'ParametersDown', schema: ParameterSchema }]),
    MongooseModule.forFeature([{ name: 'Uavs', schema: UavSchema }]),
    MongooseModule.forFeature([{ name: 'UavsNumbers', schema: UavNumberSchema }]),

  ],
  controllers: [ParametersController],
  providers: [ParametersService],
})
export class ParametersModule {}