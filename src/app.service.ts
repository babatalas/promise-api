import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  onApplicationBootstrap() {
    // add a functionality to check if the data already exists, if not add it manually
    console.log('onApplicationBootstrap');
  }

  getHello(): string {
    return 'Hello World!';
  }
}
