import { Controller,Get, Param, UseGuards, Req, Patch } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from './product.entity';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/user/user/user.entity';
import * as express from 'express';
import { User } from 'src/user/user/user.decorator';


@Controller('product')
export class ProductController {

    constructor( private readonly productService: ProductService){}


@UseGuards(AuthGuard())

@Get()
 /*async*/ getAllProducts(@Req() request:Request)/* : Promise<ProductEntity[]>*/ {
    
    const paks = request.body
    return this.productService.getAllProducts();
}

@Get(':id')

getProductById(@Param('id') id:number) {
    
    return this.productService.getProductById(id);
}

@Patch(':id')

updateStockCount(@Param('barcode') id:number){
    return this.productService.updateStockCount(id);
}
}