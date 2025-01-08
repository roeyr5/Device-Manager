import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'Uavs' })
export class Uav {
  @Prop()
  identifier: string;
  @Prop()
  type: string;
}


export const UavSchema = SchemaFactory.createForClass(Uav);
