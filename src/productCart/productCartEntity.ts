import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { ProductEntity } from 'src/product/product/product.entity';

@Entity()

export class ProductCartEntity {

    @PrimaryGeneratedColumn()
    id: number;

    //@Column()
    //user: user;

    @Column()
    status: ShoppingCartStatus;

    @OneToMany(() => ProductEntity, products => products.productCart, {eager:true})
    products:  ProductEntity[]



}


export enum ShoppingCartStatus {

    PENDING = 'PENDING',
    PURCHASED = 'PURCHASED '
    
}