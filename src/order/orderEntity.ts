import { ProductEntity } from "src/product/product/product.entity";
import { UserEntity } from "src/user/user/user.entity";
import { PrimaryGeneratedColumn, Entity, Column, CreateDateColumn, OneToMany, ManyToOne, ManyToMany, JoinTable } from "typeorm";


@Entity()

export class OrderEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=> UserEntity, user => user.order, {eager:false})
    user: UserEntity;

    @ManyToMany(() => ProductEntity)
    @JoinTable() // This creates a join table to manage the relationship
    products: ProductEntity[];

    @Column('decimal')
    totalAmount: number;

    @CreateDateColumn()
    createdAt: Date;

}