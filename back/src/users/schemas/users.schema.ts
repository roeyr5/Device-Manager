import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({ collection: 'users' })
export class Users {
   @Prop()
   email: string;
   @Prop()
   password: string;
}
export const UsersSchema = SchemaFactory.createForClass(Users);