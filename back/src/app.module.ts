import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { UsersSchema } from './users/schemas/users.schema';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/Simulator')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
