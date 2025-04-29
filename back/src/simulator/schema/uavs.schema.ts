// uav.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'UavNumbers' })
export class Uav extends Document {
  @Prop()
  uavNumber: number;

  @Prop()
  status: string;
}

export const UavSchema = SchemaFactory.createForClass(Uav);
