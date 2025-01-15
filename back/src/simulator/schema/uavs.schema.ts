import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'Uavs' })
export class Uav {
  @Prop()
  address: string;
  @Prop()
  port: number;
}


export const UavSchema = SchemaFactory.createForClass(Uav);
