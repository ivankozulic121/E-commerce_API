import { Controller, Patch, Body, Param, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/product/product.entity';
import { UserEntity } from 'src/user/user/user.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user/user.decorator';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {

    constructor( @InjectRepository(ProductEntity) private productRepo: Repository<ProductEntity>, private cartService: CartService){}

@Get()

getAllCarts(){

        return this.cartService.getAllCarts();

    }
}