import { Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule
  ],
  controllers: [StripeController],
  providers: [StripeService]
})
export class StripeModule {}
