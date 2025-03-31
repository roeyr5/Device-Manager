import { Module } from '@nestjs/common';
import { Users } from './schemas/presets.schema';
import { UsersSchema } from 'src/users/schemas/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PresetsService } from './presets.service';
import { PresetsController } from './presets.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }])],
  controllers: [PresetsController],
  providers: [PresetsService],
  
})
export class PresetsModule {}
