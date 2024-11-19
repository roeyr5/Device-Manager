import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  onModuleInit() {
      console.log('connected to mongo ' , this.connection.name);
  }
  getHello(): string {
    return 'Hello World!';
  }
}
