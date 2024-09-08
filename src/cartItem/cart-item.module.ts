import { Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemEntity } from './cartItemEntity';
import { CartEntity } from 'src/cart/CartEntity';
import { PassportModule } from '@nestjs/passport';
import { CartModule } from 'src/cart/cart.module';
import { AuthModule } from 'src/auth/auth/auth.module';
import { ProductModule } from 'src/product/product/product.module';
import { ProductEntity } from 'src/product/product/product.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CartItemEntity, CartEntity, ProductEntity]),PassportModule, CartModule, AuthModule, ProductModule],
  controllers: [CartItemController],
  providers: [CartItemService],
})
export class CartItemModule {}
