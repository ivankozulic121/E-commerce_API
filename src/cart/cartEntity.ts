import { PrimaryGeneratedColumn, Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { ProductEntity } from 'src/product/product/product.entity';
import { UserEntity } from 'src/user/user/user.entity';

@Entity()

export class CartEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => UserEntity, user => user.cart)
    user: UserEntity;

    @Column()
    status: ShoppingCartStatus;

    @OneToMany(() => ProductEntity, products => products.cart, {eager:true})
    products:  ProductEntity[]



}


export enum ShoppingCartStatus {

    PENDING = 'PENDING',
    PURCHASED = 'PURCHASED '
    
}