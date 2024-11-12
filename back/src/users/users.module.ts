import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersSchema } from './schemas/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Users } from './schemas/users.schema';


@Module({
  imports: [MongooseModule.forFeature([{name: Users.name ,schema:UsersSchema}])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
