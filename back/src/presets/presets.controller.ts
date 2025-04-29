import { Body, Controller,Delete,Get, Param, Post, Put, Query, Res } from '@nestjs/common';
import { PresetsService } from './presets.service';
import { createPresetDto } from './dto/createpreset.dto';
import { PresetItem } from './dto/presetItem.dto';
import { log } from 'console';

@Controller('presets')

export class PresetsController {
  constructor(private presetsservice : PresetsService) {}

   @Get('/all')
    public async getAllPresets(@Query() email): Promise<PresetItem[]> {
      console.log(email.email)
      const allPresets = await this.presetsservice.getAllPresets(email.email);
      console.log(allPresets)
      return allPresets.presets;
    }

    @Post('/createpreset')
    public async createPreset(@Res() response, @Body() newPreset : createPresetDto){
      const allPresets = await this.presetsservice.getAllPresets(newPreset.email);

      console.log("ofri",allPresets.presets);

      for (let item of allPresets.presets) {
        if (item.presetName == newPreset.presetName) {
          return response.status(300).json({ statusCode: 300, message: 'Preset name already exists' });
        }
      }
      await this.presetsservice.createNewPreset(newPreset);
      return response.status(200).json({statusCode: 200,message : 'Preset created successfully'});
    }

    @Post('/updatepreset')
    public async updatePreset(@Res()response , @Body() updatedPreset : createPresetDto){

      const allPresets = await this.presetsservice.getAllPresets(updatedPreset.email);

      if(allPresets.presets.some((preset) => preset.presetName === updatedPreset.presetName)){
        await this.presetsservice.updatePreset(updatedPreset);
        return response.status(200).json({statusCode: 200, message : 'Preset updated successfully'});
      }

    }

    @Put('/deletepreset')
    public async deletePreset(@Res()response, @Body() deletedPreset : createPresetDto ):Promise<any>{

      await this.presetsservice.deletePreset(deletedPreset);
      return response.status(200).json({statusCode: 200, message : 'Preset deleted successfully'});
    }
}
