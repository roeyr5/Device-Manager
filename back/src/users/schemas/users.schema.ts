import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { PresetItem } from "src/presets/dto/presetItem.dto";

@Schema({ collection: 'Users' })
export class Users {
   @Prop()
   email: string;
   @Prop()
   password: string;
   @Prop()
   presets: PresetItem[];
}
export const UsersSchema = SchemaFactory.createForClass(Users);