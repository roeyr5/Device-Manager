import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ParametersService } from './parameters.service';
import { ParametersController } from './parameters.controller';
import { ParameterSchema , Parameter} from './schemas/parameters.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Parameter.name, schema: ParameterSchema }]), 
  ],
  controllers: [ParametersController],
  providers: [ParametersService],
})
export class ParametersModule {}