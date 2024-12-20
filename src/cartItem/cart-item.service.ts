import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItemEntity } from './cartItemEntity';
import { Repository } from 'typeorm';
import { CartEntity, ShoppingCartStatus } from 'src/cart/CartEntity';
import { User } from 'src/user/user/user.decorator';
import { UserEntity } from 'src/user/user/user.entity';
import { ProductEntity } from 'src/product/product/product.entity';
import { Not } from 'typeorm';
import { CartService } from 'src/cart/cart.service';


@Injectable()
export class CartItemService {

  constructor(@InjectRepository(CartItemEntity) private itemRepo: Repository<CartItemEntity>, 
  @InjectRepository(CartEntity) private cartRepo: Repository<CartEntity>,
  @InjectRepository(ProductEntity) private productRepo: Repository<ProductEntity>,
  private cartService: CartService
){}


  
async addItemToCart( productID: number, user: UserEntity): Promise<CartItemEntity | null>{
    // ovo pozivamo jer se product mora cartItem-u dodijeliti kao entitet, ne moze prema id-u
    const product = await this.productRepo.findOne({where: {id: productID}}) // nadji proizvod u b
        
    let cart = await this.cartRepo.findOne({where: { user: {id: user.id}, status: Not(ShoppingCartStatus.PURCHASED)}}); // nadji cart - moguca vrijednost null 
    if (!cart) {
        
        let cart = this.cartService.createNewCart(user);

        let newItem: CartItemEntity = new CartItemEntity();
        newItem.product = product;
        newItem.cart = await cart;
        newItem.quantity = 1;
        newItem.name = product.product_name;
        newItem.price = product.price;
        newItem.productID = product.id;
        //cart.items.push(newItem);
        console.log( newItem.cart.items);
        return await this.itemRepo.save(newItem);


    }

    else {
      let itemExists = await this.itemRepo.findOne({where: {cart: {id: cart.id}, product:{id: productID}}})

      if(itemExists) {
        itemExists.quantity = itemExists.quantity + 1;
        return await this.itemRepo.save(itemExists);
      }

      else{
        let newItem: CartItemEntity = new CartItemEntity();
        newItem.product = product;
        newItem.cart = cart;
        newItem.quantity = 1;
        newItem.name = product.product_name;
        newItem.price = product.price;
        newItem.productID = product.id;
        //cart.items.push(newItem) // da bi se vratio odgovarajuci response jer ga vjerovatno ne cita direktno iz baze
        console.log(cart.items);
        return await this.itemRepo.save(newItem);
      }
    }
   
}

async removeAllItems() {
  return await this.itemRepo.delete({});
}


  findAll() {
    return `This action returns all cartItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cartItem`;
  }

  /*update(id: number, updateCartItemDto: UpdateCartItemDto) {
    return `This action updates a #${id} cartItem`;
  }*/

 async removeItemFromCart(id: number) {
    
    const item = await this.itemRepo.findOneBy({id});
    console.log(item);

    if( item.quantity > 1) {

      item.quantity -= 1;
      return await this.itemRepo.save(item);
    }

    else{
      const result = await this.itemRepo.delete(item);
    if ( result.affected == 0){
      throw new NotFoundException('Item not deleted!');
    }
    else {
      return { deleted: true}
    }
  }
  }
}
