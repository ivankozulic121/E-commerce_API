import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './CartEntity';
import { ProductModule } from 'src/product/product/product.module';
import { UserEntity } from 'src/user/user/user.entity';
import { ProductEntity } from 'src/product/product/product.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CartEntity, UserEntity, ProductEntity]),
    ProductModule],
    providers: [],
    controllers: []
})
export class CartModule {}
