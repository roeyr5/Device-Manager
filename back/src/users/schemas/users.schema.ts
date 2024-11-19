import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({ collection: 'Users' })
export class Users {
   @Prop()
   email: string;
   @Prop()
   password: string;
}
export const UsersSchema = SchemaFactory.createForClass(Users);