/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import { UserEntity } from 'src/user/user/user.entity';
import { CartEntity } from 'src/cart/CartEntity';

@Entity('products')

export class ProductEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    product_type: string;

    @Column()
    product_name: string;

    @Column()
    color: string;

    @Column()
    size: string;

    @Column()
    price: number;

    @Column()
    stock_count: number;



    
}