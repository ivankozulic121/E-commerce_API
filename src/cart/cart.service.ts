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
import { ShoppingCartStatus } from './CartEntity';

@Injectable()
export class CartService {

   constructor(@InjectRepository(CartEntity) private cartRepo: Repository<CartEntity>) {}
   
    async getAllCarts(): Promise<CartEntity[]>{
        return await this.cartRepo.find();
    }

async createNewCart(user: UserEntity) {
    
    let cart: CartEntity = new CartEntity();
    cart.user = user;
    cart.status = ShoppingCartStatus.PENDING;
    cart.items = [];
    return await this.cartRepo.save(cart);
}

}
