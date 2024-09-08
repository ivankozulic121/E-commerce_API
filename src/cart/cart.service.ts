import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItemEntity } from 'src/cartItem/cartItemEntity';
import { ProductEntity } from 'src/product/product/product.entity';
import { ProductService } from 'src/product/product/product.service';
import { User } from 'src/user/user/user.decorator';
import { UserEntity } from 'src/user/user/user.entity';
//import { UserEntity } from 'src/user/user/user.entity';
import { Repository } from 'typeorm';
import { CartEntity } from './CartEntity';

@Injectable()
export class CartService {

    constructor( private productService: ProductService, @InjectRepository(CartEntity) private cartRepo: Repository<CartEntity>, @InjectRepository(CartItemEntity) private itemRepo: Repository<CartItemEntity>) {}


    async addToCart( productID: number, cartID:number, user: UserEntity) {
        
        let cartExists = await this.cartRepo.findOne({where: { user: {id: user.id}}});
        if (!cartExists) {
            let cartExists: CartEntity = new CartEntity();

        }
        const item: CartItemEntity = new CartItemEntity();
        item.product.id = productID;
        item.cart.id = cartID;
        item.quantity = 1;

        const itemExists = await this.itemRepo.findOne({where: {cart: {id: cartID}, product:{id: productID}}})

        if (itemExists) {

            itemExists.quantity = itemExists.quantity + 1;
            return await this.itemRepo.save(itemExists);

        }
        else {
            try {
                return await this.itemRepo.save(item);
            }
            catch {

                throw new InternalServerErrorException();
            }
        }
    } 
}
