import { PresetItem } from "./presetItem.dto";

export class createPresetDto {
  email:string;
  presetName : string;
  presetItem: PresetItem[];
}