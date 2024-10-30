import { PrimaryGeneratedColumn, Column, Entity, OneToMany, OneToOne, ManyToOne } from 'typeorm';
import { ProductEntity } from 'src/product/product/product.entity';
import { UserEntity } from 'src/user/user/user.entity';
import { CartItemEntity } from 'src/cartItem/cartItemEntity';
import { Expose } from 'class-transformer';

@Entity()

export class CartEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, (user) => user.carts)
    user: UserEntity; 

    @Column()
    status: ShoppingCartStatus;

    @OneToMany(() => CartItemEntity, items => items.cart, {eager:true} )
    items:  CartItemEntity[];



}


export enum ShoppingCartStatus {

    PENDING = 'PENDING',
    PURCHASED = 'PURCHASED '
    
}