import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { PresetItem } from "../dto/presetItem.dto";

@Schema()
export class Users extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  presets: PresetItem[];
}

export const presetSchema = SchemaFactory.createForClass(Users);