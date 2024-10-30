import { CartEntity } from 'src/cart/CartEntity';
import { OrderEntity } from 'src/order/orderEntity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';


@Entity('users')


export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToMany(() => CartEntity, (cart) => cart.user)
    carts: CartEntity[];
    
    @OneToMany(()=> OrderEntity, order => order.user, { eager: true } )
    order: OrderEntity[]
    

}