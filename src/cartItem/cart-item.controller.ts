import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
//import { CreateCartItemDto } from './dto/create-cart-item.dto';
//import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { User } from 'src/user/user/user.decorator';
import { UserEntity } from 'src/user/user/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @UseGuards(AuthGuard())
  
  @Put('addItemToCart')
  addItemToCart( @Body('productID') productID: number, @User() user: UserEntity){
    return this.cartItemService.addItemToCart(productID, user);
  }

  @Get()
  findAll() {
    return this.cartItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartItemService.findOne(+id);
  }

  /*@Patch(':id')
  update(@Param('id') id: string, @Body() updateCartItemDto: UpdateCartItemDto) {
    return this.cartItemService.update(+id, updateCartItemDto);
  }*/

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartItemService.remove(+id);
  }
}
