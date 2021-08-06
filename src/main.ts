import * as cors from 'cors';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.use(cors());
    // const app = await NestFactory.create(AppModule, {
    //   cors: {
    //     origin: '*',
    //     methods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD', 'OPTIONS'],
    //   },
    // });
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    await app.listen(8081);
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
