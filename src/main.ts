import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as rawBody from 'raw-body';
import * as express from 'express';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {rawBody: true});
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  app.enableCors();

  
  await app.listen(3000);
}
bootstrap();
