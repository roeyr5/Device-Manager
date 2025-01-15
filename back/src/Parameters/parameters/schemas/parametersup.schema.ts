import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'ParametersUp' })
export class Parameter {
  @Prop()
  Identifier: string;
}


export const ParameterSchema = SchemaFactory.createForClass(Parameter);
