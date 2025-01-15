import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'UavsNumbers' })
export class UavNumber {
  @Prop()
  identifier: string;
  @Prop()
  type: string;
}

export const UavNumberSchema = SchemaFactory.createForClass(UavNumber);
