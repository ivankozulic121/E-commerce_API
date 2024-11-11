import { PrimaryGeneratedColumn, Column, Entity, OneToMany, OneToOne, ManyToOne } from 'typeorm';
import { ProductEntity } from 'src/product/product/product.entity';
import { UserEntity } from 'src/user/user/user.entity';
import { CartItemEntity } from 'src/cartItem/cartItemEntity';
import { Expose } from 'class-transformer';
import { OrderEntity } from 'src/order/orderEntity';

@Entity()

export class CartEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, (user) => user.carts)
    user: UserEntity; 

    @OneToOne(() => OrderEntity, order => order.cart) 
    order: OrderEntity

    @Column()
    status: ShoppingCartStatus;


    @OneToMany(() => CartItemEntity, items => items.cart, {eager:true, cascade: true, onDelete:'CASCADE'} )
    items:  CartItemEntity[];



}


export enum ShoppingCartStatus {

    PENDING = 'PENDING',
    PURCHASED = 'PURCHASED '
    
}