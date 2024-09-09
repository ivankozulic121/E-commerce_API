import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {

    private stripe: Stripe;

    constructor(private configService: ConfigService) {

        this.stripe = new Stripe(this.configService.get<string>('SECRET_KEY'), {
            apiVersion: '2024-06-20'
        })
        
    }


    async createCheckoutSession(items: { name: string; price: number; quantity: number }[]) {
        const session = await this.stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: items.map((item) => ({
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
          success_url: 'http://localhost:3000/success',
          cancel_url: 'http://localhost:3000/cancel',
        });
    
        return session;
      }
}
