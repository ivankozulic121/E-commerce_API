import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as rawBody from 'raw-body';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  app.use('/api/stripe/webhook', (req, res, next) => {
    rawBody(req, {
      length: req.headers['content-length'],
      limit: '1mb',
      encoding: req.headers['content-encoding'] || 'utf-8',
    }, (err, string) => {
      if (err) return next(err);
      req['rawBody'] = string; // Attach raw body to the request object
      next();
    });
  });
  await app.listen(3000);
}
bootstrap();
