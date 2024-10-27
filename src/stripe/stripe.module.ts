import { Module,  MiddlewareConsumer, RequestMethod } from '@nestjs/common';
//import { StripeRawBodyMiddleware } from './stripe-raw-body-middleware';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule
  ],
  controllers: [StripeController],
  providers: [StripeService]
})
export class StripeModule {
  /*configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(StripeRawBodyMiddleware)
      .forRoutes({ path: 'stripe/webhook', method: RequestMethod.POST });
  }*/
}
