import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()

export class Parameter extends Document {
  @Prop({ required: true }) 
  Identifier: string;

  @Prop({ required: false }) 
  Units: string;

  @Prop({ required: false })
  InterfaceLimitMin: number;

  @Prop({ required: false })
  InterfaceLimitMax: number;
}

export const ParameterSchema = SchemaFactory.createForClass(Parameter);


export function getParameterModel(name: string) {
  return { name, schema: ParameterSchema, collection: name }; 
}
