/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/user/user.entity';
import { ProductEntity } from './product/product/product.entity';
import { ProductModule } from './product/product/product.module';
import { AuthModule } from './auth/auth/auth.module';
import { CartEntity } from './cart/CartEntity';
import { CartItemEntity } from './cartItem/cartItemEntity';
import { CartItemModule } from './cartItem/cart-item.module';
import { CartModule } from './cart/cart.module';
import { StripeModule } from './stripe/stripe.module';
import { ConfigModule } from '@nestjs/config';
import { StripeService } from './stripe/stripe.service';
import { OrderEntity } from './order/orderEntity';
import { OrderModule } from './order/order.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'arohadrix',
    database: 'e_commerce',
    entities: [UserEntity, ProductEntity, CartEntity, CartItemEntity, OrderEntity],
    synchronize: true
  }), ProductModule, AuthModule, CartItemModule, CartModule, StripeModule,OrderModule,
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env'
  })
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
