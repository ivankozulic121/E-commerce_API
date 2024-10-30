import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './orderEntity';
import { ProductEntity } from 'src/product/product/product.entity';

@Module({
    imports:[TypeOrmModule.forFeature([OrderEntity, ProductEntity])]
})
export class OrderModule {
    
}
