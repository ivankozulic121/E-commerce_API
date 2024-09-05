import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


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
    
    

}