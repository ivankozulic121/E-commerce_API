import { Controller, Body, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {

    constructor( private readonly stripeService: StripeService) {}

    @Post('create-checkout-session')

    async createCheckoutSession( @Body() body:{ items: { name: string; price: number; quantity: number} []}) {

        try {
            const session = await this.stripeService.createCheckoutSession(body.items);
            return { id: session.id };
        }
        catch(error) {
            return { error: error.message}
        }
    }
}
