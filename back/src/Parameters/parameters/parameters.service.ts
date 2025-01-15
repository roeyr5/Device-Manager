import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Parameter } from './schemas/parameters.schema';
import { Uav } from './schemas/uavs.schema';

@Injectable()
export class ParametersService {
  constructor(
    @InjectModel('ParametersUp') private parameterUpModel: Model<Parameter>,
    @InjectModel('ParametersDown') private parameterDownModel: Model<Parameter>,
    @InjectModel('Uavs') private UavsModel: Model<Uav>,
    @InjectModel('UavsNumbers') private UavsNumbersModel: Model<Uav>,

  ) {}

  async getAllIdentifiers(): Promise<string[]> 
  {
    const upParameters = await this.parameterUpModel.find().select('Identifier').exec();
    const downParameters = await this.parameterDownModel.find().select('Identifier').exec();

    const allIdentifiers = [
      ...upParameters.map((parameter) => parameter.Identifier),
      ...downParameters.map((parameter) => parameter.Identifier),
    ];

    const uniqueIdentifiers = Array.from(new Set(allIdentifiers));
    return uniqueIdentifiers;
  }

  async getUavs(): Promise<{ identifier: string; type: string }[]> {
    const uavs = await this.UavsModel.find().select('identifier type').exec();
    const identifiers = uavs.map((uav) => ({
      identifier: uav.identifier,type: uav.type,
    }));

    return identifiers;
  }

  async getUavsNumbers(): Promise<string[]> {
    const uavs = await this.UavsNumbersModel.find().select('identifier').exec();
    const uavsIDs = [...uavs.map((id)=> id.identifier)];
    return uavsIDs;
  }
}
