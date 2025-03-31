import { Body, Controller,Get, Param, Post, Query, Res } from '@nestjs/common';
import { PresetsService } from './presets.service';
import { createPresetDto } from './dto/createpreset.dto';
import { PresetItem } from './dto/presetItem.dto';

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

      if(allPresets.presets.some((preset) => preset.presetName === newPreset.presetItem.presetName)){
        await this.presetsservice.updatePreset(newPreset);
        return response.status(201).json({message : 'Preset updated successfully'});
      }
      else
      {
        await this.presetsservice.createNewPreset(newPreset);
        return response.status(200).json({message : 'Preset created successfully'});
      }
    }
}
