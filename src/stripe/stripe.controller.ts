import { Controller, Body, Post, Req, Res,Get } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { json } from 'body-parser';

@Controller('stripe')
export class StripeController {

    constructor( private readonly stripeService: StripeService) {}

    @Post('create-checkout-session')

    async createCheckoutSession( @Body() body:{ items: { name: string; price: number; quantity: number} []}) {

        try {
            const session = await this.stripeService.createCheckoutSession(body.items);
            return { session: session.url };
        }
        catch(error) {
            return { error: error.message}
        }
    }

    @Post('webhook')
    
    async handleWebhook(@Req() req: Request, @Res() res: Response) {
        return this.stripeService.handleWebhook(req, res);
}

    @Get('success')

    async paymentSuccessfull(@Res() res: Response) {
        return {"success": true}
    }
}
