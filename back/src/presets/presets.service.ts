import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Users } from './schemas/presets.schema';
import { InjectModel } from '@nestjs/mongoose';
import { createPresetDto } from './dto/createpreset.dto';


@Injectable()
export class PresetsService {
  constructor(@InjectModel(Users.name) private userModel : Model<Users>) {}

  public async getAllPresets(userName : string) : Promise<any>{
    return await this.userModel.findOne({email : userName}).exec();
  }

  public async createNewPreset(newPreset : createPresetDto){
    return await this.userModel.updateOne({email : newPreset.email}, {$push : {presets : newPreset.presetItem}}).exec();
  }

  public async updatePreset(newPreset : createPresetDto){
    return await this.userModel.updateOne({email:newPreset.email, "presets.presetName": newPreset.presetItem.presetName}, {$set : {"presets.$" : newPreset.presetItem}}).exec();
  }
}
