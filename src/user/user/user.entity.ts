import { CartEntity } from 'src/cart/CartEntity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';


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

    @OneToOne( () => CartEntity, cart => cart.user)
    cart: CartEntity;
    
    

}