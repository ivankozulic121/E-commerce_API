import { CartEntity } from "src/cart/CartEntity";
import { CartItemEntity } from "src/cartItem/cartItemEntity";
import { ProductEntity } from "src/product/product/product.entity";
import { UserEntity } from "src/user/user/user.entity";
import { PrimaryGeneratedColumn, Entity, Column, CreateDateColumn, OneToMany, ManyToOne, ManyToMany, JoinTable, OneToOne, JoinColumn } from "typeorm";


@Entity()

export class OrderEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=> UserEntity, user => user.order, {eager:false})
    user: UserEntity;

    @OneToOne(() => CartEntity)
    @JoinColumn()
    cart: CartEntity

    @Column('decimal')
    totalAmount: number;

    @CreateDateColumn()
    createdAt: Date;

}