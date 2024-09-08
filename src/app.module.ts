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

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'e_commerce',
    entities: [UserEntity, ProductEntity, CartEntity, CartItemEntity],
    synchronize: true
  }), ProductModule, AuthModule, CartItemModule, CartModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
