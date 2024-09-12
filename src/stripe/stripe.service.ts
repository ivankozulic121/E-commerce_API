import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { Request, Response } from '@nestjs/common';
import { json } from 'body-parser';
import * as rawBody from 'raw-body';

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
          success_url: 'http://localhost:3000/api/stripe/success',
          cancel_url: 'http://localhost:3000/api/stripe/cancel',
        });
    
        return session;
      }
      
      async handleWebhook(req: Request, res: Response) {
        const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = this.stripe.webhooks.constructEvent(req['rawBody'], sig, process.env.WEBHOOK_SECRET_KEY);
    console.log('Webhook event received:', event);
  } catch (err) {
    console.log('WEBHOOK ERROR!')
    throw new BadRequestException(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // Handle successful payment here (e.g., update order status)
  }

  return ({ received: true });
      }


}
