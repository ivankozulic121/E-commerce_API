import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './CartEntity';
import { ProductModule } from 'src/product/product/product.module';
import { UserEntity } from 'src/user/user/user.entity';
import { ProductEntity } from 'src/product/product/product.entity';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';

@Module({
    imports: [TypeOrmModule.forFeature([CartEntity, UserEntity, ProductEntity]),
    ProductModule],
    providers: [CartService],
    controllers: [CartController],
    exports:[CartService]
})
export class CartModule {}
