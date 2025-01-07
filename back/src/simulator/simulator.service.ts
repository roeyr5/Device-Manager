import { Injectable } from '@nestjs/common';

@Injectable()
export class SimulatorService {
  
  async StartIcd():Promise<T>{
    
  }
}


// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Parameter } from './schemas/parameters.schema';

// @Injectable()
// export class ParametersService {
//   constructor(@InjectModel(Parameter.name) private parameterModel: Model<Parameter>) {}

//   async getallID(): Promise<string[]> {
//     const parameters = await this.parameterModel.find().select('Identifier').exec();
//     return parameters.map((parameter) => parameter.Identifier);

//   }
// }
