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

  public async createNewPreset(newPreset: createPresetDto) {
  // console.log("new preset: ", newPreset);
  return await this.userModel.updateOne(
    { email: newPreset.email },
    { $push: {presets: { presetName: newPreset.presetName,presetItem: newPreset.presetItem }}}).exec();
  }

  public async updatePreset(newPreset: createPresetDto) {
  return await this.userModel.updateOne({ email: newPreset.email, "presets.presetName": newPreset.presetName },
    {$set: { "presets.$.presetItem": newPreset.presetItem }}).exec();
  }

  public async deletePreset(deletedPreset: createPresetDto) {
    return await this.userModel.updateOne(
      { email: deletedPreset.email },
      { $pull :{presets: { presetName: deletedPreset.presetName , presetItem: deletedPreset.presetItem  } } }
    );
  }
  

}