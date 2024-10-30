import { BadRequestException, Injectable, OnModuleInit, RawBodyRequest, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { Request, Response } from '@nestjs/common';
import { json } from 'body-parser';
import * as rawBody from 'raw-body';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from 'src/order/orderEntity';
import { Repository } from 'typeorm';
import { CartEntity } from 'src/cart/CartEntity';
import { ProductEntity } from 'src/product/product/product.entity';
import { UserEntity } from 'src/user/user/user.entity';

@Injectable()
export class StripeService {

    private stripe: Stripe;

    constructor(private configService: ConfigService,
      @InjectRepository(OrderEntity) private orderRepo: Repository<OrderEntity>,
      @InjectRepository(CartEntity) private cartRepo: Repository<CartEntity>,
      @InjectRepository(ProductEntity) private productRepo: Repository<ProductEntity>
    ) { 

        this.stripe = new Stripe(this.configService.get<string>('SECRET_KEY'), {
            apiVersion: '2024-06-20'
        })
        
    }


    async createCheckoutSession( cartID: number, user: UserEntity) {
        //const jsonItems = JSON.stringify(items);
        const cart : CartEntity = await this.cartRepo.findOne({ where: { id: cartID}})
        const cartItems = cart.items;
        const jsonItems = JSON.stringify(cartItems);//this is for our order purpose to be stored in metadata
        console.log(cartItems);
        
        const session = await this.stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: cartItems.map((item) => ({
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.name,
              },
              unit_amount: item.price * 100, // Stripe uses the smallest currency unit (cents for USD)
            },
            quantity: item.quantity,
          })),
          mode: 'payment',
          metadata:{
            userID: user.id,
            cartId: cartID,
            items: jsonItems
          },
          success_url: 'http://localhost:3000/api/stripe/success',
          cancel_url: 'http://localhost:3000/api/stripe/cancel',
        });
      
        return session;
      }

      
      async handleWebhook( req: RawBodyRequest<Request>, res: Response) {
        //const bodyString = req.body;
        //console.log("RAW BODY: " + req.rawBody);
        const sig = req.headers['stripe-signature'];
        //console.log( "BODY: " + bodyString);
        //console.log("SIG: "+ sig);
  let event;

  try {
    event = this.stripe.webhooks.constructEvent(req.rawBody, sig, process.env.WEBHOOK_SECRET_KEY);
    console.log('Webhook event received:', event);
    console.log('BODY:' + req.rawBody);
  } catch (err) {
    console.log('WEBHOOK ERROR!' + err);
    throw new BadRequestException(`Webhook Error: ${err.message}`);
   
  }

  if (event.type === 'checkout.session.completed') {

    
    const session = event.data.object;
    const lineItems = await this.stripe.checkout.sessions.listLineItems(session.id);
    //const metadata = session.metadata;
    const parsedItems = JSON.parse(session.metadata.items);
    
    
    
    
    for (const item of parsedItems) {
      const product: ProductEntity =  await this.productRepo.findOne({where: { id: item.productID}});
      product.stock_count = product.stock_count - item.quantity;
      await this.productRepo.save(product)

    }
    // Handle successful payment here (e.g., update order status)
    let order: OrderEntity = new OrderEntity();
    order.user = session.metadata.userID;
    order.products = parsedItems;
    order.totalAmount = session.amount_total;


    await this.orderRepo.save(order);
    //delete cart upon success payment
    //these two below need to be done
    await this.cartRepo.clear()
    await this.cartRepo.delete(session.metadata.cartID);
  }

  return ({ received: true });
      }


}
