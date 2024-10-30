import { Module,  MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrderModule } from 'src/order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from 'src/order/orderEntity';
import { CartEntity } from 'src/cart/CartEntity';
import { ProductEntity } from 'src/product/product/product.entity';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth/auth.module';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([OrderEntity, CartEntity, ProductEntity]), AuthModule
  ],
  controllers: [StripeController],
  providers: [StripeService]
})
export class StripeModule {
  
}
