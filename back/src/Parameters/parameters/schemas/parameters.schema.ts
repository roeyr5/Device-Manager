import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'ParametersDown' })
export class Parameter {
  @Prop()
  Identifier: string;
}


export const ParameterSchema = SchemaFactory.createForClass(Parameter);
