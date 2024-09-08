import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItemEntity } from './cartItemEntity';
import { Repository } from 'typeorm';
import { CartEntity, ShoppingCartStatus } from 'src/cart/CartEntity';
import { User } from 'src/user/user/user.decorator';
import { UserEntity } from 'src/user/user/user.entity';
import { ProductEntity } from 'src/product/product/product.entity';

@Injectable()
export class CartItemService {

  constructor(@InjectRepository(CartItemEntity) private itemRepo: Repository<CartItemEntity>, 
  @InjectRepository(CartEntity) private cartRepo: Repository<CartEntity>,
  @InjectRepository(ProductEntity) private productRepo: Repository<ProductEntity>
){}

  
async addItemToCart( productID: number, user: UserEntity): Promise<CartItemEntity | null>{
    // ovo pozivamo jer se product mora cartItem-u dodijeliti kao entitet, ne moze prema id-u
    const product = await this.productRepo.findOne({where: {id: productID}}) // nadji proizvod u b
        
    let cart = await this.cartRepo.findOne({where: { user: {id: user.id}}}); // nadji cart - moguca vrijednost null 
    if (!cart) {
        let cart: CartEntity = new CartEntity();
        cart.user = user;
        cart.status = ShoppingCartStatus.PENDING;
        cart.items = [];
        await this.cartRepo.create(cart);
        await this.cartRepo.save(cart); //ovdje smo sacuvali a, tek nakon toga cartItemu dodijelili cart, pa je vjerovatno zbog toga niz products prazan


    }
    //await this.cartRepo.save(cart); // sad bi vjerovatno trebalo da cart ima cartItem u products nizu kada se izvrsi request

      let itemExists = await this.itemRepo.findOne({where: {product:{id: productID}}}) // nece postojati u cartu koji si tek napravio
   
       
    if (itemExists) {

        itemExists.quantity = itemExists.quantity + 1;
        return await this.itemRepo.save(itemExists);

    }

    else {
      const item: CartItemEntity = new CartItemEntity();
      item.product = product;
      item.cart = cart;
      item.quantity = 1;
      console.log(cart.items);
      await this.cartRepo.save(cart);
      return await this.itemRepo.save(item);

    }
    
}

async itemExistsinCart(cartID: number, productID: number): Promise<CartItemEntity | null>{
  let itemExists = await this.itemRepo.findOne({where: {cart: {id: cartID}, product:{id: productID}}})
  return itemExists;
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

  remove(id: number) {
    return `This action removes a #${id} cartItem`;
  }
}
