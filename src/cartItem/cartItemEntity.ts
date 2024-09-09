import { Exclude } from 'class-transformer';
import { CartEntity } from 'src/cart/CartEntity';
import { ProductEntity } from 'src/product/product/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity()

export class CartItemEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(( ) => ProductEntity)
    product: ProductEntity

    @ManyToOne(() => CartEntity, cart => cart.items )
    cart: CartEntity

    @Column()
    quantity: number;
}   